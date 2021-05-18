const Movie = require('../models/movie');
const errorHandler = require('../errors/error-handler');
const ForbiddenError = require('../errors/forbidden-error');

module.exports.getMovies = (req, res, next) => Movie.find({ owner: req.user._id })
  .orFail()
  .then((movies) => res.send({ data: movies }))
  .catch((err) => {
    errorHandler(err, next, {
      CastErrorMessage: 'Переданы некорректные данные',
      DocumentNotFoundErrorMessage: 'Фильмы не найдены',
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
    .then((movie) => res.send({ data: movie }))
    .catch((err) => {
      errorHandler(err, next, {
        CastErrorMessage: 'Переданы некорректные данные',
        ValidationErrorMessage: 'Ошибка валидации данных',
      });
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  Movie.findById(movieId)
    .orFail()
    .then((movie) => {
      if (movie.owner.equals(req.user._id)) {
        return Movie.findByIdAndRemove(movieId)
          .orFail()
          .then(res.send({ message: 'Фильм удален' }))
          .catch((err) => {
            errorHandler(err, next, {
              CastErrorMessage: 'Переданы некорректные данные',
              DocumentNotFoundErrorMessage: 'Фильм с указанным id не найден',
            });
          });
      }
      throw new ForbiddenError('Доступ запрещен. Возможно удаление только своего фильма');
    })
    .catch((err) => {
      errorHandler(err, next, {
        CastErrorMessage: 'Переданы некорректные данные',
        DocumentNotFoundErrorMessage: 'Фильм с указанным id не найден',
      });
    });
};
