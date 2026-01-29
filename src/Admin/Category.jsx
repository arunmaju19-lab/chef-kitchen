import React, { useState } from "react";
import { useCategory } from "../context/CategoryContext";

function Category() {
  const { categories, addCategory, editCategory, deleteCategory } =
    useCategory();

  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const handleSave = () => {
    if (!name.trim()) return;

    editIndex !== null
      ? editCategory(editIndex, name)
      : addCategory(name);

    setName("");
    setEditIndex(null);
    setShowModal(false);
  };

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-semibold">Category</h1>
        <button
          onClick={() => {
            setShowModal(true);
            setName("");
            setEditIndex(null);
          }}
          className="bg-gray-900 text-white px-4 py-2 rounded"
        >
          Add Category
        </button>
      </div>

      {categories.length > 0 && (
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Products</th>
              <th className="p-3 text-left">Stock</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat, i) => (
              <tr key={i} className="border-t">
                <td className="p-3">{cat.name}</td>
                <td className="p-3">{cat.products}</td>
                <td className="p-3">{cat.stock}</td>
                <td className="p-3 space-x-4">
                  <button
                    className="text-blue-600"
                    onClick={() => {
                      setName(cat.name);
                      setEditIndex(i);
                      setShowModal(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600"
                    onClick={() => deleteCategory(i)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded w-[400px]">
            <h2 className="text-lg font-semibold mb-4">
              {editIndex !== null ? "Edit Category" : "Add Category"}
            </h2>

            <input
              className="w-full border px-3 py-2 rounded mb-4"
              placeholder="Category name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="border px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Category;
