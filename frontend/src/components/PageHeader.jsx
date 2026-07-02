import { motion } from "framer-motion";
import Breadcrumb from "./Breadcrumb";

function PageHeader({ title, subtitle, breadcrumb = [] }) {
  return (
    <section className="relative bg-gradient-to-r from-indigo-700 via-indigo-600 to-purple-700 overflow-hidden">

      {/* Background */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-16 right-0 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 py-16 relative">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >

          <div className="text-white/90 mb-4">
            <Breadcrumb items={breadcrumb} />
          </div>

          <h1 className="text-5xl font-bold text-white">
            {title}
          </h1>

          <p className="text-white/80 mt-3 text-lg max-w-xl">
            {subtitle}
          </p>

        </motion.div>

      </div>
    </section>
  );
}

export default PageHeader;