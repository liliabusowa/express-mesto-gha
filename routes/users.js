const userRoutes = require('express').Router();
const {
  createUser, getUsers, getUserById, updateUser, updateAvatar,
} = require('../controllers/users');

userRoutes.post('/', createUser);
userRoutes.get('/', getUsers);
userRoutes.get('/:userId', getUserById);
userRoutes.patch('/me', updateUser);
userRoutes.patch('/me/avatar', updateAvatar);

module.exports = userRoutes;
