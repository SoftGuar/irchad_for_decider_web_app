"use client";
import { AiTwotoneEdit } from "react-icons/ai";
import { User } from "../../../type/user";

interface UserHeaderBarProps {
  user: User
  onEdit: () => void;
}

const UserHeaderBar: React.FC<UserHeaderBarProps> = ({ user, onEdit}) => {

  return (
    <div className="relative flex items-center bg-[#2E2E2E] mx-8 my-8 px-12 py-2 rounded-lg shadow-md text-[]">
      <div className="relative -translate-y-5">
        <img
          src="/images/ProfilePic.png"
          alt="Profile"
          className="w-20 h-20 rounded-full border-2 border-secondary_color"
        />
        <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#2E2E2E]" />
      </div>

      <div className="ml-8">
        <h3 className="text-lg font-semibold">{user.first_name} {user.last_name}</h3>
        <p className="text-sm text-[#D1D5DB]">Active</p>
      </div>

      <div className="ml-auto flex items-center gap-4">
        <AiTwotoneEdit className="text-white cursor-pointer" size={18} onClick={onEdit} />

        <button
          className="px-4 py-2 rounded-full underline underline-offset-2 bg-[#7D511F] text-white"
          onClick={() => {
            
          }}
        >
          Personal Information
        </button>

       
      </div>
    </div>
  );
};

export default UserHeaderBar;