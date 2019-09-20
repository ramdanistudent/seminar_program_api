const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", { title: "Girasisapp_api", message: "wkkw" });
});

module.exports = router;
