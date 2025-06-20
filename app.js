import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCdhCYndk9UUMbmUD6OsghngjAj3KGpcNY",
  authDomain: "to-do-list-1939e.firebaseapp.com",
  projectId: "to-do-list-1939e"
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// DOM Elements
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Add task function
async function addTask() {
  const task = taskInput.value.trim();
  if (task) {
    await addDoc(collection(db, "tasks"), {
      text: task,
      timestamp: new Date()
    });
    taskInput.value = "";
  }
}

// Listen to button click
addBtn.addEventListener("click", addTask);

// Real-time listener for tasks collection
const q = query(collection(db, "tasks"), orderBy("timestamp"));
onSnapshot(q, (snapshot) => {
  taskList.innerHTML = "";
  snapshot.forEach(doc => {
    const li = document.createElement("li");
    li.textContent = doc.data().text;
    taskList.appendChild(li);
  });
});


