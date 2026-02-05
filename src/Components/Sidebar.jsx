import React, { useState } from "react";
import logo7 from "../assets/logos/logo7.svg";
import logo1 from "../assets/logos/logo1.svg";
import { logosArray } from "../icons/icons";

function Sidebar() {
  const [active, setActive] = useState(1);

  return (
    <>
      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside className="hidden md:flex w-24 bg-[#0e0e17] h-screen flex-col items-center py-6 relative">
        
        {/* LOGO */}
        <div className="mb-10">
          <img src={logo1} alt="logo" className="w-9 h-9" />
        </div>

        {/* NAV */}
        <nav className="relative flex flex-col gap-y-4 flex-1 items-center w-full">
          {logosArray.map((item, index) => (
            <button
              key={item.id}
              onClick={() => setActive(index)}
              className="relative w-full h-[76px] flex items-center justify-center"
            >
              {/* ACTIVE SHADE */}
              {active === index && (
                <>
                  <div
                    className="absolute inset-y-0 right-0 bg-[#0f1220] z-10 rounded-l-[10px]"
                    style={{ width: "calc(100% - 16px)" }}
                  />

                  <span className="absolute -top-[26px] right-0 w-[26px] h-[26px] bg-[#0e0e17] rounded-br-[26px] z-20" />
                  <span className="absolute -top-[26px] right-0 w-[26px] h-[26px] bg-[#0f1220] z-10" />

                  <span className="absolute -bottom-[26px] right-0 w-[26px] h-[26px] bg-[#0e0e17] rounded-tr-[26px] z-20" />
                  <span className="absolute -bottom-[26px] right-0 w-[26px] h-[26px] bg-[#0f1220]  z-10" />
                </>
              )}

              {/* ICON */}
              <div
                className={`relative z-30 w-12 h-12 flex items-center justify-center
                rounded-2xl transition-all duration-300
                ${
                  active === index
                    ? "bg-orange-500 shadow-[0_12px_35px_rgba(255,140,60,0.45)]"
                    : "bg-transparent"
                }`}
              >
                <img
                  src={item.src}
                  alt=""
                  className={`w-6 h-6
                    ${active === index ? "brightness-0 invert" : "opacity-80"}`}
                />
              </div>
            </button>
          ))}
        </nav>

        {/* EXIT (DESKTOP ONLY) */}
        <button className="w-12 h-12 flex items-center justify-center">
          <img src={logo7} className="w-6 h-6 opacity-80" />
        </button>
      </aside>

      {/* ================= MOBILE BOTTOM NAV ================= */}
      <nav
        className="
          fixed bottom-0 left-0 right-0 z-50
          flex md:hidden
          bg-[#0e0e17]
          h-20
          items-center justify-between
          px-4
          border-t border-white/10
        "
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        {logosArray.map((item, index) => (
          <button
            key={item.id}
            onClick={() => setActive(index)}
            className="flex items-center justify-center"
          >
            <div
              className={`w-11 h-11 flex items-center justify-center
              rounded-xl transition-all duration-300
              ${
                active === index
                  ? "bg-orange-500 shadow-[0_6px_18px_rgba(255,140,60,0.45)]"
                  : "bg-transparent"
              }`}
            >
              <img
                src={item.src}
                alt=""
                className={`w-6 h-6
                  ${active === index
                    ? "brightness-0 invert"
                    : "opacity-70"
                  }`}
              />
            </div>
          </button>
        ))}
      </nav>
    </>
  );
}

export default Sidebar;