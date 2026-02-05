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
    <div className="text-white">

      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-semibold">Category</h1>
        <button
          onClick={() => {
            setShowModal(true);
            setName("");
            setEditIndex(null);
          }}
          className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-xl"
        >
          Add Category
        </button>
      </div>

      {/* TABLE */}
      {categories.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-y-3 text-sm">
            <thead>
              <tr className="text-gray-400">
                <th className="px-4 text-left">Name</th>
                <th className="px-4 text-left">Products</th>
                <th className="px-4 text-left">Stock</th>
                <th className="px-4 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {categories.map((cat) => (
                <tr
                  key={cat.id}
                  className="bg-[#1f2433] border border-[#2a2f42]"
                >
                  <td className="p-4 font-medium">{cat.name}</td>
                  <td className="p-4 text-gray-400">{cat.products}</td>
                  <td className="p-4 text-gray-400">{cat.stock}</td>
                  <td className="p-4 space-x-4">
                    <button
                      className="text-orange-400 hover:underline"
                      onClick={() => {
                        setName(cat.name);
                        setEditIndex(cat.id);
                        setShowModal(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-500 hover:underline"
                      onClick={() => deleteCategory(cat.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
          <div className="bg-[#1f1d2b] p-6 rounded-2xl w-[400px] border border-[#2a2f42]">

            <h2 className="text-lg font-semibold mb-4">
              {editIndex !== null ? "Edit Category" : "Add Category"}
            </h2>

            <input
              className="w-full bg-[#2a2f42] px-4 py-2 rounded-xl mb-4"
              placeholder="Category name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="bg-[#2a2f42] px-4 py-2 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-orange-500 px-4 py-2 rounded-xl"
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
