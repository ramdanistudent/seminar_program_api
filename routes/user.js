const express = require("express");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const { User, validate } = require("../models/user");

const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User Email has alredy exist");
  user = new User(
    _.pick(req.body, ["nama", "email", "password", "alamat", "noHp"])
  );

  const saltRound = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, saltRound);

  await user.save();
  res.send(_.pick(user, ["nama", "email"]));
});

module.exports = router;
