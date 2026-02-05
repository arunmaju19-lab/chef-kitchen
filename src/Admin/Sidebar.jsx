import React from "react";
import { FaBox, FaShoppingCart } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { NavLink } from "react-router-dom";


function Sidebar() {
  const base =
    "flex items-center gap-3 px-9 py-4 rounded-xl cursor-pointer transition";

  return (
    <div className="w-64 h-screen bg-[#1f1d2b] text-white">

      {/* Logo */}
      <div className="p-6 font-bold text-lg text-orange-500">
        🍽️ DIGITAL MENU
      </div>

      {/* Menu */}
      <ul className="mt-6 space-y-2 px-3">

        <NavLink
          to="/admin/products"
          className={({ isActive }) =>
            `${base} ${
              isActive
                ? "bg-orange-500 text-white"
                : "text-gray-400 hover:bg-[#2a2f42] hover:text-white"
            }`
          }
        >
          <FaBox />
          <span>Products</span>
        </NavLink>

        <NavLink
          to="/admin/category"
          className={({ isActive }) =>
            `${base} ${
              isActive
                ? "bg-orange-500 text-white"
                : "text-gray-400 hover:bg-[#2a2f42] hover:text-white"
            }`
          }
        >
          <MdCategory />
          <span>Category</span>
        </NavLink>

        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            `${base} ${
              isActive
                ? "bg-orange-500 text-white"
                : "text-gray-400 hover:bg-[#2a2f42] hover:text-white"
            }`
          }
        >
          <FaShoppingCart />
          <span>Orders</span>
        </NavLink>

      </ul>
    </div>
  );
}


export default Sidebar;
