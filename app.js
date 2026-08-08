const express = require("express");
const app = express();
const ejsMate = require("ejs-mate");
const path = require("path");
const PORT = process.env.PORT || 8080;


app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/brands", (req, res) => {
    res.render("brands/index");
});

app.listen(PORT, () => {
    console.log(`Server is Listening to port ${PORT}`);
});