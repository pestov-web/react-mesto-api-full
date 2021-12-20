const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const UnauthorizedError = require('../errors/UnauthorizedError');

// получаем все карточки
module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

// удаляем карточку по ид
module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params._id)
    .orFail(new NotFoundError('Карточки с таким id не существует'))
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        throw new UnauthorizedError('Недостаточно прав для удаления карточки');
      }
      Card.findByIdAndRemove(req.params._id)
        .orFail(new NotFoundError('Карточки с таким id не существует'))
        .then((deletedCard) => res.send({ data: deletedCard }))
        .catch(next);
    })
    .catch(next);
};

// Создаем новую карточку
module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      }
      next(err);
    });
};

// ставим лайк
module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params._id,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail(new NotFoundError('id не существует'))
    .then((card) => res.send(card))
    .catch(next);
};

// удаляем лайк
module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params._id,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .orFail(new NotFoundError('id не существует'))
    .then((card) => res.send(card))
    .catch(next);
};
