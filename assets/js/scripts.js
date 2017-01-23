SC.initialize({
  client_id: 'fd4e76fc67798bfa742089ed619084a6',
  // redirect_uri: 'http://example.com/callback'
});

//marina's tracks: 299620012, 298366202, 298365696, 299568268

function Jukebox() {
	var jukePlayer;
	this.songArray = [];
	this.currentTrack = 0;

	this.load = function() {
		SC.stream('/tracks/' + this.songArray[this.currentTrack].id).then(function(player){
		  jukePlayer = player;
		  jukePlayer.play();
		});
		$("#songname").text(this.songArray[this.currentTrack].title);
		$("#songNext").text(this.songArray[(this.currentTrack+1)%this.songArray.length].title)
		$(".glyphicon-play").hide();
		$(".glyphicon-pause").show();
		this.queue();
	}

	this.play = function() {
		jukePlayer.play();
	}

	this.pause = function() {
		jukePlayer.pause();
	}

	this.addSong = function(songObject) {
		this.songArray.push(songObject);
	}

	this.playNext = function() {
		this.currentTrack = (this.currentTrack+1)%(this.songArray.length);
		console.log("track: " + this.currentTrack + ", song: ");
		console.log(this.songArray[this.currentTrack]);
		this.load();
	}

	this.shuffle = function() {
		this.songArray = shuffle(this.songArray);
		this.load();
	}

	this.queue = function() {
		this.htmlstring = "";
		for (var i=0;i<this.songArray.length;i++) {
			this.htmlstring += "<p class=\"song\"" + i + "\">" + this.songArray[i].title + "</p>";
		}
		document.getElementById("upnext").innerHTML = this.htmlstring;
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

juke = new Jukebox();


//get Marina's songs and put them in the jukebox
var marinaTracks = [];
var length;


SC.get('/tracks', {
  q: 'Marina Dreams of Sushi'
}).then(function(tracks) {
	for (var i = 0; i < 4; i++) {
		juke.addSong(tracks[i]);
	};
	juke.load();
});

//play button
$(".glyphicon-play").click(function() {
	juke.play();
	$(".glyphicon-play").hide();
});

//play button
$(".glyphicon-play").click(function() {
	juke.play();
	$(".glyphicon-play").hide();
	$(".glyphicon-pause").show();
});

//pause button
$(".glyphicon-pause").click(function() {
	juke.pause();
	$(".glyphicon-pause").hide();
	$(".glyphicon-play").show();
});

//next button
$(".glyphicon-step-forward").click(function() {
	juke.playNext();
});

//shuffle
$(".glyphicon-random").click(function() {
	juke.shuffle();
});

//create jukebox function
// function Jukebox() {
// 	this.playlist = []; //array full of songs
// 	this.place = 0; //which song in the playlist should play
// 	this.isLoaded = false;
// 	this.isPlaying = false;
// 	this.isPaused = false;

// 	this.queueSong = function(song) {
// 		this.playlist.push(song);
// 	}

// 	this.playOrPause = function() {
// 		if (this.isPlaying == false) {
// 			if (this.isLoaded == false) {
// 				this.playlist[this.place].load();
// 				this.isLoaded = true;
// 			}
// 			this.playlist[this.place].play();
// 			this.isPlaying = true;
// 			this.isPaused = false;
// 			pauseStatus(this)
// 			$('.glyphicon-play').addClass('glyphicon-pause');
// 			document.getElementById("songNext").innerText = this.playlist[this.place + 1].name;
// 		} else if (this.isLoaded == true) {
// 			this.playlist[this.place].pause();
// 			this.isPlaying = false;
// 			this.isPaused = true;
// 			pauseStatus(this)
// 			$('.glyphicon-play').removeClass('glyphicon-pause');
// 		}
// 	}

// 	this.stop = function() {
// 		document.getElementById("track").src = "";
// 		this.isLoaded = false;
// 		this.isPlaying = false;
// 		this.isPaused = false;
// 		pauseStatus(this)
// 		document.getElementById("songname").innerText = "";
// 		$('.glyphicon-play').removeClass('glyphicon-pause');
// 	}

// 	this.next = function() {
// 		this.place++;
// 		this.place = this.place%this.playlist.length; //start fromt the beginning
// 		this.playlist[this.place].load();
// 		this.isLoaded = true;
// 		this.playlist[this.place].play();
// 		this.isPlaying = true;
// 		this.isPaused = false;
// 		$('.glyphicon-play').addClass('glyphicon-pause');
// 		pauseStatus(this)
// 		document.getElementById("songNext").innerText = this.playlist[this.place + 1].name;

// 	}

// 	this.playNext = function(name) {
// 		for (var i=0;i<this.playlist.length;i++) {
// 			if (name == playlist[i].name) {
// 				this.place = i-1;
// 				document.getElementById("songNext").innerText = this.playlist[i].name;
// 			}
// 		}
// 	}

// 	this.shuffle = function() {
// 		shuffle(this.playlist);
// 		queue(this);
// 		this.place = -1;
// 		this.next();
// 	}
// }

// /**
//  * Shuffles array in place.
//  * @param {Array} a items The array containing the items.
//  */
// function shuffle(a) {
//     var j, x, i;
//     for (i = a.length; i; i--) {
//         j = Math.floor(Math.random() * i);
//         x = a[i - 1];
//         a[i - 1] = a[j];
//         a[j] = x;
//     }
//     return(a);
// }

// //this is what puts the "paused" next to "now playing"
// function pauseStatus(jukeboxName) {
// 	if (jukeboxName.isPaused) {
// 		console.log("it is paused")
// 		document.getElementById("playStatus").innerText = " paused"
// 	} else {
// 		document.getElementById("playStatus").innerText = " "
// 	}
// }

// function queue(jukeboxName) {
// 	this.juke = jukeboxName;
// 	this.playlist = juke.playlist;
// 	this.htmlstring = ""
// 	for (var i=0;i<this.playlist.length;i++) {
// 		this.htmlstring += "<p class=\"song\"" + i + "\">" + this.playlist[i].name + "</p>";
// 	}
// 	document.getElementById("upnext").innerHTML = this.htmlstring;
// }

// juke = new Jukebox();

// //create sound cloud song function

// function Song(songObject) {

// }

// // //create song function
// // function Song(name, filename, jukeboxName) {
// // 	this.name = name;
// // 	this.filename = filename;
// // 	jukeboxName.queueSong(this);
// // 	var audioElement = document.getElementById("track")

// // 	this.load = function() {
// // 		audioElement.src = this.filename;
// // 		audioElement.play();
// // 		document.getElementById("songname").innerText = this.name;
// // 	}

// // 	this.play = function() {
// // 		audioElement.play();
// // 		document.getElementById("songname").innerText = this.name;
// // 	}

// // 	this.pause = function() {
// // 		audioElement.pause();
// // 		document.getElementById("songname").innerText = this.name;
// // 	}
// // }

// // //load songs
// // sunny = new Song("sunny","assets/bensound-sunny.mp3",juke);
// // buddy = new Song("buddy","assets/bensound-buddy.mp3",juke);
// // uke = new Song("ukulele","assets/bensound-ukulele.mp3",juke);
// // sunny1 = new Song("sunny1","assets/bensound-sunny.mp3",juke);
// // buddy1 = new Song("buddy1","assets/bensound-buddy.mp3",juke);
// // uke1 = new Song("ukulele1","assets/bensound-ukulele.mp3",juke);

// $(document).ready(function(){juke.playOrPause();});



// //stop button
// $(".glyphicon-stop").click(function() {
// 	juke.stop();
// });

// //next button
// $(".glyphicon-step-forward").click(function() {
// 	juke.next();
// });

// //shuffle button
// $(".glyphicon-random").click(function() {
// 	juke.shuffle();
// });

// //listen for each of the song class
// queue(juke);
// $("#upnext").click(function(event) {
//     var text = $(event.target).text();
//     console.log(text);
//     juke.playNext(text);
// });