const Product = require("../models/Product");
const Order = require("../models/Order");
const User = require("../models/User");

const getDashboardStats = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();

    const totalUsers = await User.countDocuments();

    const totalOrders = await Order.countDocuments();

    const orders = await Order.find();

    const totalRevenue = orders.reduce(
      (sum, order) => sum + order.totalAmount,
      0
    );

    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5);

    const lowStockProducts = await Product.find({
      stock: { $lte: 5 },
    }).limit(5);

    // Monthly Orders
const monthlyData = await Order.aggregate([
  {
    $group: {
      _id: { $month: "$createdAt" },
      orders: { $sum: 1 },
      revenue: { $sum: "$totalAmount" },
    },
  },
  {
    $sort: { "_id": 1 },
  },
]);

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const salesChart = monthlyData.map((item) => ({
  month: monthNames[item._id - 1],
  orders: item.orders,
  revenue: item.revenue,
}));

    res.json({
  success: true,
  totalProducts,
  totalUsers,
  totalOrders,
  totalRevenue,
  recentOrders,
  lowStockProducts,
  salesChart,
});
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};