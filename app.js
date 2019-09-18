const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/barang", (req, res) => {
  res.send("barang api");
});

app.listen(3001, () => console.log("port 3001"));
