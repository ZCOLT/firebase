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

  var database = firbase.database();
  
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