require([
  '$api/models',
  'scripts/cover-example',
  'scripts/button-example',
  'scripts/playlist-example'
], function(models, coverExample, buttonExample, playlistExample) {
  'use strict';

  coverExample.doCoverForAlbum();
  buttonExample.doShareButtonForArtist();
  buttonExample.doPlayButtonForAlbum();
  playlistExample.doPlaylistForAlbum();

});
