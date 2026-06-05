const User = require("../models/User");
const bcrypt = require("bcryptjs");

/*
|--------------------------------------------------------------------------
| Get All Users
|--------------------------------------------------------------------------
*/

exports.getUsers = async (
  req,
  res
) => {
  try {
    const users = await User.find()
      .select("-password")
      .populate("role");

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| Get Single User
|--------------------------------------------------------------------------
*/

exports.getUserById = async (
  req,
  res
) => {
  try {
    const user = await User.findById(
      req.params.id
    )
      .select("-password")
      .populate("role");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| Create User
|--------------------------------------------------------------------------
*/

exports.createUser = async (
  req,
  res
) => {
  try {
    const {
      name,
      email,
      phone,
      password,
      role,
    } = req.body;

    const existingUser =
      await User.findOne({
        email,
      });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message:
          "Email already exists",
      });
    }

    const user =
      await User.create({
        name,
        email,
        phone,
        password,
        role,
      });

    res.status(201).json({
      success: true,
      message:
        "User created successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| Update User
|--------------------------------------------------------------------------
*/

exports.updateUser = async (
  req,
  res
) => {
  try {
    const {
      name,
      email,
      phone,
      role,
      isActive,
    } = req.body;

    const user =
      await User.findByIdAndUpdate(
        req.params.id,
        {
          name,
          email,
          phone,
          role,
          isActive,
        },
        {
          new: true,
        }
      );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "User updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| Delete User
|--------------------------------------------------------------------------
*/

exports.deleteUser = async (
  req,
  res
) => {
  try {
    const user =
      await User.findByIdAndDelete(
        req.params.id
      );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| Get Profile
|--------------------------------------------------------------------------
*/

exports.getProfile = async (
  req,
  res
) => {
  try {
    const user = await User.findById(
      req.user.id
    )
      .select("-password")
      .populate("role");

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| Update Profile
|--------------------------------------------------------------------------
*/

exports.updateProfile =
  async (req, res) => {
    try {
      const {
        name,
        phone,
        profileImage,
      } = req.body;

      const user =
        await User.findByIdAndUpdate(
          req.user.id,
          {
            name,
            phone,
            profileImage,
          },
          {
            new: true,
          }
        ).select("-password");

      res.status(200).json({
        success: true,
        message:
          "Profile updated successfully",
        user,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

/*
|--------------------------------------------------------------------------
| Change Password
|--------------------------------------------------------------------------
*/

exports.changePassword =
  async (req, res) => {
    try {
      const {
        oldPassword,
        newPassword,
      } = req.body;

      const user =
        await User.findById(
          req.user.id
        );

      const isMatch =
        await bcrypt.compare(
          oldPassword,
          user.password
        );

      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message:
            "Old password incorrect",
        });
      }

      user.password =
        newPassword;

      await user.save();

      res.status(200).json({
        success: true,
        message:
          "Password changed successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };