import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FaShoppingCart,
  FaStar,
  FaTruck,
  FaUndo,
  FaShieldAlt,
  FaMinus,
  FaPlus,
  FaBolt,
} from "react-icons/fa";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import API from "../services/api";
import { useCart } from "../context/CartContext";
import Breadcrumb from "../components/Breadcrumb";
import Footer from "../components/Footer";

function ProductDetails() {
  const { id } = useParams();

  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);

      const { data } = await API.get(`/products/${id}`);

      setProduct(data);

      const products = await API.get("/products");

      setRelatedProducts(
        products.data
          .filter(
            (p) =>
              p.category === data.category &&
              p._id !== data._id
          )
          .slice(0, 4)
      );

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const increaseQty = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQty = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity,
    });

    toast.success("Added to Cart");
  };

  const handleBuyNow = () => {
    addToCart({
      ...product,
      quantity,
    });

    toast.success("Redirecting to Checkout...");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">

        <div className="text-center">

          <div className="animate-spin rounded-full h-14 w-14 border-4 border-indigo-600 border-t-transparent mx-auto"></div>

          <p className="mt-5 text-lg">
            Loading Product...
          </p>

        </div>

      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex justify-center items-center text-3xl">
        Product Not Found
      </div>
    );
  }

  return (
  <div className="min-h-screen bg-slate-100">

    <Breadcrumb
      items={[
        {
          name: "Products",
          link: "/products",
        },
        {
          name: product.name,
        },
      ]}
    />

    <div className="max-w-7xl mx-auto px-6 pb-20">

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-xl p-8"
      >

        <div className="grid lg:grid-cols-2 gap-12">

          {/* Product Image */}

          <div>

            <img
              src={
                product.image?.startsWith("/uploads")
                  ? `${API.defaults.baseURL.replace("/api", "")}${product.image}`
                  : product.image
              }
              alt={product.name}
              className="w-full h-[550px] object-cover rounded-3xl border"
            />

          </div>

          {/* Product Details */}

          <div>

            <span className="inline-block bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full font-semibold">
              {product.category}
            </span>

            <h1 className="text-5xl font-bold mt-5">
              {product.name}
            </h1>

            <div className="flex items-center gap-2 mt-5">

              <FaStar className="text-yellow-400" />

              <span className="font-semibold">
                {product.rating}
              </span>

            </div>

            <div className="flex items-center gap-5 mt-8">

              <span className="text-5xl font-bold text-indigo-600">
                ₹{product.price}
              </span>

              {product.oldPrice > product.price && (
                <span className="text-2xl text-gray-400 line-through">
                  ₹{product.oldPrice}
                </span>
              )}

            </div>

            <p className="mt-8 text-gray-600 leading-8">
              {product.description}
            </p>

            <div className="mt-8">

              <h3 className="font-semibold mb-4">
                Quantity
              </h3>

              <div className="flex items-center gap-5">

                <button
                  onClick={decreaseQty}
                  className="bg-gray-200 hover:bg-gray-300 h-12 w-12 rounded-xl flex items-center justify-center"
                >
                  <FaMinus />
                </button>

                <span className="text-2xl font-bold">
                  {quantity}
                </span>

                <button
                  onClick={increaseQty}
                  className="bg-gray-200 hover:bg-gray-300 h-12 w-12 rounded-xl flex items-center justify-center"
                >
                  <FaPlus />
                </button>

              </div>

            </div>

            <p className="mt-8 text-lg">
              <strong>Stock:</strong> {product.stock}
            </p>

            <div className="flex gap-5 mt-10">

              <button
                onClick={handleAddToCart}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl py-4 flex justify-center items-center gap-3 transition"
              >
                <FaShoppingCart />
                Add To Cart
              </button>

              <Link
                to="/checkout"
                onClick={handleBuyNow}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl py-4 flex justify-center items-center gap-3 transition"
              >
                <FaBolt />
                Buy Now
              </Link>

            </div>

            <div className="mt-12 space-y-5">

              <div className="flex items-center gap-4">

                <FaTruck className="text-indigo-600 text-xl" />

                <span>Free Delivery Available</span>

              </div>

              <div className="flex items-center gap-4">

                <FaUndo className="text-green-600 text-xl" />

                <span>7 Days Easy Return</span>

              </div>

              <div className="flex items-center gap-4">

                <FaShieldAlt className="text-purple-600 text-xl" />

                <span>100% Secure Payment</span>

              </div>

            </div>

          </div>

        </div>

      </motion.div>

              {/* Description & Specifications */}

        <div className="grid lg:grid-cols-3 gap-8 mt-12">

          <div className="lg:col-span-2 bg-white rounded-3xl shadow-xl p-8">

            <h2 className="text-3xl font-bold mb-6">
              Product Description
            </h2>

            <p className="text-gray-600 leading-8">
              {product.description}
            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8">

            <h2 className="text-2xl font-bold mb-6">
              Specifications
            </h2>

            <div className="space-y-5">

              <div className="flex justify-between">

                <span className="text-gray-500">
                  Category
                </span>

                <span className="font-semibold">
                  {product.category}
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-gray-500">
                  Rating
                </span>

                <span className="font-semibold">
                  ⭐ {product.rating}
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-gray-500">
                  Stock
                </span>

                <span className="font-semibold">
                  {product.stock}
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-gray-500">
                  Price
                </span>

                <span className="font-semibold">
                  ₹{product.price}
                </span>

              </div>

            </div>

          </div>

        </div>

        {/* Related Products */}

        {relatedProducts.length > 0 && (

          <div className="mt-20">

            <div className="flex justify-between items-center mb-8">

              <h2 className="text-4xl font-bold">
                Related Products
              </h2>

              <Link
                to="/products"
                className="text-indigo-600 font-semibold hover:underline"
              >
                View All →
              </Link>

            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

              {relatedProducts.map((item) => (

                <Link
                  key={item._id}
                  to={`/product/${item._id}`}
                  className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition"
                >

                  <img
                    src={
                      item.image?.startsWith("/uploads")
                        ? `${API.defaults.baseURL.replace("/api", "")}${item.image}`
                        : item.image
                    }
                    alt={item.name}
                    className="h-56 w-full object-cover"
                  />

                  <div className="p-5">

                    <h3 className="font-bold line-clamp-1">
                      {item.name}
                    </h3>

                    <p className="text-indigo-600 mt-2 font-semibold">
                      ₹{item.price}
                    </p>

                  </div>

                </Link>

              ))}

            </div>

          </div>

        )}

      </div>

    </div>
  );
}

export default ProductDetails;