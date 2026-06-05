const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

exports.register = async (req, res) => {
  const user = await User.create(req.body);

  res.status(201).json(user);
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email })
    .populate("role");

  if (!user) {
    return res.status(400).json({
      message: "User Not Found",
    });
  }

  const match = await bcrypt.compare(
    password,
    user.password
  );

  if (!match) {
    return res.status(400).json({
      message: "Wrong Password",
    });
  }

  const token = generateToken(user);

  res.json({
    token,
  });
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(
      req.user.id
    )
      .select("-password")
      .populate("role");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};