const express = require("express");
const { Jenis, validate } = require("../models/jenis");

const router = express.Router();

router.get("/", async (req, res) => {
  const jenis = await Jenis.find().sort("nama");
  res.send(jenis);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let jenis = new Jenis({
    nama_jenis: req.body.nama_jenis
  });

  jenis = await jenis.save();
  res.send(jenis);
});

router.get("/:id", async (req, res) => {
  const jenis = await Jenis.findById(req.params.id);

  if (!jenis) return res.status(404).send("not found");
  res.send(jenis);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const jenis = await Jenis.findByIdAndUpdate(
    req.params.id,
    {
      nama_jenis: req.body.nama_jenis
    },
    { new: true }
  );
  if (!jenis) return res.status(404).send("not found");

  res.send(jenis);
});

router.delete("/:id", async (req, res) => {
  const jenis = await Jenis.findByIdAndRemove(req.params.id);

  if (!jenis) return res.status(404).send("not found");

  res.send(jenis);
});

module.exports = router;
