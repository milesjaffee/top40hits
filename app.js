// Miles Jaffee, mej327

const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(
  path.resolve(__dirname, "public")
));

app.listen(3000, () => console.log("Starting up Top 40 Search"));

const db = require('better-sqlite3')('top40.db');
db.pragma('journal_mode = WAL');

const ALLSONGS = db.prepare("SELECT * FROM songlist");

app.get("/load", (req, res) => {

  returnFullSongs(req, res);

});

app.get("/search", (req, res) => {



  returnSongs(req, res);
});

function returnFullSongs(req, res) {

  allList = [];

  for (let song of ALLSONGS.iterate()) {
    song.title = song.title.replace(/\*/g, "'");
    allList.push(song);
  }

  const ret = JSON.stringify(allList);
  res.end(ret);


}

function returnSongs(req, res) {

  

  let reqList = [];
  let reqstring = "SELECT * FROM songlist WHERE ";
  if (req.query.artist) {
    reqstring += `artist = '${req.query.artist}' AND `;
  } else reqstring += "TRUE AND ";

  if (req.query.title) {
    reqstring += `title LIKE '%${req.query.title}%'`;
  } else reqstring += "TRUE";

  console.log(reqstring);
  let reqsongs = db.prepare(reqstring);

  for (let song of reqsongs.iterate()) {
    song.title = song.title.replace(/\*/g, "'");
    reqList.push(song);
  }

  
  const ret = JSON.stringify(reqList);
  res.end(ret);
}

