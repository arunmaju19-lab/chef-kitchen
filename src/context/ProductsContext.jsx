import React, { createContext, useContext, useEffect, useState } from "react";
import { useCategory } from "./CategoryContext";

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
    const { recalculateCategoryStats } = useCategory();
    const [products, setProducts] = useState([]);

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

    const addProduct = (product) => {
        saveProducts([...products, product]);
    };

    const editProduct = (id, updatedProduct) => {
  const updated = products.map((p) =>
    p.id === id ? updatedProduct : p
  );
  saveProducts(updated);
};


    const deleteProduct = (id) => {
  saveProducts(products.filter((p) => p.id !== id));
};


    return (
        <ProductsContext.Provider
            value={{ products, addProduct, editProduct, deleteProduct }}
        >
            {children}
        </ProductsContext.Provider>
    );
};

export const useProducts = () => useContext(ProductsContext);
