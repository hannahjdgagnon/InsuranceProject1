const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/InsuranceProject", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define claim schema (adjust fields as needed)
const claimSchema = new mongoose.Schema({
  title: String,
  description: String,
  // Add other fields as needed
});

const Claim = mongoose.model("Claim", claimSchema);

// CRUD operations
// Routes
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/services", (req, res) => {
  res.render("services");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/claims", async (req, res) => {
  try {
    // Fetch all claims from the database
    const claims = await Claim.find();
    res.render("claims", { claims });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// Post new claim
app.post("/claims/submit", async (req, res) => {
  const { title, description } = req.body;
  const newClaim = new Claim({ title, description });

  try {
    await newClaim.save();
    res.redirect("/claims");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// Post delete claim
app.post("/claims/delete/:id", async (req, res) => {
  const claimId = req.params.id;

  try {
    await Claim.findByIdAndDelete(claimId);
    res.redirect("/claims");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// Get edit claim
app.get("/claims/edit/:id", async (req, res) => {
  const claimId = req.params.id;

  try {
    const claim = await Claim.findById(claimId);
    res.render("edit-claim", { claim });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// Post update claim
app.post("/claims/update/:id", async (req, res) => {
  const claimId = req.params.id;
  const { title, description } = req.body;

  try {
    await Claim.findByIdAndUpdate(claimId, { title, description });
    res.redirect("/claims");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

// Port
const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
