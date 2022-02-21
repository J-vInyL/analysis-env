const express = require("express");
const router = express.Router();

const {
  getLogin,
  getLogout,
  createNotice,
  getNotice,
  getUser
} = require("../services/AdminService.js");

router.post("/login", getLogin);
router.get("/logout", getLogout);
router.post("/create_board", createNotice);
router.get("/notice", getNotice);
router.post("/get_user", getUser);

module.exports = router;
