const express = require("express");
const router = express.Router();

const {
  getLogin,
  getLogout,
  createNotice,
  getNotice,
  getUser,
  getDetailById,
  getAnswerComments,
  createUser,
  deleteUser,
  createComment,
  getAnswer
} = require("../services/AdminService.js");

router.post("/login", getLogin);
router.get("/logout", getLogout);
router.post("/create_notice", createNotice);
router.get("/notice", getNotice);
router.get("/detail_by_id", getDetailById);
router.post("/create_user", createUser);
router.get("/get_user", getUser);
router.get("/delete_user", deleteUser);
router.get("/comments", getAnswerComments);
router.post("/create_comment", createComment);
router.get("/answer", getAnswer);

module.exports = router;
