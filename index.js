const express = require("express");
const axios = require("axios");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 8080;
const Db = require("./database");
const { fillZeros, parse } = require("./utils");
app.use(express.static(path.join(__dirname, "public")));

app.get("/api", async (req, res) => {
  res.send({ message: "Hello" });
});

app.get("/comic", async (req, res) => {
  let url = "https://xkcd.com/info.0.json";
  let { data: comic } = await axios.get(url);
  let comicSaved = Db.saveComic(comic);
  res.send(parse(comicSaved));
});

app.get("/comic/:comicId", async (req, res) => {
  let { comicId } = req.params;
  let comicSaved = Db.getComic(parseInt(comicId));
  if (!comicSaved) {
    let url = `https://xkcd.com/${comicId}/info.0.json`;
    let { data: comic } = await axios.get(url);
    comicSaved = Db.saveComic(comic);
  }
  res.send(parse(comicSaved));
});

app.get("/random", async (req, res) => {
  let last = Db.getLast();
  let random = parseInt(Math.random() * (last - 1) + 1);
  let comicSaved = Db.getComic(random);
  if (!comicSaved) {
    let url = `https://xkcd.com/${random}/info.0.json`;
    let { data: comic } = await axios.get(url);
    comicSaved = Db.saveComic(comic);
  }
  res.send(parse(comicSaved));
});

app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => console.log("server is running on " + PORT));
