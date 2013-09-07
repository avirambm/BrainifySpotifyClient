require([
  '$api/models',
   'scripts/player-model'
], function(models, playerModel) {
  'use strict';

   playerModel.doGetCurrentTrackOnLoad();
   playerModel.doGetCurrentTrackOnChangeEvent();
});
