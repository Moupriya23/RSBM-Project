import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const Card = ({ id, name, price, category, description, image }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/products/${id}`)}
      className="group bg-[#0F2A27] border border-white/10 rounded-[28px] overflow-hidden hover:border-amber-400 transition-all duration-500 hover:-translate-y-2 cursor-pointer"
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-72 bg-white/5 flex items-center justify-center text-5xl">
            📦
          </div>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-[#0F2A27] via-transparent to-transparent opacity-80"></div>

        {/* Category */}
        <div className="absolute top-5 left-5">
          <span className="px-4 py-1 rounded-full bg-amber-400 text-black text-xs font-bold uppercase tracking-widest">
            {category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h2 className="text-2xl font-bold text-white group-hover:text-amber-400 transition-colors">
          {name}
        </h2>

        <p className="text-gray-400 mt-3 text-sm leading-7 line-clamp-2">
          {description}
        </p>

        <div className="flex items-center justify-between mt-6 pt-5 border-t border-white/10">
          <span className="text-amber-400 text-2xl font-black">{price}</span>

          <button
            onClick={() => navigate(`/products/${id}`)}
            className="px-5 py-2.5 rounded-xl border border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-black transition-all duration-300 font-semibold"
          >
            View →
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const { user } = useAuth();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8088/api/products")
      .then((r) => r.json())
      .then((d) => setProducts(Array.isArray(d) ? d.slice(0, 6) : []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-[#C0E1D2] overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-[#0F2A27] min-h-screen">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/banner.png"
            alt=""
            className="w-full h-full object-cover object-center"
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-[#0F2A27]/65"></div>

          {/* Left Shape */}
          <div className="absolute inset-y-0 left-0 w-full lg:w-[58%] bg-[#062825]/95 clip-path-slant"></div>
        </div>

        {/* Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 pt-32 pb-24">
          <div className="grid lg:grid-cols-2 items-center min-h-[85vh]">
            {/* LEFT CONTENT */}
            <div className="max-w-2xl animate-[fadeLeft_1s_ease]">
              <span className="inline-block px-4 py-1 rounded-full border border-amber-400 text-amber-400 text-[11px] sm:text-xs tracking-[3px] uppercase font-semibold mb-6">
                Premium Website Solution
              </span>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight text-white">
                Build Modern
                <span className="block text-amber-400">Digital Products</span>
              </h1>

              <p className="text-gray-300 text-base sm:text-lg leading-8 mt-8 max-w-xl">
                Create elegant, high-performing and fully responsive websites
                with React, Tailwind CSS and modern UI experience.
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap gap-4 mt-10">
                <Link
                  to="/products"
                  className="px-7 py-4 bg-amber-400 text-black rounded-xl font-bold hover:bg-amber-300 hover:-translate-y-1 transition-all duration-300 shadow-xl shadow-amber-400/20"
                >
                  Shop Now
                </Link>

                <Link
                  to="/contact"
                  className="px-7 py-4 border border-white/20 bg-white/5 backdrop-blur-md rounded-xl text-white hover:border-amber-400 hover:text-amber-400 hover:-translate-y-1 transition-all duration-300"
                >
                  Contact Us
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 mt-16">
                {[
                  ["10+", "Years Experience"],
                  ["250+", "Projects Completed"],
                  ["100%", "Client Satisfaction"],
                ].map(([v, l]) => (
                  <div key={l}>
                    <h2 className="text-4xl sm:text-5xl font-black text-amber-400">
                      {v}
                    </h2>

                    <p className="text-gray-300 mt-2 text-sm sm:text-base">
                      {l}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT SIDE EMPTY FOR RESPONSIVE */}
            <div className="hidden lg:block"></div>
          </div>
        </div>

        {/* Bottom Marquee */}
        <div className="absolute bottom-0 left-0 w-full bg-[#071f1d]/90 border-t border-white/10 py-5 overflow-hidden z-20">
          <div className="flex whitespace-nowrap animate-marquee gap-16 text-white/80 text-sm sm:text-lg">
            {Array(12)
              .fill("Creative Design")
              .map((item, i) => (
                <span key={i} className="flex items-center gap-16">
                  <span>{item}</span>
                  <span className="text-amber-400 text-2xl">|</span>
                </span>
              ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="py-24 px-6 bg-[#C0E1D2]">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
            <div>
              <span className="text-[#0F2A27] uppercase tracking-[3px] text-sm font-semibold">
                {user ? `Welcome back, ${user.name}! 👋` : "Our Collection"}
              </span>

              <h2 className="text-5xl font-black text-[#0F2A27] mt-3">
                Featured Products
              </h2>
            </div>

            <Link
              to="/products"
              className="px-6 py-3 rounded-xl bg-[#0F2A27] text-white hover:bg-[#04554c] transition-all duration-300"
            >
              View All →
            </Link>
          </div>

          {/* Loading */}
          {loading && (
            <div className="flex justify-center py-20">
              <div className="w-12 h-12 border-4 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {/* Products */}
          {!loading && products.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((p) => (
                <Card key={p.id} {...p} />
              ))}
            </div>
          )}

          {!loading && products.length === 0 && (
            <div className="text-center py-20 text-[#0F2A27] text-lg">
              No products available.
            </div>
          )}
        </div>
      </section>

      {/* STYLE */}
      <style>{`
        .clip-path-slant {
          clip-path: polygon(0 0, 75% 0, 100% 100%, 0 100%);
        }

        @media (max-width: 1024px) {
          .clip-path-slant {
            clip-path: none;
            width: 100%;
          }
        }

        @keyframes fadeLeft {
          from {
            opacity: 0;
            transform: translateX(-60px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          animation: marquee 18s linear infinite;
        }
      `}</style>
    </div>
  );
}
