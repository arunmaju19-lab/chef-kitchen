import React, { useState } from "react";
import deleteIcon from "../assets/foods/delete.svg";

function Order({ orders, setOrders }) {
  const [activeType, setActiveType] = useState("Dine In");
  const [showConfirm, setShowConfirm] = useState(false);

  const [customerName, setCustomerName] = useState("");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("Cash on Delivery");
  const [showSuccess, setShowSuccess] = useState(false);

  const discountRate = 0.05;

  /* ===== QTY ===== */
  const handleQtyChange = (id, size, delta) => {
    setOrders(
      orders.map((item) =>
        item.id === id && item.size === size
          ? { ...item, qty: Math.max(1, item.qty + delta) }
          : item
      )
    );
  };

  const handleDelete = (id, size) => {
    setOrders(orders.filter((item) => !(item.id === id && item.size === size)));
  };

  /* ===== PRICE ===== */
  const subTotal = orders.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );
  const discountAmount = subTotal * discountRate;
  const finalTotal = subTotal - discountAmount;

  const types = ["Dine In", "Take Away", "Delivery"];

  /* ===== CONFIRM ORDER ===== */
  const confirmOrder = () => {
  if (!customerName || !address) return;

  setShowConfirm(false);   // close confirmation
  setShowSuccess(true);   // 🔥 show success animation
  setOrders([]);          // clear cart

  setCustomerName("");
  setAddress("");
  setPayment("Cash on Delivery");

  setTimeout(() => {
    setShowSuccess(false); // auto close animation
  }, 2500);
};


  return (
    <>
      {/* ================= ORDER PANEL ================= */}
      <div className="relative w-full h-screen bg-[#1F1D2B] text-white flex flex-col rounded-l-2xl overflow-hidden">

        {/* HEADER */}
        <div className="p-5 shrink-0">
          <h2 className="text-lg font-semibold">Orders</h2>

          <div className="flex gap-3 mt-6">
            {types.map((type) => (
              <button
                key={type}
                onClick={() => setActiveType(type)}
                className={`px-4 py-1 rounded-lg text-sm transition-all ${
                  activeType === type
                    ? "bg-orange-500 text-white"
                    : "border border-[#393C49] text-orange-400"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* TABLE HEADER */}
        <div className="flex justify-between px-5 py-3 text-sm text-gray-400 border-b border-[#2a2f42]">
          <span className="w-1/2 font-bold">Item</span>
          <span className="w-1/4 text-center font-bold">Qty</span>
          <span className="w-1/4 text-right font-bold">Price</span>
        </div>

        {/* ITEMS */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5 hide-scrollbar">
          {orders.map((item) => (
            <div key={`${item.id}-${item.size}`} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 w-1/2">
                  <img src={item.img} className="w-10 h-10 rounded-full" />
                  <div>
                    <p className="text-sm">{item.name}</p>
                    <p className="text-xs text-gray-400">{item.size} size</p>
                  </div>
                </div>

                <div className="w-1/4 flex justify-center gap-2">
                  <button
                    className="px-2 bg-[#2a2f42]"
                    onClick={() => handleQtyChange(item.id, item.size, -1)}
                  >
                    -
                  </button>
                  <span>{item.qty}</span>
                  <button
                    className="px-2 bg-[#2a2f42]"
                    onClick={() => handleQtyChange(item.id, item.size, 1)}
                  >
                    +
                  </button>
                </div>

                <div className="w-1/4 text-right">
                  {(item.price * item.qty).toFixed(2)}
                </div>
              </div>

              <div className="flex gap-2">
                <input
                  placeholder="Add a note"
                  className="flex-1 bg-[#2a2f42] px-3 py-2 rounded-lg text-sm"
                />
                <button
                  onClick={() => handleDelete(item.id, item.size)}
                  className="p-2 bg-[#2a2f42] rounded-lg"
                >
                  <img src={deleteIcon} className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* SUMMARY */}
        <div className="p-5 border-t border-[#2a2f42] space-y-3">
          <div className="flex justify-between text-sm text-gray-400">
            <span>Total</span>
            <span>{subTotal.toFixed(2)} AED</span>
          </div>

          <div className="flex justify-between text-sm text-gray-400">
            <span>Discount (5%)</span>
            <span>- {discountAmount.toFixed(2)} AED</span>
          </div>

          <div className="flex justify-between font-semibold">
            <span>Final Amount</span>
            <span>{finalTotal.toFixed(2)} AED</span>
          </div>

          <button
            onClick={() => orders.length && setShowConfirm(true)}
            className="w-full bg-orange-500 py-3 rounded-xl"
          >
            Order now
          </button>
        </div>
      </div>

      {/* ================= CONFIRMATION MODAL ================= */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/70 z-[99999] flex items-center justify-center">
          <div className="bg-[#1f2433] w-[360px] rounded-2xl p-6 space-y-4">

            <h2 className="text-lg font-semibold text-center">
              Order Confirmation
            </h2>

            <input
              placeholder="Customer Name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full bg-[#2a2f42] px-4 py-2 rounded-xl"
            />

            <textarea
              placeholder="Delivery Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows="3"
              className="w-full bg-[#2a2f42] px-4 py-2 rounded-xl resize-none"
            />

            <select
              value={payment}
              onChange={(e) => setPayment(e.target.value)}
              className="w-full bg-[#2a2f42] px-4 py-2 rounded-xl"
            >
              <option>Cash on Delivery</option>
              <option>UPI</option>
              <option>Card</option>
            </select>

            <div className="flex justify-between text-sm text-gray-400">
              <span>Payable</span>
              <span className="text-green-400 font-semibold">
                {finalTotal.toFixed(2)} AED
              </span>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 bg-[#2a2f42] py-2 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={confirmOrder}
                className="flex-1 bg-orange-500 py-2 rounded-xl"
              >
                Confirm
              </button>
            </div>

          </div>
          {showSuccess && (
  <div className="fixed inset-0 z-[999999]
    flex items-center justify-center bg-black/70">

    <div className="bg-[#1f2433] w-72 rounded-2xl p-6
      flex flex-col items-center gap-4
      animate-scaleFade">

      {/* CHECK ICON */}
      <div className="w-20 h-20 bg-green-500 rounded-full
        flex items-center justify-center
        text-white text-3xl animate-pop">
        ✓
      </div>

      <h2 className="text-lg font-semibold">
        Ordered Successfully
      </h2>

      <p className="text-sm text-gray-400 text-center">
        Your order has been placed successfully
      </p>
    </div>
  </div>
)}

        </div>
      )}
    </>
  );
}

export default Order;
