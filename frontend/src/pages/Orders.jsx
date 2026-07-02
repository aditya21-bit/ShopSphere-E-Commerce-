import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaBox,
  FaTruck,
  FaShoppingCart,
  FaEye,
  FaRedo,
} from "react-icons/fa";

import API from "../services/api";
import toast from "react-hot-toast";
import { getImageUrl } from "../utils/image";
import PageHeader from "../components/PageHeader";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await API.get("/orders");

      setOrders(data);
    } catch (error) {
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700";

      case "Shipped":
        return "bg-blue-100 text-blue-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">

        <div className="text-center">

          <div className="animate-spin rounded-full h-14 w-14 border-4 border-indigo-600 border-t-transparent mx-auto"></div>

          <p className="mt-5 text-lg">
            Loading Orders...
          </p>

        </div>

      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-slate-100">

        <PageHeader
          title="My Orders"
          subtitle="Track all your purchases in one place."
          breadcrumb={[
            {
              name: "Orders",
            },
          ]}
        />

        <div className="max-w-5xl mx-auto py-24 text-center">

          <FaBox className="mx-auto text-8xl text-gray-300" />

          <h2 className="text-4xl font-bold mt-8">
            No Orders Yet
          </h2>

          <p className="text-gray-500 mt-4">
            Looks like you haven't purchased anything.
          </p>

          <Link
            to="/products"
            className="inline-flex items-center gap-3 mt-10 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl"
          >
            <FaShoppingCart />

            Start Shopping

          </Link>

        </div>

      </div>
    );
  }

  return (
  <div className="min-h-screen bg-slate-100">

    <PageHeader
      title="My Orders"
      subtitle="Track all your purchases in one place."
      breadcrumb={[
        {
          name: "Orders",
        },
      ]}
    />

    <div className="max-w-7xl mx-auto px-6 py-16">

      <div className="space-y-10">

        {orders.map((order) => (

          <motion.div
            key={order._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-xl overflow-hidden"
          >

            {/* Header */}

            <div className="bg-slate-50 border-b px-8 py-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">

              <div>

                <h2 className="text-2xl font-bold">
                  Order #{order._id.slice(-6)}
                </h2>

                <p className="text-gray-500 mt-1">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>

              </div>

              <span
                className={`px-5 py-2 rounded-full font-semibold ${getStatusColor(
                  order.status
                )}`}
              >
                <FaTruck className="inline mr-2" />
                {order.status}
              </span>

            </div>

            {/* Products */}

            <div className="p-8">

              <div className="space-y-6">

                {order.items.map((item, index) => (

                  <div
                    key={index}
                    className="flex flex-col md:flex-row gap-6 border rounded-2xl p-5"
                  >

                    <img
                      src={getImageUrl(item.image)}
                      alt={item.name}
                      className="w-32 h-32 rounded-2xl object-cover border"
                    />

                    <div className="flex-1">

                      <h3 className="text-xl font-bold">
                        {item.name}
                      </h3>

                      <p className="text-gray-500 mt-2">
                        Quantity : {item.quantity}
                      </p>

                      <h4 className="text-indigo-600 text-2xl font-bold mt-4">
                        ₹{item.price}
                      </h4>

                    </div>

                    <div className="flex flex-col justify-between">

                      <Link
                        to={`/product/${item.product}`}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl flex items-center gap-2 transition"
                      >
                        <FaEye />
                        View Product
                      </Link>

                      <Link
                        to={`/product/${item.product}`}
                        className="border border-indigo-600 text-indigo-600 px-5 py-3 rounded-xl flex items-center gap-2 hover:bg-indigo-50 transition mt-3"
                      >
                        <FaRedo />
                        Buy Again
                      </Link>

                    </div>

                  </div>

                ))}

              </div>

                            {/* Order Footer */}

              <div className="grid md:grid-cols-2 gap-8 mt-10">

                {/* Shipping Address */}

                <div className="bg-slate-50 rounded-2xl p-6">

                  <h3 className="text-xl font-bold mb-4">
                    Shipping Address
                  </h3>

                  <p className="text-gray-600 whitespace-pre-line leading-7">
                    {order.shippingAddress}
                  </p>

                </div>

                {/* Order Summary */}

                <div className="bg-slate-50 rounded-2xl p-6">

                  <h3 className="text-xl font-bold mb-4">
                    Order Summary
                  </h3>

                  <div className="space-y-4">

                    <div className="flex justify-between">

                      <span className="text-gray-500">
                        Total Items
                      </span>

                      <span className="font-semibold">
                        {order.items.reduce(
                          (sum, item) => sum + item.quantity,
                          0
                        )}
                      </span>

                    </div>

                    <div className="flex justify-between">

                      <span className="text-gray-500">
                        Payment Method
                      </span>

                      <span className="font-semibold">
                        {order.paymentMethod}
                      </span>

                    </div>

                    <div className="flex justify-between">

                      <span className="text-gray-500">
                        Status
                      </span>

                      <span className="font-semibold">
                        {order.status}
                      </span>

                    </div>

                    <hr />

                    <div className="flex justify-between text-2xl font-bold">

                      <span>Total Paid</span>

                      <span className="text-indigo-600">
                        ₹{order.totalAmount}
                      </span>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </motion.div>

        ))}

      </div>

    </div>

  </div>
);
}

export default Orders;