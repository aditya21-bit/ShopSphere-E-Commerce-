import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FaSearch, FaBoxOpen } from "react-icons/fa";
import API from "../services/api";
import ProductCard from "../components/ProductCard";
import PageHeader from "../components/PageHeader";

function Products() {
  const [searchParams] = useSearchParams();

  const selectedCategory = searchParams.get("category");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(
    selectedCategory || "All"
  );
  const [sort, setSort] = useState("Newest");

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      setCategory(selectedCategory);
    } else {
      setCategory("All");
    }
  }, [selectedCategory]);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const { data } = await API.get("/products");

      setProducts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const categories = useMemo(() => {
    const unique = [...new Set(products.map((p) => p.category))];

    return ["All", ...unique];
  }, [products]);

  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Category Filter
    if (category !== "All") {
      list = list.filter(
        (product) =>
          product.category.toLowerCase() ===
          category.toLowerCase()
      );
    }

    // Search By Product Name
    if (search.trim()) {
      list = list.filter((product) =>
        product.name
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    // Sorting
    switch (sort) {
      case "Price Low":
        list.sort((a, b) => a.price - b.price);
        break;

      case "Price High":
        list.sort((a, b) => b.price - a.price);
        break;

      default:
        list.sort(
          (a, b) =>
            new Date(b.createdAt) -
            new Date(a.createdAt)
        );
    }

    return list;
  }, [products, search, category, sort]);

    return (
    <div className="min-h-screen bg-slate-100">

      <PageHeader
        title="Products"
        subtitle="Discover premium products with amazing deals and fast delivery."
        breadcrumb={[
          {
            name: "Products",
          },
        ]}
      />

      <div className="max-w-7xl mx-auto px-6 -mt-8 relative z-20">

        {/* Filter Card */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl p-6"
        >

          <div className="grid lg:grid-cols-3 gap-5">

            {/* Search */}

            <div className="flex items-center bg-slate-100 rounded-2xl px-5">

              <FaSearch className="text-gray-500" />

              <input
                type="text"
                placeholder="Search by product name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent outline-none p-4"
              />

            </div>

            {/* Category */}

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border rounded-2xl px-5 py-4 outline-none"
            >
              {categories.map((cat) => (
                <option
                  key={cat}
                  value={cat}
                >
                  {cat}
                </option>
              ))}
            </select>

            {/* Sort */}

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border rounded-2xl px-5 py-4 outline-none"
            >
              <option value="Newest">
                Newest
              </option>

              <option value="Price Low">
                Price : Low to High
              </option>

              <option value="Price High">
                Price : High to Low
              </option>

            </select>

          </div>

        </motion.div>

        {/* Product Count */}

        <div className="flex justify-between items-center mt-10 mb-8">

          <div>

            <h2 className="text-3xl font-bold">
              All Products
            </h2>

            <p className="text-gray-500 mt-2">
              Showing {filteredProducts.length} Product
              {filteredProducts.length !== 1 && "s"}
            </p>

          </div>

        </div>

                {/* Loading */}

        {loading && (
          <div className="py-24 text-center">

            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>

            <p className="mt-5 text-lg font-medium text-gray-600">
              Loading Products...
            </p>

          </div>
        )}

        {/* Empty State */}

        {!loading && filteredProducts.length === 0 && (

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-3xl shadow-xl py-24 text-center"
          >

            <FaBoxOpen className="text-7xl text-gray-300 mx-auto mb-6" />

            <h2 className="text-4xl font-bold text-gray-800">
              No Products Found
            </h2>

            <p className="text-gray-500 mt-4">
              Try changing your search or category.
            </p>

            <button
              onClick={() => {
                setSearch("");
                setCategory("All");
              }}
              className="mt-8 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl transition"
            >
              View All Products
            </button>

          </motion.div>

        )}

        {/* Products */}

        {!loading && filteredProducts.length > 0 && (

          <motion.div
            layout
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pb-20"
          >

            {filteredProducts.map((product) => (

              <ProductCard
                key={product._id}
                product={product}
              />

            ))}

          </motion.div>

        )}

      </div>

    </div>
  );
}

export default Products;