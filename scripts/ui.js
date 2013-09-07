$(document).ready(function() {

    setTimeout(function() {
        $('#loading_playlists').css('display','none');
        $("#playlists").fadeIn("slow");
        $("#toggle_holder").fadeIn("slow");
        onResize();
    }, 1500);

    var currentPlaylist = null;

    $(window).resize(function() {
        onResize();
    });

    $('#firstPlaylistContainer').dblclick(function() {

        currentPlaylist =  "firstPlaylistContainer";

        var playlistContainers = ['#secondPlaylistContainer', '#thirdPlaylistContainer','#fourthPlaylistContainer'];
        var Covers = ['#secondAlbumCoverContainer', '#thirdAlbumCoverContainer', '#fourthAlbumCoverContainer'];
        var fadeInElements = ['#firstPlaylistContainer', '#firstAlbumCoverContainer'];

        fadeElements(fadeInElements, playlistContainers,Covers);

    });

    $('#secondPlaylistContainer').dblclick(function() {

        currentPlaylist =  "secondPlaylistContainer";

        var playlistContainers = ['#firstPlaylistContainer', '#thirdPlaylistContainer','#fourthPlaylistContainer'];
        var Covers = ['#firstAlbumCoverContainer', '#thirdAlbumCoverContainer', '#fourthAlbumCoverContainer'];
        var fadeInElements = ['#secondPlaylistContainer', '#secondAlbumCoverContainer'];

        fadeElements(fadeInElements, playlistContainers,Covers);

    });

    $('#firstPlaylistContainer, #secondPlaylistContainer, #thirdPlaylistContainer, #fourthPlaylistContainer').click(function() {

        var thisID = $(this).attr("id");
        if($(this).css('opacity') < 1) {
            $(this).fadeTo(1000,1);
            //$(secondAlbumCoverContainer).fadeTo(1000,1);
            console.log('TES');
        }

        $('.span5').each(function() {
            if((thisID != $(this).attr("ID")) && ($(this).attr("ID")!= currentPlaylist)) {
                $(this).fadeTo(1000,0.2);
            }
        });


    });

    $('#thirdPlaylistContainer').dblclick(function() {

        currentPlaylist =  "thirdPlaylistContainer";

        var playlistContainers = ['#firstPlaylistContainer', '#secondPlaylistContainer','#fourthPlaylistContainer'];
        var Covers = ['#firstAlbumCoverContainer', '#secondAlbumCoverContainer', '#fourthAlbumCoverContainer'];
        var fadeInElements = ['#thirdPlaylistContainer', '#thirdAlbumCoverContainer'];

        fadeElements(fadeInElements, playlistContainers,Covers);

    });

    $('#fourthPlaylistContainer').dblclick(function() {

        currentPlaylist =  "fourthPlaylistContainer";

        var playlistContainers = ['#firstPlaylistContainer', '#thirdPlaylistContainer','#secondPlaylistContainer'];
        var Covers = ['#firstAlbumCoverContainer', '#thirdAlbumCoverContainer', '#secondAlbumCoverContainer'];
        var fadeInElements = ['#fourthPlaylistContainer', '#fourthAlbumCoverContainer'];

        fadeElements(fadeInElements, playlistContainers,Covers);

    });




}); // end ready

function onResize() {
    var currWidth = $(document).width();

    // First row
    $('#firstPlaylistContainer').css('width',currWidth/3);
    $('#secondPlaylistContainer').css('width',currWidth/3);

    // Second row
    $('#thirdPlaylistContainer').css('width',currWidth/3);
    $('#fourthPlaylistContainer').css('width',currWidth/3);

    // Covers
    $('.sp-image-loaded').css({'width':currWidth/16,'height':currWidth/16});

    // Headers
    $('#happy').css({'width':currWidth/2,'float':'left', 'margin-bottom':'-50px'});
    $('#relaxed').css({'relaxed':currWidth/2,'float':'left', 'margin-bottom':'-50px'});

    var offset = $("#secondAlbumCoverContainer").offset();

    // Set position for the left headers
    $("#focused").offset({left: offset.left});
    $("#excited").offset({left: offset.left});

    // Set body height to screen height to fill all background
    $("body").css('height', $(document).height() + "px");

    // Set width 100% to the canvas
    $("#livegraph_vigilance").css('width', $("#graph_container").css('width'));
    $("#livegraph_happiness").css('width', $("#graph_container").css('width'));
    $("#livegraph_focus").css('width', $("#graph_container").css('width'));
    $("#livegraph_calmness").css('width', $("#graph_container").css('width'));
}


function fadeElements(currentPlaylist,PlaylistContainers, Covers) {

    // fade in current playlist
    $(currentPlaylist[0]).fadeTo(1000,1);
    $(currentPlaylist[1]).fadeTo(1000,1);

    // fade out playlist containers
    for(var i = 0; i<3; i++) {
        $(PlaylistContainers[i]).fadeTo(1000,0.2);
        $(Covers[i]).fadeTo(1000,0.2);
    }
}