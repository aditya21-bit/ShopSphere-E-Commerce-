import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-cyan-500 text-white min-h-screen flex items-center">
      {/* Background Blur */}
      <div className="absolute w-96 h-96 bg-pink-400/20 rounded-full blur-3xl -top-20 -left-20"></div>
      <div className="absolute w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl bottom-0 right-0"></div>

      <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">

        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
            🚀 New Collection 2026
          </span>

          <h1 className="mt-6 text-5xl md:text-7xl font-black leading-tight">
            Discover <br />
            Premium Shopping
          </h1>

          <p className="mt-6 text-lg text-gray-200 max-w-lg">
            Shop electronics, fashion, lifestyle and much more
            with secure payments and fast delivery.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/products"
              className="bg-white text-indigo-700 px-8 py-4 rounded-full font-bold hover:scale-105 transition"
            >
              Shop Now
            </Link>

            <button className="border border-white px-8 py-4 rounded-full hover:bg-white hover:text-indigo-700 transition">
              Explore
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-14">
            <div>
              <h2 className="text-3xl font-bold">10K+</h2>
              <p>Customers</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold">500+</h2>
              <p>Products</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold">99%</h2>
              <p>Satisfaction</p>
            </div>
          </div>
        </motion.div>

        {/* Right */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative flex justify-center"
        >
          <img
            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700"
            alt="Hero Product"
            className="rounded-3xl shadow-2xl w-full max-w-md"
          />

          <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="absolute -left-8 top-12 bg-white text-black p-4 rounded-2xl shadow-xl"
          >
            ⭐ 4.9 Rating
          </motion.div>

          <motion.div
            animate={{ y: [10, -10, 10] }}
            transition={{ repeat: Infinity, duration: 5 }}
            className="absolute -right-6 bottom-10 bg-white text-black p-4 rounded-2xl shadow-xl"
          >
            🚚 Fast Delivery
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}

export default Hero;