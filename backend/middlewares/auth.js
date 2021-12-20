const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const AuthorizationError = require('../errors/AuthorizationError');

module.exports = (req, res, next) => {
  if (!req.cookies.jwt) {
    throw new AuthorizationError('Необходима авторизация');
  }
  const token = req.cookies.jwt;

  let payload;
  try {
    payload = jwt.verify(token, `${NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret'}`);
  } catch (err) {
    throw new AuthorizationError('Необходима авторизация');
  }
  req.user = payload;

  next();
};
