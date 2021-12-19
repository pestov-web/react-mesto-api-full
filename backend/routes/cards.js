const cards = require('express').Router();
const { validateCard, validateId } = require('../middlewares/validate');

const {
  getCards,
  createCard,
  likeCard,
  dislikeCard,
  deleteCard,
} = require('../controllers/cards');

cards.get('/', getCards);
cards.delete('/:_id', validateId, deleteCard);
cards.post('/', validateCard, createCard);
cards.put('/:_id/likes', validateId, likeCard);
cards.delete('/:_id/likes', validateId, dislikeCard);

module.exports = cards;
