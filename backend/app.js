const express = require("express");
const cors = require("cors");
const path = require("path");
const dashboardRoutes = require("./routes/dashboardRoutes");


const productRoutes = require("./routes/ProductRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/orders", orderRoutes);

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.send("E-Commerce API Running...");
});

module.exports = app;