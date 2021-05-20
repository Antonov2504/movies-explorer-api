require('dotenv').config();

const urlRegex = /(https?:\/\/(([\w-]+\.)+)+([\w])+((\/[a-z_0-9\-:~\\.%\\/?#[\]@!$&'\\(\\)*+,;=]+)+)?)/i;
const nameRuRegex = /[А-Яа-я\sё:%.,_+~#=0-9]+/i;
const nameEnRegex = /^[\w\s:%.,_+~#=]+/i;
const {
  NODE_ENV = 'dev',
  PORT = 3000,
  MONGO_DB = 'mongodb://localhost:27017/bitfilmsdb',
  JWT_SECRET = 'dev-secret',
} = process.env;

const messages = {
  authErrorMessage: 'Необходима авторизация',
  castErrorMessage: 'Переданы некорректные данные',
  deleteMovieMessage: 'Фильм удален',
  deleteMovieErrorMessage: 'Доступ запрещен. Возможно удаление только своего фильма',
  emptyMoviesMessage: 'Здесь будут представлены Ваши фильмы',
  emptySignupMessage: 'Необходимо заполнить поля Имя, Почта и Пароль',
  loginErrorMessage: 'Неправильные почта или пароль',
  mongoDuplicateEmailErrorMessage: 'Пользователь с таким Email уже зарегистрирован',
  movieNotFoundErrorMessage: 'Фильм с указанным id не найден',
  routerNotFoundErrorMessage: 'Запрашиваемый ресурс не найден',
  userNotFoundErrorMessage: 'Пользователь с указанным id не найден',
  validationEmailErrorMessage: 'Некорректный email',
  validationErrorMessage: 'Ошибка валидации данных',
};

module.exports = {
  NODE_ENV,
  PORT,
  MONGO_DB,
  JWT_SECRET,
  urlRegex,
  nameRuRegex,
  nameEnRegex,
  messages,
};
