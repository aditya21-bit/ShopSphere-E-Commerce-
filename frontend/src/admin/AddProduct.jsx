import { useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    oldPrice: "",
    stock: "",
    rating: "",
  });

  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);
    setImageUrl("");
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();

      Object.keys(product).forEach((key) => {
        formData.append(key, product[key]);
      });

      if (image) {
        formData.append("image", image);
      } else {
        formData.append("image", imageUrl);
      }

      await API.post("/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Product Added Successfully");

      setProduct({
        name: "",
        description: "",
        category: "",
        price: "",
        oldPrice: "",
        stock: "",
        rating: "",
      });

      setImage(null);
      setImageUrl("");
      setPreview("");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-8">

        <h1 className="text-3xl font-bold mb-8">
          Add Product
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-5"
        >

          <input
            name="name"
            placeholder="Product Name"
            value={product.name}
            onChange={handleChange}
            className="border rounded-xl p-3"
            required
          />

          <input
            name="category"
            placeholder="Category"
            value={product.category}
            onChange={handleChange}
            className="border rounded-xl p-3"
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={product.price}
            onChange={handleChange}
            className="border rounded-xl p-3"
            required
          />

          <input
            type="number"
            name="oldPrice"
            placeholder="Old Price"
            value={product.oldPrice}
            onChange={handleChange}
            className="border rounded-xl p-3"
          />

          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={product.stock}
            onChange={handleChange}
            className="border rounded-xl p-3"
          />

          <input
            type="number"
            step="0.1"
            name="rating"
            placeholder="Rating"
            value={product.rating}
            onChange={handleChange}
            className="border rounded-xl p-3"
          />

          {/* Upload Image */}

          <div className="md:col-span-2">
            <label className="block font-semibold mb-2">
              Upload Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="w-full border rounded-xl p-3"
            />
          </div>

          {/* OR */}

          <div className="md:col-span-2 text-center font-semibold text-gray-500">
            OR
          </div>

          {/* Image URL */}

          <input
            type="text"
            placeholder="Paste Image URL"
            value={imageUrl}
            onChange={(e) => {
              setImageUrl(e.target.value);
              setPreview(e.target.value);
              setImage(null);
            }}
            className="border rounded-xl p-3 md:col-span-2"
          />

          {/* Preview */}

          {preview && (
            <div className="md:col-span-2 flex justify-center">
              <img
                src={preview}
                alt="Preview"
                className="w-56 h-56 object-cover rounded-xl shadow-lg border"
              />
            </div>
          )}

          <textarea
            name="description"
            placeholder="Description"
            value={product.description}
            onChange={handleChange}
            className="border rounded-xl p-3 md:col-span-2 h-32 resize-none"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="md:col-span-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-4 font-semibold transition"
          >
            {loading ? "Uploading..." : "Add Product"}
          </button>

        </form>

      </div>
    </div>
  );
}

export default AddProduct;