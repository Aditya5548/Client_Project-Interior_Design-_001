exports.authorizeRoles =
  (...roles) =>
  (req, res, next) => {
    if (
      !roles.includes(req.user.roleName)
    ) {
      return res.status(403).json({
        message: "Access Denied"
      });
    }

    next();
  };