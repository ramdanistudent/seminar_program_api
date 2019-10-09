const Joi = require("@hapi/joi");
const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    nama: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50
    },
    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
      unique: true
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 1024
    },
    alamat: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255
    },
    noHp: {
      type: String,
      required: true,
      minlength: 11,
      maxlength: 15
    }
  })
);

function validateUser(user) {
  const schema = Joi.object({
    nama: Joi.string()
      .min(3)
      .max(50)
      .required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(8)
      .max(20)
      .required(),
    alamat: Joi.string()
      .min(5)
      .max(255)
      .required(),
    noHp: Joi.string()
      .min(11)
      .max(15)
      .required()
  });

  return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
