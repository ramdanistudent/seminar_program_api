const express = require("express");
const joi = require("@hapi/joi");
const app = express();

app.use(express.json());

const barangs = [
  { id: 1, name: "printer" },
  { id: 2, name: "laptop" },
  { id: 3, name: "monitor" }
];

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/barang", (req, res) => {
  res.send("barang api");
});

app.post("/api/barang", (req, res) => {
  const barang = {
    id: barangs.length + 1,
    name: req.body.name
  };
  barangs.push(barang);
  res.send(barang);
});

app.get("/api/barang/:id", (req, res) => {
  const barang = barangs.find(c => c.id === parseInt(req.params.id));
  if (!barang) res.status(404).send("not found");
  res.send(barang);
});

// app.get("/api/barang/:id", (req, res) => {
//   res.send(req.params.id);
// });
//PORT
const port = process.env.port || 3001;
app.listen(port, () => console.log(`server started at port ${port}`));
