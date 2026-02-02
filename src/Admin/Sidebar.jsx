import React from "react";
import { FaBox, FaShoppingCart } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { NavLink } from "react-router-dom";

function Sidebar() {
    const base =
        "flex items-center gap-3 px-9 py-4 rounded cursor-pointer";

    return (
        <div className="w-64 h-screen bg-gray-400">

            {/* Logo */}
            <div className="p-6 font-bold text-lg ">
                🍽️ DIGITAL MENU
            </div>

            {/* Menu */}
            <ul className="mt-8 space-y-1 px-2">

                <NavLink
                    to="/admin/products"
                    className={({ isActive }) =>
                        `${base} ${isActive ? "bg-gray-200 font-semibold" : "hover:bg-gray-200"
                        }`
                    }
                >
                    <FaBox />
                    <span>Products</span>
                </NavLink>

                <NavLink
                    to="/admin/category"
                    className={({ isActive }) =>
                        `${base} ${isActive ? "bg-gray-200 font-semibold" : "hover:bg-gray-200"
                        }`
                    }
                >
                    <MdCategory />
                    <span>Category</span>
                </NavLink>

                <NavLink
                    to="/admin/orders"
                    className={({ isActive }) =>
                        `${base} ${isActive ? "bg-gray-200 font-semibold" : "hover:bg-gray-200"
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
