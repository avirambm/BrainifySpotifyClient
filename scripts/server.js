require([
    '$api/models',
    'scripts/playlist-generator'
], function(models, playlistGenerator) {

    $(document).ready(function () {

        /**
         * Get samples since the last request
         * @param user_id user id
         */
        function getDataFromEmotiv(user_id) {
            $.ajaxSetup({ cache: false, error: function() { $("#logo_strength").attr("src","images/logo_bad.png"); } });
            $.getJSON(apiBaseUrl + "emotiv/" + user_id, function(data) {
                var connection_strength = data.connection_strength;
                var should_take_action = data.should_take_action;
                var skip_track = data.skip_track;
                var change_volume = data.change_volume;
                var samples = data.samples;

                if (samples !== undefined) {
                    var numSamples = samples.length;
                    for (var i = 0; i < numSamples; i++) {
                        var sample = samples[i];
                        var time = sample.server_time;
                        var meditation = sample.meditation;
                        var engagement = sample.engagement;
                        var happiness = sample.happiness;
                        var excitement = sample.excitement;

                        // Set graph data
                        dataSet_focus.append(time, engagement);
                        dataSet_happiness.append(time, happiness);
                        dataSet_energy.append(time, excitement);
                        dataSet_calmness.append(time, meditation);
                    }
                }

                // Show connection strength
                if (connection_strength <= 0.5) {
                    $("#logo_strength").attr("src","images/logo_bad.png");
                }
                else if (connection_strength <= 0.7) {
                    $("#logo_strength").attr("src","images/logo_weak.png");
                }
                else if (connection_strength <= 0.8) {
                    $("#logo_strength").attr("src","images/logo_ok.png");
                }
                else {
                    $("#logo_strength").attr("src","images/logo_excellent.png");
                }

                // Check if we should change song
                if(should_take_action) {
                    switch (skip_track) {
                        case -1: //SKIP_PREV_SONG:
                            models.player.skipToPrevTrack();
                            models.player.skipToPrevTrack();
                            break;
                        case 0: //KEEP_CURRENT_SONG:
                            break;
                        case 1: //SKIP_NEXT_SONG:
                            models.player.skipToNextTrack();
                            break;
                    }

                    if(change_volume!=0) {

                        var currentVolume = models.player.volume;
                        var newVolume = change_volume + currentVolume;

                        if(newVolume < 1 && newVolume >0)  {
                            models.player.setVolume(newVolume);
                        } else if (newVolume>1) {
                            models.player.setVolume(1);
                        } else if(newVolume < 0) {
                            models.player.setVolume(0);
                        }
                    }
                }
            });
        }

        /**
         * Get playlist recommendations for a specific user
         * @param user_id user id
         * @param num_songs_per_playlist number of songs per playlist
         */
        function getPlaylistRecommendationsForUser(user_id, num_songs_per_playlist) {
            $.ajaxSetup({ cache: false, error: function() { $("#logo_strength").attr("src","images/logo_bad.png"); } });
            $.getJSON(apiBaseUrl + "spotify/recommendations/" + user_id + "/" + num_songs_per_playlist, function(data) {
                var happiness = data.happiness;
                var engagement = data.engagement;
                var meditation = data.meditation;
                var excitement = data.excitement;

                // Happy
                var happinessIds = new Array();
                var happinessCount = happiness.length;
                for (var i = 0; i < happinessCount; i++) {
                    var track_id = happiness[i].song_id;
                    var rank = happiness[i].rank;
                    var score = happiness[i].score;
                    happinessIds.push(track_id);
                }
                playlistGenerator.generatePlaylistFromTracks('firstPlaylistContainer', 'firstAlbumCoverContainer', happinessIds);

                // Focus
                var engagementIds = new Array();
                var engagementCount = engagement.length;
                for (var i = 0; i < engagementCount; i++) {
                    var track_id = engagement[i].song_id;
                    var rank = engagement[i].rank;
                    var score = engagement[i].score;
                    engagementIds.push(track_id);
                }
                playlistGenerator.generatePlaylistFromTracks('secondPlaylistContainer', 'secondAlbumCoverContainer', engagementIds);

                // Relax
                var meditationIds = new Array();
                var meditationCount = meditation.length;
                for (var i = 0; i < meditationCount; i++) {
                    var track_id = meditation[i].song_id;
                    var rank = meditation[i].rank;
                    var score = meditation[i].score;
                    meditationIds.push(track_id);
                }
                playlistGenerator.generatePlaylistFromTracks('thirdPlaylistContainer', 'thirdAlbumCoverContainer', meditationIds);

                // Wake up
                var wakeIds = new Array();
                var excitementCount = excitement.length;
                for (var i = 0; i < excitementCount; i++) {
                    var track_id = excitement[i].song_id;
                    var rank = excitement[i].rank;
                    var score = excitement[i].score;
                    wakeIds.push(track_id);
                }
                playlistGenerator.generatePlaylistFromTracks('fourthPlaylistContainer', 'fourthAlbumCoverContainer', wakeIds);
        });
    }

        /**
         * Get global playlist recommendations
         * @param num_songs_per_playlist number of songs per playlist
         */
        function getPlaylistRecommendationsGlobal(num_songs_per_playlist) {
            $.ajaxSetup({ cache: false, error: function() { $("#logo_strength").attr("src","images/logo_bad.png"); } });
            $.getJSON(apiBaseUrl + "spotify/recommendations/" + num_songs_per_playlist, function(data) {
                var happiness = data.happiness;
                var engagement = data.engagement;
                var meditation = data.meditation;
                var excitement = data.excitement;

                // Happy
                var happinessIds = new Array();
                var happinessCount = happiness.length;
                for (var i = 0; i < happinessCount; i++) {
                    var track_id = happiness[i].song_id;
                    var rank = happiness[i].rank;
                    var score = happiness[i].score;
                    happinessIds.push(track_id);
                }
                playlistGenerator.generatePlaylistFromTracks('firstPlaylistContainer', 'firstAlbumCoverContainer', happinessIds);

                // Focus
                var engagementIds = new Array();
                var engagementCount = engagement.length;
                for (var i = 0; i < engagementCount; i++) {
                    var track_id = engagement[i].song_id;
                    var rank = engagement[i].rank;
                    var score = engagement[i].score;
                    engagementIds.push(track_id);
                }
                playlistGenerator.generatePlaylistFromTracks('secondPlaylistContainer', 'secondAlbumCoverContainer', engagementIds);

                // Relax
                var meditationIds = new Array();
                var meditationCount = meditation.length;
                for (var i = 0; i < meditationCount; i++) {
                    var track_id = meditation[i].song_id;
                    var rank = meditation[i].rank;
                    var score = meditation[i].score;
                    meditationIds.push(track_id);
                }
                playlistGenerator.generatePlaylistFromTracks('thirdPlaylistContainer', 'thirdAlbumCoverContainer', meditationIds);

                // Wake up
                var wakeIds = new Array();
                var excitementCount = excitement.length;
                for (var i = 0; i < excitementCount; i++) {
                    var track_id = excitement[i].song_id;
                    var rank = excitement[i].rank;
                    var score = excitement[i].score;
                    wakeIds.push(track_id);
                }
                playlistGenerator.generatePlaylistFromTracks('fourthPlaylistContainer', 'fourthAlbumCoverContainer', wakeIds);
            });
        }

        var numOfSongsPerPlaylist = 30;
        getPlaylistRecommendationsForUser(0, numOfSongsPerPlaylist);
        $('.toggle-modern').toggles({
            click: true,
            text: {
                on: 'Me',
                off: 'World'
            },
            on: true,
            animate: 250,
            transition: 'ease-in-out',
            width: 80,
            height: 30
        });
        $('.toggle-modern').on('toggle', function (e, active) {
            $('#playlists').css('display','none');
            $('#loading_playlists').fadeIn("slow");
            if (active) {
                getPlaylistRecommendationsForUser(0, numOfSongsPerPlaylist);

                $("#focused").html("Keep Me Focused");
                $("#happy").html("Make Me Happy");
                $("#relaxed").html("Relax Me");
                $("#excited").html("Wake Me Up");
            } else {
                getPlaylistRecommendationsGlobal(numOfSongsPerPlaylist);

                $("#focused").html("Keep The World Focused");
                $("#happy").html("Make The World Happy");
                $("#relaxed").html("Relax The World ");
                $("#excited").html("Wake The World Up");
            }

            setTimeout(function() {
                $('#loading_playlists').css('display','none');
                $("#playlists").fadeIn("slow");
                $("#toggle_holder").fadeIn("slow");
                onResize();
            }, 1500);
        });

        // Get data from emotiv
        setInterval(function() {
            getDataFromEmotiv(0);
        }, 1000);
    });

});