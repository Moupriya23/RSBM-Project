import { Link } from "react-router-dom";

const customerLinks = ["Home", "Products", "About Us", "Contact"];
const aboutLinks = ["My Account", "Newsletter", "Brands", "Gift Voucher"];

export default function Footer() {
  return (
    <footer className="relative bg-[#0F2A27] border-t border-gray-800 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-amber-400/10 blur-3xl rounded-full animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#04554c]/20 blur-3xl rounded-full animate-pulse"></div>

      {/* Floating Dots */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle,#ffffff_1px,transparent_1px)] bg-[size:30px_30px]"></div>

      {/* Let's Connect Banner */}
      <div className="relative max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-gray-700">
        <div className="animate-[fadeLeft_1s_ease]">
          <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
            Let's Connect
            <span className="block text-amber-400">Together</span>
          </h2>
        </div>

        <Link
          to="/contact"
          className="group flex items-center gap-3 px-7 py-3 border border-white/20 bg-white/5 backdrop-blur-xl text-white rounded-2xl hover:bg-amber-400 hover:text-[#0F2A27] hover:border-amber-400 transition-all duration-300 font-semibold shadow-lg hover:scale-105"
        >
          Contact Us
          <span className="group-hover:translate-x-1 transition-transform duration-300">
            →
          </span>
        </Link>
      </div>

      {/* Main Footer Grid */}
      <div className="relative max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="animate-[fadeUp_1s_ease]">
          <h3 className="text-white text-3xl font-black mb-5">
            My<span className="text-amber-400">Site</span>
          </h3>

          <p className="text-gray-400 text-sm leading-7 mb-7">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            {[
              { href: "#", icon: "f", label: "Facebook" },
              { href: "#", icon: "𝕏", label: "Twitter" },
              { href: "#", icon: "in", label: "LinkedIn" },
              { href: "#", icon: "📷", label: "Instagram" },
              { href: "#", icon: "▶", label: "YouTube" },
            ].map((s, index) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="w-11 h-11 rounded-full bg-white/5 border border-white/10 hover:bg-amber-400 hover:text-[#0F2A27] hover:-translate-y-2 text-gray-300 flex items-center justify-center text-sm font-bold transition-all duration-300 shadow-lg"
                style={{
                  animation: `float 3s ease-in-out infinite ${index * 0.3}s`,
                }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Customer Service */}
        <div className="animate-[fadeUp_1.2s_ease]">
          <h4 className="text-white text-xl font-bold mb-6 relative inline-block">
            Customer Service
            <span className="absolute left-0 -bottom-2 w-12 h-1 bg-amber-400 rounded-full"></span>
          </h4>

          <ul className="flex flex-col gap-4 mt-6">
            {customerLinks.map((l) => (
              <li key={l}>
                <Link
                  to="#"
                  className="group flex items-center gap-2 text-gray-400 hover:text-amber-400 transition-all duration-300 text-sm"
                >
                  <span className="w-0 group-hover:w-3 h-[2px] bg-amber-400 transition-all duration-300"></span>
                  {l}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* About Us */}
        <div className="animate-[fadeUp_1.4s_ease]">
          <h4 className="text-white text-xl font-bold mb-6 relative inline-block">
            About Us
            <span className="absolute left-0 -bottom-2 w-12 h-1 bg-amber-400 rounded-full"></span>
          </h4>

          <ul className="flex flex-col gap-4 mt-6">
            {aboutLinks.map((l) => (
              <li key={l}>
                <Link
                  to="#"
                  className="group flex items-center gap-2 text-gray-400 hover:text-amber-400 transition-all duration-300 text-sm"
                >
                  <span className="w-0 group-hover:w-3 h-[2px] bg-amber-400 transition-all duration-300"></span>
                  {l}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            to="/products"
            className="inline-flex items-center gap-2 mt-7 px-6 py-3 bg-amber-400 text-[#0F2A27] text-sm font-bold rounded-2xl hover:scale-105 hover:bg-amber-300 transition-all duration-300 shadow-lg"
          >
            Buy Now
            <span className="animate-pulse">🛒</span>
          </Link>
        </div>

        {/* Contact Info */}
        <div className="animate-[fadeUp_1.6s_ease]">
          <h4 className="text-white text-xl font-bold mb-6 relative inline-block">
            Contact Info
            <span className="absolute left-0 -bottom-2 w-12 h-1 bg-amber-400 rounded-full"></span>
          </h4>

          <ul className="flex flex-col gap-6 mt-6">
            <li className="group flex gap-4 hover:translate-x-2 transition-all duration-300">
              <div className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-amber-400 group-hover:bg-amber-400 group-hover:text-[#0F2A27] transition-all duration-300">
                📍
              </div>

              <div>
                <p className="text-white text-sm font-semibold">Habra</p>

                <p className="text-gray-400 text-sm">743268</p>
              </div>
            </li>

            <li className="group flex gap-4 hover:translate-x-2 transition-all duration-300">
              <div className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-amber-400 group-hover:bg-amber-400 group-hover:text-[#0F2A27] transition-all duration-300">
                📞
              </div>

              <div>
                <p className="text-white text-sm font-semibold">Call Us</p>

                <p className="text-gray-400 text-sm">+91 7432684587</p>
              </div>
            </li>

            <li className="group flex gap-4 hover:translate-x-2 transition-all duration-300">
              <div className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-amber-400 group-hover:bg-amber-400 group-hover:text-[#0F2A27] transition-all duration-300">
                ✉️
              </div>

              <div>
                <p className="text-white text-sm font-semibold">Mail Us</p>

                <p className="text-gray-400 text-sm">mou@gmail.com</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-gray-700 py-6 text-center">
        <p className="text-gray-500 text-sm hover:text-amber-400 transition-colors duration-300">
          Copyright © {new Date().getFullYear()} MySite. All rights reserved.
        </p>
      </div>

      {/* Custom Animations */}
      <style>
        {`
          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-8px);
            }
          }

          @keyframes fadeUp {
            from {
              opacity: 0;
              transform: translateY(40px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fadeLeft {
            from {
              opacity: 0;
              transform: translateX(-40px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
        `}
      </style>
    </footer>
  );
}
