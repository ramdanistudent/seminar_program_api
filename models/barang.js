const Joi = require("@hapi/joi");
const mongoose = require("mongoose");

const Barang = mongoose.model(
  "Barang",
  new mongoose.Schema({
    no: {
      type: Number,
      required: true,
      min: 5
    },
    nama: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50
    },
    stok: {
      type: Number,
      required: true,
      min: 1
    },
    jenis: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 5
    },
    venue: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 20
    }
  })
);

function validateBarang(barang) {
  const schema = Joi.object({
    no: Joi.number()
      .min(2)
      .required(),
    nama: Joi.string()
      .min(2)
      .required(),
    stok: Joi.number()
      .min(1)
      .required(),
    jenis: Joi.string()
      .min(2)
      .required(),
    venue: Joi.string()
      .min(2)
      .required()
  });
  //   console.log(Joi.validate(req.body, schema));
  return schema.validate(barang);
}

exports.Barang = Barang;
exports.validate = validateBarang;
