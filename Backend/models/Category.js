const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Category",
  new mongoose.Schema(
    {
      name: String,
      slug: String
    },
    { timestamps: true }
  )
);
