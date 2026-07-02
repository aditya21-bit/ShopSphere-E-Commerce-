import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaUserCircle,
  FaEnvelope,
  FaUserShield,
  FaShoppingBag,
  FaShoppingCart,
  FaSignOutAlt,
  FaEdit,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../services/api";
import Breadcrumb from "../components/Breadcrumb";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    setForm({
      name: user.name,
      email: user.email,
    });
  }, [user, navigate]);

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await API.put(
        "/users/profile",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(data.user);

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      toast.success("Profile Updated Successfully");

      setOpen(false);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Update Failed"
      );
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    toast.success("Logged out successfully");

    navigate("/login");
  };

  if (!user) return null;

  return (
    <>
      <div className="min-h-screen bg-slate-100 pt-28 pb-16">

        <div className="max-w-6xl mx-auto px-6">

          <Breadcrumb
            items={[
              {
                name: "Profile",
              },
            ]}
          />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-xl overflow-hidden"
          >

            <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 h-40"></div>

            <div className="px-8 pb-8">

              <div className="-mt-16 flex flex-col md:flex-row md:justify-between md:items-center">

                <div className="flex items-center gap-6">

                  <div className="bg-white rounded-full p-2 shadow-xl">
                    <FaUserCircle className="text-8xl text-indigo-600" />
                  </div>

                  <div>

                    <h1 className="text-3xl font-bold">
                      {user.name}
                    </h1>

                    <p className="text-gray-500">
                      {user.email}
                    </p>

                    <p className="text-gray-400 mt-2">
                      Member Since{" "}
                      {user.createdAt
                        ? new Date(
                            user.createdAt
                          ).toLocaleDateString()
                        : "Recently"}
                    </p>

                    <span
                      className={`inline-block mt-4 px-4 py-1 rounded-full text-sm font-semibold ${
                        user.role === "admin"
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {user.role.toUpperCase()}
                    </span>

                  </div>

                </div>

                <div className="flex gap-3 mt-6 md:mt-0">

                  <button
                    onClick={() => setOpen(true)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl flex items-center gap-2"
                  >
                    <FaEdit />
                    Edit Profile
                  </button>

                  <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl flex items-center gap-2"
                  >
                    <FaSignOutAlt />
                    Logout
                  </button>

                </div>

              </div>

            </div>

          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 mt-10">

            <motion.div
              whileHover={{ y: -5 }}
              className="lg:col-span-2 bg-white rounded-3xl shadow-lg p-8"
            >

              <h2 className="text-2xl font-bold mb-8">
                Account Information
              </h2>

              <div className="space-y-6">

                <div className="flex items-center gap-4">
                  <FaUserCircle className="text-indigo-600 text-xl" />
                  <div>
                    <p className="text-gray-500">Full Name</p>
                    <h3 className="font-semibold">
                      {user.name}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <FaEnvelope className="text-indigo-600 text-xl" />
                  <div>
                    <p className="text-gray-500">Email</p>
                    <h3 className="font-semibold">
                      {user.email}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <FaUserShield className="text-indigo-600 text-xl" />
                  <div>
                    <p className="text-gray-500">Role</p>
                    <h3 className="font-semibold">
                      {user.role}
                    </h3>
                  </div>
                </div>

              </div>

            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white rounded-3xl shadow-lg p-8"
            >

              <h2 className="text-2xl font-bold mb-6">
                Quick Actions
              </h2>

              <div className="space-y-4">

                <Link
                  to="/orders"
                  className="flex items-center gap-3 bg-slate-100 hover:bg-indigo-100 p-4 rounded-xl transition"
                >
                  <FaShoppingBag />
                  My Orders
                </Link>

                <Link
                  to="/cart"
                  className="flex items-center gap-3 bg-slate-100 hover:bg-indigo-100 p-4 rounded-xl transition"
                >
                  <FaShoppingCart />
                  My Cart
                </Link>

                {user.role === "admin" && (
                  <Link
                    to="/admin"
                    className="flex items-center gap-3 bg-indigo-600 text-white p-4 rounded-xl hover:bg-indigo-700 transition"
                  >
                    <FaUserShield />
                    Admin Dashboard
                  </Link>
                )}

              </div>

            </motion.div>

          </div>

        </div>

      </div>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          <div className="bg-white rounded-2xl p-8 w-[420px]">

            <h2 className="text-2xl font-bold mb-6">
              Edit Profile
            </h2>

            <input
              type="text"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
              className="w-full border rounded-xl p-3 mb-4"
              placeholder="Name"
            />

            <input
              type="email"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
              className="w-full border rounded-xl p-3"
              placeholder="Email"
            />

            <div className="flex justify-end gap-3 mt-6">

              <button
                onClick={() => setOpen(false)}
                className="px-5 py-2 border rounded-xl"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                className="bg-indigo-600 text-white px-5 py-2 rounded-xl hover:bg-indigo-700"
              >
                Save Changes
              </button>

            </div>

          </div>

        </div>
      )}
    </>
  );
}

export default Profile;