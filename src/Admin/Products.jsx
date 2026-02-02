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
      id: form.id ?? Date.now(), // 🔥 UNIQUE ID
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
    <div>
      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-semibold">Products</h1>
        <button
          onClick={() => {
            setShowModal(true);
            setEditId(null);
          }}
          className="bg-gray-900 text-white px-4 py-2 rounded"
        >
          Add Product
        </button>
      </div>

      {/* TABLE */}
      {products.length > 0 && (
        <div className="overflow-x-auto bg-white rounded border">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">Image</th>
                <th className="p-3">Name</th>
                <th className="p-3">Category</th>
                <th className="p-3">Stock</th>
                <th className="p-3">Size & Price</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-t text-center align-top">
                  <td className="p-3">
                    {p.image && (
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-12 h-12 object-cover mx-auto rounded"
                      />
                    )}
                  </td>

                  <td className="p-3">{p.name}</td>
                  <td className="p-3">{p.category}</td>
                  <td className="p-3">{p.stock}</td>

                  {/* SIZE + PRICE */}
                  <td className="p-3">
                    <div className="grid grid-cols-2 gap-x-4 text-sm w-32 mx-auto">
                      {p.sizes.map((s) => (
                        <React.Fragment key={s}>
                          <span className="font-medium text-left">{s}</span>
                          <span className="text-green-600 text-right">
                            ₹ {p.prices?.[s] ?? "-"}
                          </span>
                        </React.Fragment>
                      ))}
                    </div>
                  </td>

                  <td className="p-3 space-x-3">
                    <button
                      className="text-blue-600"
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

                    <button
                      className="text-red-600"
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
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 w-[500px] rounded">
            <h2 className="text-lg font-semibold mb-4">
              {editId ? "Edit Product" : "Add Product"}
            </h2>

            <input
              className="w-full border px-3 py-2 mb-3"
              placeholder="Product Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input type="file" onChange={handleImageChange} className="mb-3" />

            <div className="flex gap-3 mb-3">
              <select
                className="w-1/2 border px-3 py-2"
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
                className="w-1/2 border px-3 py-2"
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
                    placeholder="₹ Price"
                    className="border px-2 py-1"
                    value={form.prices[s]}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        prices: { ...form.prices, [s]: e.target.value },
                      })
                    }
                  />
                </React.Fragment>
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
