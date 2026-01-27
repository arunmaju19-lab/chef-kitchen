import { createContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const discountRate = 0.05;

  /* ===== QTY CHANGE ===== */
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

  /* ===== DELETE ===== */
  const handleDelete = (id, size) => {
    setOrders(
      orders.filter((item) => !(item.id === id && item.size === size))
    );
  };

  /* ===== PRICE ===== */
  const subTotal = orders.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const discountAmount = subTotal * discountRate;
  const finalTotal = subTotal - discountAmount;

  /* ===== ORDER NOW ===== */
  const handleOrderNow = (onOrderSuccess) => {
    if (orders.length === 0) return;

    if (onOrderSuccess) {
      onOrderSuccess(finalTotal);
    }

    setOrders([]); // clear cart
  };

  return (
    <CartContext.Provider
      value={{
        orders,
        setOrders,
        handleQtyChange,
        handleDelete,
        handleOrderNow,
        subTotal,
        discountAmount,
        finalTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
