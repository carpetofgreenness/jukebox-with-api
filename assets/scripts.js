//create jukebox that holds songs


//create song function
//MUST LOAD SONG before you can play it
function Song(name, filename) {
	this.name = name;
	this.filename = filename;
	var audioElement = document.getElementById("track")

	this.load = function() {
		audioElement.src = this.filename;
		audioElement.play();

		document.getElementById("songname").innerText = this.name;
	}

	this.play = function() {
		audioElement.play();

		document.getElementById("songname").innerText = this.name;
	}

	this.pause = function() {
		audioElement.pause();

		document.getElementById("songname").innerText = this.name + " paused";
	}
}

//load songs
sunny = new Song("sunny","assets/bensound-sunny.mp3");
buddy = new Song("buddy","assets/bensound-buddy.mp3");
uke = new Song("ukulele","assets/bensound-ukulele.mp3");
