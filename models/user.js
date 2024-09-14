const mongoose = require('mongoose');
const Joi = require('joi');

const emailRegexp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const nameRegexpEnglish = /^[a-zA-Z' ]+$/;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      match: nameRegexpEnglish,
      minlength: 2,
      maxlength: 16,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: emailRegexp,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
    token: {
      type: String,
      default: null,
    },
    parameters: {
      type: Object,
      default: {
        age: "0",
        height: "0",
        currentWeight: "0",
        desiredWeight: "0",
        bloodType: "1",
        calories: "0",
      },
    },
    notAllowedProducts: {
      type: [String],
      default: [],
    },
    verificationToken: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

const User = mongoose.model('User', userSchema);

const joiSchemaRegister = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  name: Joi.string().pattern(nameRegexpEnglish).min(2).max(16).required(),
  password: Joi.string().min(6).max(20).required(),
});

const joiSchemaLogin = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const sessionSchema = new mongoose.Schema({
  uid: { type: mongoose.Schema.Types.ObjectId, required: true },
});

const Session = mongoose.model('Session', sessionSchema);

const joiRefreshTokensSchema = Joi.object({
  sid: Joi.string()
    .custom((value, helpers) => {
      const isValidObjectId = mongoose.Types.ObjectId.isValid(value);
      if (!isValidObjectId) {
        return helpers.message({
          custom: "Invalid 'sid'. Must be a MongoDB ObjectId",
        });
      }
      return value;
    })
    .required(),
});

module.exports = {
  User,
  joiSchemaRegister,
  joiSchemaLogin,
  Session,
  joiRefreshTokensSchema,
};
