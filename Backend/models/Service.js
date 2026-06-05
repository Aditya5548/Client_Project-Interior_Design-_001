const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    title: String,

    slug: String,

    description: String,

    price: Number,

    image: String,

    availability: {
      type: Boolean,
      default: true
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category"
    },

    locations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Location"
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Service", schema);