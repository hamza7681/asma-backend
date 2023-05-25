const mongoose = require("mongoose");

const userModel = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    dp: {
      type: String,
      default:
        "https://366icons.com/media/01/profile-avatar-account-icon-16699.png",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("users", userModel);
