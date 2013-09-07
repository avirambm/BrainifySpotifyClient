require([
    '$api/models',
], function(models) {
    'use strict';

  var doGetCurrentTrackOnChangeEvent = function () {
        getCurrentSong();
  }

   var doGetCurrentTrackOnLoad = function () {
               getCurrentSong();
   }

    function getCurrentSong() {
        models.player.load('track').done(function(prop) {
            jQuery('#nowplaying_title').html(prop.track.name);
            jQuery('#nowplaying_artist').html(prop.track.artists[0].name);
        } );
    }

    exports.doGetCurrentTrackOnChangeEvent = doGetCurrentTrackOnChangeEvent;
    exports.doGetCurrentTrackOnLoad = doGetCurrentTrackOnLoad;


});
