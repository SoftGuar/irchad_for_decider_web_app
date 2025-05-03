"use client";

import { usePathname } from "next/navigation";
import { LayoutGrid, Users, MapPin, User } from "lucide-react";
import Link from "next/link";

const Sidebar = () => {
  // Use the current pathname instead of local state
  const pathname = usePathname();

  // Map of routes we want to highlight
  const routes = {
    sales_dashboard: "/sales_dashboard",
    users_dashboard: "/users_dashboard",
    zones_dashboard: "/zones_dashboard",
    profile: "/profile",
  };

  return (
    <div
      className="w-64 min-h-screen p-4"
      style={{
        backgroundColor: "#2E2E2E",
        borderTop: "1px solid #959595",
      }}
    >
      <nav className="mt-6 space-y-2">
        {/* Sales Dashboard */}
        <Link
          href="/sales_dashboard"
          className={`flex items-center gap-2 text-sm px-3 py-2 rounded-md ${
            pathname === "/sales_dashboard"
              ? "bg-[#FF8B00]/[0.64] text-white"
              : "text-gray-300 hover:text-white"
          }`}
        >
          <LayoutGrid className="w-5 h-5" />
          <span>Sales Dashboard</span>
        </Link>

        {/* Users Dashboard */}
        <Link
          href="/users_dashboard"
          className={`flex items-center gap-2 text-sm px-3 py-2 rounded-md ${
            pathname === "/users_dashboard"
              ? "bg-[#FF8B00]/[0.64] text-white"
              : "text-gray-300 hover:text-white"
          }`}
        >
          <Users className="w-5 h-5" />
          <span>Users Dashboard</span>
        </Link>

        {/* Zones Dashboard */}
        <Link
          href="/zones_dashboard"
          className={`flex items-center gap-2 text-sm px-3 py-2 rounded-md ${
            pathname === "/zones_dashboard"
              ? "bg-[#FF8B00]/[0.64] text-white"
              : "text-gray-300 hover:text-white"
          }`}
        >
          <MapPin className="w-5 h-5" />
          <span>Zones Dashboard</span>
        </Link>

        {/* Profile */}
        <Link
          href="/profile"
          className={`flex items-center gap-2 text-sm px-3 py-2 rounded-md ${
            pathname === "/profile"
              ? "bg-[#FF8B00]/[0.64] text-white"
              : "text-gray-300 hover:text-white"
          }`}
        >
          <User className="w-5 h-5" />
          <span>Profile</span>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;