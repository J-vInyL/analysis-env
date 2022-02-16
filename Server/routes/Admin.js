const express = require("express");
const router = express.Router();

const {
  getLogin,
  getLogout,
  createBoard
} = require("../services/AdminService.js");

router.post("/login", getLogin);
router.get("/logout", getLogout);
router.post("create_board", createBoard);

module.exports = router;
