$ ( () => {
    init();
});

var pageLength = 25;
var currAddress = 1200;

function init() {

    
    $.ajax(
        "/load",
        {
            type: "GET",
            dataType: "json",
            success: function (songs) {
                loadSongs(songs);
                loadArtists(songs);
                console.log(songs);
            },
            error: function() {console.log("error!");
            }
        }
    );

  


    

}

function loadArtists(songs) {

}

function loadSongs(songs) {
    $("#song-table-body").empty();



    songs.slice(currAddress,currAddress+pageLength).forEach((song) => {

        $("#song-table-body").append(`<tr><td>${song.artist}</td><td><em>${song.title}</em></td></tr>`);
    });
}