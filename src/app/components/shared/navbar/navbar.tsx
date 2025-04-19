import { MagnifyingGlassIcon, BellIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useUser } from "../../../../utils/userContext";
import { User } from "../../../../type/user";
import { userApi } from "../../../../services/useraccount";

const Navbar = () => {
  const { user, fetchUser } = useUser();
  const router = useRouter()

  return (
    <nav className="bg-[#2E2E2E] text-white py-3 px-6 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-2 text-xl font-bold text-white">
        <Image src="/images/logo.png" alt="IRCHAD" width={32} height={32} />
        <span>IRCHAD</span>
      </div>

      

      {/* Notification & User Info */}
      <div className="flex items-center gap-4">
        <BellIcon onClick={()=> router.push('/notifications')} className="h-6 w-6 text-gray-400 cursor-pointer hover:text-white" />
        <div className="flex items-center gap-2">
          <UserCircleIcon onClick={()=> router.push('/profile')}  className="h-8 w-8 text-gray-400 cursor-pointer" />
          <div className="text-sm">
            <p className="font-semibold">{user?.first_name}</p>
            <p className="text-gray-400 text-xs">Décideur</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;