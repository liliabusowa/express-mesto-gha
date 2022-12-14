const Card = require('../models/card');
const {
  handleDefaultError, sendData,
} = require('../utils/utils');
const { DEFAULT, NOTFOUND, VALIDATION } = require('../utils/constants');

exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const { _id: owner } = req.user;
  Card.create({ name, link, owner })
    .then((card) => {
      sendData({ dataType: 'card' }, 201, card, res);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(VALIDATION).send({ message: 'Переданы некорректные данные' });
      } else { handleDefaultError(err, DEFAULT, 'Произошла ошибка', res); }
    });
};

exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      sendData({ dataType: 'cards' }, 200, cards, res);
    })
    .catch((err) => handleDefaultError(err, DEFAULT, 'Произошла ошибка', res));
};

exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(NOTFOUND).send({ message: 'Пользователь или карточка с указанным _id не найдены' });
        return;
      }
      sendData({ dataType: 'card' }, 200, card, res);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(VALIDATION).send({ message: 'Переданы некорректные данные' });
      } else { handleDefaultError(err, DEFAULT, 'Произошла ошибка', res); }
    });
};

exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(NOTFOUND).send({ message: 'Пользователь или карточка с указанным _id не найдены' });
        return;
      }
      sendData({ dataType: 'card' }, 200, card, res);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(VALIDATION).send({ message: 'Переданы некорректные данные' });
      } else { handleDefaultError(err, DEFAULT, 'Произошла ошибка', res); }
    });
};

exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(NOTFOUND).send({ message: 'Пользователь или карточка с указанным _id не найдены' });
        return;
      }
      sendData({ dataType: 'card' }, 200, card, res);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(VALIDATION).send({ message: 'Переданы некорректные данные' });
      } else { handleDefaultError(err, DEFAULT, 'Произошла ошибка', res); }
    });
};
