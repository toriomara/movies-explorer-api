const Movie = require('../models/movie');
const {
  BadRequestError, NotFoundError, ForbiddenError,
} = require('../errors');
const { MESSAGES, STATUS_CODES } = require('../utils/constants');

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const owner = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner,
  })
    .then((movie) => res.status(STATUS_CODES.CREATED).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(`${MESSAGES.BAD_REQUEST} при создании карточки фильма`));
      }
      return next(err);
    });
};

const deleteMovieById = (req, res, next) => {
  const { movieId } = req.params;
  Movie.findById(movieId)
    .orFail(new NotFoundError(MESSAGES.NOT_FOUND))
    .then((movie) => {
      if (!movie.owner.equals(req.user._id)) {
        return next(new ForbiddenError(MESSAGES.FORBIDDEN));
      }
      return movie
        .deleteOne({ _id: movie._id })
        .then(() => res.send({ message: 'Карточка фильма удалена' }));
    })
    .catch(next);
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovieById,
};
