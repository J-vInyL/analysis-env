const maria = require("../config/db_pool.js");
const moment = require("moment");

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
  let query = "SELECT server_id from admin where server_id = ?";

  try {
    maria.getConnection((err, connection) => {
      if (err) throw err;
      connection.query(query, logoutId, (err, result) => {
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
const createNotice = async (req, res) => {
  const connection = await maria.getConnection(async conn => conn);

  let query =
    "INSERT INTO board SET admin_no = (SELECT admin_no FROM admin WHERE admin_no = 1), ? ";

  let post = {
    title: req.body.title,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
    createdAt: moment().format("YYYY-MM-DD"),
    updatedAt: moment().format("YYYY-MM-DD")
  };

  try {
    await connection.beginTransaction();
    const result = await connection.query(query, post);

    if (result[0].affectedRows == 0) {
      throw new Error("table 0");
    }

    if (result[0].affectedRows == 1) {
      console.log("success");
    }
    await connection.commit();
    return res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    await connection.rollback();

    return res.status(400).json({ success: false, err });
  } finally {
    connection.release();
  }
};

const getNotice = async (req, res) => {
  const connection = await maria.getConnection(async conn => conn);

  let query = "SELECT * from BOARD; ";
  try {
    await connection.beginTransaction();
    const result = await connection.query(query);

    if (result[0].affectedRows == 0) {
      throw new Error("table 0");
    }

    if (result[0].affectedRows == 1) {
      console.log("success");
    }
    await connection.commit();
    return res.status(200).json({ success: true, result: result[0] });
  } catch (err) {
    console.log(err);
    await connection.rollback();

    return res.status(400).json({ success: false, err });
  } finally {
    connection.release();
  }
};

const getUser = async (req, res) => {
  let ip = req.body.IP;

  console.log(ip);
};
module.exports = { getLogin, getLogout, createNotice, getNotice, getUser };
