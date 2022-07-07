const express = require("express");

const categoryController = require("../controllers/categoryController");

const router = express.Router();

router.route("/").post(categoryController.createCategory);
// router.route("/").get(courseController.getAllCourse);
// router.route("/:slug").get(courseController.getCourse);

module.exports = router;
