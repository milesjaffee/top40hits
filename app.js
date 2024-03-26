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

const songs = db.prepare("SELECT * FROM songlist");

function returnSongs(res) {
  let returningList = [];
  for (let song of songs.iterate()) {
    returningList.push(song);
  }
  const ret = JSON.stringify(returningList);
  res.end(ret);
}

app.get("/load", (req, res) => {
  returnSongs(res);

  const artist = req.query.artist;
  const title = req.query.title;
});

