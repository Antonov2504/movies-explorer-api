const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes');
const { limiter } = require('./middlewares/limiter');
const { centralizedErrorHandler } = require('./middlewares/centralizedErrorHandler');
const { PORT, MONGO_DB } = require('./utils/constants');
const CorsError = require('./errors/cors-error');

const whitelist = [
  'http://localhost:3000',
  'http://antonov.movies-explorer.nomoredomains.club',
  'https://antonov.movies-explorer.nomoredomains.club',
];
const corsOptions = {
  origin(origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new CorsError('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
  credentials: true,
};

const app = express();

mongoose.connect(MONGO_DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.enable('trust proxy');
app.use(cors(corsOptions));
app.use(helmet());
app.use(limiter);
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
