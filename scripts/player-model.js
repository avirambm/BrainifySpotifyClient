require([
    '$api/models',
], function(models) {
    'use strict';

    var currTrack = '';
    var tempTrack = '';

    var doGetCurrentTrackOnChangeEvent = function () {
        models.player.addEventListener('change:track', function() {
            getCurrentSong(0);
        });

        models.player.addEventListener('change:playing', function() {
            getCurrentSong(1);
        });
    }

    var doGetCurrentTrackOnLoad = function () {
        getCurrentSong(0);
    }

    function getCurrentSong(type) {
        models.player.load('track').done(function(prop) {

            tempTrack = currTrack;
            currTrack = models.player.track;
            var isPlaying = models.player.playing;

            // put track on the document only if it is not null
            if(prop.track !=null) {
                jQuery('#nowplaying_title').html(prop.track.name);
                jQuery('#nowplaying_artist').html(prop.track.artists[0].name);

                // Notify server on song changed
                switch(type) {

                    // change track
                    case 0:
                        notifyTrackChange(tempTrack, false, 0);
                        notifyTrackChange(currTrack, isPlaying, 0);
                        break;

                    // change playing
                    case 1:
                        notifyTrackChange(currTrack, isPlaying, 0);
                        break;
                }
            }
        } );


    }

    function notifyTrackChange(currTrackID, isPlaying, user_id) {
        $.post(apiBaseUrl + "spotify/" + user_id, { "current_track_id": currTrackID.toString(), "is_playing": isPlaying }, function(data) {
            var globalMeditation = data.global.meditation;
            var globalEngagement = data.global.engagement;
            var globalHappiness = data.global.happiness;
            var globalExcitement = data.global.excitement;

            var userMeditation = data.user.meditation;
            var userEngagement = data.user.engagement;
            var userHappiness = data.user.happiness;
            var userExcitement = data.user.excitement;


            // Update interface with given data about current song
            $('#userEnergy').html(userExcitement.toFixed(1).toString());
            $('#worldEnergy').html(globalExcitement.toFixed(1).toString());

            $('#userHappiness').html(userHappiness.toFixed(1).toString());
            $('#worldHappiness').html(globalHappiness.toFixed(1).toString());

            $('#userFocus').html(userEngagement.toFixed(1).toString());
            $('#worldFocus').html(globalEngagement.toFixed(1).toString());

            $('#userCalmness').html(userMeditation.toFixed(1).toString());
            $('#worldCalmness').html(globalMeditation.toFixed(1).toString());



        }, 'json');
    }

    exports.doGetCurrentTrackOnChangeEvent = doGetCurrentTrackOnChangeEvent;
    exports.doGetCurrentTrackOnLoad = doGetCurrentTrackOnLoad;


});
