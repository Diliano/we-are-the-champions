import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://we-are-the-champions-f8748-default-rtdb.europe-west1.firebasedatabase.app/"
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const endorsementsInDB = ref(database, "endorsements");

const messageInputEl = document.getElementById("message-input");
const fromInputEl = document.getElementById("from-input");
const toInputEl = document.getElementById("to-input");
const publishBtnEl = document.getElementById("publish-btn");
const endorsementsListEl = document.getElementById("endorsements-list");

onValue(endorsementsInDB, function(snapshot) {
   if (snapshot.exists()) {
       const endorsementsArray = Object.entries(snapshot.val());
       
       clearEndorsementsListEl();
       
       for (let i = 0; i < endorsementsArray.length; i++) {
           const currentEndorsement = endorsementsArray[i][1];
           
           appendEndorsementToEndorsementsListEl(currentEndorsement);
       }
   } 
});

publishBtnEl.addEventListener("click", function() {
   
   checkInputField(messageInputEl, "Write your endorsement here");
   checkInputField(fromInputEl, "From");
   checkInputField(toInputEl, "To");
   
   const messageInputValue = messageInputEl.value;
   const fromInputValue = fromInputEl.value;
   const toInputValue = toInputEl.value;
   
   const totalInput = {
       from: fromInputValue,
       to: toInputValue,
       message: messageInputValue
   };
   
   if (messageInputValue !== "" && fromInputValue !== "" && toInputValue !== "") {
       push(endorsementsInDB, totalInput);
       
       clearInputField(messageInputEl);
       clearInputField(fromInputEl);
       clearInputField(toInputEl);
   }
});

function checkInputField(inputField, placeholder) {
    if (inputField.value === "") {
        inputField.style.border = "1px solid red";
        inputField.placeholder = "Required!";
        
        setTimeout(function() {
            inputField.style.border = "none";
            inputField.placeholder = placeholder;
        },1000);
    }
}

function clearInputField(inputField) {
    inputField.value = "";
}

function clearEndorsementsListEl() {
    endorsementsListEl.innerHTML = "";
}

function appendEndorsementToEndorsementsListEl(endorsement) {
    const endorsementFrom = endorsement.from;
    const endorsementTo = endorsement.to;
    const endorsementMessage = endorsement.message;
    
    const listEl = document.createElement("li");
    const fromPEl = document.createElement("p");
    const toPEl = document.createElement("p");
    const messagePEl = document.createElement("p");
    
    listEl.classList.add("endorsements");
    
    toPEl.textContent = `To ${endorsementTo}`;
    
    messagePEl.classList.add("endorsement-message");
    messagePEl.textContent = endorsementMessage;
    
    fromPEl.textContent = `From ${endorsementFrom}`;
    
    listEl.append(toPEl);
    listEl.append(messagePEl);
    listEl.append(fromPEl);
    
    endorsementsListEl.append(listEl);
}