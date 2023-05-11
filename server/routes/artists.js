const {
    getAllArtists,
    getLatestArtist,
    getArtistByArtistId,
    addArtist,
    editArtistByArtistId,
    deleteArtistByArtistId,
} = require("../data");
const express = require("express");
const nestedAlbums = require("./albums");
const nestedSongs = require("./songs");

const router = express.Router();

router.get("/", (req, res) => {
    res.json(getAllArtists());
});

router.post("/", (req, res) => {
    res.status(201).json(addArtist(req.body));
});

router.get("/latest", (req, res) => {
    res.json(getLatestArtist());
});

router.get("/:artistId", (req, res) => {
    res.json(getArtistByArtistId(req.params.artistId));
});

router.patch("/:artistId", (req, res) => {
    res.json(editArtistByArtistId(req.params.artistId, req.body));
});

router.delete("/:artistId", (req, res, next) => {        //Only set for example of how could wrong ids be handled, though this practice does not consider that.
    try {
      deleteArtistByArtistId(req.params.artistId);
      res.json({message: "Succesfully deleted"});
    } catch (e) {
      const error = new Error("Couldn't find artist with that ID. Try again.");
      error.statusCode = 404;
      next(error);
    };
});

router.use("/:artistId", nestedAlbums);

router.use("/:artistId", nestedSongs);

module.exports = router;
