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

publishBtnEl.addEventListener("click", function() {
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
       
       clearMessageInputEl();
       clearFromInputEl();
       clearToInputEl();
   }
});

function clearMessageInputEl() {
    messageInputEl.value = "";
}

function clearFromInputEl() {
    fromInputEl.value = "";
}

function clearToInputEl() {
    toInputEl.value = "";
}

onValue(endorsementsInDB, function(snapshot) {
   if (snapshot.exists()) {
       const endorsementsValuesArray = Object.values(snapshot.val());
       
       clearEndorsementsListEl();
       
       for (let i = 0; i < endorsementsValuesArray.length; i++) {
           const currentEndorsement = endorsementsValuesArray[i];
           
           appendEndorsementToEndorsementsListEl(currentEndorsement);
       }
   } 
});

function clearEndorsementsListEl() {
    endorsementsListEl.innerHTML = "";
}

function appendEndorsementToEndorsementsListEl(endorsement) {
    const listEl = document.createElement("li");
    listEl.classList.add("endorsements");
    listEl.textContent = endorsement;
    endorsementsListEl.append(listEl);
}