const express = require("express");
const cors = require("cors");
require("dotenv").config();

const menuRoutes = require("./routes/menuRoutes");
const orderRoutes = require("./routes/orderRoutes");
const authRoutes = require("./routes/authRoutes");

const verifyToken = require("./middleware/auth");
const { logRequest } = require("./middleware/logger");

const app = express();

app.use(cors());
app.use(express.json());

app.use(logRequest);

// test route
app.get("/", (req, res) => {
    res.send("Nick Snyder's Pizza Planet API is running!");
});

app.use("/api/auth", authRoutes);

app.use("/api/menu", verifyToken, menuRoutes);
app.use("/api/orders", verifyToken, orderRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});



