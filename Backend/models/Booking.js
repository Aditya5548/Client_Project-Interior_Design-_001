const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service"
    },

    bookingDate: Date,

    amount: Number,

    status: {
      type: String,
      enum: [
        "pending",
        "approved",
        "completed",
        "cancelled"
      ],
      default: "pending"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Booking", schema);