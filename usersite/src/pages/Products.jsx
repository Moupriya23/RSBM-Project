import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const WA_NUMBER = "919876543210"; // 👈 your number

const waLink = (name, price) =>
  `https://wa.me/${WA_NUMBER}?text=Hi!%20I'd%20like%20to%20order%20*${encodeURIComponent(name)}*%20for%20*${encodeURIComponent(price)}*`;

const Card = ({ id, name, price, category, description, image }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/products/${id}`)}
      className="bg-gray-800 border border-gray-700 rounded-2xl p-6 flex flex-col gap-3 hover:border-amber-400 transition-colors cursor-pointer group"
    >
      {image ? (
        <img
          src={image}
          alt={name}
          className="w-full h-40 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
        />
      ) : (
        <div className="w-full h-40 bg-gray-700 rounded-xl flex items-center justify-center text-4xl">
          📦
        </div>
      )}
      <span className="text-xs text-amber-400 font-semibold uppercase tracking-widest">
        {category}
      </span>
      <h2 className="text-white text-xl font-bold">{name}</h2>
      <p className="text-gray-400 text-sm">{description}</p>

      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-700">
        <span className="text-amber-400 text-lg font-bold">{price}</span>
        <a
          href={waLink(name, price)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white text-sm font-bold rounded-lg hover:bg-green-400 transition-colors"
        >
          <img src="/WhatsApp.png" alt="whatsapp" className="w-8 h-5" />
          Order via WhatsApp
        </a>
      </div>
    </div>
  );
};

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:8088/api/products")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load products");
        return res.json();
      })
      .then((data) => setProducts(Array.isArray(data) ? data : []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-gray-900 pt-28 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <span className="text-amber-400 text-sm font-semibold uppercase tracking-widest">
          Our Collection
        </span>
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mt-2 mb-10">
          Products
        </h1>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-12 h-12 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-400">Loading products...</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center py-20 text-red-400">⚠️ {error}</div>
        )}

        {/* Empty */}
        {!loading && !error && products.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-2xl bg-gray-800 border-2 border-dashed border-gray-600 flex items-center justify-center animate-bounce">
                <span className="text-4xl">📦</span>
              </div>
              <div className="absolute -top-2 -right-2 w-5 h-5 bg-amber-400 rounded-full animate-ping" />
              <div className="absolute -top-2 -right-2 w-5 h-5 bg-amber-400 rounded-full" />
            </div>
            <div className="text-center">
              <h3 className="text-white text-2xl font-extrabold mb-2">
                No Products Yet
              </h3>
              <p className="text-gray-500 text-sm">
                Products added from admin will appear here.
              </p>
            </div>
            <div className="flex gap-2">
              <div
                className="w-2 h-2 bg-amber-400 rounded-full animate-bounce"
                style={{ animationDelay: "0ms" }}
              />
              <div
                className="w-2 h-2 bg-amber-400 rounded-full animate-bounce"
                style={{ animationDelay: "150ms" }}
              />
              <div
                className="w-2 h-2 bg-amber-400 rounded-full animate-bounce"
                style={{ animationDelay: "300ms" }}
              />
            </div>
          </div>
        )}

        {/* Grid */}
        {!loading && !error && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <Card key={p.id} {...p} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
