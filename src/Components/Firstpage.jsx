import React, { useState, useEffect, useRef } from "react";
import Sidebar from "./Sidebar";
import Order from "./Order";
import { FaSearch, FaChevronDown, FaShoppingCart } from "react-icons/fa";

import noodles from "../assets/foods/Noodles.svg";
import friedRice from "../assets/foods/friedrice.svg";
import instantNoodles from "../assets/foods/instantnoodles.svg";
import spinach from "../assets/foods/spinach.svg";
import omleterice from "../assets/foods/omleterice.svg";
import specialomlete from "../assets/foods/specialomlete.svg";
import seafoodnoodles from "../assets/foods/seafoodnoodles.svg";
import saltedpasta from "../assets/foods/saltedpasta.svg";
import beef from "../assets/foods/beef.svg";

function Firstpage() {
  const [size, setSize] = useState({
    1: "L", 2: "L", 3: "L", 4: "L", 5: "L",
    6: "L", 7: "L", 8: "L", 9: "L",
  });

  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("1");
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  const [orders, setOrders] = useState([]);
  const [orderType, setOrderType] = useState("Dine In");
  const [openType, setOpenType] = useState(false);
  const [showOrder, setShowOrder] = useState(false);

  const orderPanelRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (orderPanelRef.current && !orderPanelRef.current.contains(e.target)) {
        setShowOrder(false);
      }
    };
    if (showOrder) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showOrder]);

  const tabs = [
    { id: "1", label: "Today Special" },
    { id: "2", label: "Our Specials" },
    { id: "3", label: "South Indian Special" },
  ];

  const images = [
    { id: 1, name: "Healthy noodle with spinach leaf", img: noodles, price: 25, available: 22 },
    { id: 2, name: "Hot spicy fried rice with omelet", img: friedRice, price: 25, available: 13 },
    { id: 3, name: "Spicy  noodle with special omelette", img: instantNoodles, price: 25, available: 17 },
    { id: 4, name: "Healthy noodle with spinach leaf", img: spinach, price: 20, available: 10 },
    { id: 5, name: "Hot spicy fried rice with omelet", img: omleterice, price: 28, available: 12 },
    { id: 6, name: "Spicy  noodle with special omelette", img: specialomlete, price: 30, available: 8 },
    { id: 7, name: "Spicy seasoned seafood noodles", img: seafoodnoodles, price: 32, available: 15 },
    { id: 8, name: "Salted pasta with mashroom sauce", img: saltedpasta, price: 26, available: 20 },
    { id: 9, name: "Beef dumpling in hot and sour soup", img: beef, price: 35, available: 5 },
  ];

  const filteredImages = images.filter((item) => {
  // Today Special → show all
  if (activeTab === "1") {
    return item.name.toLowerCase().includes(search.toLowerCase());
  }

  // Other tabs → category match + search
  return (
    item.category === activeTab &&
    item.name.toLowerCase().includes(search.toLowerCase())
  );
});

  //  Check if item+size already in cart
  const isInCart = (id, s) => {
    return orders.some(o => o.id === id && o.size === s);
  };

  // Add to cart only if same size not present
  const addToOrder = (newItem) => {
    if (!isInCart(newItem.id, newItem.size)) {
      setOrders([...orders, newItem]);
    }
  };

  const totalItems = orders.length; // Badge shows number of unique items

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#1b2032] text-white">

      <Sidebar />

      <div className="flex-1 flex flex-col">

        {/* HEADER */}
        <div className="p-2 sticky top-0 z-20 bg-[#1b2032] md:static">
          <div className="flex flex-col gap-4 mb-6 md:flex-row md:justify-between">
            <div>
              <h1 className="text-2xl font-bold ">
                Chef Kitchen
              </h1>
              {currentDateTime.toLocaleDateString("en-IN", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </div>

            {/* SEARCH + CART */}
            <div className="flex items-center gap-4">
              <div className="relative w-full max-w-xs sm:max-w-sm">

                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search food..."
                  className="w-full bg-[#2a2f42] rounded-xl pl-10 pr-4 py-2 text-sm"
                />
              </div>

              <button
                onClick={() => totalItems > 0 && setShowOrder(true)}
                className={`relative flex items-center justify-center w-10 h-10 aspect-square min-w-40px min-h-40px rounded-full shrink-0
                 ${totalItems === 0
                    ? "bg-[#2a2f42] text-gray-500 cursor-not-allowed"
                    : "bg-orange-500 text-white"
                  }`}
              >
                <FaShoppingCart className="text-base leading-none" />

                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-xs w-4 h-4 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>

            </div>
          </div>

          {/* TABS */}
          <div className="flex gap-8  mb-6 border-b border-[#2a2f42]overflow-x-auto whitespace-nowrap hide-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`pb-3 relative whitespace-nowrap shrink-0
        transition-colors duration-200
        ${activeTab === tab.id
                    ? "text-orange-500"
                    : "text-gray-400 hover:text-orange-400"
                  }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute left-0 -bottom-px w-full h-0.5 bg-orange-500 transition-all" />
                )}
              </button>
            ))}
          </div>
          {/* DINE IN / TAKE AWAY / DELIVERY */}
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Choose Dishes</h2>

            <div className="relative">
              <button
                onClick={() => setOpenType(!openType)}
                className="bg-[#2a2f42] border border-[#343a52]
                  px-4 py-2 rounded-xl text-sm flex items-center gap-2
                  hover:bg-orange-500 cursor-pointer"
              >
                {orderType}
                <FaChevronDown
                  className={`transition-transform ${openType ? "rotate-180" : ""}`}
                />
              </button>

              {openType && (
                <div className="absolute right-0 mt-2 w-40 bg-[#2a2f42]
                  border border-[#343a52] rounded-xl overflow-hidden z-20">
                  {["Dine In", "Take Away", "Delivery"]
                    .filter((t) => t !== orderType)
                    .map((type) => (
                      <button
                        key={type}
                        onClick={() => {
                          setOrderType(type);
                          setOpenType(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm
                          text-gray-300 hover:bg-orange-500 hover:text-white"
                      >
                        {type}
                      </button>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* DISH LIST */}
        <div className="flex-1 overflow-y-auto px-2 pb-14 hide-scrollbar bg-[#1b2032]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-3 gap-y-18 pt-24  bg-[#1b2032]">
            {filteredImages.length > 0 ? (
              filteredImages.map((item) => (
                <div
                  key={item.id}
                  className="relative bg-[#1f1d2b] rounded-2xl pt-24 pb-6 px-4 text-center"
                >
                  {/* IMAGE SIZE DYNAMIC */}
                  <img
                    src={item.img}
                    alt={item.name}
                    className={`absolute -top-16 left-1/2 -translate-x-1/2 transition-all duration-300
                      ${size[item.id] === "S" ? "w-24 h-24" :
                        size[item.id] === "M" ? "w-28 h-28" : "w-32 h-32"}`}
                  />

                  <h3 className="text-sm font-medium mb-1">{item.name}</h3>

                  <p className="text-green-400 font-semibold mb-1">
                    {(() => {
                      let price = item.price;
                      if (size[item.id] === "S") price -= 3;
                      else if (size[item.id] === "L") price += 3;
                      return price.toFixed(2);
                    })()} AED
                  </p>

                  <p className="text-gray-400 text-xs mb-3">
                    {item.available} Bowls available
                  </p>

                  {/* SIZE BUTTONS */}
                  <div className="flex justify-center gap-2 mb-5">
                    {["S", "M", "L"].map((s) => (
                      <button
                        key={s}
                        onClick={() => setSize({ ...size, [item.id]: s })}
                        className={`w-8 h-8 rounded-md text-xs transition ${size[item.id] === s
                          ? "bg-orange-500 text-white"
                          : "bg-[#1f2433] text-gray-300"
                          }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>

                  {/* ADD BUTTON */}
                  <button
                    className={`px-4 py-2 rounded-xl transition
                      ${isInCart(item.id, size[item.id])
                        ? "bg-red-500 cursor-not-allowed"
                        : "bg-orange-500 hover:bg-orange-600 cursor-pointer"
                      }`}
                    onClick={() =>
                      addToOrder({
                        id: item.id,
                        name: item.name,
                        size: size[item.id],
                        qty: 1,
                        price:
                          size[item.id] === "S"
                            ? item.price - 3
                            : size[item.id] === "L"
                              ? item.price + 3
                              : item.price,
                        img: item.img,
                      })
                    }
                  >
                    Add to cart
                  </button>
                </div>
              ))
            ) : (
              <div className="col-span-4 text-center text-gray-400 mt-20">
                No results found
              </div>
            )}

          </div>
        </div>
      </div>

      {/* ORDER PANEL */}
      <div
        ref={orderPanelRef}
        className={`fixed right-0 top-0 w-full max-w-sm h-screen bg-[#1f2433]
        transform transition-transform duration-300 
        ${showOrder ? "translate-x-0" : "translate-x-full"} z-20 `}
      >
        <Order orders={orders} setOrders={setOrders} />
      </div>

    </div>
  );
}

export default Firstpage;
