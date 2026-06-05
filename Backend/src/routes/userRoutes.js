const express = require("express");

const router = express.Router();

const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getProfile,
  updateProfile,
  changePassword,
} = require(
  "../../controllers/userController"
);

// Admin Routes

router.get("/", getUsers);

router.get("/:id", getUserById);

router.post("/", createUser);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

// User Profile Routes

router.get(
  "/profile/me",
  getProfile
);

router.put(
  "/profile/me",
  updateProfile
);

router.put(
  "/change-password",
  changePassword
);

module.exports = router;