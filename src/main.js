document.querySelector("form").addEventListener("submit", function(e){
	e.preventDefault();

	var input = document.querySelector("form input");

	if(input.value === ""){
		return;
	}

	// now post a new XHR request
	var xhr = new XMLHttpRequest();
	xhr.open('POST', 'https://zapier.com/hooks/catch/3frubg/');
	// xhr.setRequestHeader("Accept", "application/json");
	// xhr.setRequestHeader("Content-Type","application/json");
	
	xhr.onload = function(e) {

		if(!e.target.responseText){
			console.log("ERRO ERROR ERRORO");
			return;
		}

	};

	xhr.send( JSON.stringify( {mobile:encodeURIComponent(input.value)} ) );

});