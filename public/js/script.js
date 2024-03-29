$ ( () => {
    init();
});

var pageLength;
var currAddress;
var songList;

function init() {

    $.ajax(
        "/load",
        {
            type: "GET",
            dataType: "json",
            success: function (songs) {
                pageLength = 25;
                currAddress = 0;
                loadArtists(songs); //default, pre filled list
                loadSongs(songs);
                
            },
            error: function() {console.log("error!");
            }
        }
    );

}

function loadArtists(songs) {
    $("#artistsDropdown").empty();
    artists = [];
    songs.forEach((song) => {
        if (!(artists.includes(song.artist))) {
            artists.push(song.artist);
        }
    });

    $("#artistsDropdown").append(`<option value="" selected>   </option>`);

    artists.forEach((artistItem) => {
        $("#artistsDropdown").append(`<option value="${artistItem}">${artistItem}</option>`);
    });
}

$("#prevButton").click((event) =>
    
    {
        event.preventDefault();
        if (currAddress - pageLength >= 0) 
        {currAddress = currAddress - pageLength;
        loadSongs(songList);
        };
    }
);

$("#nextButton").click((event) =>
{
    event.preventDefault();
    if (currAddress + pageLength < songList.length) 
    {currAddress = currAddress + pageLength;

    loadSongs(songList);

    
    };
}
);

$("#searchButton").click((event) =>
{
    event.preventDefault();

    $.ajax(
        "/search",
        {
            type: "GET",
            processData: true,
            data: {
                title: $("#keywordInput").val(),
                artist: $("#artistsDropdown").val(),
            },
            dataType: "json",

            success: function(songs) {
                pageLength = parseInt($("#songsPerPage").val());
                currAddress = 0;
                loadSongs(songs);
            

            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Error: " + jqXHR.responseText);
                alert("Error: " + textStatus);
                alert("Error: " + errorThrown);
              }
        }
    );
    $("#keywordInput").val("");
    $("#artistsDropdown").val("");

});

function loadSongs(songs) {
    songList = songs;
    $("#song-table-body").empty();
    let numSongsDisplayed = 0;

    songs.slice(currAddress,currAddress+pageLength).forEach((song) => {

        $("#song-table-body").append(`<tr><td>${song.artist}</td><td><em>${song.title}</em></td></tr>`);
        numSongsDisplayed ++;
    });

    $("#showing-songs").empty();
    $("#showing-songs").append(`Showing ${currAddress+1}-${currAddress+numSongsDisplayed} of ${songs.length} songs...`)
}

