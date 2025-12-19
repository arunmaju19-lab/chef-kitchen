import React, { useState } from "react";
import logo7 from "../assets/logos/logo7.svg";
import logo1 from "../assets/logos/logo1.svg";
import { logosArray } from "../icons/icons";

function Sidebar() {
  const [active, setActive] = useState(1);

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:flex w-24 bg-[#0e0e17] h-screen flex-col items-center py-6 relative">
        <div className="mb-10">
          <img src={logo1} alt="logo" className="w-9 h-9" />
        </div>

        <nav className="relative flex flex-col gap-6 flex-1 items-center">
          {logosArray.map((item, index) => (
            <button
              key={item.id}
              onClick={() => setActive(index)}
              className="relative w-16 h-16 flex items-center justify-center"
            >
              {/* CURVED BACK CUT */}
              {active === index && (
                <div className="absolute inset-0 overflow-hidden">
                  <div
                    className="absolute -left-6 top-1/2 -translate-y-1/2
                    h-20 bg-[#1b2032] rounded-[38px]"
                  />
                </div>
              )}

              {/* ORANGE BUTTON */}
              <div
                className={`relative z-10 w-14 h-14 flex items-center justify-center
                rounded-2xl transition-all duration-300
                ${
                  active === index
                    ? "bg-orange-500 shadow-[0_10px_30px_rgba(255,140,60,0.5)] scale-105"
                    : "bg-transparent"
                }`}
              >
                <img src={item.src} className="w-6 h-6 block object-contain" />
              </div>
            </button>
          ))}
        </nav>

        <button className="w-12 h-12 rounded-2xl flex items-center justify-center">
          <img src={logo7} className="w-6 h-6 block object-contain" />
        </button>
      </aside>

      {/* MOBILE BOTTOM BAR */}
      <aside className="md:hidden fixed bottom-0 left-0 right-0 bg-[#1c1c2e] border-t border-[#1c1f2c] z-9999">
        <nav className="flex items-center justify-between px-4 py-3">
          {logosArray.map((item, index) => (
            <button
              key={item.id}
              onClick={() => setActive(index)}
              className="w-12 h-12 flex items-center justify-center rounded-xl"
            >
              <img
                src={item.src}
                className="w-6 h-6 block object-contain"
              />
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
