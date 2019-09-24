const Joi = require("@hapi/joi");
const mongoose = require("mongoose");

const jenisSchema = new mongoose.Schema({
  nama_jenis: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  }
});

const Jenis = mongoose.model("Jenis", jenisSchema);

function validateJenis(jenis) {
  const schema = Joi.object({
    nama_jenis: Joi.string()
      .min(2)
      .required()
  });

  return schema.validate(jenis);
}

exports.jenisSchema = jenisSchema;
exports.Jenis = Jenis;
exports.validate = validateJenis;
