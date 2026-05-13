import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "./auth/AuthContext";

const links = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const base =
    "relative transition-all duration-300 font-medium hover:text-amber-400";

  const active = "text-amber-400";
  const inactive = "text-gray-200";

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-[#0F2A27]/95 backdrop-blur-xl border-b border-white/10 shadow-lg">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/3 w-60 h-60 bg-amber-400/10 blur-3xl rounded-full"></div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="h-20 flex items-center justify-between">
          {/* Logo */}
          <NavLink
            to="/"
            className="text-white text-3xl font-black tracking-tight hover:scale-105 transition-transform duration-300"
          >
            My<span className="text-amber-400 animate-pulse">Site</span>
          </NavLink>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-10">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end
                  className={({ isActive }) =>
                    `${base} ${
                      isActive ? active : inactive
                    } text-[15px] tracking-wide`
                  }
                >
                  {({ isActive }) => (
                    <div className="relative group">
                      {l.label}

                      {/* Animated underline */}
                      <span
                        className={`absolute left-0 -bottom-2 h-[2px] bg-amber-400 rounded-full transition-all duration-300 ${
                          isActive ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                      ></span>
                    </div>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-lg">
                  <span className="text-gray-300 text-sm">
                    Hi,{" "}
                    <span className="text-white font-semibold">
                      {user.name}
                    </span>
                  </span>
                </div>

                <button
                  onClick={handleLogout}
                  className="px-5 py-2 border border-red-400/40 text-red-400 rounded-xl hover:bg-red-400 hover:text-white transition-all duration-300 hover:scale-105"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="px-5 py-2 border border-white/20 text-gray-200 rounded-xl hover:border-amber-400 hover:text-amber-400 hover:bg-white/5 transition-all duration-300"
                >
                  Login
                </NavLink>

                <NavLink
                  to="/register"
                  className="px-5 py-2 bg-amber-400 text-[#0F2A27] font-bold rounded-xl hover:bg-amber-300 hover:scale-105 transition-all duration-300 shadow-lg shadow-amber-400/20"
                >
                  Register
                </NavLink>
              </>
            )}
          </div>

          {/* Mobile Burger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white"
          >
            <div className="space-y-1.5">
              <span
                className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
                  open ? "rotate-45 translate-y-2" : ""
                }`}
              />

              <span
                className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
                  open ? "opacity-0" : ""
                }`}
              />

              <span
                className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
                  open ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ${
            open ? "max-h-[500px] pb-6" : "max-h-0"
          }`}
        >
          <div className="bg-[#102f2b] border border-white/10 rounded-3xl p-6 mt-2 flex flex-col gap-5 shadow-2xl backdrop-blur-xl">
            {links.map((l, index) => (
              <NavLink
                key={l.to}
                to={l.to}
                end
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `text-lg font-medium transition-all duration-300 hover:text-amber-400 ${
                    isActive ? active : inactive
                  }`
                }
                style={{
                  animation: open
                    ? `fadeDown 0.5s ease forwards ${index * 0.1}s`
                    : "",
                }}
              >
                {l.label}
              </NavLink>
            ))}

            <div className="border-t border-white/10 pt-5 mt-2">
              {user ? (
                <button
                  onClick={handleLogout}
                  className="w-full py-3 rounded-2xl border border-red-400/30 text-red-400 hover:bg-red-400 hover:text-white transition-all duration-300"
                >
                  Logout
                </button>
              ) : (
                <div className="flex gap-3">
                  <NavLink
                    to="/login"
                    onClick={() => setOpen(false)}
                    className="flex-1 text-center py-3 border border-white/10 text-gray-200 rounded-2xl hover:border-amber-400 hover:text-amber-400 transition-all duration-300"
                  >
                    Login
                  </NavLink>

                  <NavLink
                    to="/register"
                    onClick={() => setOpen(false)}
                    className="flex-1 text-center py-3 bg-amber-400 text-[#0F2A27] font-bold rounded-2xl hover:bg-amber-300 transition-all duration-300"
                  >
                    Register
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animation */}
      <style>
        {`
          @keyframes fadeDown {
            from {
              opacity: 0;
              transform: translateY(-15px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </nav>
  );
}
