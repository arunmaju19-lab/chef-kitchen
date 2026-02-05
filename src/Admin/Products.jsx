import React, { useState } from "react";
import { useCategory } from "../context/CategoryContext";
import { useProducts } from "../context/ProductsContext";

function Products() {
  const { categories } = useCategory();
  const { products, addProduct, editProduct, deleteProduct } = useProducts();

  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const emptyPrices = { S: "", M: "", L: "" };

  const [form, setForm] = useState({
    id: null,
    name: "",
    category: "",
    stock: "",
    sizes: [],
    prices: emptyPrices,
    image: "",
  });

  /* Toggle sizes */
  const toggleSize = (size) => {
    setForm((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  /* Image upload */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () =>
      setForm((prev) => ({ ...prev, image: reader.result }));
    reader.readAsDataURL(file);
  };

  /* SAVE PRODUCT */
  const handleSave = () => {
    if (!form.name || !form.category || form.sizes.length === 0) return;

    const productData = {
      ...form,
      id: form.id ?? Date.now(),
      prices: form.prices || emptyPrices,
    };

    if (editId) {
      editProduct(editId, productData);
    } else {
      addProduct(productData);
    }

    setForm({
      id: null,
      name: "",
      category: "",
      stock: "",
      sizes: [],
      prices: emptyPrices,
      image: "",
    });

    setEditId(null);
    setShowModal(false);
  };

  return (
    <div className="text-white hide-scrollbar">

      {/* HEADER */}
      <div className="flex justify-between mb-6 ">
        <h1 className="text-2xl font-semibold">Products</h1>
        <button
          onClick={() => {
            setShowModal(true);
            setEditId(null);
          }}
          className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-xl"
        >
          Add Product
        </button>
      </div>

      {/* TABLE */}
      {products.length > 0 && (
        <div className="overflow-x-auto ">
          <table className="w-full border-separate border-spacing-y-3 text-sm ">
           <thead>
  <tr className="text-gray-400">
    <th className="px-4 text-left">Image</th>
    <th className="px-4 text-left">Name</th>
    <th className="px-4 text-left">Category</th>
    <th className="px-4 text-left">Stock</th>
    <th className="px-4 text-left w-40">Size & Price</th>
    <th className="px-4 text-left">Actions</th>
  </tr>
</thead>

<tbody>
  {products.map((p) => (
    <tr
      key={p.id}
      className="bg-[#1f2433] border border-[#2a2f42] align-top"
    >
      <td className="p-4 text-center">
        {p.image && (
          <img
            src={p.image}
            alt={p.name}
            className="w-12 h-12 rounded-full mx-auto"
          />
        )}
      </td>

      <td className="p-4">{p.name}</td>
      <td className="p-4 text-gray-400">{p.category}</td>
      <td className="p-4 text-gray-400">{p.stock}</td>

      {/* FIXED SIZE + PRICE */}
      <td className="p-4 align-top">
        <div className="flex flex-col gap-1 w-40">
          {p.sizes.map((s) => (
            <div key={s} className="flex gap-8">
              <span className="text-gray-400">{s}</span>
              <span className="text-green-400">
                ₹ {p.prices?.[s] ?? "-"}
              </span>
            </div>
          ))}
        </div>
      </td>

    <td className="p-4 space-x-3">
  {/* EDIT */}
  <button
    className="text-orange-400 hover:underline"
    onClick={() => {
      setForm({
        ...p,
        prices: p.prices || emptyPrices,
      });
      setEditId(p.id);
      setShowModal(true);
    }}
  >
    Edit
  </button>

  {/* DELETE */}
  <button
    className="text-red-500 hover:underline"
    onClick={() => deleteProduct(p.id)}
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
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#1f1d2b] p-6 w-[520px] rounded-2xl border border-[#2a2f42]">

            <h2 className="text-lg font-semibold mb-4">
              {editId ? "Edit Product" : "Add Product"}
            </h2>

            <input
              className="w-full bg-[#2a2f42] px-3 py-2 mb-3 rounded-xl"
              placeholder="Product Name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <input
              type="file"
              onChange={handleImageChange}
              className="mb-3 text-gray-400"
            />

            <div className="flex gap-3 mb-3">
              <select
                className="w-1/2 bg-[#2a2f42] px-3 py-2 rounded-xl"
                value={form.category}
                onChange={(e) =>
                  setForm({ ...form, category: e.target.value })
                }
              >
                <option value="">Category</option>
                {categories.map((c) => (
                  <option key={c.id}>{c.name}</option>
                ))}
              </select>

              <input
                className="w-1/2 bg-[#2a2f42] px-3 py-2 rounded-xl"
                placeholder="Stock"
                value={form.stock}
                onChange={(e) =>
                  setForm({ ...form, stock: e.target.value })
                }
              />
            </div>

            {/* SIZE + PRICE */}
            <div className="grid grid-cols-3 gap-3 mb-4 items-center">
              <div className="font-semibold">Size</div>
              <div className="font-semibold">Select</div>
              <div className="font-semibold">Price</div>

              {["S", "M", "L"].map((s) => (
                <React.Fragment key={s}>
                  <div>{s}</div>
                  <input
                    type="checkbox"
                    checked={form.sizes.includes(s)}
                    onChange={() => toggleSize(s)}
                  />
                  <input
                    type="number"
                    className="bg-[#2a2f42] px-2 py-1 rounded"
                    value={form.prices[s]}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        prices: {
                          ...form.prices,
                          [s]: e.target.value,
                        },
                      })
                    }
                  />
                </React.Fragment>
              ))}
            </div>

            <button
              onClick={handleSave}
              className="w-full bg-orange-500 py-2 rounded-xl"
            >
              Save
            </button>

            <button
              onClick={() => setShowModal(false)}
              className="w-full mt-2 bg-[#2a2f42] py-2 rounded-xl"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default Products;
