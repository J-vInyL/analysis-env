const express = require("express");
const router = express.Router();

const { accessUser, getDetailNoti } = require("../services/UserService.js");

router.get("/access_log", accessUser);
router.get("/noti_by_id", getDetailNoti);

module.exports = router;
