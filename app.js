const express = require("express");
const app = express();
const PORT = process.env.PORT || 3030;

app.set("view engine", "ejs");
app.use(express.static("public")); // Create a 'public' folder for your stylesheets, images, etc.

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/services", (req, res) => {
  res.render("services");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/claims", (req, res) => {
  res.render("claims");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/InsuranceProject", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
