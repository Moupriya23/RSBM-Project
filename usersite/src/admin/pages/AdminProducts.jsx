import { useState, useEffect } from "react";

const API = "http://localhost:8088/api/products";
const empty = { name: "", price: "", category: "", description: "", image: "" };

// ✅ Read token saved by AdminLogin
const getToken = () =>
  sessionStorage.getItem("adminToken") || localStorage.getItem("token") || "";
const authHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`,
});

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState({ msg: "", type: "" });

  const showMsg = (msg, type = "success") => {
    setFeedback({ msg, type });
    setTimeout(() => setFeedback({ msg: "", type: "" }), 3000);
  };

  // ─── Fetch ────────────────────────────────────────────────────────────────
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(API);
      const data = await res.json();
      setProducts(data);
    } catch {
      showMsg("Failed to load products", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ─── Form handlers ────────────────────────────────────────────────────────
  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const openAdd = () => {
    setForm(empty);
    setEditing(false);
    setShowForm(true);
  };
  const openEdit = (p) => {
    setForm({ ...p });
    setEditing(true);
    setShowForm(true);
  };
  const closeForm = () => {
    setShowForm(false);
    setForm(empty);
  };

  // ─── Save ─────────────────────────────────────────────────────────────────
  const onSubmit = async () => {
    if (!form.name || !form.price)
      return showMsg("Name and price are required!", "error");

    setSaving(true);
    try {
      const url = editing ? `${API}/${form.id}` : API;
      const method = editing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: authHeaders(),
        body: JSON.stringify({
          name: form.name,
          price: form.price,
          category: form.category,
          description: form.description,
          image: form.image,
        }),
      });

      if (res.status === 401 || res.status === 403) {
        return showMsg("Session expired. Please login again.", "error");
      }
      if (!res.ok) {
        const msg = await res.text();
        return showMsg(msg || "Failed to save", "error");
      }

      closeForm();
      fetchProducts();
      showMsg(editing ? "✅ Product updated!" : "✅ Product added!");
    } catch (err) {
      showMsg("❌ " + err.message, "error");
    } finally {
      setSaving(false);
    }
  };

  // ─── Delete ───────────────────────────────────────────────────────────────
  const onDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}"?`)) return;

    try {
      const res = await fetch(`${API}/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
      });

      if (res.status === 401 || res.status === 403) {
        return showMsg("Session expired. Please login again.", "error");
      }
      if (!res.ok) return showMsg("Failed to delete", "error");

      fetchProducts();
      showMsg("✅ Product deleted!");
    } catch (err) {
      showMsg("❌ " + err.message, "error");
    }
  };

  // ─── UI ───────────────────────────────────────────────────────────────────
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-extrabold text-white">Products</h1>
        <button
          onClick={openAdd}
          className="px-5 py-2 bg-amber-400 text-gray-900 font-bold rounded-lg hover:bg-amber-300 transition-colors"
        >
          + Add Product
        </button>
      </div>

      {/* Feedback */}
      {feedback.msg && (
        <div
          className={`mb-4 px-4 py-3 rounded-lg text-sm font-medium ${
            feedback.type === "error"
              ? "bg-red-500/20 text-red-400 border border-red-500/30"
              : "bg-green-500/20 text-green-400 border border-green-500/30"
          }`}
        >
          {feedback.msg}
        </div>
      )}

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-white font-bold text-xl mb-6">
              {editing ? "Edit Product" : "Add Product"}
            </h2>
            <div className="flex flex-col gap-4">
              {[
                { name: "name", placeholder: "Product Name" },
                { name: "price", placeholder: "Price (e.g. ₹1299)" },
                { name: "category", placeholder: "Category" },
                // { name: "image", placeholder: "Image URL" },
              ].map((f) => (
                <input
                  key={f.name}
                  name={f.name}
                  value={form[f.name] || ""}
                  onChange={onChange}
                  placeholder={f.placeholder}
                  className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:border-amber-400"
                />
              ))}
              <textarea
                name="description"
                value={form.description || ""}
                onChange={onChange}
                placeholder="Description"
                rows={3}
                className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 resize-none"
              />
              {/* Image Upload */}
              <div>
                <p className="text-gray-400 text-xs mb-2 font-medium">
                  Product Image
                </p>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (!file) return;
                    const reader = new FileReader();
                    reader.onloadend = () =>
                      setForm({ ...form, image: reader.result });
                    reader.readAsDataURL(file);
                  }}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white text-sm file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-amber-400 file:text-gray-900 file:font-medium file:cursor-pointer cursor-pointer"
                />

                {/* Preview */}
                {form.image && (
                  <div className="relative mt-3">
                    <img
                      src={form.image}
                      alt="preview"
                      className="w-full h-32 object-cover rounded-lg border border-gray-600"
                    />
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, image: "" })}
                      className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-lg hover:bg-red-400"
                    >
                      ✕ Remove
                    </button>
                  </div>
                )}
              </div>
              {/* {form.image && (
                <img
                  src={form.image}
                  alt="preview"
                  className="w-full h-32 object-cover rounded-lg border border-gray-600"
                />
              )} */}
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={onSubmit}
                disabled={saving}
                className="flex-1 py-2.5 bg-amber-400 text-gray-900 font-bold rounded-lg hover:bg-amber-300 transition-colors disabled:opacity-50"
              >
                {saving ? "Saving..." : editing ? "Update" : "Add"}
              </button>
              <button
                onClick={closeForm}
                className="flex-1 py-2.5 border border-gray-600 text-gray-300 rounded-lg hover:border-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      {loading ? (
        <p className="text-gray-400">Loading products...</p>
      ) : (
        <div className="bg-gray-800 border border-gray-700 rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-700/50">
              <tr>
                {["Image", "Name", "Category", "Price", "Actions"].map((h) => (
                  <th
                    key={h}
                    className="text-left text-gray-400 font-semibold px-5 py-3"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {products.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center text-gray-500 py-10">
                    No products yet. Click "+ Add Product".
                  </td>
                </tr>
              ) : (
                products.map((p) => (
                  <tr
                    key={p.id}
                    className="hover:bg-gray-700/30 transition-colors"
                  >
                    <td className="px-5 py-3">
                      {p.image ? (
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center text-gray-500 text-xs">
                          No img
                        </div>
                      )}
                    </td>
                    <td className="px-5 py-3">
                      <p className="text-white font-medium">{p.name}</p>
                      <p className="text-gray-500 text-xs truncate max-w-xs">
                        {p.description}
                      </p>
                    </td>
                    <td className="px-5 py-3 text-gray-400">{p.category}</td>
                    <td className="px-5 py-3 text-amber-400 font-bold">
                      {p.price}
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEdit(p)}
                          className="px-3 py-1.5 bg-blue-500/20 text-blue-400 rounded-lg text-xs font-medium hover:bg-blue-500/30 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => onDelete(p.id, p.name)}
                          className="px-3 py-1.5 bg-red-500/20 text-red-400 rounded-lg text-xs font-medium hover:bg-red-500/30 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
