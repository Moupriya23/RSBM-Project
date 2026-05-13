import { useEffect, useState, useCallback } from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import AdminSidebar from "./components/AdminSidebar";

// ✅ All admin data in sessionStorage — auto clears on tab close
const clearAdmin = () => {
  sessionStorage.removeItem("adminToken");
  sessionStorage.removeItem("isAdmin");
  sessionStorage.removeItem("adminName");
  sessionStorage.removeItem("adminEmail");
};

export default function AdminLayout() {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [valid, setValid] = useState(false);

  const handleLogout = useCallback(() => {
    clearAdmin();
    navigate("/admin/login");
  }, [navigate]);

  // ─── Verify session on every mount/refresh ────────────────────────────────
  useEffect(() => {
    const token = sessionStorage.getItem("adminToken");
    const isAdmin = sessionStorage.getItem("isAdmin");

    if (!token || isAdmin !== "true") {
      setValid(false);
      setChecked(true);
      return;
    }

    fetch("http://localhost:8088/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Invalid token");
        return res.json();
      })
      .then((data) => {
        if (data.role !== "ADMIN") throw new Error("Not admin");
        setValid(true);
      })
      .catch(() => {
        clearAdmin();
        setValid(false);
      })
      .finally(() => setChecked(true));
  }, []);

  if (!checked) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <p className="text-gray-400">Verifying session...</p>
      </div>
    );
  }

  if (!valid) return <Navigate to="/admin/login" replace />;

  const adminName = sessionStorage.getItem("adminName") || "Admin";

  return (
    <div className="flex min-h-screen bg-gray-900">
      <AdminSidebar onLogout={handleLogout} adminName={adminName} />
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
