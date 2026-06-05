const User = require("../models/User");

exports.hasPermission =
  (permission) =>
  async (req, res, next) => {
    const user =
      await User.findById(
        req.user.id
      ).populate({
        path: "role",
        populate: {
          path: "permissions"
        }
      });

    const permissions =
      user.role.permissions.map(
        (p) => p.name
      );

    if (
      !permissions.includes(permission)
    ) {
      return res.status(403).json({
        message:
          "Permission Denied"
      });
    }

    next();
  };