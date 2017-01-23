SC.initialize({
  client_id: 'fd4e76fc67798bfa742089ed619084a6',
  // redirect_uri: 'http://example.com/callback'
});

//marina's tracks: 299620012, 298366202, 298365696, 299568268

function Jukebox() {
	var jukePlayer;
	this.songArray = [];
	// this.currentTrack = 0;

	this.load = function() {
		if (this.songArray.length > 0) {
			SC.stream('/tracks/' + this.songArray[0].id).then(function(player){
			  jukePlayer = player;
			  jukePlayer.play();
			});
			$("#songname").text(this.songArray[0].title);

		} else {
			$("#songname").text("");
		}
		
		if (this.songArray.length > 1) {
			$("#songNext").text(this.songArray[1].title)
		} else {
			$("#songNext").text("")
		}
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
		this.songArray.shift();
		console.log(this.songArray);
		this.load();
	}

	this.shuffle = function() {
		this.songArray.shift();
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

$("#submit").click(function checkForm() {
	var searchKey = $("#search").val();
	console.log(searchKey);
	searchSC(searchKey);
})

// SC.get('/tracks', {
//   q: 'Marina Dreams of Sushi'
// }).then(function(tracks) {
// 	for (var i = 0; i < tracks.length; i++) {
// 		juke.addSong(tracks[i]);
// 	};
// 	juke.load();
// });

function searchSC(searchString) {
	SC.get('/tracks', {
	  q: searchString
	}).then(function(tracks) {
		for (var i = 0; i < tracks.length; i++) {
			juke.addSong(tracks[i]);
		};
		juke.load();
	});
}