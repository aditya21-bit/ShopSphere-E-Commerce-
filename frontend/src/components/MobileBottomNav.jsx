import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaStore,
  FaShoppingCart,
  FaBox,
  FaUser,
} from "react-icons/fa";
import { useCart } from "../context/CartContext";

function MobileBottomNav() {
  const { cartCount } = useCart();

  const navClass = ({ isActive }) =>
    `flex flex-col items-center justify-center flex-1 py-3 transition ${
      isActive
        ? "text-indigo-600"
        : "text-gray-500"
    }`;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-2xl z-50">

      <div className="flex">

        <NavLink
          to="/"
          className={navClass}
        >
          <FaHome size={20} />
          <span className="text-xs mt-1">
            Home
          </span>
        </NavLink>

        <NavLink
          to="/products"
          className={navClass}
        >
          <FaStore size={20} />
          <span className="text-xs mt-1">
            Products
          </span>
        </NavLink>

        <NavLink
          to="/cart"
          className={navClass}
        >
          <div className="relative">

            <FaShoppingCart size={20} />

            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex justify-center items-center">
                {cartCount}
              </span>
            )}

          </div>

          <span className="text-xs mt-1">
            Cart
          </span>

        </NavLink>

        <NavLink
          to="/orders"
          className={navClass}
        >
          <FaBox size={20} />
          <span className="text-xs mt-1">
            Orders
          </span>
        </NavLink>

        <NavLink
          to="/profile"
          className={navClass}
        >
          <FaUser size={20} />
          <span className="text-xs mt-1">
            Profile
          </span>
        </NavLink>

      </div>

    </div>
  );
}

export default MobileBottomNav;