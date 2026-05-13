import { NavLink } from "react-router-dom";

const links = [
  { to: "/admin", label: "Dashboard", icon: "📊" },
  { to: "/admin/products", label: "Products", icon: "📦" },
  { to: "/admin/messages", label: "Messages", icon: "💬" },
];

export default function AdminSidebar({ onLogout, adminName }) {
  return (
    <aside className="w-56 min-h-screen bg-gray-950 border-r border-gray-800 flex flex-col">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-gray-800">
        <p className="text-white font-extrabold text-lg">
          My<span className="text-amber-400">Site</span>
        </p>
        <p className="text-gray-500 text-xs mt-0.5">Admin Panel</p>
      </div>

      {/* Admin name */}
      <div className="px-6 py-3 border-b border-gray-800">
        <p className="text-gray-400 text-xs">Logged in as</p>
        <p className="text-white text-sm font-medium truncate">{adminName}</p>
      </div>

      {/* Nav links */}
      <nav className="flex flex-col gap-1 p-3 flex-1">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.to === "/admin"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-amber-400 text-gray-900"
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
              }`
            }
          >
            <span>{l.icon}</span> {l.label}
          </NavLink>
        ))}
      </nav>

      {/* Bottom */}
      <div className="p-4 border-t border-gray-800 flex flex-col gap-2">
        <NavLink
          to="/"
          className="text-gray-500 text-xs hover:text-amber-400 transition-colors"
        >
          ← Back to Site
        </NavLink>
        <button
          onClick={onLogout}
          className="text-left text-red-400 text-xs hover:text-red-300 transition-colors"
        >
          🚪 Logout
        </button>
      </div>
    </aside>
  );
}
