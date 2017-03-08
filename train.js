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
// Save the database 
var database = firebase.database();
// var dtadded = firebase.database.ServerValue.TIMESTAMP;


$("#add-train-btn").on("click", function(){
		event.preventDefault();
	// grab input from the four fields
	var trainName = $("#train-name-input").val().trim();
	var trainDestination = $("#destination-input").val().trim();
		var trainFrequency = $("#frequency-input").val().trim();

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
		else {
		nextArrival = arrivalinput;
}

	// console.log
	console.log(trainName);
	console.log(trainDestination);
	console.log(nextArrival);
	console.log(trainFrequency);

// object to be pushed to firebase
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

	// current time/time of submission converted into military time.
	var dateAdded = moment(new Date(childSnapshot.val().dateAdded));
	var dateAddedConverted = moment(dateAdded).format('hh:mm');
	var dateAddedSplit = dateAddedConverted.split(":");
		console.log("split date.added: " + dateAddedSplit);
	// var stillconverting = parseInt(converted3[0]) + 12;
	// 	console.log("parse int of the split: " + stillconverting);
	// 	 converted3[0] = stillconverting;
	// 	 converted3 = converted3[0] + ":" + converted3[1];

	// 	console.log("Should be 14:19: " + converted3);

	// 	console.log("Time added: " + converted3);



// Below is the code to get the minutesAway

// split the two times to make the math easier. 
	var nextArrivalsplit = nextArrival.split(":");
		console.log("Time now: " + dateAddedSplit);
		console.log("Next arrival: " + nextArrivalsplit);
	
	// math to turn the hours portion of the split into minutes
	// take the first index, hours, and convert into minutes by * 60
	// then add the minutes portion of the index
	var nextArrivalConverted = (parseInt(nextArrivalsplit[0]) * 60) 
	 + parseInt(nextArrivalsplit[1]);
	console.log("Next arrival time converted into minutes: " + nextArrivalConverted);


	// now, convert the time the train was added into minutes. 
	var trainAddedsplit = dateAddedSplit;
	var trainAddedConverted = parseInt(trainAddedsplit[0]* (60)) + parseInt(trainAddedsplit[1]);
	console.log("Time train was added converted into minutes: " + trainAddedConverted);

	// to get minutes away, subtract time added from next arrival.
	var minutesAway = nextArrivalConverted - trainAddedConverted; 
	console.log("Minutes away (after converting both times into minutes): " + minutesAway);
	// parse Int to take the HH of HH:mm, into integers and do math with them. 
		// if the time is 2:40, andthe next train is at 3, my math will give me 60 minutes
		// bc 3-2 is one 


		// var hoursAway =  ((parseInt(nextArrivalsplit[0]) - parseInt(converted3split[0])));
		// var convertedHours = hoursAway * 60; 
		// console.log("Hours away: " + hoursAway);
	




	// take the :mm ( minutes) portion and do the math with them. 
	
		// if the time is 2:40, andthe next train is at 3, my math will give me 60 minutes
		// bc 3-2 is one 

// 	var minutesAwayCalculation = 
// 		placeholder = (parseInt(nextArrivalsplit[1]) - parseInt(converted3split[1]));
// 		if (placeholder<0) { 
// 		minutesAwayCalculation = placeholder * -1; 
// 	}

// 	else if (nextArrivalsplit[1] === 00) {
// 		nextArrivalsplit[1] + 100;
// 	}	
// 	else {
// 		return;
// 	};
// console.log("Placeholder value: " + placeholder);
	
// 	console.log("Minutes away: " + minutesAway0);
	
// var minutesAway = hoursAway + minutesAway0;
// console.log("total minutes away: " + minutesAway);


// 	console.log(parseInt(nextArrival[0]));
// 	console.log(parseInt(converted2[0]));

	// to convert time of nenxt arrival from military to regular. 

	
	// need to calculate Minutesaway variable. To do this, get the dateAdded timestamp and convert it using moment.js. This will give
	// the current time. Make sure it's in military time. Then subtract this converted timestamp from the time of firstTrain (Nextarrival) 
	// need to convert next arrival time from military to regular
	// Add each train's data into the table

	$(".table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
	trainFrequency	 + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");


});

// Functions 
// to give error message if entered time isn't in right format
// function timeformatchecker (nextArrival) {

// 	if (nextArrival 
// };









 