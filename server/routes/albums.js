const {
    getAlbumsByArtistId,
    addAlbumByArtistId,
    getAlbumByAlbumId,
    editAlbumByAlbumId,
    deleteAlbumByAlbumId,
    getFilteredAlbums,
} = require("../data");
const express = require("express");
const nestedSongs = require("./songs");

const router = express.Router({mergeParams: true});

//----------------** Nested albums resources **-------------------------

router.get("/albums", (req, res) => {
    res.json(getAlbumsByArtistId(req.params.artistId));
});

router.post("/albums", (req, res) => {
    res.status(201).json(addAlbumByArtistId(req.params.artistId, req.body));
});


//----------------** Direct resources **-------------------------

router.get("/:albumId", (req, res) => {
    res.json(getAlbumByAlbumId(req.params.albumId));
});

router.patch("/:albumId", (req, res) => {
    res.json(editAlbumByAlbumId(req.params.albumId, req.body));
});

router.delete("/:albumId", (req, res) => {
    deleteAlbumByAlbumId(req.params.albumId);
    res.json({message: "Succesfully deleted"});
});

router.get("/", (req, res, next) => {
    if (req.query.startsWith) {
      res.json(getFilteredAlbums(req.query.startsWith))
    } else {
      const error = new Error("Make sure you are introducing the query parameters.");
      error.statusCode = 400;
      next(error);
    };
});

router.use("/:albumId", nestedSongs);

module.exports = router;
