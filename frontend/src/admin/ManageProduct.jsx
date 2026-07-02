import { useEffect, useState } from "react";
import API from "../services/api";
import { FaEdit, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { FaHeart, FaStar, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
    return (
        <motion.div
            whileHover={{ y: -10 }}
            transition={{ duration: 0.3 }}
            className="group bg-white rounded-3xl shadow-md overflow-hidden hover:shadow-2xl"
        >
            {/* Product Image */}
            <div className="relative">
                <img
                    src={product.image}
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
                <button className="absolute top-4 right-4 bg-white p-3 rounded-full shadow hover:bg-red-500 hover:text-white transition">
                    <FaHeart />
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


function ManageProduct() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = async () => {
        try {
            const { data } = await API.get("/products");
            setProducts(data);
        } catch (error) {
            toast.error("Failed to fetch products");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);
    const deleteProduct = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmDelete) return;

        try {
            await API.delete(`/products/${id}`);

            toast.success("Product Deleted Successfully");

            setProducts((prevProducts) =>
                prevProducts.filter((product) => product._id !== id)
            );
        } catch (error) {
            toast.error("Failed to delete product");
        }
    };
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-xl">
                Loading...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-100 p-8">

            <div className="max-w-7xl mx-auto">

                <h1 className="text-4xl font-bold mb-8">
                    Manage Products
                </h1>

                <div className="overflow-x-auto bg-white rounded-3xl shadow">

                    <table className="w-full">

                        <thead className="bg-indigo-600 text-white">

                            <tr>

                                <th className="p-4">Image</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th>Rating</th>
                                <th>Actions</th>

                            </tr>

                        </thead>

                        <tbody>

                            {products.map((product) => (

                                <tr
                                    key={product._id}
                                    className="text-center border-b"
                                >

                                    <td className="p-4">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="h-20 w-20 rounded-xl object-cover mx-auto"
                                        />
                                    </td>

                                    <td>{product.name}</td>

                                    <td>{product.category}</td>

                                    <td>₹{product.price}</td>

                                    <td>{product.stock}</td>

                                    <td>{product.rating}</td>

                                    <td>

                                        <div className="flex justify-center gap-3">

                                            <Link
                                                to={`/admin/edit/${product._id}`}
                                                className="bg-blue-500 p-3 rounded-full text-white hover:bg-blue-600 transition"
                                            >
                                                <FaEdit />
                                            </Link>

                                            <button
                                                onClick={() => deleteProduct(product._id)}
                                                className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-full transition"
                                            >
                                                <FaTrash />
                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
}

export default ManageProduct;