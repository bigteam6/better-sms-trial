var entries = ["bookings","sales","donations"];
var entrypos = 0;
var stringpos = 0;

function loop(string, callback){
	console.log("hey");

	if(stringpos == string.length){
		callback();
		return;
	} else {
		$(".subject").html($(".subject").html() + string[stringpos]);
		stringpos += 1;
	}

	setTimeout(function(){
		loop(string, callback);
	}, 80);
}

function cycle(instantly){
	if(instantly){
		loop(entries[entrypos], function(){
			cycle();
		});
	} else {
		stringpos = 0;
		entrypos += 1;
		if(entrypos == entries.length){entrypos = 0;}
		
		setTimeout(function(){
			$(".subject").html("");
			loop(entries[entrypos], function(){
				cycle();
			});
		}, 2000);
	}
}

cycle(true);