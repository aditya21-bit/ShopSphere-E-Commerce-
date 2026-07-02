import { motion } from "framer-motion";
import {
  FaTrash,
  FaMinus,
  FaPlus,
  FaArrowLeft,
  FaShoppingBag,
  FaTag,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import PageHeader from "../components/PageHeader";

function Cart() {
  const {
    cartItems,
    cartTotal,
    removeFromCart,
    increaseQty,
    decreaseQty,
    clearCart,
  } = useCart();

  const shipping = cartTotal > 999 ? 0 : 99;

  const grandTotal = cartTotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-slate-100">

        <PageHeader
          title="Shopping Cart"
          subtitle="Your selected products will appear here."
          breadcrumb={[
            {
              name: "Cart",
            },
          ]}
        />

        <div className="max-w-4xl mx-auto py-24 text-center">

          <FaShoppingBag
            className="mx-auto text-8xl text-gray-300"
          />

          <h2 className="text-4xl font-bold mt-8">
            Your Cart is Empty
          </h2>

          <p className="text-gray-500 mt-4">
            Looks like you haven't added anything yet.
          </p>

          <Link
            to="/products"
            className="inline-flex items-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl mt-10"
          >
            <FaArrowLeft />
            Continue Shopping
          </Link>

        </div>

      </div>
    );
  }

    return (
    <div className="min-h-screen bg-slate-100">

      <PageHeader
        title="Shopping Cart"
        subtitle="Review your selected products before checkout."
        breadcrumb={[
          {
            name: "Cart",
          },
        ]}
      />

      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Cart Items */}

          <div className="lg:col-span-2 space-y-6">

            <div className="flex justify-between items-center">

              <h2 className="text-3xl font-bold">
                Cart Items
              </h2>

              <button
                onClick={clearCart}
                className="text-red-500 hover:text-red-700 font-semibold"
              >
                Clear Cart
              </button>

            </div>

            {cartItems.map((item) => (

              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl shadow-lg p-5 flex gap-6"
              >

                <img
                  src={
                    item.image?.startsWith("/uploads")
                      ? `${API.defaults.baseURL.replace("/api", "")}${item.image}`
                      : item.image
                  }
                  alt={item.name}
                  className="w-36 h-36 rounded-2xl object-cover"
                />

                <div className="flex-1">

                  <h2 className="text-2xl font-bold">
                    {item.name}
                  </h2>

                  <p className="text-gray-500 mt-2">
                    {item.category}
                  </p>

                  <h3 className="text-2xl text-indigo-600 font-bold mt-4">
                    ₹{item.price}
                  </h3>

                  <div className="flex items-center gap-4 mt-6">

                    <button
                      onClick={() => decreaseQty(item._id)}
                      className="w-10 h-10 rounded-xl bg-gray-200 hover:bg-gray-300 flex justify-center items-center"
                    >
                      <FaMinus />
                    </button>

                    <span className="font-bold text-xl">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => increaseQty(item._id)}
                      className="w-10 h-10 rounded-xl bg-gray-200 hover:bg-gray-300 flex justify-center items-center"
                    >
                      <FaPlus />
                    </button>

                  </div>

                </div>

                <div className="flex flex-col justify-between items-end">

                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-red-500 hover:text-red-700 text-xl"
                  >
                    <FaTrash />
                  </button>

                  <h2 className="text-2xl font-bold">
                    ₹{item.price * item.quantity}
                  </h2>

                </div>

              </motion.div>

            ))}

          </div>

                    {/* Order Summary */}

          <div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-3xl shadow-xl p-8 sticky top-28"
            >

              <h2 className="text-3xl font-bold mb-8">
                Order Summary
              </h2>

              {/* Coupon */}

              <div className="mb-8">

                <label className="font-semibold">
                  Coupon Code
                </label>

                <div className="flex mt-3">

                  <input
                    type="text"
                    placeholder="Enter Coupon"
                    className="flex-1 border rounded-l-xl px-4 py-3 outline-none"
                  />

                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 rounded-r-xl transition">
                    <FaTag />
                  </button>

                </div>

              </div>

              <div className="space-y-5">

                <div className="flex justify-between">

                  <span className="text-gray-500">
                    Subtotal
                  </span>

                  <span className="font-semibold">
                    ₹{cartTotal}
                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-gray-500">
                    Shipping
                  </span>

                  <span className="font-semibold">
                    {shipping === 0 ? "FREE" : `₹${shipping}`}
                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-gray-500">
                    Tax
                  </span>

                  <span className="font-semibold">
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

              <Link
                to="/checkout"
                className="block text-center bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-4 mt-8 font-semibold transition"
              >
                Proceed to Checkout
              </Link>

              <Link
                to="/products"
                className="block text-center border border-indigo-600 text-indigo-600 rounded-xl py-4 mt-4 hover:bg-indigo-50 transition"
              >
                Continue Shopping
              </Link>

            </motion.div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Cart;