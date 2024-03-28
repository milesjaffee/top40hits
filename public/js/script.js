$ ( () => {
    init();
});

var pageLength = 25;
var currAddress = 0;
var songList;

function init() {

    
    $.ajax(
        "/load",
        {
            type: "GET",
            dataType: "json",
            success: function (songs) {
                songList = songs[1];
                loadSongs(songs[1]);
                loadArtists(songs[0]); //default, pre filled list
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
        if (!song.artist.in(artists)) {
            artists.add(song.artist);
        }
    });

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
        console.log(currAddress);
        };
    }
);

$("#nextButton").click((event) =>
{
    event.preventDefault();
    if (currAddress + pageLength < songList.length) 
    {currAddress = currAddress + pageLength;
        console.log(currAddress);
        console.log(songList.length);
    loadSongs(songList);

    
    };
}
);

function loadSongs(songs) {
    $("#song-table-body").empty();
    let numSongsDisplayed = 0;

    songs.slice(currAddress,currAddress+pageLength).forEach((song) => {

        $("#song-table-body").append(`<tr><td>${song.artist}</td><td><em>${song.title}</em></td></tr>`);
        numSongsDisplayed ++;
    });

    $("#showing-songs").empty();
    $("#showing-songs").append(`Showing ${currAddress+1}-${currAddress+numSongsDisplayed} of ${songs.length} songs...`)
}

