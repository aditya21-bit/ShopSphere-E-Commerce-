import { Link } from "react-router-dom";
import { FaChevronRight, FaHome } from "react-icons/fa";

function Breadcrumb({ items }) {
  return (
    <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">

      <Link
        to="/"
        className="flex items-center gap-2 hover:text-indigo-600 transition"
      >
        <FaHome />
        Home
      </Link>

      {items.map((item, index) => (
        <div
          key={index}
          className="flex items-center gap-2"
        >
          <FaChevronRight className="text-xs" />

          {item.link ? (
            <Link
              to={item.link}
              className="hover:text-indigo-600 transition"
            >
              {item.name}
            </Link>
          ) : (
            <span className="font-semibold text-gray-800">
              {item.name}
            </span>
          )}

        </div>
      ))}

    </nav>
  );
}

export default Breadcrumb;