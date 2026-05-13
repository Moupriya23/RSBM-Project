import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const WA_NUMBER = "919876543210"; // 👈 your number

const waLink = (name, price) =>
  `https://wa.me/${WA_NUMBER}?text=Hi!%20I'd%20like%20to%20order%20*${encodeURIComponent(name)}*%20for%20*${encodeURIComponent(price)}*`;

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8088/api/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then((data) => setProduct(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <main className="min-h-screen bg-gray-900 pt-28 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-400">Loading product...</p>
        </div>
      </main>
    );

  if (error || !product)
    return (
      <main className="min-h-screen bg-gray-900 pt-28 flex items-center justify-center">
        <div className="text-center">
          <p className="text-5xl mb-4">😕</p>
          <h2 className="text-white text-2xl font-bold mb-2">
            Product Not Found
          </h2>
          <p className="text-gray-400 mb-6">{error}</p>
          <button
            onClick={() => navigate("/products")}
            className="px-6 py-2.5 bg-amber-400 text-gray-900 font-bold rounded-lg hover:bg-amber-300 transition-colors"
          >
            ← Back to Products
          </button>
        </div>
      </main>
    );

  return (
    <main className="min-h-screen bg-gray-900 pt-28 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Back button */}
        <button
          onClick={() => navigate("/products")}
          className="flex items-center gap-2 text-gray-400 hover:text-amber-400 transition-colors mb-8 text-sm"
        >
          ← Back to Products
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Image */}
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden border border-gray-700 bg-gray-800">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-600">
                  <span className="text-6xl">📦</span>
                </div>
              )}
            </div>
            {/* Category badge */}
            <span className="absolute top-4 left-4 text-xs text-amber-400 font-semibold uppercase tracking-widest bg-gray-900/80 px-3 py-1 rounded-full">
              {product.category}
            </span>
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center gap-6">
            <div>
              <h1 className="text-4xl font-extrabold text-white mb-3">
                {product.name}
              </h1>
              <p className="text-gray-400 text-lg leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-5xl font-extrabold text-amber-400">
                {product.price}
              </span>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-700" />

            {/* Features */}
            <div className="flex flex-col gap-3">
              {[
                "Free delivery on orders above ₹999",
                "Easy 7-day return policy",
                "Genuine product guaranteed",
              ].map((f) => (
                <div
                  key={f}
                  className="flex items-center gap-3 text-gray-400 text-sm"
                >
                  <span className="text-green-400">✓</span> {f}
                </div>
              ))}
            </div>

            {/* WhatsApp button */}
            <a
              href={waLink(product.name, product.price)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 px-6 py-4 bg-green-500 text-white font-bold rounded-xl hover:bg-green-400 transition-colors text-lg"
            >
              <img src="/WhatsApp.png" alt="whatsapp" className="w-10 h-6" />
              Order via WhatsApp
            </a>

            <button
              onClick={() => navigate("/products")}
              className="px-6 py-3 border border-gray-600 text-gray-300 font-medium rounded-xl hover:border-amber-400 hover:text-amber-400 transition-colors"
            >
              ← Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
