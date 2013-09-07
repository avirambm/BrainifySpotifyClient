function generatePlaylistTempId() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 32; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

require([
    '$api/models',
    '$views/list#List',
    '$views/image#Image'
], function(models, List, Image) {
    'use strict';

    var generatePlaylistFromTracks = function(playlistContainer, coverContainer, playlistTracks) {

        var playlist_name = generatePlaylistTempId();
        models.Playlist.createTemporary(playlist_name).done(function(playlist) {
            playlist.load('tracks').done(function(loadedPlaylist) {
                var length = playlistTracks.length;
                for (var i = 0; i < length; i++) {
                    loadedPlaylist.tracks.add(models.Track.fromURI(playlistTracks[i]));
                }
            });

            var list = List.forPlaylist(playlist, { style: 'rounded' });
            document.getElementById(playlistContainer).appendChild(list.node);
            list.init();

            for (var i = 0; i < 4; i++) {
                var track = models.Track.fromURI(playlistTracks[i]);
                var image = Image.forTrack(track, { width:75, height:75 });
                document.getElementById(coverContainer + (i+1).toString()).appendChild(image.node);
            }
        });
        models.Playlist.removeTemporary(playlist_name);
    };

    exports.generatePlaylistFromTracks = generatePlaylistFromTracks;
});
