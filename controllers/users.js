const User = require('../models/user');
const { handleDefaultError, sendData } = require('../utils/utils');
const { DEFAULT, NOTFOUND, VALIDATION } = require('../utils/constants');

exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      sendData({ dataType: 'user' }, 201, user, res);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(VALIDATION).send({ message: 'Переданы некорректные данные' });
      } else { handleDefaultError(err, DEFAULT, 'Произошла ошибка', res); }
    });
};

exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      sendData({ dataType: 'users' }, 200, users, res);
    })
    .catch((err) => handleDefaultError(err, DEFAULT, 'Произошла ошибка', res));
};

exports.getUserById = (req, res) => {
  User.findById(req.params.userId).orFail()
    .then((user) => {
      sendData({ dataType: 'user' }, 200, user, res);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(VALIDATION).send({ message: 'Переданы некорректные данные' });
      } else if (err.name === 'DocumentNotFoundError') {
        res.status(NOTFOUND).send({ message: 'Пользователь или карточка с указанным _id не найдены' });
      } else { handleDefaultError(err, DEFAULT, 'Произошла ошибка', res); }
    });
};

exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  const { _id } = req.user;
  User.findByIdAndUpdate(_id, { name, about }, { new: true, runValidators: true }).orFail()
    .then((user) => sendData({ dataType: 'user' }, 200, user, res))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(VALIDATION).send({ message: 'Переданы некорректные данные' });
      } else if (err.name === 'ValidationError') {
        res.status(VALIDATION).send({ message: 'Переданы некорректные данные' });
      } else if (err.name === 'DocumentNotFoundError') {
        res.status(NOTFOUND).send({ message: 'Пользователь или карточка с указанным _id не найдены' });
      } else { handleDefaultError(err, DEFAULT, 'Произошла ошибка', res); }
    });
};

exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const { _id } = req.user;
  User.findByIdAndUpdate(_id, { avatar }, { new: true, runValidators: true }).orFail()
    .then((user) => sendData({ dataType: 'user' }, 200, user, res))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(VALIDATION).send({ message: 'Переданы некорректные данные' });
      } else if (err.name === 'ValidationError') {
        res.status(VALIDATION).send({ message: 'Переданы некорректные данные' });
      } else if (err.name === 'DocumentNotFoundError') {
        res.status(NOTFOUND).send({ message: 'Пользователь или карточка с указанным _id не найдены' });
      } else { handleDefaultError(err, DEFAULT, 'Произошла ошибка', res); }
    });
};
