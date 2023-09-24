import express from "express";

var router = express.Router();

import get_movies from "../controllers/movies/get_movies.js";
import get_movie from "../controllers/movies/get_movie.js";

/* GET users listing. */
router.get('/', get_movies);
router.get('/:movieId', get_movie);

export default router;
