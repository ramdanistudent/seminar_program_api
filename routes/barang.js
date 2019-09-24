const express = require("express");
const { Barang, validate } = require("../models/barang");
const { Jenis } = require("../models/jenis");

const router = express.Router();

router.get("/", async (req, res) => {
  const barangs = await Barang.find().sort("nama");
  res.send(barangs);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const jenis = await Jenis.findById(re.body.jenisId);
  if (!jenis) return res.status(400).send("Invalid Jenis");

  let barang = new Barang({
    no: req.body.no,
    nama: req.body.nama,
    stok: req.body.stok,
    jenis: {
      _id: jenis._id,
      nama_jenis: jenis.nama_jenis
    },
    venue: req.body.venue
  });

  barang = await barang.save();
  res.send(barang);
});

router.get("/:id", async (req, res) => {
  const barang = await Barang.findById(req.params.id);

  if (!barang) return res.status(404).send("not found");
  res.send(barang);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const barang = await Barang.findByIdAndUpdate(
    req.params.id,
    {
      no: req.body.no,
      nama: req.body.nama,
      stok: req.body.stok,
      jenis: req.body.jenis,
      venue: req.body.venue
    },
    { new: true }
  );
  if (!barang) return res.status(404).send("not found");

  res.send(barang);
});

router.delete("/:id", async (req, res) => {
  const barang = await Barang.findByIdAndRemove(req.params.id);

  if (!barang) return res.status(404).send("not found");

  res.send(barang);
});

module.exports = router;
