const mysql = require("mysql2/promise");
require("../config/env.js");

const connection = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PWD,
  database: process.env.DB_DATABASE,
  connectionLimit: 30
};

module.exports = mysql.createPool(connection);
