const maria = require("../model/DB_Pool.js");
const moment = require("moment");
const mysql = require("mysql");

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
  console.log(logoutId);
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
("");
const createNotice = async (req, res) => {
  const connection = await maria.getConnection(async conn => conn);

  let query = "INSERT INTO board SET ? ";

  let post = {
    admin_no: 1,
    title: req.body.title,
    content: req.body.content,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
    createdAt: moment().format("YYYY-MM-DD"),
    updatedAt: moment().format("YYYY-MM-DD")
  };

  let sql = mysql.format(query, post);

  try {
    await connection.beginTransaction();
    const result = await connection.query(sql);
    if (result[0].affectedRows == 0) {
      throw new Error("table 0");
    }

    if (result[0].affectedRows == 1) {
      console.log("success");
      Identifier(post.title);
      await connection.commit();
      return res.status(200).json({ success: true, result: result[0] });
    }
  } catch (err) {
    console.log(err);
    await connection.rollback();

    return res.status(400).json({ success: false, err });
  } finally {
    connection.release();
  }
};

const Identifier = async Id => {
  return await Id;
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

const getDetailById = async (req, res) => {
  let id = req.query.id;
  let query = "SELECT * FROM board  WHERE title = ?";
  const connection = await maria.getConnection(async conn => conn);

  try {
    await connection.beginTransaction();
    const result = await connection.query(query, id);
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
  const connection = await maria.getConnection(async conn => conn);
  let query = "SELECT * FROM user";

  try {
    await connection.beginTransaction();
    const result = await connection.query(query);
    if (result[0].length == 0) {
      throw new Error("table 0");
    }

    if (result[0].length == 1) {
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

const createUser = async (req, res) => {
  let ip = req.body.userIp;
  let query = "INSERT INTO user SET ? ";
  let post = {
    user_ip: ip,
    createdAt: moment().format("YYYY-MM-DD"),
    updatedAt: moment().format("YYYY-MM-DD")
  };
  const connection = await maria.getConnection(async conn => conn);

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

const deleteUser = async (req, res) => {
  let id = req.query.id;
  let query = "DELETE FROM user WHERE user_ip = ?";
  const connection = await maria.getConnection(async conn => conn);

  try {
    await connection.beginTransaction();
    const result = await connection.query(query, id);

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

const getAnswerComments = async (req, res) => {
  let id = req.query.id;
  let query = "SELECT * FROM answer_board WHERE board_no = ?";
  const connection = await maria.getConnection(async conn => conn);

  try {
    await connection.beginTransaction();
    const result = await connection.query(query, id);
    console.log([result[0]]);
    if (result[0].affectedRows == 0) {
      throw new Error("table 0");
    }

    if (result[0].affectedRows == 1) {
      console.log("success");
    }

    await connection.commit();
    return res.status(200).json({ success: true, result: [result[0]] });
  } catch (err) {
    console.log(err);
    await connection.rollback();

    return res.status(400).json({ success: false, err });
  } finally {
    connection.release();
  }
};

const createComment = async (req, res) => {
  let post = {
    user_no: 1,
    board_no: req.body.board_no,
    author: req.body.author,
    answer_content: req.body.answer_content.props.children,
    createdAt: req.body.createdAt,
    updatedAt: req.body.createdAt
  };
  let query = "INSERT INTO answer_board SET ?";
  const connection = await maria.getConnection(async conn => conn);

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
    return res.status(200).json({ success: true, result: [result[0][0]] });
  } catch (err) {
    console.log(err);
    await connection.rollback();

    return res.status(400).json({ success: false, err });
  } finally {
    connection.release();
  }
};

const getAnswer = async (req, res) => {
  let query = "SELECT * FROM answer_board";
  const connection = await maria.getConnection(async conn => conn);

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
module.exports = {
  getLogin,
  getLogout,
  createNotice,
  getNotice,
  getUser,
  createUser,
  deleteUser,
  getDetailById,
  getAnswerComments,
  createComment,
  getAnswer,
  Identifier
};
