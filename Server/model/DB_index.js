const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: "3306",
  password: "root",
  database: "electron"
});

module.exports = connection;
