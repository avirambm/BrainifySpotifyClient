$(document).ready(function() {
    onResize();
    $(window).resize(function() {
        onResize();
    });
});

function onResize() {

    // Set body height to screen height to fill all background
    $("body").css('height', $(document).height() + "px");

    // Set width 100% to the canvas
    $("#livegraph_vigilance").css('width', $("#graph_container").css('width'));
    $("#livegraph_happiness").css('width', $("#graph_container").css('width'));
    $("#livegraph_focus").css('width', $("#graph_container").css('width'));
    $("#livegraph_calmness").css('width', $("#graph_container").css('width'));
}