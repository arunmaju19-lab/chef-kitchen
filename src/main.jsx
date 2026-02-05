import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { CategoryProvider } from "./context/CategoryContext";
import { ProductsProvider } from "./context/ProductsContext";
import { OrdersProvider } from "./context/OrdersContext";
// import { OrderProvider } from "./context/OrderContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <OrdersProvider>
    <CategoryProvider>
      <ProductsProvider>
        <App />
      </ProductsProvider>
    </CategoryProvider>
  </OrdersProvider>
</BrowserRouter>
);
