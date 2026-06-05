const Service = require("../models/Service");
require("../models/User");
require("../models/Role");
require("../models/Permission");
require("../models/Category");
require("../models/Location");
require("../models/Service");
require("../models/Booking");

exports.createService =
  async (req, res) => {
    const service =
      await Service.create(
        req.body
      );

    res.status(201).json(service);
  };

exports.getServices =
  async (req, res) => {
    const services =
      await Service.find()
        .populate("category")
        .populate("locations");

    res.json(services);
  };

exports.getService =
  async (req, res) => {
    const service =
      await Service.findById(
        req.params.id
      );

    res.json(service);
  };

exports.updateService =
  async (req, res) => {
    const service =
      await Service.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.json(service);
  };

exports.deleteService =
  async (req, res) => {
    await Service.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Deleted"
    });
  };