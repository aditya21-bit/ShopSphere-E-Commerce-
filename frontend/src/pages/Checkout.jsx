import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaUser,
  FaEnvelope,
  FaMoneyBillWave,
  FaUniversity,
  FaCreditCard,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import API from "../services/api";
import toast from "react-hot-toast";
import PageHeader from "../components/PageHeader";

function Checkout() {
  const navigate = useNavigate();

  const { cartItems, cartTotal, clearCart } = useCart();

  const user = JSON.parse(localStorage.getItem("user"));

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState(
    "Cash on Delivery"
  );

  const shipping = cartTotal > 999 ? 0 : 99;

  const grandTotal = cartTotal + shipping;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = async () => {
    if (
      !form.name ||
      !form.email ||
      !form.phone ||
      !form.address ||
      !form.city ||
      !form.state ||
      !form.pincode
    ) {
      return toast.error("Please fill all fields");
    }

    try {
      const token = localStorage.getItem("token");

      await API.post(
        "/orders",
        {
          items: cartItems.map((item) => ({
            product: item._id,
            name: item.name,
            image: item.image,
            price: item.price,
            quantity: item.quantity,
          })),
          totalAmount: grandTotal,
          shippingAddress: `${form.address},
${form.city},
${form.state},
${form.pincode},
Phone: ${form.phone}`,
          paymentMethod,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Order Placed Successfully 🎉");

      clearCart();

      navigate("/orders");
    } catch (error) {
      toast.error("Failed to place order");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">

      <PageHeader
        title="Checkout"
        subtitle="Complete your purchase securely."
        breadcrumb={[
          {
            name: "Cart",
            link: "/cart",
          },
          {
            name: "Checkout",
          },
        ]}
      />

      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid lg:grid-cols-3 gap-10">

          {/* Shipping Details */}

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 bg-white rounded-3xl shadow-xl p-8"
          >

            <h2 className="text-3xl font-bold mb-8">
              Shipping Information
            </h2>

            <div className="grid md:grid-cols-2 gap-5">

              <div className="relative">

                <FaUser className="absolute top-5 left-4 text-gray-400" />

                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full border rounded-xl pl-12 p-4 outline-none"
                />

              </div>

              <div className="relative">

                <FaEnvelope className="absolute top-5 left-4 text-gray-400" />

                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full border rounded-xl pl-12 p-4 outline-none"
                />

              </div>

              <div className="relative md:col-span-2">

                <FaPhone className="absolute top-5 left-4 text-gray-400" />

                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full border rounded-xl pl-12 p-4 outline-none"
                />

              </div>

              <div className="relative md:col-span-2">

                <FaMapMarkerAlt className="absolute top-5 left-4 text-gray-400" />

                <textarea
                  rows="4"
                  name="address"
                  placeholder="Complete Address"
                  value={form.address}
                  onChange={handleChange}
                  className="w-full border rounded-xl pl-12 pt-4 p-4 outline-none resize-none"
                />

              </div>

              <input
                type="text"
                name="city"
                placeholder="City"
                value={form.city}
                onChange={handleChange}
                className="border rounded-xl p-4"
              />

              <input
                type="text"
                name="state"
                placeholder="State"
                value={form.state}
                onChange={handleChange}
                className="border rounded-xl p-4"
              />

              <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                value={form.pincode}
                onChange={handleChange}
                className="border rounded-xl p-4 md:col-span-2"
              />

            </div>

            {/* Payment */}

            <h2 className="text-3xl font-bold mt-12 mb-6">
              Payment Method
            </h2>

            <div className="space-y-4">

              <label className="flex items-center gap-4 border rounded-xl p-5 cursor-pointer hover:border-indigo-500">

                <input
                  type="radio"
                  checked={paymentMethod === "Cash on Delivery"}
                  onChange={() =>
                    setPaymentMethod("Cash on Delivery")
                  }
                />

                <FaMoneyBillWave className="text-green-600" />

                Cash on Delivery

              </label>

              <label className="flex items-center gap-4 border rounded-xl p-5 cursor-pointer hover:border-indigo-500">

                <input
                  type="radio"
                  checked={paymentMethod === "UPI"}
                  onChange={() =>
                    setPaymentMethod("UPI")
                  }
                />

                <FaUniversity className="text-indigo-600" />

                UPI Payment

              </label>

              <label className="flex items-center gap-4 border rounded-xl p-5 cursor-pointer hover:border-indigo-500">

                <input
                  type="radio"
                  checked={paymentMethod === "Card"}
                  onChange={() =>
                    setPaymentMethod("Card")
                  }
                />

                <FaCreditCard className="text-purple-600" />

                Credit / Debit Card

              </label>

            </div>

          </motion.div>

          {/* Order Summary */}

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-3xl shadow-xl p-8 h-fit sticky top-28"
          >

            <h2 className="text-3xl font-bold mb-8">
              Order Summary
            </h2>

            <div className="space-y-5">

              {cartItems.map((item) => (

                <div
                  key={item._id}
                  className="flex items-center gap-4"
                >

                  <img
                    src={
                      item.image?.startsWith("/uploads")
                        ? `${API.defaults.baseURL.replace("/api", "")}${item.image}`
                        : item.image
                    }
                    alt={item.name}
                    className="w-16 h-16 rounded-xl object-cover"
                  />

                  <div className="flex-1">

                    <h3 className="font-semibold line-clamp-1">
                      {item.name}
                    </h3>

                    <p className="text-gray-500 text-sm">
                      Qty : {item.quantity}
                    </p>

                  </div>

                  <span className="font-bold">
                    ₹{item.price * item.quantity}
                  </span>

                </div>

              ))}

            </div>

            <hr className="my-8" />

            <div className="space-y-4">

              <div className="flex justify-between">

                <span className="text-gray-500">
                  Subtotal
                </span>

                <span>
                  ₹{cartTotal}
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-gray-500">
                  Shipping
                </span>

                <span>
                  {shipping === 0 ? "FREE" : `₹${shipping}`}
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-gray-500">
                  Tax
                </span>

                <span>
                  Included
                </span>

              </div>

              <hr />

              <div className="flex justify-between text-2xl font-bold">

                <span>Total</span>

                <span>
                  ₹{grandTotal}
                </span>

              </div>

            </div>

            {shipping === 0 ? (

              <div className="mt-6 bg-green-100 text-green-700 rounded-xl p-4 text-center font-semibold">

                🎉 Congratulations! You unlocked FREE Shipping.

              </div>

            ) : (

              <div className="mt-6 bg-yellow-100 text-yellow-700 rounded-xl p-4 text-center">

                Add ₹{1000 - cartTotal} more to get FREE Shipping.

              </div>

            )}

            <button
              onClick={handlePlaceOrder}
              className="w-full mt-8 bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl text-lg font-semibold transition"
            >
              Place Order
            </button>

            <button
              onClick={() => navigate("/cart")}
              className="w-full mt-4 border border-indigo-600 text-indigo-600 py-4 rounded-xl hover:bg-indigo-50 transition"
            >
              Back to Cart
            </button>

          </motion.div>

        </div>

      </div>

    </div>
  );

}

export default Checkout;