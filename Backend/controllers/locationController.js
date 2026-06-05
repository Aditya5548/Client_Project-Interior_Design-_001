const Location = require("../models/Location");

exports.getLocations = async (req, res) => {
  try {
    const locations = await Location.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: locations.length,
      locations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getLocationById = async (
  req,
  res
) => {
  try {
    const location =
      await Location.findById(
        req.params.id
      );

    if (!location) {
      return res.status(404).json({
        success: false,
        message: "Location not found",
      });
    }

    res.status(200).json({
      success: true,
      location,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.createLocation = async (
  req,
  res
) => {
  try {
    const {
      city,
      state,
      country,
    } = req.body;

    const existingLocation =
      await Location.findOne({
        city,
        state,
      });

    if (existingLocation) {
      return res.status(400).json({
        success: false,
        message:
          "Location already exists",
      });
    }

    const location =
      await Location.create({
        city,
        state,
        country,
      });

    res.status(201).json({
      success: true,
      message:
        "Location created successfully",
      location,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateLocation = async (
  req,
  res
) => {
  try {
    const location =
      await Location.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    if (!location) {
      return res.status(404).json({
        success: false,
        message: "Location not found",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Location updated successfully",
      location,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteLocation = async (
  req,
  res
) => {
  try {
    const location =
      await Location.findByIdAndDelete(
        req.params.id
      );

    if (!location) {
      return res.status(404).json({
        success: false,
        message: "Location not found",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Location deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};