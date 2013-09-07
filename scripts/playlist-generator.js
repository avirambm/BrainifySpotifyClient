require([
    '$api/models',
    '$views/list#List',
    '$views/image#Image'
], function(models, List, Image) {
    'use strict';

    var generatePlaylistFromTracks = function(playlistContainer, coverContainer, playlistTracks) {

        var playlist_name = generatePlaylistTempId();
        models.Playlist.createTemporary('tempPlaylist').done(function(playlist) {
            playlist.load('tracks').done(function(loadedPlaylist) {
                var length = playlistTracks.length;
                for (var i = 0; i < length; i++) {
                    loadedPlaylist.tracks.add(models.Track.fromURI(playlistTracks[i]));
                }
            });

            var list = List.forPlaylist(playlist, { style: 'rounded' });
            document.getElementById(playlistContainer).appendChild(list.node);
            list.init();
        });
        models.Playlist.removeTemporary(playlist_name);
    };

    exports.generatePlaylistFromTracks = generatePlaylistFromTracks;
});
