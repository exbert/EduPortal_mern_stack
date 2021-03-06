const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const app = express();

const pageRoute = require("./routes/pageRoute");
const courseRoute = require("./routes/courseRoute");
const categoryRoute = require("./routes/categoryRoute");
const userRoute = require("./routes/userRoute");
const loginRoute = require("./routes/loginRoute");
const logoutRoute = require("./routes/logoutRoute");
const dashboardRoute = require("./routes/dashboardRoute");

// Environment Variables
dotenv.config({
    path: "./config/env/config.env",
});
const PORT = process.env.PORT;

// Connect to MongoDB server
const MONGO_URI = process.env.MONGO_URI;
mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log("MongoDb Connection Successful");
    })
    .catch((err) => {
        console.error(err);
    });

// Template Engine configuration
app.set("view engine", "ejs");

// Global Variables

global.userIN = null;

// Middleware configuration

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        secret: "my_keyboard_cat",
        resave: false,
        saveUninitialized: true,
        store: MongoStore.create({ mongoUrl: MONGO_URI }),
    })
);
app.use("*", (req, res, next) => {
    userIN = req.session.userID;
    next();
});

app.listen(PORT, () => console.log(`App started on port ${PORT}!`));

// Route configuration

app.use("/", pageRoute);
app.use("/courses", courseRoute);
app.use("/categories", categoryRoute);
app.use("/users", userRoute);
app.use("/login", loginRoute);
app.use("/logout", logoutRoute);
app.use("/dashboard", dashboardRoute);
