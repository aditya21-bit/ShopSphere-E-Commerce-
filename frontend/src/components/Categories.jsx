import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    name: "Electronics",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600",
  },
  {
    name: "Fashion",
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=600",
  },
  {
    name: "Shoes",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
  },
  {
    name: "Watches",
    image:
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600",
  },
  {
    name: "Gaming",
    image:
      "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=600",
  },
  {
    name: "Furniture",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600",
  },
];

function Categories() {
  const navigate = useNavigate();

  return (
    <section className="bg-slate-50 py-20">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-gray-900">
            Shop By Category
          </h2>

          <p className="text-gray-500 mt-3">
            Explore products across our most popular collections.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

          {categories.map((category, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -8 }}
              whileTap={{ scale: 0.97 }}
              onClick={() =>
                navigate(
                  `/products?category=${encodeURIComponent(category.name)}`
                )
              }
              className="relative overflow-hidden rounded-3xl cursor-pointer group shadow-lg"
            >
              <img
                src={category.image}
                alt={category.name}
                className="h-80 w-full object-cover transition duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

              <div className="absolute bottom-8 left-8">
                <h3 className="text-white text-3xl font-bold">
                  {category.name}
                </h3>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(
                      `/products?category=${encodeURIComponent(category.name)}`
                    );
                  }}
                  className="mt-4 px-5 py-2 rounded-full bg-white text-black font-semibold hover:bg-indigo-600 hover:text-white transition"
                >
                  Shop Now →
                </button>
              </div>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Categories;