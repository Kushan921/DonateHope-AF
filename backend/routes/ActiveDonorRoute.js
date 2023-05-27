const router = require("express").Router();
const multer = require("multer");

let ActiveDonor = require("../models/ActiveDonorModel");

// Multer configuration
const upload = multer({ dest: "uploads/" }); // Set the destination folder for uploaded files

router.route("/apply/:id").post(async (req, res) => {
  try {
    const userId = req.params.id;
    // const file = req.file;

    // Check if file exists
    // if (!file) {
    //   return res.status(400).json({ error: "No file uploaded" });
    // }

    // Create a new ActiveDonor instance
    const activeDonor = new ActiveDonor({
      weight: req.body.weight,
      Pulse: req.body.Pulse,
      Hb: req.body.Hb,
      Bp: req.body.Bp,
      Temperature: req.body.Temperature,
      hasDonated: req.body.hasDonated,
      donatedDate: req.body.donatedDate,
      hasTattoo: req.body.hasTattoo,
      hasEarPiercing: req.body.hasEarPiercing,
      userId: userId,
      medicalDocument: req.body.fileName, // Save the file path in the medicalDocument field
    });

    // Save the ActiveDonor document to the database
    await activeDonor.save();

    return res
      .status(200)
      .json({ message: "Application submitted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.route("/apply").get(async (req, res) => {
  try {
    // Retrieve all ActiveDonor documents from the database
    const applications = await ActiveDonor.find();

    return res.status(200).json(applications);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.route("/apply/:id").get(async (req, res) => {
  try {
    const applicationId = req.params.id;

    // Retrieve the ActiveDonor document by its ID
    const application = await ActiveDonor.findById(applicationId);

    if (!application) {
      return res.status(404).json({ error: "Application not found" });
    }

    return res.status(200).json(application);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});
router.route("/apply/:id").delete(async (req, res) => {
  try {
    const applicationId = req.params.id;

    // Delete the ActiveDonor document by its ID
    const deletedApplication = await ActiveDonor.findByIdAndDelete(applicationId);

    if (!deletedApplication) {
      return res.status(404).json({ error: "Application not found" });
    }

    return res.status(200).json({ message: "Application deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
