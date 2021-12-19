const users = require('express').Router();
const { validateAvatarUpdate, validateUserUpdate, validateId } = require('../middlewares/validate');

const {
  getUsers,
  getCurrentUser,
  getUserById,
  updateUser,
  updateUserAvatar,
} = require('../controllers/users');

users.get('/', getUsers);
users.get('/me', getCurrentUser);
users.get('/:_id', validateId, getUserById);
users.patch('/me', validateUserUpdate, updateUser);
users.patch('/me/avatar', validateAvatarUpdate, updateUserAvatar);

module.exports = users;
