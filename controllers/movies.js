const Movie = require('../models/movie');
const errorHandler = require('../errors/error-handler');
const ForbiddenError = require('../errors/forbidden-error');
const { messages } = require('../utils/constants');

const {
  castErrorMessage,
  deleteMovieErrorMessage,
  deleteMovieMessage,
  emptyMoviesMessage,
  movieNotFoundErrorMessage,
  validationErrorMessage,
} = messages;

module.exports.getMovies = (req, res, next) => Movie.find({ owner: req.user._id })
  .then((movies) => {
    if (movies.length) {
      return res.send({ data: movies });
    }
    return res.send({ message: emptyMoviesMessage });
  })
  .catch((err) => {
    errorHandler(err, next, {
      castErrorMessage,
    });
  });

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
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
    trailer,
    thumbnail,
    owner: req.user._id,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => res.status(201).send({
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: movie.image,
      trailer: movie.trailer,
      thumbnail: movie.thumbnail,
      movieId: movie.movieId,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
    }))
    .catch((err) => {
      errorHandler(err, next, {
        castErrorMessage,
        validationErrorMessage,
      });
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  Movie.findById(movieId).select('+owner')
    .orFail()
    .then((movie) => {
      if (movie.owner.equals(req.user._id)) {
        return Movie.findByIdAndRemove(movieId)
          .orFail()
          .then(res.send({ message: deleteMovieMessage }))
          .catch((err) => {
            errorHandler(err, next, {
              castErrorMessage,
              documentNotFoundErrorMessage: movieNotFoundErrorMessage,
            });
          });
      }
      throw new ForbiddenError(deleteMovieErrorMessage);
    })
    .catch((err) => {
      errorHandler(err, next, {
        castErrorMessage,
        documentNotFoundErrorMessage: movieNotFoundErrorMessage,
      });
    });
};
