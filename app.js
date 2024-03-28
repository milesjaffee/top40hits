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

  returnSongs(req, res);

});

function returnSongs(req, res) {
  let allList = [];

  for (let song of ALLSONGS.iterate()) {
    allList.push(song);
  }

  let reqList = [];
  let reqstring = "SELECT * FROM songlist WHERE ";
  if (req.query.artist) {
    reqstring += `artist = '${req.query.artist}' & `;
  }
  else reqstring += "TRUE & ";

  if (req.query.title) {
    reqstring += `title LIKE '%${req.query.title}%'`;
  }
  else reqstring += "TRUE";
  let reqsongs = db.prepare(reqstring);

  for (let song of reqsongs.iterate()) {
    reqList.push(song);
  }

  let retList = [allList, reqList];

  
  const ret = JSON.stringify(retList);
  res.end(ret);
}

