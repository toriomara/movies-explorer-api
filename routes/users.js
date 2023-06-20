const userRouter = require('express').Router();
const {
  getCurrentUser,
  updateUser,
} = require('../controllers/users');
const { validateUser } = require('../utils/validation');

userRouter.get('/me', getCurrentUser);
userRouter.patch('/me', validateUser, updateUser);

module.exports = userRouter;
