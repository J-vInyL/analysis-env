const express = require("express");
const router = express.Router();
const maria = require("../config/db_pool.js");

const getLogin = (req, res) => {
  let reqId = req.body.id;
  let reqPwd = req.body.password;

  if (reqId && reqPwd) {
    return res.status(200).json({
      loginSuccess: true
    });
  } else {
    return res.status(400).json({
      loginSuccess: false
    });
  }
};

const getLogout = (req, res) => {
  let logoutId = req.query.id;
  let query = `select server_id from admin where server_id = '${logoutId}'`;

  try {
    maria.getConnection((err, connection) => {
      if (err) throw err;
      connection.query(query, (err, result) => {
        if (err) {
          console.error("GET ERROR", err);
          return res.json({
            loginSuccess: false
          });
        } else if (logoutId === result[0].server_id) {
          return res.json({ loginSuccess: true, result });
        }
      });
      connection.release();
    });
  } catch (err) {
    console.error("CATCH ERROR", err);
  }
};
const createBoard = (req, res) => {
  let title = req.body.title;
  let start_date = req.body.start_date;
  let end_date = req.body.end_date;
};
module.exports = { getLogin, getLogout, createBoard };
