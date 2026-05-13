import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState("");

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirm)
      return setError("Passwords do not match");
    try {
      register(form);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className="min-h-screen bg-gray-900 flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-gray-800 border border-gray-700 rounded-2xl p-8">
        <h1 className="text-3xl font-extrabold text-white mb-1">
          Create account
        </h1>
        <p className="text-gray-400 mb-8">Join us today</p>

        {error && (
          <p className="text-red-400 text-sm mb-4 bg-red-400/10 border border-red-400/30 rounded-lg px-4 py-2">
            {error}
          </p>
        )}

        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <input
            name="name"
            type="text"
            required
            value={form.name}
            onChange={onChange}
            placeholder="Full Name"
            className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 transition-colors"
          />
          <input
            name="email"
            type="email"
            required
            value={form.email}
            onChange={onChange}
            placeholder="Email"
            className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 transition-colors"
          />
          <input
            name="password"
            type="password"
            required
            value={form.password}
            onChange={onChange}
            placeholder="Password"
            className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 transition-colors"
          />
          <input
            name="confirm"
            type="password"
            required
            value={form.confirm}
            onChange={onChange}
            placeholder="Confirm Password"
            className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 transition-colors"
          />
          <button
            type="submit"
            className="w-full py-3 bg-amber-400 text-gray-900 font-bold rounded-lg hover:bg-amber-300 transition-colors text-lg mt-2"
          >
            Register
          </button>
        </form>

        <p className="text-gray-400 text-sm text-center mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-amber-400 hover:underline font-medium"
          >
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}
