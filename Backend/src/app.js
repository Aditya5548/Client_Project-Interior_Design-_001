const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const locationRoutes = require("./routes/locationRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
// const bookingRoutes = require("./routes/bookingRoutes");
// const permissionRoutes = require("./routes/permissionRoutes");
// const roleRoutes = require("./routes/roleRoutes");

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/locations",locationRoutes);
app.use("/api/categories",categoryRoutes);

// app.use("/api/roles", roleRoutes);
// app.use("/api/permissions", permissionRoutes);
// app.use("/api/bookings", bookingRoutes);

module.exports = app;