const movieRouter = require('express').Router();
const {
  getMovies,
  createMovie,
  deleteMovieById,
} = require('../controllers/movies');

const {
  validateMovie,
  validateMovieId,
} = require('../utils/validation');

movieRouter.get('/', getMovies);
movieRouter.post('/', validateMovie, createMovie);
movieRouter.delete('/:movieId', validateMovieId, deleteMovieById);

module.exports = movieRouter;
