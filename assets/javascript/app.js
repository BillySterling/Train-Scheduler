/* global moment firebase */

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBZk5eZ3Gr1tcnvx2hc_hES-KcD7IMsO-Y",
    authDomain: "train-scheduler-dc639.firebaseapp.com",
    databaseURL: "https://train-scheduler-dc639.firebaseio.com",
    projectId: "train-scheduler-dc639",
    storageBucket: "train-scheduler-dc639.appspot.com",
    messagingSenderId: "472453110130"
};

firebase.initializeApp(config);

// Create a variable to reference the database
var database = firebase.database();
