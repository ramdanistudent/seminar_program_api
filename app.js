const config = require("config");
const mongoose = require("mongoose");
const startupDebugger = require("debug")("app:startup");
const express = require("express");
const logger = require("./middleware/logger");
const helmet = require("helmet");
const morgan = require("morgan");
const app = express();

//connect database
mongoose
  .connect("mongodb://localhost:27017/griyasisapp", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("conected to mongodb"))
  .catch(err => console.error("gagal connect", err));

app.use(express.json());
//Router
const routerBarang = require("./routes/barang");
const routerHome = require("./routes/home");
app.use("/", routerHome);
app.use("/api/barang", routerBarang);

app.set("view engine", "pug");
app.set("views", "./views");

console.log("password : " + config.get("mail.host"));
app.use(express.static("public"));
app.use(helmet());
app.use(logger);

if (app.get("env") === "development") {
  startupDebugger("development mode");
  app.use(morgan("tiny"));
}

//PORT
const port = process.env.port || 5000;
app.listen(port, () => console.log(`server started at port ${port}`));
