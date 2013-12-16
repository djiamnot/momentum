$(document).ready(function () {
    var eventTime = 0;
    var track = new Array();
    var trackevents = 0;
    var recording = 0;
    var playing = 0;
    var trackevent = 0;
    var roll = function (state, interval, track) {
	/*
          / roll global timeline. If playing, play specified track. If recording, output ime only.
        */
	if (state == 1) {
            var date = new Date();
            var starttime = new Date().getTime() / 1000;
            $("#now").html(starttime);
            cron = setInterval(function () {
		nowtime = new Date().getTime() / 1000;
		stepTime = nowtime - starttime;
		eventTime = stepTime;
		$("#now").html(stepTime);
		if (playing) {
		    //console.log("roll is in play mode");
		    if (track[trackevent][0] <= eventTime + 0.01 && track[trackevent][0] >= eventTime-0.01) {
			console.log("Matching: " + trackevent + " time: " + eventTime);
			play(trackevent,track[trackevent]);
			if (trackevent < track.length - 1){
			    trackevent += 1;
			} else {
			    trackevent = 0;
			    starttime = new Date().getTime() / 1000;
			}
		    }
		}
            }, interval)
	} else {
            clearInterval(cron);
	}
    }

    $(function () {
	$("#play").button({
            text: false,
            icons: {
		primary: 'ui-icon-play'
            }
	})
    });
    $(function () {
	$("#record").button({
	    text: false,
	    icons: {
		primary: 'ui-icon-radio-on'
	    }
	})
    });

    $("#record").button().click(function () {
	if ($(this).is(":checked")) {
	    recording = 1;
	    console.log("clearing track");
	    track = [];
	    trackevents=0;
	    roll(1, 1);
	    console.log("Start recording");
	} else {
	    recording = 0;
	    roll(0, 250);
	    console.log("Stop recording");
	    console.log("Track contents: " + track);
	}
    });

    $("#play").button().click(function () {
	if ($(this).is(":checked")) {
	    playing = 1;
	    roll(1, 10, track);
	    // play(1);

	} else {
	    playing = 0;
	    roll(0, 250, track);
	    trackevent = 0;
	    //play(0);
	}
    });
    $("#trigger").click(
	function () {
	    $("#led").toggleClass("black");
	    $("#led").html(eventTime);
	    record();
	});

    $("#container").click(
	function (e) {
	    index = trackevents;
	    time = eventTime;
	    mouseX = e.pageX;
	    mouseY = e.pageY;

	    //$("#led").toggleClass("black");
	    $("#led").html(time);
	    record(index, time, mouseX, mouseY);
	    console.log("pageX: " + e.pageX + " x pageY: " + e.pageY);
	    console.log("Added: " + track[index] + " at index: " + index);
	    trackevents += 1;
	});
    var objectArray = new Array();
    var record = function (index, t, x, y) {
	track[index] =  new Array(t, x, y);
	drawObject = new viz(x, y,eventTime );
	console.log(drawObject);
	objectArray[index] = drawObject;
    }
    var play = function (index,data) {
        whiteCrossSprite.position.set(data[1], data[2]-80,0);
        for (i=0; i < objectArray.length;i++ ){
            objectArray[i].material.color = new THREE.Color(0xCC0000);
        }
        console.log(pointLight);
        objectArray[index].material.color = new THREE.Color(0x0000CC);
        console.log(objectArray[index].material.color);
        $("#led").html(data[0]);
    }
});
