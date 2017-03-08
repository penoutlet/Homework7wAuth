// Firebase Initialize



  // Initialize Firebase
 
 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDZgLkwovbsiHiokhGAJzNa5msndwsB5CI",
    authDomain: "timesheet-exercise-9e1a2.firebaseapp.com",
    databaseURL: "https://timesheet-exercise-9e1a2.firebaseio.com",
    storageBucket: "timesheet-exercise-9e1a2.appspot.com",
    messagingSenderId: "650357396120"
  };
  firebase.initializeApp(config);

// Authentication through github

var provider = new firebase.auth.GithubAuthProvider();
console.log("Provider: " + provider);
// to get pop-up sign in:
firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a GitHub Access Token. You can use it to access the GitHub API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;
  // ...
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...

});

firebase.auth().signInWithPopup(provider);


// Save the database 
var database = firebase.database();
// var dtadded = firebase.database.ServerValue.TIMESTAMP;


$("#add-train-btn").on("click", function(){
		event.preventDefault();
	// grab input from the four fields
	var trainName = $("#train-name-input").val().trim();
	var trainDestination = $("#destination-input").val().trim();
		var trainFrequency = $("#frequency-input").val().trim();

// The below statements handle incorrect input. ===================
	if (trainName === "") {
	alert("Please fill in all fields.")
	return;
}

	else if (trainDestination === ""){
	alert("Please fill in all fields.")
	return;
}

	else if (trainFrequency === ""){
	alert("Please fill in all fields.")
	return;
}
	else if (trainFrequency.match(/[a-z]/i)) {
		alert("Invalid frequency input. Please use numbers only.")
		return;
	}


	var nextArrival = 

		arrivalinput = $("#nextArrival-input").val().trim();

		if (arrivalinput.length > 5) {

			alert("Invalid time format. Enter HH:mm please.");
			return;
}

		else if (arrivalinput.length < 5) {
			alert("Invalid time format. Enter HH:mm please.");
			return;
}	

		else if (arrivalinput.match(/[a-z]/i)) {
		alert("Invalid time format. Enter HH:mm please.");
		return;
}
		else if (arrivalinput.split(":")[0]>24) {
		alert("Invalid time format. Enter HH:mm, miliary time, please.");
		return;
				}
		else {
		nextArrival = arrivalinput;
}

	// console.log
	console.log(trainName);
	console.log(trainDestination);
	console.log(nextArrival);
	console.log(trainFrequency);

// object to be pushed to firebase, with the timestamp added.
var trainNew = {
		name: trainName,
		destination: trainDestination,
		nextArrival:nextArrival,
		frequency:trainFrequency,
		dateAdded:firebase.database.ServerValue.TIMESTAMP
		
		}
	// save these input values to firebase
	database.ref().push(trainNew)


	// console.log 

	console.log(trainNew.name);
	console.log(trainNew.destination);
	console.log(trainNew.nextArrival);
	console.log(trainNew.frequency);
	console.log(trainNew.dateAdded);

	//Alert
	alert("Train successfully added!");

	// Clears all text-boxes
	$("#train-name-input").val("");
	$("#destination-input").val("");
	$("#nextArrival-input").val("");
	$("#frequency-input").val("");

	// Prevents moving to new page
	return false;

});// end of on.click function


// then from firebase, generate the table. Believe I need child add for this. 
database.ref().on("child_added", function (childSnapshot, prevChildKey){ 


		// console.log
	console.log(childSnapshot.val());
	console.log(childSnapshot.val().name);
	console.log(childSnapshot.val().destination);
	console.log(childSnapshot.val().nextArrival);
	console.log(childSnapshot.val().frequency);
	console.log("Time added: " + childSnapshot.val().dateAdded);
	
	// resets the initial variables to have the values from firebase.
	var trainName = childSnapshot.val().name;
	var trainDestination = childSnapshot.val().destination;
	var nextArrival = childSnapshot.val().nextArrival;
	var trainFrequency = childSnapshot.val().frequency;

	// var minutesAway calculation

	// current time/time of submission converted into useable time.
	var dateAdded = moment(new Date(childSnapshot.val().dateAdded));
	var dateAddedConverted = moment(dateAdded).format('hh:mm');
	var dateAddedSplit = dateAddedConverted.split(":");
		console.log("split date.added: " + dateAddedSplit);
	
// Below is the code to get the minutesAway

// split the two times to make the math easier. 
	var nextArrivalsplit = nextArrival.split(":");
		console.log("Time now: " + dateAddedSplit);
		console.log("Next arrival: " + nextArrivalsplit);
	
	// math to turn the hours portion of the split into minutes
	// take the first index, hours, and convert into minutes by * 60
	// then add the minutes portion of the index
	var nextArrivalConverted = (parseInt(nextArrivalsplit[0]) * 60) + parseInt(nextArrivalsplit[1]);

	console.log("Next arrival time converted into minutes: " + nextArrivalConverted);


	// now, convert the time the train was added into minutes. 
	var trainAddedsplit = dateAddedSplit;
	var trainAddedConverted = parseInt(trainAddedsplit[0]* (60)) + parseInt(trainAddedsplit[1]);
	console.log("Time train was added converted into minutes: " + trainAddedConverted);

	// to get minutes away, subtract time added from next arrival.
	var minutesAway = nextArrivalConverted - trainAddedConverted; 
	console.log("Minutes away (after converting both times into minutes): " + minutesAway);
	
	$(".table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
	trainFrequency	 + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");


});









 