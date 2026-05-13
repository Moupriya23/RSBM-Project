import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8088/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Invalid credentials");
      }

      const data = await res.json();

      if (data.role !== "ADMIN") {
        throw new Error("You are not authorized as admin");
      }

      // ✅ Use sessionStorage — auto clears when tab closes
      sessionStorage.setItem("adminToken", data.token);
      sessionStorage.setItem("adminName", data.name);
      sessionStorage.setItem("adminEmail", data.email);
      sessionStorage.setItem("isAdmin", "true");

      navigate("/admin");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-white">
            My<span className="text-amber-400">Site</span>
          </h1>
          <p className="text-gray-500 mt-1 text-sm">Admin Panel</p>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8">
          <h2 className="text-2xl font-extrabold text-white mb-1">Sign In</h2>
          <p className="text-gray-400 text-sm mb-8">
            Enter your admin credentials
          </p>

          {error && (
            <div className="flex items-center gap-2 text-red-400 text-sm mb-5 bg-red-400/10 border border-red-400/30 rounded-lg px-4 py-3">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <input
              name="email"
              type="email"
              required
              value={form.email}
              onChange={onChange}
              placeholder="Admin Email"
              className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 transition-colors"
            />

            <div className="relative">
              <input
                name="password"
                type={showPass ? "text" : "password"}
                required
                value={form.password}
                onChange={onChange}
                placeholder="Password"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 transition-colors pr-16"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-xs"
              >
                {showPass ? "Hide" : "Show"}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-amber-400 text-gray-900 font-bold rounded-lg hover:bg-amber-300 transition-colors text-lg mt-2 disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Login to Admin"}
            </button>
          </form>
        </div>

        <p className="text-center mt-6">
          <a
            href="/"
            className="text-gray-500 text-sm hover:text-amber-400 transition-colors"
          >
            ← Back to Site
          </a>
        </p>
      </div>
    </div>
  );
}
