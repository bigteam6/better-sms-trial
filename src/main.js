document.querySelector("form").addEventListener("submit", function(e){
	e.preventDefault();

	var input = document.querySelector("form input");

	if(input.value === ""){
		return;
	}

	// now post a new XHR request
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'http://freeman-notifications.elasticbeanstalk.com/better-sms-signup?mobile=' + encodeURIComponent(input.value));
	// xhr.setRequestHeader("Accept", "application/json");
	// xhr.setRequestHeader("Content-Type","application/json");

	xhr.onload = function(e) {

		if(!e.target.responseText){
			console.log("ERRO ERROR ERRORO");
			return;
		}

		document.querySelector("form").classList.add("thanks");

	};

	xhr.send();

});