const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/user", (req, res) => {
  res.render("user");
});

app.get("/admin", (req, res) => {
  res.render("admin");
});

app.get("/login_page", (req, res) => {
  res.render("login");
});

app.get("/loginuser", (req, res) => {
  res.render("loginuser");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/registeruser", (req, res) => {
  res.render("registeruser");
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Frontend service running on port ${PORT}`);
});
