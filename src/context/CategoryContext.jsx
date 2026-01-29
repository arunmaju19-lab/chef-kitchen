import React, { createContext, useContext, useEffect, useState } from "react";

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);

  // Load categories
  useEffect(() => {
    const stored = localStorage.getItem("categories");
    if (stored) setCategories(JSON.parse(stored));
  }, []);

  const saveToStorage = (data) => {
    localStorage.setItem("categories", JSON.stringify(data));
  };

  const addCategory = (name) => {
    const updated = [...categories, { name, products: 0, stock: 0 }];
    setCategories(updated);
    saveToStorage(updated);
  };

  const editCategory = (index, name) => {
    const updated = [...categories];
    updated[index].name = name;
    setCategories(updated);
    saveToStorage(updated);
  };

  const deleteCategory = (index) => {
    const updated = categories.filter((_, i) => i !== index);
    setCategories(updated);
    saveToStorage(updated);
  };

  // ⭐ Calculate products count & stock from products list
  const recalculateCategoryStats = (products) => {
    const updated = categories.map((cat) => {
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
