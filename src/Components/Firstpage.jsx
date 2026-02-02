import React, { useState, useEffect, useRef } from "react";
import Sidebar from "./Sidebar";
import Order from "./Order";
import { FaSearch, FaShoppingCart, FaChevronDown } from "react-icons/fa";
import { useProducts } from "../context/ProductsContext";

function Firstpage() {
  const { products } = useProducts();

  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("1");
  const [size, setSize] = useState({});
  const [orders, setOrders] = useState([]);
  const [orderType, setOrderType] = useState("Dine In");
  const [openType, setOpenType] = useState(false);
  const [showOrder, setShowOrder] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  const orderPanelRef = useRef(null);
  const orderTypeRef = useRef(null);

  /* CLOCK */
  useEffect(() => {
    const timer = setInterval(() => setCurrentDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  /* INIT SIZE PER PRODUCT */
  useEffect(() => {
    if (products.length > 0) {
      const initial = {};
      products.forEach((p) => {
        initial[p.id] = p.sizes[0];
      });
      setSize(initial);
    }
  }, [products]);

  /* OUTSIDE CLICK HANDLER */
  useEffect(() => {
    const handler = (e) => {
      if (orderPanelRef.current && !orderPanelRef.current.contains(e.target)) {
        setShowOrder(false);
      }
      if (orderTypeRef.current && !orderTypeRef.current.contains(e.target)) {
        setOpenType(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const tabs = [
    { id: "1", label: "Today Special" },
    { id: "2", label: "Our Specials" },
    { id: "3", label: "South Indian Special" },
  ];

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const isInCart = (id, s) =>
    orders.some((o) => o.id === id && o.size === s);

  const addToCart = (item) => {
    setOrders((prev) => {
      if (isInCart(item.id, item.size)) return prev;
      return [...prev, item];
    });
  };

  const totalItems = orders.length;

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#1b2032] text-white">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* HEADER */}
        <div className="p-4 sticky top-0 z-20 bg-[#1b2032]">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">Chef Kitchen</h1>
              <p className="text-sm text-gray-400">
                {currentDateTime.toLocaleDateString("en-IN", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>

            <div className="flex gap-4 items-center">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search food..."
                  className="bg-[#2a2f42] rounded-xl pl-9 pr-4 py-2 text-sm"
                />
              </div>

              <button
                onClick={() => totalItems > 0 && setShowOrder(true)}
                className={`relative w-10 h-10 rounded-full flex items-center justify-center
                  ${
                    totalItems === 0
                      ? "bg-[#2a2f42] text-gray-500"
                      : "bg-orange-500 text-white"
                  }`}
              >
                <FaShoppingCart />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-xs
                    w-4 h-4 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* TABS */}
          <div className="flex gap-8 border-b border-[#2a2f42] mb-6">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`pb-3 relative ${
                  activeTab === t.id
                    ? "text-orange-500"
                    : "text-gray-400"
                }`}
              >
                {t.label}
                {activeTab === t.id && (
                  <span className="absolute left-0 bottom-0 w-full h-0.5 bg-orange-500" />
                )}
              </button>
            ))}
          </div>

          {/* CHOOSE DISH + ORDER TYPE */}
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Choose Dishes</h2>

            <div ref={orderTypeRef} className="relative">
              <button
                onClick={() => setOpenType((p) => !p)}
                className="bg-[#2a2f42] border border-[#343a52]
                  px-4 py-2 rounded-xl text-sm flex items-center gap-2
                  hover:bg-[#32374d] transition"
              >
                {orderType}
                <FaChevronDown
                  className={`transition-transform ${
                    openType ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openType && (
                <div className="absolute right-0 mt-2 w-40
                  bg-[#2a2f42] border border-[#343a52]
                  rounded-xl overflow-hidden z-30">
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

        {/* PRODUCTS GRID */}
        <div className="overflow-y-auto px-4 pb-20 hide-scrollbar">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-20 pt-24">
            {filteredProducts.map((p) => {
              const selectedSize = size[p.id] || p.sizes[0];
              const price = p.prices[selectedSize];

              return (
                <div
                  key={p.id}
                  className="relative bg-[#1f1d2b] rounded-2xl
                    pt-24 pb-6 px-4 text-center"
                >
                  {/* IMAGE */}
                  <img
                    src={p.image}
                    alt={p.name}
                    className={`absolute -top-10 left-1/2 -translate-x-1/2
                      transition-all duration-300 ease-in-out
                      ${
                        selectedSize === "S"
                          ? "w-24 h-24"
                          : selectedSize === "M"
                          ? "w-28 h-28"
                          : "w-32 h-32"
                      }
                      rounded-full object-cover`}
                  />

                  <h3 className="text-sm font-medium mb-1">{p.name}</h3>

                  <p className="text-green-400 font-semibold mb-1">
                    {price} AED
                  </p>

                  <p className="text-gray-400 text-xs mb-4">
                    {p.stock} Bowls available
                  </p>

                  {/* SIZE BUTTONS */}
                  <div className="flex justify-center gap-2 mb-4">
                    {p.sizes.map((s) => (
                      <button
                        key={`${p.id}-${s}`}
                        onClick={() =>
                          setSize((prev) => ({ ...prev, [p.id]: s }))
                        }
                        className={`w-8 h-8 rounded-md text-xs transition
                          ${
                            selectedSize === s
                              ? "bg-orange-500 text-white"
                              : "bg-[#1f2433] text-gray-300"
                          }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>

                  {/* ADD TO CART */}
                  <button
                    disabled={isInCart(p.id, selectedSize)}
                    onClick={() =>
                      addToCart({
                        id: p.id,
                        name: p.name,
                        size: selectedSize,
                        price,
                        qty: 1,
                        img: p.image,
                      })
                    }
                    className={`px-4 py-2 rounded-xl text-sm
                      ${
                        isInCart(p.id, selectedSize)
                          ? "bg-red-500 cursor-not-allowed"
                          : "bg-orange-500 hover:bg-orange-600"
                      }`}
                  >
                    {isInCart(p.id, selectedSize)
                      ? "Added"
                      : "Add to cart"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ORDER PANEL */}
      <div
        ref={orderPanelRef}
        className={`fixed right-0 top-0 w-full max-w-sm h-screen
          bg-[#1f2433] transform transition-transform duration-300
          ${showOrder ? "translate-x-0" : "translate-x-full"} z-30`}
      >
        <Order orders={orders} setOrders={setOrders} />
      </div>
    </div>
  );
}

export default Firstpage;
