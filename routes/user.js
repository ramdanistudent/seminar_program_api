const express = require("express");
const { User, validate } = require("../models/user");

const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User Email has alredy exist");
  user = new User({
    nama: req.body.nama,
    email: req.body.email,
    password: req.body.password,
    alamat: req.body.alamat,
    noHp: req.body.noHp
  });

  await user.save();
  res.send(user);
});

module.exports = router;
