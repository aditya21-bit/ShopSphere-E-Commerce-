import { motion } from "framer-motion";
import {
  FaHeart,
  FaRegHeart,
  FaStar,
  FaShoppingCart,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { getImageUrl } from "../utils/image";
import toast from "react-hot-toast";

function ProductCard({ product }) {
  const { addToWishlist, isWishlisted } = useWishlist();

  return (
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
      className="group bg-white rounded-3xl shadow-md overflow-hidden hover:shadow-2xl"
    >
      {/* Product Image */}
      <div className="relative">
        <img
          src={getImageUrl(product.image)}
          alt={product.name}
          className="h-72 w-full object-cover group-hover:scale-110 transition duration-700"
        />

        {/* Discount Badge */}
        {product.oldPrice > product.price && (
          <span className="absolute top-4 left-4 bg-red-500 text-white text-xs px-3 py-1 rounded-full">
            Sale
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();

            const alreadyWishlisted = isWishlisted(product._id);

            addToWishlist(product);

            toast.success(
              alreadyWishlisted
                ? "Removed from Wishlist"
                : "Added to Wishlist"
            );
          }}
          className="absolute top-4 right-4 bg-white p-3 rounded-full shadow hover:scale-110 transition"
        >
          {isWishlisted(product._id) ? (
            <FaHeart className="text-red-500" />
          ) : (
            <FaRegHeart className="text-gray-600" />
          )}
        </button>
      </div>

      {/* Product Details */}
      <div className="p-6">
        <p className="text-indigo-600 text-sm font-medium">
          {product.category}
        </p>

        <h3 className="text-xl font-bold mt-2 line-clamp-1">
          {product.name}
        </h3>

        <div className="flex items-center gap-2 mt-2">
          <FaStar className="text-yellow-400" />
          <span>{product.rating}</span>
        </div>

        <div className="flex items-center gap-3 mt-4">
          <span className="text-2xl font-bold text-gray-900">
            ₹{product.price}
          </span>

          {product.oldPrice > product.price && (
            <span className="line-through text-gray-400">
              ₹{product.oldPrice}
            </span>
          )}
        </div>

        {/* Buttons */}
        <div className="mt-6 flex gap-3">
          <Link
            to={`/product/${product._id}`}
            className="flex-1 text-center border border-gray-300 rounded-full py-3 hover:bg-gray-100 transition"
          >
            View
          </Link>

          <button className="flex-1 bg-indigo-600 text-white rounded-full py-3 flex items-center justify-center gap-2 hover:bg-indigo-700 transition">
            <FaShoppingCart />
            Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default ProductCard;