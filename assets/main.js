console.log("yo")

var config = {
    apiKey: "AIzaSyCAy0zbj-RkqvSAJNLTWr3OO1KY0qzRXow",
    authDomain: "train-scheduler-6cd60.firebaseapp.com",
    databaseURL: "https://train-scheduler-6cd60.firebaseio.com",
    projectId: "train-scheduler-6cd60",
    storageBucket: "",
    messagingSenderId: "887123173851"
  };

  firebase.initializeApp(config);

  var database = firebase.database();
  
  $('#add-train').on("click", function (event){
      event.preventDefault();

      var trainName = $('#name-input').val().trim()
      var destination = $('#destination-input').val().trim()
      var time = $('#time-input').val().trim()
      var frequency = $('#frequency-input').val().trim()

      var newTrain = {
          name: trainName,
          destination: destination,
          firstTime: time,
          frequency: frequency,
      }

      database.ref().push(newTrain);

        console.log(newTrain.trainName);
        console.log(newTrain.destination);
        console.log(newTrain.time);
        console.log(newTrain.frequency);

        alert("Train successfully added");

        $("#name-input").val("");
        $("#destination-input").val("");
        $("#time-input").val("");
        $("#frequency-input").val("");
  })

  database.ref().on("child_added", function (snapshot) {
    var destination = snapshot.val().destination;
   
    var name = snapshot.val().name;
    console.log(destination, name);
    // Assumptions
    var tFrequency = snapshot.val().frequency;
    // Time is 3:30 AM
    var firstTime = snapshot.val().firstTime;;
    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);
    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);
    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);
    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
    var arivalTime = moment(nextTrain).format("hh:mm")

      // Handle the errors
  }, function (errorObject) {
      console.log("Errors handled: " + errorObject.code);
  });