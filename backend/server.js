require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const employeeRoutes = require("./routes/employeeRoutes");

  
const app = express();
app.use(express.json());

app.use(cors({
    origin: "http://localhost:3000", // Allow frontend
    credentials: true, // Allow cookies if needed
  }));

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/employee", employeeRoutes);

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
