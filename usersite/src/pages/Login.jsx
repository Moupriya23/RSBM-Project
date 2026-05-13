import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

// ─── Forgot Password View ───────────────────────────────────────────────────
function ForgotPassword({ onBack }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(form);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  if (sent)
    return (
      <div className="text-center">
        <p className="text-4xl mb-4">📧</p>
        <h2 className="text-2xl font-extrabold text-white mb-2">
          Check your email
        </h2>
        <p className="text-gray-400 mb-6">
          A password reset link has been sent to{" "}
          <span className="text-amber-400">{email}</span>
        </p>
        <button
          onClick={onBack}
          className="text-amber-400 hover:underline text-sm"
        >
          ← Back to Login
        </button>
      </div>
    );

  return (
    <div>
      <h1 className="text-3xl font-extrabold text-white mb-1">
        Forgot Password
      </h1>
      <p className="text-gray-400 mb-8">
        Enter your email and we'll send a reset link
      </p>

      {error && (
        <p className="text-red-400 text-sm mb-4 bg-red-400/10 border border-red-400/30 rounded-lg px-4 py-2">
          {error}
        </p>
      )}

      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 transition-colors"
        />
        <button
          type="submit"
          className="w-full py-3 bg-amber-400 text-gray-900 font-bold rounded-lg hover:bg-amber-300 transition-colors text-lg"
        >
          Send Reset Link
        </button>
      </form>

      <button
        onClick={onBack}
        className="text-gray-400 text-sm text-center w-full mt-6 hover:text-amber-400 transition-colors"
      >
        ← Back to Login
      </button>
    </div>
  );
}

// ─── Login View ──────────────────────────────────────────────────────────────
export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [forgot, setForgot] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(form);
      navigate("/");
    } catch (err) {
      setError(err.message); // 👈 this sets the error
    }
  };

  return (
    <main className="min-h-screen bg-gray-900 flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-gray-800 border border-gray-700 rounded-2xl p-8">
        {forgot ? (
          <ForgotPassword onBack={() => setForgot(false)} />
        ) : (
          <>
            <h1 className="text-3xl font-extrabold text-white mb-1">
              Welcome back
            </h1>
            <p className="text-gray-400 mb-8">Login to your account</p>

            {error && (
              <div className="flex items-center gap-2 text-red-400 text-sm mb-4 bg-red-400/10 border border-red-400/30 rounded-lg px-4 py-3">
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
                placeholder="Email"
                className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 transition-colors"
              />

              {/* Password with show/hide */}
              <div className="relative">
                <input
                  name="password"
                  type={showPass ? "text" : "password"}
                  required
                  value={form.password}
                  onChange={onChange}
                  placeholder="Password"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 transition-colors pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-xs"
                >
                  {showPass ? "Hide" : "Show"}
                </button>
              </div>

              {/* Forgot password link */}
              <div className="text-right -mt-2">
                <button
                  type="button"
                  onClick={() => setForgot(true)}
                  className="text-amber-400 text-sm hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-amber-400 text-gray-900 font-bold rounded-lg hover:bg-amber-300 transition-colors text-lg"
              >
                Login
              </button>
            </form>

            <p className="text-gray-400 text-sm text-center mt-6">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-amber-400 hover:underline font-medium"
              >
                Register
              </Link>
            </p>
          </>
        )}
      </div>
    </main>
  );
}
