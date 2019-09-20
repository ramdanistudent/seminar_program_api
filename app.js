const express = require("express");
const Joi = require("@hapi/joi");
const logger = require("./logger");
const helmet = require("helmet");
const morgan = require("morgan");
const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use(helmet());
app.use(logger);

if (app.get("env") === "development") {
  console.log("development mode");
  app.use(morgan("tiny"));
}

const barangs = [
  { id: 1, name: "printer" },
  { id: 2, name: "laptop" },
  { id: 3, name: "monitor" }
];

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/barang", (req, res) => {
  res.send(barangs);
});

app.post("/api/barang", (req, res) => {
  const { error } = validateBarang(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const barang = {
    id: barangs.length + 1,
    name: req.body.name
  };
  barangs.push(barang);
  res.send(barang);
});

app.get("/api/barang/:id", (req, res) => {
  const barang = barangs.find(c => c.id === parseInt(req.params.id));
  if (!barang) return res.status(404).send("not found");
  res.send(barang);
});

app.put("/api/barang/:id", (req, res) => {
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

app.delete("/api/barang/:id", (req, res) => {
  const barang = barangs.find(c => c.id === parseInt(req.params.id));
  if (!barang) return res.status(404).send("not found");

  const index = barangs.indexOf(barang);
  barangs.splice(index, 1);

  res.send(barang);
});

// app.get("/api/barang/:id", (req, res) => {
//   res.send(req.params.id);
// });
//PORT
const port = process.env.port || 3001;
app.listen(port, () => console.log(`server started at port ${port}`));
