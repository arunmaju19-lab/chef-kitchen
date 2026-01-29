import React, { createContext, useContext, useEffect, useState } from "react";
import { useCategory } from "./CategoryContext";

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const { recalculateCategoryStats } = useCategory();
  const [products, setProducts] = useState([]);

  // Load products on mount
  useEffect(() => {
    const stored = localStorage.getItem("products");
    if (stored) {
      const parsed = JSON.parse(stored);
      setProducts(parsed);
      recalculateCategoryStats(parsed);
    }
  }, []);

  const saveProducts = (data) => {
    setProducts(data);
    localStorage.setItem("products", JSON.stringify(data));
    recalculateCategoryStats(data);
  };

  // ➕ Add product
  const addProduct = (product) => {
    const updated = [...products, product];
    saveProducts(updated);
  };

  // ✏️ Edit product
  const editProduct = (index, product) => {
    const updated = [...products];
    updated[index] = product;
    saveProducts(updated);
  };

  // 🗑 Delete product
  const deleteProduct = (index) => {
    const updated = products.filter((_, i) => i !== index);
    saveProducts(updated);
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        addProduct,
        editProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);
