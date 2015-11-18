document.querySelector("form").addEventListener("submit", function(e){
	e.preventDefault();

	var input = document.querySelector("form input");

	if(input.value === ""){
		return;
	}

	// now post a new XHR request
	var xhr = new XMLHttpRequest();
	// xhr.open('GET', 'http://freeman-notifications.elasticbeanstalk.com/better-sms-signup?mobile=' + encodeURIComponent(input.value));
	
	xhr.open('POST', 'http://52.32.231.54/signup/');

	xhr.setRequestHeader("Accept", "application/json");
	xhr.setRequestHeader("Content-Type","application/json");

	xhr.onload = function(e) {

		if(!e.target.responseText){
			console.log("ERRO ERROR ERRORO");
			return;
		}

		document.querySelector("form").innerHTML = "Thanks! You should receive your first " + (window.location.pathname.indexOf("sms") > -1 ? "SMS" : "email") + " shortly.";

	};

	var payload = {
		uniqueIdentifier: input.value,
		protocol: (window.location.pathname.indexOf("sms") > -1 ? "sms" : "email")
	};

	xhr.send(JSON.stringify(payload));

});