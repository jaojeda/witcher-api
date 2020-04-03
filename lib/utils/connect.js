require('dotenv').config();
const { Pool, Client } = require('pg');

const client = new Client(process.env.DATABASE_URL);

const pool = new Pool();

module.exports = {
  client,
  pool
};
