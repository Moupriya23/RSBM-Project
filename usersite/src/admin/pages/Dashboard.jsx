import { useState, useEffect } from "react";

const API = "http://localhost:8088/api";
const getToken = () =>
  sessionStorage.getItem("adminToken") || localStorage.getItem("token") || "";
const authHeaders = () => ({ Authorization: `Bearer ${getToken()}` });

const StatCard = ({ label, value, color }) => (
  <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6">
    <p className="text-gray-400 text-sm mb-1">{label}</p>
    <p className={`text-4xl font-extrabold ${color}`}>{value}</p>
  </div>
);

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch(`${API}/products`)
      .then((r) => r.json())
      .then((d) => setProducts(Array.isArray(d) ? d : []));

    fetch(`${API}/messages`, { headers: authHeaders() })
      .then((r) => r.json())
      .then((d) => setMessages(Array.isArray(d) ? d : []));
  }, []);

  const unread = messages.filter((m) => !m.read).length;

  return (
    <div>
      <h1 className="text-3xl font-extrabold text-white mb-2">Dashboard</h1>
      <p className="text-gray-400 mb-8">Welcome back, Admin 👋</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
        <StatCard
          label="Total Products"
          value={products.length}
          color="text-amber-400"
        />
        <StatCard
          label="Total Messages"
          value={messages.length}
          color="text-blue-400"
        />
        <StatCard
          label="Unread Messages"
          value={unread}
          color="text-green-400"
        />
      </div>

      {/* Recent Messages */}
      <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6">
        <h2 className="text-white font-bold text-lg mb-4">Recent Messages</h2>
        {messages.length === 0 ? (
          <p className="text-gray-500 text-sm">No messages yet.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {messages.slice(0, 5).map((m) => (
              <div
                key={m.id}
                className="flex items-center justify-between text-sm border-b border-gray-700 pb-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-white font-medium">{m.name}</p>
                    {!m.read && (
                      <span className="text-xs bg-amber-400/20 text-amber-400 px-2 py-0.5 rounded-full">
                        New
                      </span>
                    )}
                  </div>
                  <p className="text-gray-500 text-xs truncate max-w-xs">
                    {m.message}
                  </p>
                </div>
                <p className="text-gray-500 text-xs">
                  {new Date(m.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
