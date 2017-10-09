let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

function guess() {
	let input = document.getElementById('user-guess');
	//add functionality to guess function here
	if ((answer.value == '') || (attempt.value == '')) {
		setHiddenFields();
	}
	if(!validateInput(input.value)) {
		return false;
	} else {
		attempt.value = parseInt(attempt.value) + 1;
	}
	let userResults = getResults(input.value);
	if(userResults) {
		setMessage("You Win! :)");
		showAnswer(true);
		showReplay();
	} else if (!userResults && (attempt.value > 10)) {
		setMessage("You Lose! :(");
		showAnswer(false);
		showReplay();
	} else {
		setMessage("Incorrect, try again.");
	}
}

//implement new functions here
function setHiddenFields() {
	answer.value = Math.floor(Math.random() * 10000);
	attempt.value = 0;
	while (answer.value.toString().length < 4) {
		answer.value = "0" + answer.value;
	}
	console.log(answer.value + " " + attempt.value);
}

function setMessage(message) {
	document.getElementById('message').innerHTML = message;
}

function validateInput(input) {
	if (input.length == 4) {
		return true;
	} else {
		setMessage("Guesses must be exactly 4 characters long.");
		return false;
	}
}

function getResults(input) {
	let tempResults = '<div class="row"><span class="col-md-6">' + input + '</span><div class="col-md-6">';
	let answerString = answer.value.toString();
	let inputString = input.toString();
	let correctChar = 0;
	for (i = 0; i < 4; i++) {
		if (inputString.charAt(i) == answerString.charAt(i)){
			tempResults += '<span class="glyphicon glyphicon-ok"></span>';
			correctChar += 1;
		} else if (answerString.indexOf(inputString.charAt(i)) > -1) {
			tempResults += '<span class="glyphicon glyphicon-transfer"></span>';
		} else {
			tempResults += '<span class="glyphicon glyphicon-remove"></span>';
		}
	}
	document.getElementById('results').innerHTML += tempResults + '</div>';
	if (correctChar == 4) {
		return true;
	} else {
		return false;
	}
}

function showAnswer(condition) {
	let code = document.getElementById('code');
	code.innerHTML = answer.value;
	if (condition) {
		code.className += ' success';
	} else {
		code.className += ' failure';
	}
}

function showReplay() {
	document.getElementById('guessing-div').style.display = "none";
	document.getElementById('replay-div').style.display = "block";
}
