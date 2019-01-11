$(document).ready(function() {
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
    var dataRef = firebase.database();

    $("#addTrainBtn").on("click", function(event){
        event.preventDefault();
        //console.log("Clicked")
        
        var trainName = $("#trainName").val().trim();
        var destination = $("#destination").val().trim();
        var firstTime = $("#firstTime").val().trim();
        var frequency = $("#frequency").val().trim();

        //console.log(trainName);
        //console.log(destination);
        //console.log(firstTime);
        //console.log(frequency);

        var newTrain = {
            trainName: trainName,
            destination: destination,
            firstTime: firstTime,
            frequency: frequency
        }

        console.log(newTrain);

        dataRef.ref().push(newTrain);

        // clear inputs
        $("#trainName").val("");
        $("#destination").val("");
        $("#firstTime").val("");
        $("#frequency").val(0);
    });

        // Firebase watcher + initial loader
        dataRef.ref().on("child_added", function(childSnapshot) {

            // Log everything that's coming out of snapshot
            console.log("childsnapshot" + childSnapshot);
            console.log(childSnapshot.val().trainName);
            console.log(childSnapshot.val().destination);
            console.log(childSnapshot.val().firstTime);
            console.log(childSnapshot.val().frequency);
            console.log(childSnapshot.key);

            var newName = childSnapshot.val().trainName;
            var newDestination = childSnapshot.val().destination;
            var newTrainTime = childSnapshot.val().firstTime;
            var tFrequency = childSnapshot.val().frequency;
            var key = childSnapshot.key;

            // First Time (pushed back 1 year to make sure it comes before current time)
            var firstTimeConverted = moment(newTrainTime, "HH:mm").subtract(1, "years");
            console.log("CONV TRAIN TIME: " + firstTimeConverted);

            // Current Time
            var currentTime = moment();
            console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

            // Difference between the times
            var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
            console.log("DIFFERENCE IN TIME: " + diffTime);

            // Time apart (remainder)
            var tRemainder = diffTime % tFrequency;
            console.log("TIME REMAINDER: " + tRemainder);

            //minutes until  train
            var tMinutesTillTrain = tFrequency - tRemainder;
            console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

            //next train
            var nextTrain = moment().add(tMinutesTillTrain, "minutes");
            var nextTrainArr = moment(nextTrain).format("HH:mm");
            console.log("ARRIVAL TIME: " + nextTrainArr);
            
            // set up schedule display
            var schedLine = "<tr><td id='dispSched'>" + newName + "</td><td id='dispSched'>" + newDestination + "</td><td id='dispSched'>" + tFrequency + "</td><td id='dispSched'>" + nextTrainArr + "</td><td id='dispSched'>" + tMinutesTillTrain + "</td></tr>";
            // display schedule
            $("#current-schedule").prepend(schedLine);      

            // Handle the errors
        }, function(errorObject) {
            console.log("Errors handled: " + errorObject.code);
        });
});