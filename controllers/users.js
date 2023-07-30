const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { MESSAGES, STATUS_CODES } = require('../utils/constants');
const {
  BadRequestError, NotFoundError, ConflictError,
} = require('../errors');

const { NODE_ENV, JWT_SECRET } = process.env;

const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  const saltRounds = 10;
  bcrypt.hash(password, saltRounds).then((hash) => {
    User.create({
      name, email, password: hash,
    })
      .then((user) => {
        res.status(STATUS_CODES.CREATED)
          .send({
            name: user.name,
            email: user.email,
          });
      })
      .catch((err) => {
        if (err.code === 11000) {
          return next(new ConflictError(`${MESSAGES.BAD_REQUEST}. Такой пользователь уже зарегистрирован`));
        }
        return next(err);
      });
  }).catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(() => {
      throw new NotFoundError(MESSAGES.NOT_FOUND);
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(`${MESSAGES.BAD_REQUEST}. Такой пользователь уже зарегистрирован`));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError(`${MESSAGES.BAD_REQUEST} при обновлении профиля`));
      } else {
        next(err);
      }
    });
};

const getCurrentUser = async (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return next(new NotFoundError(MESSAGES.NOT_FOUND));
      }
      return res.send(user);
    })
    .catch(next);
};

module.exports = {
  getCurrentUser,
  createUser,
  updateUser,
  login,
};
