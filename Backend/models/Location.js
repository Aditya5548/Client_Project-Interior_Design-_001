const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema(
  {
    city: {
      type: String,
      required: true,
    },

    state: {
      type: String,
      required: true,
    },

    country: {
      type: String,
      default: "India",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Location",
  locationSchema
);