const User = require("../models/User");
const Category = require("../models/Category");
const Course = require("../models/Course");

const bcrypt = require("bcrypt");

exports.createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);

        res.status(201).redirect("/login");
    } catch (error) {
        res.status(400).json({
            status: "fail",
            error: error.message,
        });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (user) {
            bcrypt.compare(password, user.password, (err, same) => {
                req.session.userID = user._id;

                res.status(200).redirect("/dashboard");
            });
        }
    } catch (error) {
        res.status(400).json({
            status: "fail",
            error: error.message,
        });
    }
};

exports.logoutUser = (req, res) => {
    req.session.destroy(() => {
        res.redirect("/");
    });
};

exports.getDashboardPage = async (req, res) => {
    const user = await User.findOne({ _id: req.session.userID }).populate(
        "courses"
    );
    const categories = await Category.find();
    const courses = await Course.find({ user: req.session.userID });

    console.log(req.session.userID);
    res.status(200).render("dashboard", {
        page_name: "dashboard",
        categories,
        user,
        courses,
    });
};
