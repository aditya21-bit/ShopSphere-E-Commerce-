import { useEffect, useState } from "react";
import API from "../services/api";
import { motion } from "framer-motion";
import {
  FaBoxOpen,
  FaUsers,
  FaShoppingCart,
  FaRupeeSign,
} from "react-icons/fa";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const { data } = await API.get("/dashboard");
      setStats(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-2xl font-bold">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <h1 className="text-4xl font-bold mb-10">
        Dashboard
      </h1>

      {/* Statistics */}

      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">

        <StatCard
          title="Products"
          value={stats.totalProducts}
          icon={<FaBoxOpen />}
          color="bg-blue-500"
        />

        <StatCard
          title="Users"
          value={stats.totalUsers}
          icon={<FaUsers />}
          color="bg-green-500"
        />

        <StatCard
          title="Orders"
          value={stats.totalOrders}
          icon={<FaShoppingCart />}
          color="bg-orange-500"
        />

        <StatCard
          title="Revenue"
          value={`₹${stats.totalRevenue}`}
          icon={<FaRupeeSign />}
          color="bg-purple-500"
        />

      </div>

      {/* Tables */}

      <div className="grid lg:grid-cols-2 gap-8 mt-10">


        <div className="grid lg:grid-cols-2 gap-8 mt-10">

  {/* Revenue Chart */}

  <div className="bg-white rounded-3xl shadow-lg p-6">

    <h2 className="text-2xl font-bold mb-6">
      Monthly Revenue
    </h2>

    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={stats.salesChart}>

        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="month" />

        <YAxis />

        <Tooltip />

        <Line
          type="monotone"
          dataKey="revenue"
          stroke="#4F46E5"
          strokeWidth={3}
        />

      </LineChart>
    </ResponsiveContainer>

  </div>

  {/* Orders Chart */}

  <div className="bg-white rounded-3xl shadow-lg p-6">

    <h2 className="text-2xl font-bold mb-6">
      Monthly Orders
    </h2>

    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={stats.salesChart}>

        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="month" />

        <YAxis />

        <Tooltip />

        <Bar
          dataKey="orders"
          fill="#10B981"
        />

      </BarChart>
    </ResponsiveContainer>

  </div>

</div>

        {/* Recent Orders */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-3xl shadow-lg p-6"
        >

          <h2 className="text-2xl font-bold mb-6">
            Recent Orders
          </h2>

          <div className="space-y-4">

            {stats.recentOrders.length === 0 && (
              <p>No Orders</p>
            )}

            {stats.recentOrders.map((order) => (

              <div
                key={order._id}
                className="flex justify-between border-b pb-3"
              >

                <div>

                  <h3 className="font-semibold">
                    #{order._id.slice(-6)}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>

                </div>

                <div className="font-bold">
                  ₹{order.totalAmount}
                </div>

              </div>

            ))}

          </div>

        </motion.div>

        {/* Low Stock */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-3xl shadow-lg p-6"
        >

          <h2 className="text-2xl font-bold mb-6">
            Low Stock Products
          </h2>

          <div className="space-y-4">

            {stats.lowStockProducts.length === 0 && (
              <p>Everything is well stocked.</p>
            )}

            {stats.lowStockProducts.map((product) => (

              <div
                key={product._id}
                className="flex justify-between border-b pb-3"
              >

                <div>

                  <h3 className="font-semibold">
                    {product.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {product.category}
                  </p>

                </div>

                <div className="text-red-500 font-bold">
                  {product.stock}
                </div>

              </div>

            ))}

          </div>

        </motion.div>

      </div>

    </div>
  );
}

function StatCard({ title, value, icon, color }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`${color} text-white rounded-3xl p-6 shadow-lg`}
    >

      <div className="flex justify-between items-center">

        <div>

          <p className="text-lg">
            {title}
          </p>

          <h2 className="text-4xl font-bold mt-3">
            {value}
          </h2>

        </div>

        <div className="text-5xl opacity-80">
          {icon}
        </div>

      </div>

    </motion.div>
  );
}

export default Dashboard;