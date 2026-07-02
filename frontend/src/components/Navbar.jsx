import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBars,
  FaTimes,
  FaShoppingCart,
  FaUserCircle,
  FaSearch,
} from "react-icons/fa";
import toast from "react-hot-toast";
import { FaHeart } from "react-icons/fa";
import { useWishlist } from "../context/WishlistContext";

import API from "../services/api";
import { useCart } from "../context/CartContext";
import { getImageUrl } from "../utils/image";

function Navbar() {
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const { wishlist } = useWishlist();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(null);

  // Search States
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);

  // Navbar Scroll + User
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);

    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Live Search (300ms Delay)
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (!search.trim()) {
        setResults([]);
        setShowResults(false);
        return;
      }

      try {
        setSearchLoading(true);

        const { data } = await API.get(
          `/products/search/${search}`
        );

        setResults(data);
        setShowResults(true);
      } catch (error) {
        console.log(error);
      } finally {
        setSearchLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);

    toast.success("Logged out successfully");

    navigate("/");
  };

  const navClass = ({ isActive }) =>
    isActive
      ? "text-indigo-600 font-semibold"
      : "text-gray-700 hover:text-indigo-600 transition";

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled
          ? "bg-white/90 backdrop-blur-lg shadow-lg"
          : "bg-transparent"
          }`}
      >
        <div className="max-w-7xl mx-auto h-20 flex items-center justify-between px-6">

          {/* Logo */}
          <Link
            to="/"
            className="text-3xl font-extrabold text-indigo-600 tracking-tight flex-shrink-0"
          >
            ShopSphere
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-10 ml-16 flex-shrink-0">
            <NavLink to="/" className={navClass}>
              Home
            </NavLink>

            <NavLink to="/products" className={navClass}>
              Products
            </NavLink>

            <NavLink to="/orders" className={navClass}>
              Orders
            </NavLink>

            <NavLink to="/profile" className={navClass}>
              Profile
            </NavLink>
          </div>

          {/* Search Starts Here */}

          <div className="hidden xl:block relative flex-1 max-w-md mx-14">

            <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">

              <FaSearch className="text-gray-500" />

              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent outline-none ml-3 w-full text-sm"
              />

            </div>

            {showResults && (
              <div className="absolute mt-2 w-full bg-white rounded-2xl shadow-xl max-h-96 overflow-y-auto z-50">

                {searchLoading ? (

                  <div className="p-5 text-center text-gray-500">
                    Searching...
                  </div>

                ) : results.length === 0 ? (

                  <div className="p-5 text-center text-gray-500">
                    No products found
                  </div>

                ) : (

                  results.map((product) => (

                    <div
                      key={product._id}
                      onClick={() => {
                        navigate(`/product/${product._id}`);
                        setSearch("");
                        setShowResults(false);
                      }}
                      className="flex items-center gap-4 p-4 hover:bg-gray-100 cursor-pointer transition"
                    >

                      <img
                        src={getImageUrl(product.image)}
                        alt={product.name}
                        className="w-14 h-14 rounded-xl object-cover"
                      />

                      <div className="flex-1">

                        <h3 className="font-semibold">
                          {product.name}
                        </h3>

                        <p className="text-indigo-600 font-semibold">
                          ₹{product.price}
                        </p>

                      </div>

                    </div>

                  ))

                )}

              </div>
            )}

          </div>

          {/* Right Side */}
          <div className="hidden lg:flex items-center gap-5 flex-shrink-0 ml-auto">
            <Link
              to="/wishlist"
              className="relative text-2xl hover:text-red-500 transition"
            >
              <FaHeart />

              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative text-2xl hover:text-indigo-600 transition"
            >
              <FaShoppingCart />

              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs h-5 w-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>

            </Link>

            {user ? (
              <>
                {user.role === "admin" && (
                  <Link
                    to="/admin"
                    className="bg-slate-900 text-white px-5 py-2 rounded-full hover:bg-black transition"
                  >
                    Dashboard
                  </Link>
                )}

                <div className="flex items-center gap-2 text-indigo-600 font-semibold">

                  <FaUserCircle size={24} />

                  <span className="max-w-[120px] truncate">
                    {user.name}
                  </span>

                </div>

                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-6 py-2.5 rounded-full hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="border border-indigo-600 text-indigo-600 px-6 py-2.5 rounded-full hover:bg-indigo-600 hover:text-white transition"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="bg-indigo-600 text-white px-6 py-2.5 rounded-full hover:bg-indigo-700 transition"
                >
                  Register
                </Link>
              </>
            )}

          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-3xl"
            onClick={() => setIsOpen(true)}
          >
            <FaBars />
          </button>

        </div>
      </motion.nav>

      {/* Mobile Sidebar */}
      <AnimatePresence>

        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ x: 300 }}
              animate={{ x: 0 }}
              exit={{ x: 300 }}
              transition={{ duration: 0.3 }}
              className="fixed right-0 top-0 h-full w-72 bg-white z-50 p-6"
            >

              <div className="flex justify-between items-center mb-10">

                <h2 className="text-2xl font-bold text-indigo-600">
                  Menu
                </h2>

                <button onClick={() => setIsOpen(false)}>
                  <FaTimes size={24} />
                </button>

              </div>

              <div className="flex flex-col gap-6 text-lg">

                <NavLink to="/" onClick={() => setIsOpen(false)}>
                  Home
                </NavLink>

                <NavLink to="/products" onClick={() => setIsOpen(false)}>
                  Products
                </NavLink>

                <NavLink to="/orders" onClick={() => setIsOpen(false)}>
                  Orders
                </NavLink>

                <NavLink to="/profile" onClick={() => setIsOpen(false)}>
                  Profile
                </NavLink>

                <NavLink to="/cart" onClick={() => setIsOpen(false)}>
                  Cart
                </NavLink>

                {user ? (
                  <>
                    {user.role === "admin" && (
                      <NavLink to="/admin" onClick={() => setIsOpen(false)}>
                        Dashboard
                      </NavLink>
                    )}

                    <p className="font-bold text-indigo-600">
                      {user.name}
                    </p>

                    <button
                      onClick={handleLogout}
                      className="text-left text-red-500"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <NavLink to="/login" onClick={() => setIsOpen(false)}>
                      Login
                    </NavLink>

                    <NavLink to="/register" onClick={() => setIsOpen(false)}>
                      Register
                    </NavLink>
                  </>
                )}

              </div>

            </motion.div>

          </>
        )}

      </AnimatePresence>

    </>
  );
}

export default Navbar;