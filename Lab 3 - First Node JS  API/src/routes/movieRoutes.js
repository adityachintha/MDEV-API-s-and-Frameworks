// File Name - movieRoutes.js
// Student Name - Aditya Chintha
// Student ID - 200595829
// Data - 7th October 2024

//Import
const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");

//Route to Import Movies
router.post("/import", movieController.importMovies);

//Route to get all movies
router.get("/", movieController.getMovies);

//Route to create a new movie
router.post("/create", movieController.createMovies);

//Route to find a movie by ID
router.get("/:id", movieController.getMovieById);

//Route to update the movie
router.put("/update/:id", movieController.updateMovie);

//Route to delte the movie
router.delete("/delete/:id", movieController.deleteMovie);

//export
module.exports = router;
