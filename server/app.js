const express = require('express');
const artistsRouter = require("./routes/artists");
const albumsRouter = require("./routes/albums");
const songsRouter = require("./routes/songs");
require("dotenv").config();

const app = express();

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});
app.use(express.json());

app.use("/artists", artistsRouter);

app.use("/albums", albumsRouter);

app.use("/songs", songsRouter);

app.use((req, res, next) => {   //Up to this point, if a response hasn't been sent ...
  const error = new Error("Could not find specified resource. Please check the url");
  error.statusCode = 404;
  next(error);
});

app.use((err, req, res, next) => { //Error handling middleware for all possible errors
  const error = {
    message: err.message || "There was a problem with the server",
    statusCode: err.statusCode || 500
  };
  if (process.env.NODE_ENV !== "production") {
    error.stackTrace = err.stack;
  };

  res.status(err.statusCode || 500).json(error);
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log('Server is listening on port', port));
