import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaHeart,
  FaTrash,
  FaShoppingCart,
} from "react-icons/fa";
import toast from "react-hot-toast";

import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import PageHeader from "../components/PageHeader";
import { getImageUrl } from "../utils/image";

function Wishlist() {
  const { wishlist, addToWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success("Added to Cart");
  };

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-slate-100">
        <PageHeader
          title="Wishlist"
          subtitle="Your favourite products will appear here."
          breadcrumb={[
            {
              name: "Wishlist",
            },
          ]}
        />

        <div className="max-w-5xl mx-auto py-24 text-center">

          <FaHeart className="mx-auto text-8xl text-gray-300" />

          <h2 className="text-4xl font-bold mt-8">
            Your Wishlist is Empty
          </h2>

          <p className="text-gray-500 mt-4">
            Save products to buy them later.
          </p>

          <Link
            to="/products"
            className="inline-block mt-8 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl"
          >
            Browse Products
          </Link>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">

      <PageHeader
        title="My Wishlist"
        subtitle="Products you've saved for later."
        breadcrumb={[
          {
            name: "Wishlist",
          },
        ]}
      />

      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

          {wishlist.map((product) => (

            <motion.div
              key={product._id}
              whileHover={{ y: -8 }}
              className="bg-white rounded-3xl shadow-lg overflow-hidden"
            >

              <img
                src={getImageUrl(product.image)}
                alt={product.name}
                className="h-64 w-full object-cover"
              />

              <div className="p-6">

                <h2 className="text-xl font-bold line-clamp-1">
                  {product.name}
                </h2>

                <p className="text-gray-500 mt-2">
                  {product.category}
                </p>

                <h3 className="text-2xl font-bold text-indigo-600 mt-4">
                  ₹{product.price}
                </h3>

                <div className="flex gap-3 mt-6">

                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-3 flex justify-center items-center gap-2"
                  >
                    <FaShoppingCart />
                    Cart
                  </button>

                  <button
                    onClick={() => {
                      addToWishlist(product);
                      toast.success("Removed from Wishlist");
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 rounded-xl"
                  >
                    <FaTrash />
                  </button>

                </div>

                <Link
                  to={`/product/${product._id}`}
                  className="block text-center border mt-4 rounded-xl py-3 hover:bg-gray-100"
                >
                  View Product
                </Link>

              </div>

            </motion.div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default Wishlist;