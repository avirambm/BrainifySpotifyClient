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
            var globalMeditation = data.global.meditation * 10;
            var globalEngagement = data.global.engagement * 10;
            var globalHappiness = data.global.happiness * 10;
            var globalExcitement = data.global.excitement * 10;

            var userMeditation = data.user.meditation * 10;
            var userEngagement = data.user.engagement * 10;
            var userHappiness = data.user.happiness * 10;
            var userExcitement = data.user.excitement * 10;


            // Update interface with given data about current song
            $('#userEnergy').html(userExcitement.toFixed(1).toString());
            $('#worldEnergy').html(globalExcitement.toFixed(1).toString());
            $('#userEnergy').removeClass('won').removeClass('lost');
            $('#worldEnergy').removeClass('won').removeClass('lost');
            if (userExcitement > globalExcitement) {
                $('#userEnergy').addClass('won');
                $('#worldEnergy').addClass('lost');
            }
            else if (userExcitement < globalExcitement) {
                $('#userEnergy').addClass('lost');
                $('#worldEnergy').addClass('won');
            }
            else {
                $('#userEnergy').addClass('won');
                $('#worldEnergy').addClass('won');
            }

            $('#userHappiness').html(userHappiness.toFixed(1).toString());
            $('#worldHappiness').html(globalHappiness.toFixed(1).toString());
            $('#userHappiness').removeClass('won').removeClass('lost');
            $('#worldHappiness').removeClass('won').removeClass('lost');
            if (userHappiness > globalHappiness) {
                $('#userHappiness').addClass('won');
                $('#worldHappiness').addClass('lost');
            }
            else if (userHappiness < globalHappiness) {
                $('#userHappiness').addClass('lost');
                $('#worldHappiness').addClass('won');
            }
            else {
                $('#userHappiness').addClass('won');
                $('#worldHappiness').addClass('won');
            }

            $('#userFocus').html(userEngagement.toFixed(1).toString());
            $('#worldFocus').html(globalEngagement.toFixed(1).toString());
            $('#userFocus').removeClass('won').removeClass('lost');
            $('#worldFocus').removeClass('won').removeClass('lost');
            if (userEngagement > globalEngagement) {
                $('#userFocus').addClass('won');
                $('#worldFocus').addClass('lost');
            }
            else if (userEngagement < globalEngagement) {
                $('#userFocus').addClass('lost');
                $('#worldFocus').addClass('won');
            }
            else {
                $('#userFocus').addClass('won');
                $('#worldFocus').addClass('won');
            }

            $('#userCalmness').html(userMeditation.toFixed(1).toString());
            $('#worldCalmness').html(globalMeditation.toFixed(1).toString());
            $('#userCalmness').removeClass('won').removeClass('lost');
            $('#worldCalmness').removeClass('won').removeClass('lost');
            if (userMeditation > globalMeditation) {
                $('#userCalmness').addClass('won');
                $('#worldCalmness').addClass('lost');
            }
            else if (userMeditation < globalMeditation) {
                $('#userCalmness').addClass('lost');
                $('#worldCalmness').addClass('won');
            }
            else {
                $('#userCalmness').addClass('won');
                $('#worldCalmness').addClass('won');
            }
        }, 'json');
    }

    fun

    exports.doGetCurrentTrackOnChangeEvent = doGetCurrentTrackOnChangeEvent;
    exports.doGetCurrentTrackOnLoad = doGetCurrentTrackOnLoad;


});
