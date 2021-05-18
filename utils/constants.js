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

module.exports = {
  NODE_ENV,
  PORT,
  MONGO_DB,
  JWT_SECRET,
  urlRegex,
  nameRuRegex,
  nameEnRegex,
};
