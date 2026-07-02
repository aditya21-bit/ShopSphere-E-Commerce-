import { motion } from "framer-motion";
import { FaShoppingBag, FaShoppingCart, FaStore } from "react-icons/fa";

function SplashScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 flex flex-col justify-center items-center"
    >
      {/* Floating Icons */}
      <motion.div
        animate={{ y: [-20, 20, -20], rotate: [0, 15, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
        className="absolute top-20 left-16 text-white/20 text-7xl"
      >
        <FaShoppingBag />
      </motion.div>

      <motion.div
        animate={{ y: [20, -20, 20], rotate: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 5 }}
        className="absolute bottom-24 right-20 text-white/20 text-7xl"
      >
        <FaShoppingCart />
      </motion.div>

      <motion.div
        animate={{ x: [-20, 20, -20] }}
        transition={{ repeat: Infinity, duration: 7 }}
        className="absolute top-40 right-40 text-white/20 text-6xl"
      >
        <FaStore />
      </motion.div>

      {/* Logo */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 0.8,
          type: "spring",
        }}
        className="text-center"
      >
        <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center shadow-2xl mx-auto">
          <FaShoppingBag className="text-6xl text-indigo-600" />
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-6xl font-extrabold text-white mt-8"
        >
          ShopSphere
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-xl text-gray-200 mt-4"
        >
          Premium Shopping Experience
        </motion.p>
      </motion.div>

      {/* Spinner */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 1,
          ease: "linear",
        }}
        className="mt-12 w-16 h-16 rounded-full border-4 border-white border-t-transparent"
      />

      <motion.p
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{
          repeat: Infinity,
          duration: 2,
        }}
        className="text-white mt-6 tracking-widest"
      >
        Loading your shopping experience...
      </motion.p>
    </motion.div>
  );
}

export default SplashScreen;