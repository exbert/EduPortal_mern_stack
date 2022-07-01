const express = require("express");
const app = express();
const port = 3000;

// Template Engine configuration
app.set("view engine", "ejs");

// Middleware configuration

app.use(express.static("public"));

app.listen(port, () => console.log(`App started on port ${port}!`));

// Route configuration

app.get("/", (req, res) => {
    res.status(200).render("index", { page_name: "index" });
});

app.get("/about", (req, res) => {
    res.status(200).render("about", { page_name: "about" });
});
