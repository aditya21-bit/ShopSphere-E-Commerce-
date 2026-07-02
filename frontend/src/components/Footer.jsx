import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaGithub,
  FaArrowRight,
} from "react-icons/fa";
import toast from "react-hot-toast";

function Footer() {
  const subscribe = (e) => {
    e.preventDefault();
    toast.success("Thanks for subscribing!");
  };

  return (
    <footer className="bg-slate-900 text-gray-300 mt-20">

      {/* Newsletter */}

      <div className="border-b border-slate-700">

        <div className="max-w-7xl mx-auto px-6 py-12 grid lg:grid-cols-2 gap-10 items-center">

          <div>

            <h2 className="text-3xl font-bold text-white">
              Stay Updated
            </h2>

            <p className="mt-3 text-gray-400">
              Subscribe to receive exclusive offers, latest products and shopping updates.
            </p>

          </div>

          <form
            onSubmit={subscribe}
            className="flex flex-col sm:flex-row gap-4"
          >

            <input
              type="email"
              required
              placeholder="Enter your email"
              className="flex-1 px-5 py-4 rounded-xl bg-slate-800 border border-slate-700 outline-none focus:border-indigo-500"
            />

            <button
              className="bg-indigo-600 hover:bg-indigo-700 px-6 rounded-xl flex items-center justify-center gap-2 transition"
            >
              Subscribe
              <FaArrowRight />
            </button>

          </form>

        </div>

      </div>

      {/* Main Footer */}

      <div className="max-w-7xl mx-auto px-6 py-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Logo */}

        <div>

          <h1 className="text-3xl font-bold text-white">
            ShopSphere
          </h1>

          <p className="mt-5 leading-8 text-gray-400">
            ShopSphere is your trusted online shopping destination for premium products,
            fast delivery and secure shopping experience.
          </p>

          <div className="flex gap-4 mt-8">

            <a
              href="#"
              className="bg-slate-800 hover:bg-indigo-600 p-3 rounded-full transition"
            >
              <FaFacebookF />
            </a>

            <a
              href="#"
              className="bg-slate-800 hover:bg-pink-600 p-3 rounded-full transition"
            >
              <FaInstagram />
            </a>

            <a
              href="#"
              className="bg-slate-800 hover:bg-sky-500 p-3 rounded-full transition"
            >
              <FaTwitter />
            </a>

            <a
              href="#"
              className="bg-slate-800 hover:bg-blue-700 p-3 rounded-full transition"
            >
              <FaLinkedinIn />
            </a>

            <a
              href="#"
              className="bg-slate-800 hover:bg-gray-700 p-3 rounded-full transition"
            >
              <FaGithub />
            </a>

          </div>

        </div>

        {/* Quick Links */}

        <div>

          <h2 className="text-xl font-bold text-white mb-6">
            Quick Links
          </h2>

          <div className="space-y-4">

            <Link to="/" className="block hover:text-indigo-400 transition">
              Home
            </Link>

            <Link to="/products" className="block hover:text-indigo-400 transition">
              Products
            </Link>

            <Link to="/cart" className="block hover:text-indigo-400 transition">
              Cart
            </Link>

            <Link to="/orders" className="block hover:text-indigo-400 transition">
              Orders
            </Link>

            <Link to="/profile" className="block hover:text-indigo-400 transition">
              Profile
            </Link>

          </div>

        </div>

        {/* Customer */}

        <div>

          <h2 className="text-xl font-bold text-white mb-6">
            Customer Care
          </h2>

          <div className="space-y-4">

            <p>Help Center</p>

            <p>Shipping Policy</p>

            <p>Return Policy</p>

            <p>Privacy Policy</p>

            <p>Terms & Conditions</p>

            <p>FAQs</p>

          </div>

        </div>

        {/* Contact */}

        <div>

          <h2 className="text-xl font-bold text-white mb-6">
            Contact Us
          </h2>

          <div className="space-y-4">

            <p>📍 Mumbai, Maharashtra</p>

            <p>📞 +91 XXXXX XXXXX</p>

            <p>📧 support@shopsphere.com</p>

            <p>🕒 Mon - Sat : 9 AM - 8 PM</p>

          </div>

        </div>

      </div>

      {/* Bottom */}

      <div className="border-t border-slate-700">

        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-gray-500 text-center">
            © {new Date().getFullYear()} ShopSphere. All Rights Reserved.
          </p>

          <p className="text-gray-500 text-center">
            Designed & Developed by Aditya Gupta ❤️
          </p>

        </div>

      </div>

    </footer>
  );
}

export default Footer;