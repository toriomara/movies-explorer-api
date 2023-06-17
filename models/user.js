const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const { MESSAGES } = require('../utils/constants');
const { UnauthorizedError } = require('../errors');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'Введите корректный email',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(
          new UnauthorizedError(MESSAGES.UNAUTHORIZED),
        );
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(
            new UnauthorizedError(MESSAGES.UNAUTHORIZED),
          );
        }
        return user;
      });
    });
};

module.exports = mongoose.model('user', userSchema);
