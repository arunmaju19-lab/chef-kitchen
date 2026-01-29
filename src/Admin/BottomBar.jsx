import React from "react";

function BottomBar() {
  return (
    <div className="flex items-center justify-between px-4 py-3  bg-white">

      {/* Left text */}
      <p className="text-sm text-gray-600">
        Showing <span className="font-medium">1</span> to{" "}
        <span className="font-medium">10</span> of{" "}
        <span className="font-medium">50</span> entries
      </p>

      {/* Pagination */}
      <div className="flex items-center gap-1">
        <button className="px-3 py-1 border rounded text-sm hover:bg-gray-100">
          Prev
        </button>

        <button className="px-3 py-1 border rounded bg-gray-900 text-white text-sm">
          1
        </button>

        <button className="px-3 py-1 border rounded text-sm hover:bg-gray-100">
          2
        </button>

        <button className="px-3 py-1 border rounded text-sm hover:bg-gray-100">
          3
        </button>

        <button className="px-3 py-1 border rounded text-sm hover:bg-gray-100">
          Next
        </button>
      </div>
    </div>
  );
}

export default BottomBar;
