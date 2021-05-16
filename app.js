require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes');
// const { limiter } = require('./middlewares/limiter');
const { centralizedErrorHandler } = require('./middlewares/centralizedErrorHandler');

const { PORT = 3000, MONGO_DB = 'mongodb://localhost:27017/bitfilmsdb' } = process.env;

const app = express();

mongoose.connect(MONGO_DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.enable('trust proxy');
app.use(helmet());
// app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(centralizedErrorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
