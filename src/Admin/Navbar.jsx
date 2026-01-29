import React from "react";

function Navbar() {
  return (
    <div className="h-16 bg-white  flex items-center justify-end px-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-300"></div>
        <div className="text-sm">
          <p className="font-semibold">Admin</p>
          <p className="text-gray-500">admin@gmail.com</p>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
