import React from "react";
function BottomBar() {
  return (
    <div className="flex items-center justify-between px-6 py-3
                    bg-[#1f1d2b] border-t border-[#2a2f42] text-white">

      <p className="text-sm text-gray-400">
        Showing <span className="text-white">1</span> to{" "}
        <span className="text-white">10</span> of{" "}
        <span className="text-white">50</span> entries
      </p>

      <div className="flex items-center gap-2">
        <button className="px-3 py-1 rounded bg-[#2a2f42] text-sm hover:bg-orange-500">
          Prev
        </button>

        <button className="px-3 py-1 rounded bg-orange-500 text-sm">
          1
        </button>

        <button className="px-3 py-1 rounded bg-[#2a2f42] text-sm hover:bg-orange-500">
          2
        </button>

        <button className="px-3 py-1 rounded bg-[#2a2f42] text-sm hover:bg-orange-500">
          Next
        </button>
      </div>
    </div>
  );
}


export default BottomBar;
