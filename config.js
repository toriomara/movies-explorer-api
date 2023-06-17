require('dotenv').config();

const {
  PORT = 3000,
  NODE_ENV,
  JWT_SECRET,
  DB_URL = 'mongodb://127.0.0.1:27017/movie43db',
} = process.env;

module.exports = {
  PORT, NODE_ENV, JWT_SECRET, DB_URL,
};
