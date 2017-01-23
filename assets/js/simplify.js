$(document).ready(function() {
	juke = new Jukebox();
	juke.play();

//create jukebox function
function Jukebox() {
	this.playlist = []; //array full of songs
	this.currentSong = 0; //which song in the playlist should play
	this.isLoaded = false;
	this.isPlaying = false;
	this.isPaused = false;

	this.queueSong = function(song) {
		this.playlist.push(song);
	}

	this.play = function() {
		if (this.isLoaded == false) {
			this.playlist[this.currentSong].load();
			this.isLoaded = true;
		}
		this.playlist[this.currentSong].play();
		this.isPlaying = true;
		this.isPaused = false;
		pauseStatus(this)
		$('#playPause').addClass('glyphicon-pause');
		$('#playPause').removeClass('glyphicon-play');
		document.getElementById("songNext").innerText = this.playlist[this.currentSong + 1].name;
	}

	this.pause = function() {
		if (this.isLoaded == true) {
			this.playlist[this.currentSong].pause();
			this.isPlaying = false;
			this.isPaused = true;
			pauseStatus(this)
			$('#playPause').addClass('glyphicon-play');
			$('#playPause').removeClass('glyphicon-pause');
		}
	}

	// this.playOrPause = function() {
	// 	if (this.isPlaying == false) {
	// 		if (this.isLoaded == false) {
	// 			this.playlist[this.currentSong].load();
	// 			this.isLoaded = true;
	// 		}
	// 		this.playlist[this.currentSong].play();
	// 		this.isPlaying = true;
	// 		this.isPaused = false;
	// 		pauseStatus(this)
	// 		$('.glyphicon-play').addClass('glyphicon-pause');
	// 		document.getElementById("songNext").innerText = this.playlist[this.currentSong + 1].name;
	// 	} else if (this.isLoaded == true) {
	// 		this.playlist[this.currentSong].pause();
	// 		this.isPlaying = false;
	// 		this.isPaused = true;
	// 		pauseStatus(this)
	// 		$('.glyphicon-play').removeClass('glyphicon-pause');
	// 	}
	// }

	this.stop = function() {
		document.getElementById("track").src = "";
		this.isLoaded = false;
		this.isPlaying = false;
		this.isPaused = false;
		pauseStatus(this)
		document.getElementById("songname").innerText = "";
		$('.glyphicon-play').removeClass('glyphicon-pause');
	}

	this.next = function() {
		this.currentSong++;
		this.currentSong = this.currentSong%this.playlist.length; //start fromt the beginning
		this.playlist[this.currentSong].load();
		this.isLoaded = true;
		this.playlist[this.currentSong].play();
		this.isPlaying = true;
		this.isPaused = false;
		$('.glyphicon-play').addClass('glyphicon-pause');
		pauseStatus(this)
		document.getElementById("songNext").innerText = this.playlist[this.currentSong + 1].name;

	}

	this.playNext = function(name) {
		for (var i=0;i<this.playlist.length;i++) {
			if (name == playlist[i].name) {
				this.currentSong = i-1;
				document.getElementById("songNext").innerText = this.playlist[i].name;
			}
		}
	}

	this.shuffle = function() {
		shuffle(this.playlist);
		queue(this);
		this.currentSong = -1;
		this.next();
	}
}

/**
 * Shuffles array in place.
 * @param {Array} a items The array containing the items.
 */
function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
    return(a);
}

//this is what puts the "paused" next to "now playing"
function pauseStatus(jukeboxName) {
	if (jukeboxName.isPaused) {
		console.log("it is paused")
		document.getElementById("playStatus").innerText = " paused"
	} else {
		document.getElementById("playStatus").innerText = " "
	}
}

function queue(jukeboxName) {
	this.juke = jukeboxName;
	this.playlist = juke.playlist;
	this.htmlstring = ""
	for (var i=0;i<this.playlist.length;i++) {
		this.htmlstring += "<p class=\"song\"" + i + "\">" + this.playlist[i].name + "</p>";
	}
	document.getElementById("upnext").innerHTML = this.htmlstring;
}



//create song function
function Song(name, filename, jukeboxName) {
	this.name = name;
	this.filename = filename;
	jukeboxName.queueSong(this);
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
		document.getElementById("songname").innerText = this.name;
	}
}

//load songs
sunny = new Song("sunny","assets/bensound-sunny.mp3",juke);
buddy = new Song("buddy","assets/bensound-buddy.mp3",juke);
uke = new Song("ukulele","assets/bensound-ukulele.mp3",juke);
sunny1 = new Song("sunny1","assets/bensound-sunny.mp3",juke);
buddy1 = new Song("buddy1","assets/bensound-buddy.mp3",juke);
uke1 = new Song("ukulele1","assets/bensound-ukulele.mp3",juke);



// //play button
// $(".glyphicon-play").click(function() {
// 	juke.play();
// });

// //play button
// $(".glyphicon-pause").click(function() {
// 	juke.pause();
// });

//event delegation playPause
$("#playPause").on("click",".glyphicon-play",function() { //event delegation
	juke.play();
});

$("#playPause").on("click",".glyphicon-puase",function() { //event delegation
	juke.pause();
});


//stop button
$(".glyphicon-stop").click(function() {
	juke.stop();
});

//next button
$(".glyphicon-step-forward").click(function() {
	juke.next();
});

//shuffle button
$(".glyphicon-random").click(function() {
	juke.shuffle();
});

//listen for each of the song class
queue(juke);
$("#upnext").click(function(event) {
    var text = $(event.target).text();
    console.log(text);
    juke.playNext(text);
});

});