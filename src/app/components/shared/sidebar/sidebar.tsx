"use client";

import { useState } from "react";
import { Users, DollarSign, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const Sidebar = () => {
  const [selectedItem, setSelectedItem] = useState("users");

  const handleClick = (item: string) => {
    setSelectedItem(item);
  };

  return (
    <div
      className="w-64 min-h-screen  p-4"
      style={{
        backgroundColor: "#2E2E2E",
        boxShadow: "8px 0 32px 0 rgba(0, 0, 6, 1)",
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 text-xl font-bold text-white">
        <Image src="/images/logo.png" alt="IRCHAD" width={32} height={32} />
        <span>IRCHAD</span>
      </div>

      {/* Navigation */}
      <nav className="mt-6 space-y-2">
        <h3 className="text-gray-400 text-sm mt-2 mb-1">Management</h3>

        {/* User Management */}
        <Link
          href="/users_dashboard"
          className={`flex items-center gap-2 px-3 py-2 text-sm rounded-md ${
            selectedItem === "users"
              ? "bg-[#FF8B00]/[0.64] text-white"
              : "text-gray-300 hover:text-white"
          }`}
          onClick={() => handleClick("users")}
        >
          <Users className="w-5 h-5" />
          <span>User Dashboard</span>
        </Link>

        {/* Sales Management */}
        <Link
          href="/sales_dashboard"
          className={`flex items-center gap-2 px-3 py-2 text-sm rounded-md ${
            selectedItem === "sales"
              ? "bg-[#FF8B00]/[0.64] text-white"
              : "text-gray-300 hover:text-white"
          }`}
          onClick={() => handleClick("sales")}
        >
          <DollarSign className="w-5 h-5" />
          <span>Sales Dashboard</span>
        </Link>

        {/* Zones Management */}
        <Link
          href="/zones_dashboard"
          className={`flex items-center gap-2 px-3 py-2 text-sm rounded-md ${
            selectedItem === "zones"
              ? "bg-[#FF8B00]/[0.64] text-white"
              : "text-gray-300 hover:text-white"
          }`}
          onClick={() => handleClick("zones")}
        >
          <MapPin className="w-5 h-5" />
          <span>Zones Dashboard</span>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
