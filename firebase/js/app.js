//put the interpreter into strict mode
"use strict";
//create a new Firebase application using the Firebase
//console, https://console.firebase.google.com/

//setup OAuth with GitHub
//- on Firebase, enable the GitHub sign-in method
//- go to GitHub, and go to your account settings
//- under Developer Settings on the left, choose OAuth applications
//- fill out the form, setting the Authorization Callback URL
//  to the URL provided by Firebase 

//paste the Firebase initialization code here
// Initialize Firebase
var config = {
    apiKey: "AIzaSyCvjpnAtmX8c7uPWaHeojYrpd2m292t3VU",
    authDomain: "tasks-demo-b294b.firebaseapp.com",
    databaseURL: "https://tasks-demo-b294b.firebaseio.com",
    storageBucket: "tasks-demo-b294b.appspot.com",
    messagingSenderId: "605783813889"
};
firebase.initializeApp(config);

var currentUser;
var authProvider = new firebase.auth.GithubAuthProvider();

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        currentUser = user;
        console.log(currentUser);
    } else {
        firebase.auth().signInWithRedirect(authProvider);
    }
});

var taskForm = document.querySelector(".new-task-form");
var taskTitleInput = taskForm.querySelector(".new-task-title");
var taskList = document.querySelector(".task-list");

var tasksRef = firebase.database().ref("tasks");

taskForm.addEventListener("submit", function(evt) {
    evt.preventDefault();

    var task = {
        title: taskTitleInput.value.trim(),
        done: false,
        createOn: firebase.database.ServerValue.TIMESTAMP,
        createdBy: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            email: currentUser.email
        }
    };
    tasksRef.push(task);

    taskTitleInput.value = "";

    return false;
});

function renderTask(snapshot) {
    
}

function render(snapshot) {
    taskList.innerHTML = "";
    snapshot.forEach(renderTask);
}

taskRef.on("value", render);
