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

    }

    exports.doGetCurrentTrackOnChangeEvent = doGetCurrentTrackOnChangeEvent;
    exports.doGetCurrentTrackOnLoad = doGetCurrentTrackOnLoad;


});
