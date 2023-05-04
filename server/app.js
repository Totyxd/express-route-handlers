const {
  getAllArtists,
  getLatestArtist,
  getArtistByArtistId,
  addArtist,
  editArtistByArtistId,
  deleteArtistByArtistId,
  getAlbumsForLatestArtist,
  getAlbumsByArtistId,
  getAlbumByAlbumId,
  addAlbumByArtistId,
  editAlbumByAlbumId,
  deleteAlbumByAlbumId,
  getFilteredAlbums,
  getSongsByArtistId,
  getSongsByAlbumId,
  getSongBySongId,
  addSongByAlbumId,
  editSongBySongId,
  deleteSongBySongId
} = require('./data');

const express = require('express');
const app = express();

app.use(express.json());

app.get("/artists/:artistId", (req, res) => {
  res.json(getArtistByArtistId(req.params.artistId));
});

app.patch("/artists/:artistId", (req, res) => {
  res.json(editArtistByArtistId(req.params.artistId, req.body));
});

app.delete("/artists/:artistId", (req, res) => {        //Try catch only set for example of how could wrong ids be handled, tohugh this practice does not consider that.
  try {
    deleteArtistByArtistId(req.params.artistId);
    res.json({message: "Succesfully deleted"});
  } catch (e) {
    res.status(404).send("Could not find artist with id" + req.params.artistId);
  };
});

app.get("/artists/:artistId/albums", (req, res) => {
  res.json(getAlbumsByArtistId(req.params.artistId));
});

app.get("/albums/:albumId", (req, res) => {
  res.json(getAlbumByAlbumId(req.params.albumId));
});

app.post("/artists/:artistId/albums", (req, res) => {
  res.status(201).json(addAlbumByArtistId(req.params.artistId, req.body));
});

app.patch("/albums/:albumId", (req, res) => {
  res.json(editAlbumByAlbumId(req.params.albumId, req.body));
})

app.delete("/albums/:albumId", (req, res) => {
  deleteAlbumByAlbumId(req.params.albumId);
  res.json({message: "Succesfully deleted"});
});

app.get("/albums", (req, res) => {
  if (req.query.startsWith) {
    res.json(getFilteredAlbums(req.query.startsWith))
  } else {
    res.status(400).send("Error. Make sure you are introducing query params.");
  };
});

app.get("/artists/:artistId/songs", (req, res) => {
  res.json(getSongsByArtistId(req.params.artistId));
});

app.get("/albums/:albumId/songs", (req, res) => {
  res.json(getSongsByAlbumId(req.params.albumId));
});

app.get("/songs/:songId", (req, res) => {
  res.json(getSongBySongId(req.params.songId));
});

app.post("/albums/:albumId/songs", (req, res) => {
  res.status(201).json(addSongByAlbumId(req.params.albumId, req.body));
});

app.patch("/songs/:songId", (req, res) => {
  res.json(editSongBySongId(req.params.songId, req.body));
});

app.delete("/songs/:songId", (req, res) => {
  deleteSongBySongId(req.params.songId);
  res.json({message: "Succesfully deleted"});
});

if (require.main === module) {
  const port = 5000;
  app.listen(port, () => console.log('Server is listening on port', port));
} else {
  module.exports = app;
}
