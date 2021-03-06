const express = require("express");

const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/").get(authMiddleware, authController.getDashboardPage);

module.exports = router;
