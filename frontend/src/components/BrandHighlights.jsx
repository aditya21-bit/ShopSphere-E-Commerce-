import { motion } from "framer-motion";
import {
  FaShippingFast,
  FaShieldAlt,
  FaUndo,
  FaHeadset,
} from "react-icons/fa";

const features = [
  {
    icon: <FaShippingFast size={30} />,
    title: "Free Shipping",
    desc: "Free delivery on orders above ₹999",
  },
  {
    icon: <FaShieldAlt size={30} />,
    title: "Secure Payment",
    desc: "100% safe and encrypted transactions",
  },
  {
    icon: <FaUndo size={30} />,
    title: "Easy Returns",
    desc: "7-day hassle-free return policy",
  },
  {
    icon: <FaHeadset size={30} />,
    title: "24/7 Support",
    desc: "Dedicated customer support anytime",
  },
];

function BrandHighlights() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {features.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{
                y: -8,
                scale: 1.03,
              }}
              className="rounded-3xl border border-gray-200 p-8 text-center shadow-sm hover:shadow-xl transition"
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                {item.icon}
              </div>

              <h3 className="mt-6 text-xl font-bold">
                {item.title}
              </h3>

              <p className="mt-3 text-gray-500">
                {item.desc}
              </p>

            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}

export default BrandHighlights;