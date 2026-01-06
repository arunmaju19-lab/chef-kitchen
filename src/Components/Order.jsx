import React, { useState } from "react";
import deleteIcon from "../assets/foods/delete.svg";

function Order({ orders, setOrders }) {
  const [activeType, setActiveType] = useState("Dine In");
  const discountRate = 0.05;

  const handleQtyChange = (id, size, delta) => {
    setOrders(
      orders
        .map((item) =>
          item.id === id && item.size === size
            ? { ...item, qty: Math.max(1, item.qty + delta) }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const handleDelete = (id, size) => {
    setOrders(orders.filter((item) => !(item.id === id && item.size === size)));
  };

  /* ===== PRICE CALCULATION ===== */
  const subTotal = orders.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );
  const discountAmount = subTotal * discountRate;
  const finalTotal = subTotal - discountAmount;

  const types = ["Dine In", "Take Away", "Delivery"];

  return (
    <div className="relative w-full h-screen bg-[#1F1D2B] text-white flex flex-col rounded-l-2xl">

      {/* ===== MOBILE DRAG HANDLE ===== */}
      <div className="md:hidden w-full flex justify-center py-2 shrink-0">
        <div className="w-12 h-1.5 bg-gray-500 rounded-full" />
      </div>

      {/* ===== HEADER ===== */}
      <div className="p-5 shrink-0">
        <h2 className="text-lg font-semibold">Orders</h2>

        <div className="flex gap-3 mt-6">
          {types.map((type) => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={`px-4 py-1 rounded-lg text-sm transition-all
                ${
                  activeType === type
                    ? "bg-orange-500 text-white"
                    : "border border-[#393C49] text-orange-400 hover:bg-[#2a2f42]"
                }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* ===== TABLE HEADER ===== */}
      <div className="flex justify-between px-5 py-3 text-sm text-gray-400 border-b border-[#2a2f42] shrink-0">
        <span className="w-1/2 font-bold">Item</span>
        <span className="w-1/4 text-center font-bold">Qty</span>
        <span className="w-1/4 text-right font-bold">Price</span>
      </div>

      {/* ===== ORDERS LIST (SCROLLABLE) ===== */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5 pb-60">
        {orders.map((item) => (
          <div key={`${item.id}-${item.size}`} className="space-y-2">
            <div className="flex items-center justify-between">

              {/* Item */}
              <div className="flex items-center gap-3 w-1/2 min-w-0">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-10 h-10 rounded-full shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-sm wrap-break-word">{item.name}</p>
                  <p className="text-xs text-gray-400">{item.size} size</p>
                </div>
              </div>

              {/* Qty */}
              <div className="w-1/4 flex justify-center items-center gap-2">
                <button
                  className="px-2 py-1 bg-[#2a2f42] rounded-lg"
                  onClick={() => handleQtyChange(item.id, item.size, -1)}
                >
                  -
                </button>
                <span>{item.qty}</span>
                <button
                  className="px-2 py-1 bg-[#2a2f42] rounded-lg"
                  onClick={() => handleQtyChange(item.id, item.size, 1)}
                >
                  +
                </button>
              </div>

              {/* Price */}
              <div className="w-1/4 flex justify-end text-sm">
                {(item.price * item.qty).toFixed(2)}
              </div>
            </div>

            {/* Note + Delete */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add a note"
                value={item.note || ""}
                onChange={(e) =>
                  setOrders(
                    orders.map((o) =>
                      o.id === item.id && o.size === item.size
                        ? { ...o, note: e.target.value }
                        : o
                    )
                  )
                }
                className="flex-1 bg-[#2a2f42] border border-gray-600 text-sm px-3 py-2 rounded-lg placeholder-gray-400 focus:outline-none focus:border-orange-500"
              />
              <button
                onClick={() => handleDelete(item.id, item.size)}
                className="p-2 bg-[#2a2f42] border border-orange-400 rounded-lg"
              >
                <img src={deleteIcon} className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ===== DESKTOP SUMMARY ===== */}
      <div className="hidden md:block p-5 border-t border-[#2a2f42] space-y-3">
        <div className="flex justify-between text-sm text-gray-400">
          <span>Total</span>
          <span>{subTotal.toFixed(2)} AED</span>
        </div>

        <div className="flex justify-between text-sm text-gray-400">
          <span>Discount (5%)</span>
          <span>- {discountAmount.toFixed(2)} AED</span>
        </div>

        <div className="flex justify-between text-base font-semibold">
          <span>Final Amount</span>
          <span>{finalTotal.toFixed(2)} AED</span>
        </div>

        <button className="w-full bg-orange-500 py-3 rounded-xl mt-4 font-medium">
          Order now
        </button>
      </div>

      {/* ===== MOBILE FIXED SUMMARY + BUTTON ===== */}
      <div className="fixed bottom-20 left-0 right-0 bg-[#1F1D2B] px-5 py-4 md:hidden border-t border-[#2a2f42] z-40">
        <div className="flex justify-between text-sm text-gray-400 mb-1">
          <span>Total</span>
          <span>{subTotal.toFixed(2)} AED</span>
        </div>

        <div className="flex justify-between text-sm text-gray-400 mb-1">
          <span>Discount (5%)</span>
          <span>- {discountAmount.toFixed(2)} AED</span>
        </div>

        <div className="flex justify-between text-base font-semibold mb-3">
          <span>Final Amount</span>
          <span>{finalTotal.toFixed(2)} AED</span>
        </div>

        <button className="w-full bg-orange-500 py-3 rounded-xl font-medium">
          Order now
        </button>
      </div>
    </div>
  );
}

export default Order;
