import React from "react";

function Navbar() {
  return (
    <div className="h-16 bg-[#1f1d2b] border-b border-[#2a2f42]
                    flex items-center justify-end px-6 text-white">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center font-bold">
          A
        </div>
        <div className="text-sm">
          <p className="font-semibold">Admin</p>
          <p className="text-gray-400">admin@gmail.com</p>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
