"use client";

import { useState } from "react";
import { LayoutGrid, Users, MapPin, User } from "lucide-react";
import Link from "next/link";

const Sidebar = () => {
  const [selectedMain, setSelectedMain] = useState("sales_dashboard");

  const handleMainClick = (item: string) => {
    setSelectedMain(item);
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
            selectedMain === "sales_dashboard"
              ? "bg-[#FF8B00]/[0.64]"
              : "text-gray-300 hover:text-white"
          }`}
          onClick={() => handleMainClick("sales_dashboard")}
        >
          <LayoutGrid className="w-5 h-5" />
          <span>Sales Dashboard</span>
        </Link>

        {/* Users Dashboard */}
        <Link
          href="/users_dashboard"
          className={`flex items-center gap-2 text-sm px-3 py-2 rounded-md ${
            selectedMain === "users_dashboard"
              ? "bg-[#FF8B00]/[0.64]"
              : "text-gray-300 hover:text-white"
          }`}
          onClick={() => handleMainClick("users_dashboard")}
        >
          <Users className="w-5 h-5" />
          <span>Users Dashboard</span>
        </Link>

        {/* Zones Dashboard */}
        <Link
          href="/zones_dashboard"
          className={`flex items-center gap-2 text-sm px-3 py-2 rounded-md ${
            selectedMain === "zones_dashboard"
              ? "bg-[#FF8B00]/[0.64]"
              : "text-gray-300 hover:text-white"
          }`}
          onClick={() => handleMainClick("zones_dashboard")}
        >
          <MapPin className="w-5 h-5" />
          <span>Zones Dashboard</span>
        </Link>

        {/* Profile */}
        <Link
          href="/profile"
          className={`flex items-center gap-2 text-sm px-3 py-2 rounded-md ${
            selectedMain === "profile"
              ? "bg-[#FF8B00]/[0.64]"
              : "text-gray-300 hover:text-white"
          }`}
          onClick={() => handleMainClick("profile")}
        >
          <User className="w-5 h-5" />
          <span>Profile</span>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;