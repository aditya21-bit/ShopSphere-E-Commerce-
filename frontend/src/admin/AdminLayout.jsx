import { NavLink, Outlet } from "react-router-dom";
import {
  FaBox,
  FaPlus,
  FaShoppingBag,
  FaChartBar,
  FaUsers,
} from "react-icons/fa";

function AdminLayout() {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
      isActive
        ? "bg-indigo-600 text-white"
        : "text-gray-700 hover:bg-indigo-100"
    }`;

  return (
    <div className="min-h-screen bg-slate-100 flex">

      {/* Sidebar */}
      <aside className="w-72 bg-white shadow-xl p-6">

        <h1 className="text-3xl font-bold text-indigo-600 mb-10">
          ShopSphere
        </h1>

        <nav className="space-y-3">

          <NavLink to="/admin" end className={linkClass}>
            <FaChartBar />
            Dashboard
          </NavLink>

          <NavLink to="/admin/add-product" className={linkClass}>
            <FaPlus />
            Add Product
          </NavLink>

          <NavLink to="/admin/products" className={linkClass}>
            <FaBox />
            Manage Products
          </NavLink>

          <NavLink to="/admin/orders" className={linkClass}>
            <FaShoppingBag />
            Orders
          </NavLink>

          <NavLink to="/admin/users" className={linkClass}>
            <FaUsers />
            Users
          </NavLink>

        </nav>

      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">

        <Outlet />

      </main>

    </div>
  );
}

export default AdminLayout;