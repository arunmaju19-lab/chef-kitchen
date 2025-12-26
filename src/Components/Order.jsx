import React, { useState } from "react";
import deleteIcon from "../assets/foods/delete.svg";

function Order({ orders, setOrders }) {
  const [activeType, setActiveType] = useState("Dine In"); // Track selected type
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

  const subTotal = orders.reduce((sum, item) => sum + item.price * item.qty, 0);
  const finalTotal = subTotal * (1 - discountRate);
  const discountAmount = subTotal * discountRate;
  const types = ["Dine In", "Take Away", "Delivery"];

  return (
    <div className="w-full h-screen bg-[#1F1D2B] text-white flex flex-col rounded-l-2xl">

      {/* Mobile drag handle */}
      <div className="md:hidden w-full flex justify-center py-2">
        <div className="w-12 h-1.5 bg-gray-500 rounded-full"></div>
      </div>
      {/* Header */}
      <div className="p-5  border-[#2a2f42] shrink-0">
        <h2 className="text-lg font-semibold">Orders</h2>

        {/* Order Type Buttons */}
        <div className="flex gap-3 mt-6">
          {types.map((type) => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={`px-4 py-1 rounded-lg text-sm transition-all ${activeType === type
                ? "bg-orange-500 text-white"
                : "border border-[#393C49] text-orange-400 hover:bg-[#2a2f42] "
                }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Table Header */}
      <div className="flex justify-between px-5 py-3 text-sm text-gray-400 border-b border-[#2a2f42] ">
        <span className="w-1/2 font-bold">Item</span>
        <span className="w-1/4 text-center font-bold">Qty</span>
        <span className="w-1/4 text-right font-bold">Price</span>
      </div>

      {/* Orders List */}
      <div className="flex-1 overflow-y-auto hide-scrollbar scroll-smooth px-5 py-4 space-y-5">
        {orders.map((item) => (
          <div key={`${item.id}-${item.size}`}>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                {/* Item */}
                <div className="flex items-center gap-3 w-1/2 min-w-0">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-10 h-10 rounded-full object-cover shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-sm wrap-break-word">{item.name}</p>
                    <p className="text-xs text-gray-400">{item.size} size</p>
                  </div>
                </div>

                {/* Qty */}
                <div className="w-1/4 flex justify-center items-center gap-2">
                  <button
                    className="px-2 py-1 bg-[#2a2f42] rounded-lg cursor-pointer"
                    onClick={() => handleQtyChange(item.id, item.size, -1)}
                  >
                    -
                  </button>
                  <span>{item.qty}</span>
                  <button
                    className="px-2 py-1 bg-[#2a2f42] rounded-lg cursor-pointer"
                    onClick={() => handleQtyChange(item.id, item.size, 1)}
                  >
                    +
                  </button>
                </div>

                {/* Price */}
                <div className="w-1/4 flex justify-end items-center">
                  <span className="text-sm">{(item.price * item.qty).toFixed(2)}</span>
                </div>
              </div>

              {/* Note input + Delete button */}
              <div className="w-full flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Add a note "
                  value={item.note || ""}
                  onChange={(e) => {
                    const newOrders = orders.map((o) =>
                      o.id === item.id && o.size === item.size
                        ? { ...o, note: e.target.value }
                        : o
                    );
                    setOrders(newOrders);
                  }}
                  className="flex-1 bg-[#2a2f42] border border-gray-600 text-sm text-white px-3 py-2 rounded-lg placeholder-gray-400 focus:outline-none focus:border-orange-500"
                />
                <button
                  onClick={() => handleDelete(item.id, item.size)}
                  className="p-2 bg-[#2a2f42] border border-orange-400 rounded-lg hover:border-pink-700 cursor-pointer shrink-0"
                >
                  <img src={deleteIcon} alt="delete" className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="p-5 border-t border-[#2a2f42] shrink-0 space-y-3">
        <div className="flex justify-between text-sm text-gray-400">
          <span>Total</span>
          <span>{subTotal.toFixed(2)} AED</span>
        </div>

        <div className="flex justify-between text-sm text-gray-400">
          <span>Discount ({discountRate * 100}%)</span>
          <span>- {discountAmount.toFixed(2)} AED</span>
        </div>

        <div className="flex justify-between text-base font-semibold">
          <span>Final Amount</span>
          <span>{finalTotal.toFixed(2)} AED</span>
        </div>

        <button className="w-full bg-orange-500 py-3 rounded-xl mt-4 font-medium hover:bg-orange-400 transition cursor-pointer">
          Order now
        </button>
      </div>
    </div>
  );
}

export default Order;
