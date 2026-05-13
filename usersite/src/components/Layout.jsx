import { Outlet } from "react-router-dom";
// Layout.jsx - change these two lines:
import Navbar from "../Navbar"; // was "./Navbar"
import Footer from "../Footer"; // was "./Footer"

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
