require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const error = require('./middlewares/error');

const { login, createUser, logout } = require('./controllers/users');

const { validateUser, validateLogin } = require('./middlewares/validate');
const NotFoundError = require('./errors/NotFoundError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

// авторизация
const auth = require('./middlewares/auth');

const { PORT = 3001 } = process.env;
const app = express();

app.use('*', cors({
  origin: 'https://mesto.pestov-web.ru',
  credentials: true,
}));

app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(requestLogger);

app.post('/signin', validateLogin, login);
app.post('/signup', validateUser, createUser);
app.post('/signout', logout);
// используем авторизацию для роутов которые ниже
app.use(auth);

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use((req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

app.use(errorLogger);

// ошибки целебрейта
app.use(errors());

// собственный обработчик ошибок
app.use(error);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Сервер запущен на порту: ${PORT}`);
});
