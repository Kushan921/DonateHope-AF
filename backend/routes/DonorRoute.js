const router = require("express").Router();
let Donor = require("../models/DonorModel");

//http://localhost:8020/donor/register

router.route("/register").post((req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const NIC = Number(req.body.NIC);
  const email = req.body.email;
  const gender = req.body.gender;
  const address = req.body.address;
  const bloodGroup = req.body.bloodGroup;
  const isActiveDonor = req.body.isActiveDonor;
  const contact = req.body.contact;
  const age = Number(req.body.age);
  const password = req.body.password;

  const newDonor = new Donor({
    firstName,
    lastName,
    NIC,
    bloodGroup,
    isActiveDonor,
    contact,
    age,
    email,
    gender,
    password,
  });

  newDonor
    .save()
    .then(() => {
      res.json("Donor Created");
    })
    .catch((err) => {
      console.log(err);
    });
});
router.route("/login").post((req, res) => {
  const password = req.body.password;
  Donor.findOne({ email: req.body.email }).then((user) => {
    // Check if Attendee exists
    if (!user) {
      return res.status(404).json({ email: "Email not found" });
    } else {
      // Check password
      if (password === user.password) {
        res.send(user);
      } else {
        return res.status(400).json({ password: "Password incorrect" });
      }
    }
  });
});
router.route("/:id").get((req, res) => {
  const userId = req.params.id;
  Donor.findById(userId).then((user) => {
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      res.send(user);
    }
  });
});
router.route("/users").get((req, res) => {
  Donor.find()
    .then((users) => {
      res.send(users);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    });
});
router.route("/updateOne/:id").put(async (req, res) => {
  let donor = await Donor.findById(req.params.id);
  const data = {
    firstName: req.body.firstName || donor.firstName,
    lastName: req.body.lastName || donor.lastName,
    NIC: req.body.NIC || donor.NIC,
    email: req.body.email || donor.email,
    bloodGroup: req.body.bloodGroup || donor.bloodGroup,
    isActiveDonor: req.body.isActiveDonor || donor.isActiveDonor,
    contact: req.body.contact || donor.contact,
    age: req.body.age || donor.age,
    gender: req.body.gender || donor.gender,
    password: req.body.password || donor.password,
  };
  donor = await Donor.findByIdAndUpdate(req.params.id, data, { new: true });
  res.json(donor);
});

router.route("/updateOne/:id").patch(async (req, res) => {
  try {
    const { id } = req.params;
    const { isActiveDonor } = req.body;

    const donor = await Donor.findByIdAndUpdate(
      id,
      { isActiveDonor },
      { new: true }
    );

    if (!donor) {
      return res.status(404).json({ error: "Donor not found" });
    }

    res.json(donor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
