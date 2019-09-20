const express = require("express");
const Joi = require("@hapi/joi");

const router = express.Router();

const barangs = [
  { id: 1, name: "printer" },
  { id: 2, name: "laptop" },
  { id: 3, name: "monitor" }
];

router.get("/", (req, res) => {
  res.send(barangs);
});

router.post("/", (req, res) => {
  const { error } = validateBarang(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const barang = {
    id: barangs.length + 1,
    name: req.body.name
  };
  barangs.push(barang);
  res.send(barang);
});

router.get("/:id", (req, res) => {
  const barang = barangs.find(c => c.id === parseInt(req.params.id));
  if (!barang) return res.status(404).send("not found");
  res.send(barang);
});

router.put("/:id", (req, res) => {
  const barang = barangs.find(c => c.id === parseInt(req.params.id));
  if (!barang) return res.status(404).send("not found");

  const { error } = validateBarang(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  barang.name = req.body.name;
  res.send(barang);
});

function validateBarang(barang) {
  const schema = Joi.object({
    name: Joi.string()
      .min(3)
      .required()
  });
  //   console.log(Joi.validate(req.body, schema));
  return schema.validate(barang);
}

router.delete("/:id", (req, res) => {
  const barang = barangs.find(c => c.id === parseInt(req.params.id));
  if (!barang) return res.status(404).send("not found");

  const index = barangs.indexOf(barang);
  barangs.splice(index, 1);

  res.send(barang);
});

module.exports = router;
