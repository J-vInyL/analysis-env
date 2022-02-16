const mysql = require("mysql");

const connection = {
  host: "127.0.0.1",
  user: "root",
  port: "3306",
  password: "root",
  database: "electron",
  connectionLimit: 30
};

module.exports = mysql.createPool(connection);
