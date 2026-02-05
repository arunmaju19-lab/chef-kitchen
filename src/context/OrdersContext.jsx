import React, { createContext, useContext, useState, useEffect } from "react";

const OrdersContext = createContext();

export const OrdersProvider = ({ children }) => {
  const [adminOrders, setAdminOrders] = useState([]);

  // load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("adminOrders");
    if (stored) {
      setAdminOrders(JSON.parse(stored));
    }
  }, []);

  const addAdminOrder = (order) => {
    const updated = [...adminOrders, order];
    setAdminOrders(updated);
    localStorage.setItem("adminOrders", JSON.stringify(updated));
  };

  return (
    <OrdersContext.Provider value={{ adminOrders, addAdminOrder }}>
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => useContext(OrdersContext);
