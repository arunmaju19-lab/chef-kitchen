import React, { useState } from "react";
import { useCategory } from "../context/CategoryContext";
import { useProducts } from "../context/ProductsContext";

function Products() {
  const { categories } = useCategory();
  const { products, addProduct, editProduct, deleteProduct } = useProducts();

  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const [form, setForm] = useState({
    name: "",
    category: "",
    stock: "",
    orderType: [],
    sizes: [],
  });

  const toggle = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((v) => v !== value)
        : [...prev[key], value],
    }));
  };

  const handleSave = () => {
    if (!form.name || !form.category) return;

    editIndex !== null
      ? editProduct(editIndex, form)
      : addProduct(form);

    setForm({
      name: "",
      category: "",
      stock: "",
      orderType: [],
      sizes: [],
    });

    setEditIndex(null);
    setShowModal(false);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-semibold">Products</h1>
        <button
          onClick={() => {
            setShowModal(true);
            setEditIndex(null);
            setForm({
              name: "",
              category: "",
              stock: "",
              orderType: [],
              sizes: [],
            });
          }}
          className="bg-gray-900 text-white px-4 py-2 rounded"
        >
          Add Product
        </button>
      </div>

      {/* TABLE */}
    {products.length > 0 && (
  <div className="overflow-x-auto bg-white rounded border">
    <table className="w-full border-collapse text-sm">
      <thead className="bg-gray-100 text-gray-700">
        <tr>
          <th className="px-4 py-3 text-left">Name</th>
          <th className="px-4 py-3 text-left">Category</th>
          <th className="px-4 py-3 text-center">Stock</th>
          <th className="px-4 py-3 text-left">Order Type</th>
          <th className="px-4 py-3 text-center">Sizes</th>
          <th className="px-4 py-3 text-center">Actions</th>
        </tr>
      </thead>

      <tbody>
        {products.map((p, i) => (
          <tr
            key={i}
            className="border-t hover:bg-gray-50 transition"
          >
            <td className="px-4 py-3 text-left">{p.name}</td>
            <td className="px-4 py-3 text-left">{p.category}</td>
            <td className="px-4 py-3 text-center">{p.stock}</td>
            <td className="px-4 py-3 text-left">
              {p.orderType.join(", ")}
            </td>
            <td className="px-4 py-3 text-center">
              {p.sizes.join(", ")}
            </td>
            <td className="px-4 py-3 text-center space-x-3">
              <button
                className="text-blue-600 hover:underline"
                onClick={() => {
                  setForm(p);
                  setEditIndex(i);
                  setShowModal(true);
                }}
              >
                Edit
              </button>
              <button
                className="text-red-600 hover:underline"
                onClick={() => deleteProduct(i)}
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
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 w-[500px] rounded">
            <h2 className="text-lg font-semibold mb-4">
              {editIndex !== null ? "Edit Product" : "Add Product"}
            </h2>

            <input
              className="w-full border px-3 py-2 mb-3"
              placeholder="Product Name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <div className="flex gap-3 mb-3">
              <select
                className="w-1/2 border px-3 py-2"
                value={form.category}
                onChange={(e) =>
                  setForm({ ...form, category: e.target.value })
                }
              >
                <option value="">Category</option>
                {categories.map((c, i) => (
                  <option key={i}>{c.name}</option>
                ))}
              </select>

              <input
                className="w-1/2 border px-3 py-2"
                placeholder="Stock"
                value={form.stock}
                onChange={(e) =>
                  setForm({ ...form, stock: e.target.value })
                }
              />
            </div>

            <div className="mb-3">
              {["DINE IN", "TAKEAWAY", "DELIVERY"].map((t) => (
                <label key={t} className="mr-4">
                  <input
                    type="checkbox"
                    checked={form.orderType.includes(t)}
                    onChange={() => toggle("orderType", t)}
                  />{" "}
                  {t}
                </label>
              ))}
            </div>

            <div className="mb-4">
              {["S", "M", "L"].map((s) => (
                <label key={s} className="mr-4">
                  <input
                    type="checkbox"
                    checked={form.sizes.includes(s)}
                    onChange={() => toggle("sizes", s)}
                  />{" "}
                  {s}
                </label>
              ))}
            </div>

            <button
              onClick={handleSave}
              className="w-full bg-blue-600 text-white py-2 rounded"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;
