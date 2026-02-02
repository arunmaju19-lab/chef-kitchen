import React, { createContext, useContext, useEffect, useState } from "react";

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);

  /* LOAD FROM STORAGE */
  useEffect(() => {
    const stored = localStorage.getItem("categories");
    if (stored) {
      setCategories(JSON.parse(stored));
    }
  }, []);

  const saveToStorage = (data) => {
    localStorage.setItem("categories", JSON.stringify(data));
  };

  /* ADD CATEGORY (ID BASED) */
  const addCategory = (name) => {
    const updated = [
      ...categories,
      {
        id: Date.now(), // 🔥 UNIQUE ID
        name,
        products: 0,
        stock: 0,
      },
    ];
    setCategories(updated);
    saveToStorage(updated);
  };

  /* EDIT CATEGORY BY ID */
  const editCategory = (id, name) => {
    const updated = categories.map((cat) =>
      cat.id === id ? { ...cat, name } : cat
    );
    setCategories(updated);
    saveToStorage(updated);
  };

  /* DELETE CATEGORY BY ID */
  const deleteCategory = (id) => {
    const updated = categories.filter((cat) => cat.id !== id);
    setCategories(updated);
    saveToStorage(updated);
  };

  /* RECALCULATE STATS (SAFE) */
  const recalculateCategoryStats = (products) => {
    const stored = localStorage.getItem("categories");
    if (!stored) return;

    const baseCategories = JSON.parse(stored);

    const updated = baseCategories.map((cat) => {
      const related = products.filter(
        (p) => p.category === cat.name
      );

      const totalStock = related.reduce(
        (sum, p) => sum + Number(p.stock || 0),
        0
      );

      return {
        ...cat,
        products: related.length,
        stock: totalStock,
      };
    });

    setCategories(updated);
    saveToStorage(updated);
  };

  return (
    <CategoryContext.Provider
      value={{
        categories,
        addCategory,
        editCategory,
        deleteCategory,
        recalculateCategoryStats,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => useContext(CategoryContext);
