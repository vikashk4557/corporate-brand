const express = require("express");
const app = express();
const ejsMate = require("ejs-mate");
const path = require("path");
const fs = require("fs");

const PORT = process.env.PORT || 8080;

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
    res.locals.currentPath = req.path;
    next();
});


const dataPath = path.join(
    __dirname,
    "public",
    "data",
    "landing.json"
);

const landingData = JSON.parse(
    fs.readFileSync(dataPath, "utf-8")
);

app.get("/", (req, res) => {
    res.redirect("/brands");
});


app.get("/brands", (req, res) => {

    res.render("brands/index", {
        data: landingData
    });

});
app.get("/about", (req, res) => {
    res.render("brands/about", {
        about: landingData.about
    });
});

app.get("/services/:slug", (req, res) => {
    const slug = req.params.slug;
    const service = landingData.services.items.find(
        item => item.slug === slug
    );
    if (!service) {
        return res.status(404).send("Service not found");
    }
    res.render("brands/service", {
        service: service
    });
});
app.get("/feature/:slug", (req, res) => {
    const feature = landingData.features.items.find(
        item => item.slug === req.params.slug
    );
    if (!feature) {
        return res.status(404).send("Feature not found");
    }
    res.render("brands/features", {
        feature: feature
    });
});


app.listen(PORT, () => {
    console.log(`Server is Listening to port ${PORT}`);
});