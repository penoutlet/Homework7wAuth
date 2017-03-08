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
	
	// convert dateAdded (time added) into military time. 
	var dateAddedSplit = dateAddedConverted.split(":");
	var dateAddedHours = parseInt(dateAddedSplit[0]) + 12;
	var dateAddedMilitary = dateAddedHours + ":" + dateAddedSplit[1];
		console.log("Date added in military time: " + dateAddedMilitary);


// Below is the code to get the minutesAway.

// split the two times, as done above with the time the train was added, to make the math easier. 
	var nextArrivalsplit = nextArrival.split(":");
		console.log("Time now: " + dateAddedSplit);
		console.log("Next arrival: " + nextArrivalsplit);
	
	// To make the calculation of minutes away easier, I'm converting both military times into "minutes into the day".
	// so 01:00 is 60 minutes into the day, 02:00 is 120. If it's currently 01:00 and the train arrives at 02:00,
	// this will subtract 60 from 120 to ge 60 minutes away.  
	var nextArrivalConverted = (parseInt(nextArrivalsplit[0]) * 60) + parseInt(nextArrivalsplit[1]);

	console.log("Next arrival time converted into minutes: " + nextArrivalConverted);


	// now, convert the time the train was added into minutes.

	var dateAddedMilitarySplit = dateAddedMilitary.split(":"); 
	var dateAddedMilitaryHours = dateAddedMilitarySplit[0];
	var dateAddedMilitaryMinutes = dateAddedMilitarySplit[1];
	var trainAddedConverted = parseInt(dateAddedMilitaryHours* (60)) + parseInt(dateAddedMilitaryMinutes);
			
	console.log("Time train was added in military time: " + dateAddedMilitary);
	console.log("Time train was added converted into minutes: " + trainAddedConverted);







	// to get minutes away, subtract the times converted into minutes, time added from next arrival.
	var minutesAway = nextArrivalConverted - trainAddedConverted; 
	console.log("Minutes away (after converting both times into minutes): " + minutesAway);
	
	

	// to convert military time into regular time... not working for 12:01-12:59, gives a.m. instead of p.m. Not working for
	// 24 either. Gives 24:00 a.m. instead of 12:00 a.m. Must be skipping the middle else if statements.  

	var nextArrivalRegular = 
			nextArrivalhours = nextArrival.split(":")[0];
			nextArrivalminutes = nextArrival.split(":")[1];
			
			console.log("Hours place of next arrival: " + nextArrivalhours);
			if (nextArrivalhours>12 && nextArrivalhours < 24){
				nextArrivalRegular = nextArrivalhours-12 + ":" + nextArrivalminutes + ("p.m.");
			}

			else if (nextArrivalhours === 24) {
				nextArrivalRegular = (nextArrivalhours-12) + ":" + nextArrivalminutes + ("a.m.");
					alert("Next arrival hours-place is 24!");
					console.log("Next arrival hours - 12 from else if statement: " + nextArrivalhours-12);
			}

			else if (nextArrivalhours === 12) {
					nextArrivalRegular = nextArrival + ("p.m.");
			}		
			else {
				nextArrivalRegular = parseInt(nextArrivalhours) + ":" + nextArrivalminutes + ("a.m.");

			}
		console.log(nextArrivalRegular);

	$(".table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
	trainFrequency	 + "</td><td>" + nextArrival + " " + "(" + nextArrivalRegular + ")" + "</td><td>" + minutesAway + "</td></tr>");


});









 