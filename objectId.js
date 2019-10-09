const monggos = require("mongoose");

const id = new monggos.Types.ObjectId();

console.log(id.getTimestamp());
