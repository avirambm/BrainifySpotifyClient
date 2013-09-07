require([
    '$api/models',
], function(models) {
    'use strict';

    var doGetCurrentTrackOnChangeEvent = function () {
        models.player.addEventListener('change', function() {
            getCurrentSong();
        });
    }

    var doGetCurrentTrackOnLoad = function () {
        getCurrentSong();
    }

    function getCurrentSong() {
        models.player.load('track').done(function(prop) {

            // put track on the document only if it is not null
            if(prop.track !=null) {
                jQuery('#nowplaying_title').html(prop.track.name);
                jQuery('#nowplaying_artist').html(prop.track.artists[0].name);
            }
        } );
    }

    exports.doGetCurrentTrackOnChangeEvent = doGetCurrentTrackOnChangeEvent;
    exports.doGetCurrentTrackOnLoad = doGetCurrentTrackOnLoad;


});
