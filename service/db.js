const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb://localhost/griyasisapp"
    // , {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true
    // }
  )
  .then(() => console.log("conected to mongodb"))
  .catch(err => console.error("gagal connect", err));
