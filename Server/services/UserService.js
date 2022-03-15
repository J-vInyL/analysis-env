const maria = require("../model/DB_Pool.js");
const moment = require("moment");

const accessUser = async (req, res) => {
  const connection = await maria.getConnection(async conn => conn);
  let select_query = "SELECT user_no FROM user WHERE user_ip = ?";
  let user_ip = req.query.ip;
  try {
    const result_no = await connection.query(select_query, user_ip);

    if (result_no[0].affectedRows == 0) {
      throw new Error("table 0");
    }

    if (result_no[0].affectedRows == 1) {
      console.log("success");
    }

    let post = {
      user_no: result_no[0][0].user_no,
      user_ip: req.query.ip,
      user_name: "TEST",
      connect_time: moment().format("YYYY-MM-DD"),
      lastcurrent_time: moment().format("YYYY-MM-DD")
    };
    let query = "INSERT INTO access_log SET ?";

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
    }
  } catch (err) {
    console.log(err);
    await connection.rollback();

    return res.status(400).json({ success: false, err });
  } finally {
    connection.release();
  }
};

const getDetailNoti = async (req, res) => {
  const connection = await maria.getConnection(async conn => conn);
  let query = "SELECT * FROM board WHERE title = ?";
  let title_id = req.query.id;

  try {
    await connection.beginTransaction();
    const result = await connection.query(query, title_id);

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

module.exports = { accessUser, getDetailNoti };
