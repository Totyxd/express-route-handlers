const {
    getSongsByAlbumId,
    getSongBySongId,
    addSongByAlbumId,
    editSongBySongId,
    deleteSongBySongId,
    getSongsByArtistId
} = require('../data');
const express = require("express");
const router = express.Router({mergeParams: true});

//-------------------***Nested song resources***---------------------

router.get("/songs", (req, res, next) => {
    if (req.params.albumId) {
        res.json(getSongsByAlbumId(req.params.albumId));
    } else if (req.params.artistId) {
        res.json(getSongsByArtistId(req.params.artistId));
    } else {
        const error = new Error("Cannot get songs if not for an album or an artist");
        error.statusCode = 404;
        next(error);
    };
});

router.post("/songs", (req, res) => {
    res.status(201).json(addSongByAlbumId(req.params.albumId, req.body));
});

//-------------------***Direct song resources***---------------------

router.get("/:songId", (req, res) => {
    res.json(getSongBySongId(req.params.songId));
});

router.patch("/:songId", (req, res) => {
    res.json(editSongBySongId(req.params.songId, req.body));
});

router.delete("/:songId", (req, res) => {
    deleteSongBySongId(req.params.songId);
    res.json({message: "Succesfully deleted"});
});

module.exports = router;
