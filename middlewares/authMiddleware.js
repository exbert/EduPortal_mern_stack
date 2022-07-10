const User = require("../models/User");

module.exports = (req, res, next) => {
    console.log(req.session.userID);
    User.findById(req.session.userID, (err, user) => {
        if (err || !user) return res.redirect("/login");
        next();
    });
};
