const { celebrate, Joi, CelebrateError } = require('celebrate');
// const ValidationError require('../errors/ValidationError')
const isURL = require('validator/lib/isURL');

// проверяем ссылку на валидность
const validateUrl = (url) => {
  if (!isURL(url)) {
    throw new CelebrateError('не верно введен url');
  }
  return url;
};

// проверяем данные пользователя
const validateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

// проверяем ид
const validateId = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().alphanum().length(24).hex(),
  }),
});

// проверяем данные при обновлении информации пользователя
const validateUserUpdate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

// проверяем ссылку при обновлении аватара
const validateAvatarUpdate = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().custom(validateUrl).required(),
  }),
});

// проверяем данные при входе пользователя
const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

// проверяем данные при создании карточки
const validateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().custom(validateUrl).required(),
  }),
});

module.exports = {
  validateUser,
  validateId,
  validateUserUpdate,
  validateAvatarUpdate,
  validateLogin,
  validateCard,
};
