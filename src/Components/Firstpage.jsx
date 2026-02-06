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
  const [orderAnimating, setOrderAnimating] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  const orderTypeRef = useRef(null);
  const orderRef = useRef(null);

  /* ================= CLOCK ================= */
  useEffect(() => {
    const timer = setInterval(() => setCurrentDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  /* ================= INIT SIZE ================= */
  useEffect(() => {
    if (products.length > 0) {
      const initial = {};
      products.forEach((p) => {
        initial[p.id] = p.sizes[0];
      });
      setSize(initial);
    }
  }, [products]);

  /* ================= OUTSIDE CLICK ================= */
  useEffect(() => {
    const handler = (e) => {
      if (orderTypeRef.current && !orderTypeRef.current.contains(e.target)) {
        setOpenType(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (orderRef.current && !orderRef.current.contains(e.target)) {
        closeOrder();
      }
    };
    if (showOrder) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showOrder]);

  /* ================= TABS ================= */
  const tabs = [
    { id: "1", label: "Today Special" },
    { id: "2", label: "Our Specials" },
    { id: "3", label: "South Indian Special" },
  ];

  const selectedCategory =
    tabs.find((t) => t.id === activeTab)?.label;

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) &&
      p.category === selectedCategory
  );

  const isInCart = (id, s) =>
    orders.some((o) => o.id === id && o.size === s);

  const addToCart = (item) => {
    setOrders((prev) =>
      isInCart(item.id, item.size) ? prev : [...prev, item]
    );
  };

  const totalItems = orders.length;

  const openOrder = () => {
    setShowOrder(true);
    setTimeout(() => setOrderAnimating(true), 10);
  };

  const closeOrder = () => {
    setOrderAnimating(false);
    setTimeout(() => setShowOrder(false), 300);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row h-screen bg-[#0f1220] text-white overflow-y-auto hide-scrollbar">
        <Sidebar />

        <div className="flex-1 flex flex-col">
          {/* HEADER */}
          {/* ================= HEADER ================= */}
          <div className="p-4 sticky top-0 z-20 bg-[#0f1220]">

            {/* TITLE */}
            <div className="mb-3">
              <h1 className="text-2xl font-bold">Chef Kitchen</h1>
              <p className="text-sm text-[#8b90b5]">
                {currentDateTime.toLocaleDateString("en-IN", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>

            {/* SEARCH + CART (RIGHT SIDE, BELOW TITLE) */}
            <div className="flex justify-end items-center gap-3 mb-6">

              {/* SEARCH */}
              <div className="relative w-full sm:w-72">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b90b5]" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search food..."
                  className="
          bg-[#1d2240] rounded-xl pl-9 pr-4 py-2 text-sm
          text-white placeholder-[#8b90b5]
          w-full
        "
                />
              </div>

              {/* CART */}
              <button
                onClick={() => totalItems > 0 && openOrder()}
                className={`relative w-10 h-10 rounded-full flex items-center justify-center
        ${totalItems === 0
                    ? "bg-[#1d2240] text-[#8b90b5]"
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

            {/* TABS */}
            <div className="flex gap-8 border-b border-[#23284a] mb-6
                  overflow-x-auto hide-scrollbar whitespace-nowrap">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={`pb-3 relative transition ${activeTab === t.id
                      ? "text-orange-500"
                      : "text-[#8b90b5] hover:text-white"
                    }`}
                >
                  {t.label}
                  {activeTab === t.id && (
                    <span className="absolute left-0 bottom-0 w-full h-0.5 bg-orange-500" />
                  )}
                </button>
              ))}
            </div>

            {/* ORDER TYPE */}
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Choose Dishes</h2>

              <div ref={orderTypeRef} className="relative">
                <button
                  onClick={() => setOpenType((p) => !p)}
                  className="bg-[#1d2240] border border-[#23284a]
          px-4 py-2 rounded-xl text-sm flex items-center gap-2"
                >
                  {orderType}
                  <FaChevronDown
                    className={`transition-transform ${openType ? "rotate-180" : ""
                      }`}
                  />
                </button>

                {openType && (
                  <div className="absolute right-0 mt-2 w-40
          bg-[#14182b] border border-[#23284a]
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
                  hover:bg-orange-500"
                        >
                          {type}
                        </button>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* PRODUCTS */}
          <div className="overflow-y-auto px-4 pb-20 bg-[#0f1220] hide-scrollbar">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-20 pt-24">
              {filteredProducts.map((p) => {
                const selectedSize = size[p.id] || p.sizes[0];
                const price = p.prices[selectedSize];

                return (
                  <div
                    key={p.id}
                    className="relative bg-[#1a1f36] rounded-2xl
                      pt-24 pb-6 px-4 text-center border border-[#23284a]"
                  >
   

                    <img
                      src={p.image}
                      alt={p.name}
                      className="absolute -top-10 left-1/2 -translate-x-1/2
                        w-28 h-28 rounded-full object-cover shadow-xl"
                    />

                    <h3 className="text-sm font-medium mb-1">{p.name}</h3>
                    <p className="text-green-400 font-semibold mb-1">
                      {price} AED
                    </p>
                    <p className="text-[#8b90b5] text-xs mb-4">
                      {p.stock} Bowls available
                    </p>
                                     {/* SIZE SELECTOR */}
<div className="flex justify-center gap-2 mb-3">
  {p.sizes.map((s) => (
    <button
      key={s}
      onClick={() =>
        setSize((prev) => ({
          ...prev,
          [p.id]: s,
        }))
      }
      className={`px-3 py-1 text-xs rounded-full border transition
        ${
          selectedSize === s
            ? "bg-orange-500 border-orange-500 text-white"
            : "bg-transparent border-[#23284a] text-[#8b90b5] hover:text-white"
        }`}
    >
      {s}
    </button>
  ))}
</div>

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
                      className={`px-4 py-2 rounded-xl text-sm transition
                        ${isInCart(p.id, selectedSize)
                          ? "bg-red-500"
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
      </div>

      {/* ORDER PANEL */}
      {showOrder && (
        <>
          <div className="fixed inset-0 bg-black/60 z-[998] md:hidden" />
          <div
            ref={orderRef}
            className={`fixed top-0 right-0 h-screen z-[999]
              w-full sm:w-[60%] md:w-[40%] lg:w-[30%]
              bg-[#14182b] border-l border-[#23284a]
              transform transition-all duration-300
              ${orderAnimating
                ? "translate-x-0 opacity-100"
                : "translate-x-full opacity-0"
              }`}
          >
            <Order orders={orders} setOrders={setOrders} />
            <button
              onClick={closeOrder}
              className="absolute top-4 right-4 text-white text-xl"
            >
              ✕
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default Firstpage;