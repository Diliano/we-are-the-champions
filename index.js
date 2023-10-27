import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://we-are-the-champions-f8748-default-rtdb.europe-west1.firebasedatabase.app/"
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const endorsementsInDB = ref(database, "endorsements");

const inputFieldEl = document.getElementById("input-field");
const publishBtnEl = document.getElementById("publish-btn");
const endorsementsEl = document.getElementById("endorsements");

publishBtnEl.addEventListener("click", function() {
   const inputValue = inputFieldEl.value;
   
   if (inputValue !== "") {
       push(endorsementsInDB, inputValue);
       
       clearInputFieldEl();
   }
});

function clearInputFieldEl() {
    inputFieldEl.value = "";
}

onValue(endorsementsInDB, function(snapshot) {
   if (snapshot.exists()) {
       const endorsementsValuesArray = Object.values(snapshot.val());
       
       clearEndorsementsEl();
       
       for (let i = 0; i < endorsementsValuesArray.length; i++) {
           const currentEndorsement = endorsementsValuesArray[i];
           
           const listEl = document.createElement("li");
           listEl.textContent = currentEndorsement;
           endorsementsEl.append(listEl);
       }
   } 
});

function clearEndorsementsEl() {
    endorsementsEl.innerHTML = "";
}



