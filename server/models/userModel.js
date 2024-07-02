const mongoose = require("mongoose");
const validator = require("validator");
const userRoles = require("../utils/userRoles");

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },

    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      validate: [validator.isEmail, "please enter correct Email"],
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: false,
    },

    token: { type: String },
    role: {
      type: String, // ["USER", "ADMIN", "MANGER"]
      enum: [
        userRoles.USER,
        userRoles.ADMIN,
        userRoles.MANGER,
        userRoles.SELLER,
      ],
      default: userRoles.USER,
    },
    isAccountVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
