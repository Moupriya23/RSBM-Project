import { createContext, useContext, useState, useEffect } from "react";

const AuthCtx = createContext();
export const useAuth = () => useContext(AuthCtx);

const API = "http://localhost:8088/api/auth";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Restore user from token on page refresh
  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("userName");
    const email = localStorage.getItem("userEmail");
    if (token && name) setUser({ name, email });
  }, []);

  const login = async ({ email, password }) => {
    const res = await fetch(`${API}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      // read as text first, not json
      const msg = await res.text();
      throw new Error(msg || "Invalid email or password");
    }

    const data = await res.json();
    localStorage.setItem("token", data.token);
    localStorage.setItem("userName", data.name);
    localStorage.setItem("userEmail", data.email);
    setUser({ name: data.name, email: data.email });
  };

  const register = async ({ name, email, password }) => {
    const res = await fetch(`${API}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    if (!res.ok) throw new Error(await res.text());
    const data = await res.json();
    localStorage.setItem("token", data.token);
    localStorage.setItem("userName", data.name);
    localStorage.setItem("userEmail", data.email);
    setUser({ name: data.name, email: data.email });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    setUser(null);
  };

  // Helper to make authenticated API calls
  const authFetch = (url, options = {}) => {
    const token = localStorage.getItem("token");
    return fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
    });
  };

  return (
    <AuthCtx.Provider value={{ user, login, register, logout, authFetch }}>
      {children}
    </AuthCtx.Provider>
  );
}
