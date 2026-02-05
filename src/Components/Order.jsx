import React, { useState } from "react";
import deleteIcon from "../assets/foods/delete.svg";
import { useOrders } from "../context/OrdersContext";

function Order({ orders, setOrders, onOrderSuccess }) {
  const [activeType, setActiveType] = useState("Dine In");
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [customerName, setCustomerName] = useState("");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("Cash on Delivery");

  const { addAdminOrder } = useOrders();

  const discountRate = 0.05;
  const types = ["Dine In", "Take Away", "Delivery"];

  /* ================= QTY ================= */
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
    setOrders(orders.filter((i) => !(i.id === id && i.size === size)));
  };

  /* ================= PRICE ================= */
  const subTotal = orders.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );
  const discountAmount = subTotal * discountRate;
  const finalTotal = subTotal - discountAmount;

  /* ================= CONFIRM ORDER ================= */
  const confirmOrder = () => {
    if (!customerName || !address) return;

    const newOrder = {
      id: Date.now(),
      customerName,
      address,
      payment,
      orderType: activeType,
      items: orders,
      total: finalTotal,
      createdAt: new Date().toISOString(),
    };

    addAdminOrder(newOrder);

    setShowConfirm(false);
    setShowSuccess(true);
    setOrders([]);

    setCustomerName("");
    setAddress("");
    setPayment("Cash on Delivery");

    setTimeout(() => {
      setShowSuccess(false);
      onOrderSuccess && onOrderSuccess();
    }, 2000);
  };

  return (
    <>
      {/* ================= ORDER CONTENT ================= */}
      <div className="w-full h-full bg-[#14182b] text-white flex flex-col ">

        {/* HEADER */}
        <div className="p-5 border-b border-[#23284a] shrink-0">
          <h2 className="text-lg font-semibold">Orders</h2>

          <div className="flex gap-3 mt-4">
            {types.map((type) => (
              <button
                key={type}
                onClick={() => setActiveType(type)}
                className={`px-4 py-1 rounded-lg text-sm transition
                  ${
                    activeType === type
                      ? "bg-orange-500 text-white"
                      : "bg-[#1d2240] text-[#8b90b5] border border-[#23284a]"
                  }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* TABLE HEADER */}
        <div className="flex justify-between px-5 py-3 text-sm text-[#8b90b5] border-b border-[#23284a] shrink-0">
          <span className="w-1/2 font-semibold">Item</span>
          <span className="w-1/4 text-center font-semibold">Qty</span>
          <span className="w-1/4 text-right font-semibold">Price</span>
        </div>

        {/* ITEMS */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5 hide-scrollbar">
          {orders.length === 0 && (
            <p className="text-center text-[#8b90b5] mt-10">
              Cart is empty
            </p>
          )}

          {orders.map((item) => (
            <div
              key={`${item.id}-${item.size}`}
              className="bg-[#1a1f36] p-3 rounded-xl border border-[#23284a] space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 w-1/2">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="text-sm">{item.name}</p>
                    <p className="text-xs text-[#8b90b5]">
                      {item.size} size
                    </p>
                  </div>
                </div>

                <div className="w-1/4 flex justify-center gap-2">
                  <button
                    className="px-2 bg-[#1d2240] rounded"
                    onClick={() =>
                      handleQtyChange(item.id, item.size, -1)
                    }
                  >
                    -
                  </button>
                  <span>{item.qty}</span>
                  <button
                    className="px-2 bg-[#1d2240] rounded"
                    onClick={() =>
                      handleQtyChange(item.id, item.size, 1)
                    }
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
                  className="flex-1 bg-[#1d2240] px-3 py-2 rounded-lg text-sm placeholder-[#8b90b5]"
                />
                <button
                  onClick={() =>
                    handleDelete(item.id, item.size)
                  }
                  className="p-2 bg-[#1d2240] rounded-lg"
                >
                  <img
                    src={deleteIcon}
                    alt="delete"
                    className="w-4 h-4"
                  />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* SUMMARY */}
        <div className="p-5 border-t border-[#23284a] space-y-3 shrink-0">
          <div className="flex justify-between text-sm text-[#8b90b5]">
            <span>Sub Total</span>
            <span>{subTotal.toFixed(2)} AED</span>
          </div>

          <div className="flex justify-between text-sm text-[#8b90b5]">
            <span>Discount (5%)</span>
            <span>- {discountAmount.toFixed(2)} AED</span>
          </div>

          <div className="flex justify-between font-semibold">
            <span>Final Amount</span>
            <span>{finalTotal.toFixed(2)} AED</span>
          </div>

          <button
            disabled={!orders.length}
            onClick={() => setShowConfirm(true)}
            className="w-full bg-orange-500 py-3 rounded-xl disabled:opacity-40"
          >
            Order now
          </button>
        </div>
      </div>

      {/* ================= CONFIRM MODAL ================= */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/70 z-[10000] flex items-center justify-center">
          <div className="bg-[#1a1f36] w-[360px] rounded-2xl p-6 space-y-4 border border-[#23284a]">
            <h2 className="text-lg font-semibold text-center">
              Order Confirmation
            </h2>

            <input
              placeholder="Customer Name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full bg-[#1d2240] px-4 py-2 rounded-xl"
            />

            <textarea
              placeholder="Delivery Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows="3"
              className="w-full bg-[#1d2240] px-4 py-2 rounded-xl resize-none"
            />

            <select
              value={payment}
              onChange={(e) => setPayment(e.target.value)}
              className="w-full bg-[#1d2240] px-4 py-2 rounded-xl"
            >
              <option>Cash on Delivery</option>
              <option>UPI</option>
              <option>Card</option>
            </select>

            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 bg-[#1d2240] py-2 rounded-xl"
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
        </div>
      )}

      {/* ================= SUCCESS MODAL ================= */}
      {showSuccess && (
        <div className="fixed inset-0 z-[10001] flex items-center justify-center bg-black/70">
          <div className="bg-[#1a1f36] w-72 rounded-2xl p-6 flex flex-col items-center gap-4 border border-[#23284a]">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-white text-3xl">
              ✓
            </div>
            <h2 className="text-lg font-semibold">
              Ordered Successfully
            </h2>
            <p className="text-sm text-[#8b90b5] text-center">
              Your order has been placed successfully
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default Order;
