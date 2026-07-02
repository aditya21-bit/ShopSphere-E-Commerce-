import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    oldPrice: "",
    stock: "",
    rating: "",
    image: "",
  });

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const { data } = await API.get(`/products/${id}`);
      setProduct(data);
    } catch (error) {
      toast.error("Product not found");
    }
  };

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/products/${id}`, product);

      toast.success("Product Updated");

      navigate("/admin/products");
    } catch (error) {
      toast.error("Update Failed");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-3xl shadow-lg">
      <h1 className="text-3xl font-bold mb-8">
        Edit Product
      </h1>

      <form
        onSubmit={handleSubmit}
        className="grid md:grid-cols-2 gap-5"
      >
        <input
          name="name"
          value={product.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="border rounded-xl p-3"
        />

        <input
          name="category"
          value={product.category}
          onChange={handleChange}
          placeholder="Category"
          className="border rounded-xl p-3"
        />

        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          placeholder="Price"
          className="border rounded-xl p-3"
        />

        <input
          type="number"
          name="oldPrice"
          value={product.oldPrice}
          onChange={handleChange}
          placeholder="Old Price"
          className="border rounded-xl p-3"
        />

        <input
          type="number"
          name="stock"
          value={product.stock}
          onChange={handleChange}
          placeholder="Stock"
          className="border rounded-xl p-3"
        />

        <input
          type="number"
          step="0.1"
          name="rating"
          value={product.rating}
          onChange={handleChange}
          placeholder="Rating"
          className="border rounded-xl p-3"
        />

        <input
          name="image"
          value={product.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="border rounded-xl p-3 md:col-span-2"
        />

        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          className="border rounded-xl p-3 md:col-span-2 h-32"
        />

        <button
          className="md:col-span-2 bg-indigo-600 text-white py-4 rounded-xl hover:bg-indigo-700"
        >
          Update Product
        </button>
      </form>
    </div>
  );
}

export default EditProduct;