const express = require("express");
const router = express.Router();
const Claim = require("../models/claimsModel");

// Handle GET request to view claims
router.get("/", async (req, res) => {
  try {
    // Fetch all claims from the database
    const claims = await Claim.find();
    // Render the claims page with the retrieved claims
    res.render("claims", { claims });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Handle POST request to submit a new claim
router.post("/submit", async (req, res) => {
  try {
    // Create a new claim instance
    const newClaim = new Claim({
      title: req.body.title,
      description: req.body.description,
    });

    // Save the claim
    await newClaim.save();

    // Redirect to the claims page after submission
    res.redirect("/claims");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Handle POST request to delete a claim
router.post("/delete/:claimId", async (req, res) => {
  const claimId = req.params.claimId;
  try {
    // Logic to delete claim data based on claimId
    await Claim.findByIdAndDelete(claimId);

    // Redirect to the claims page after deletion
    res.redirect("/claims");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Handle GET request to edit a claim
router.get("/edit/:claimId", async (req, res) => {
  const claimId = req.params.claimId;
  try {
    // Logic to fetch claim data based on claimId
    const claim = await Claim.findById(claimId);

    // Render the edit form with the fetched data
    res.render("edit-claim", { claim });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
