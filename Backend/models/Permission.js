const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Permission",
  new mongoose.Schema(
    {
      name: {
        type: String,
        unique: true
      }
    },
    { timestamps: true }
  )
);