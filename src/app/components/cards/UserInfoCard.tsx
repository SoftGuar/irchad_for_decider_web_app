"use client";
import React, { useEffect, useState } from "react";

interface UserInfoCardProps {
  user: {
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    id: string;
    avatar: string;
    role: string;
    joinedAt: string;
  };
  isEditing: boolean;
  onSave: (updatedUser: any) => void; // Changed to accept user data
  className?: string; // Added to support the className prop
}

const UserInfoCard: React.FC<UserInfoCardProps> = ({ 
  user, 
  isEditing, 
  onSave, 
  className = "" 
}) => {
  const [editedUser, setEditedUser] = useState({...user}); // Create local state for edited user
  const [userSinceLabel, setUserSinceLabel] = useState("User");

  useEffect(() => {
    switch (user.role) {
      case "admin":
        setUserSinceLabel("Admin");
        break;
      case "maintainer":
        setUserSinceLabel("Maintainer");
        break;
      case "commercial":
        setUserSinceLabel("Commercial");
        break;
      case "decisionmaker":
        setUserSinceLabel("Decision Maker");
        break;
      case "helper":
        setUserSinceLabel("Helper");
        break;
      default:
        setUserSinceLabel("User");
        break;
    }
  }, [user.role]);
  
  // Reset editedUser when original user changes or edit mode is toggled
  useEffect(() => {
    setEditedUser({...user});
  }, [user, isEditing]);
  
  const userData = [
    { name: "userName", label: "Username", value: editedUser.userName, editable: false },
    { name: "email", label: "E-mail address", value: editedUser.email, editable: true },
    { name: "phone", label: "Phone number", value: editedUser.phone, editable: true },
    { name: "firstName", label: "First name", value: editedUser.firstName, editable: true },
    { name: "lastName", label: "Last name", value: editedUser.lastName, editable: true },
    { name: "joinedAt", label: `${userSinceLabel} since`, value: editedUser.joinedAt, editable: false },
    { name: "id", label: `${userSinceLabel} Id`, value: editedUser.id, editable: false },
  ];
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // Convert field names to match API expectations
    const apiUser = {
      first_name: editedUser.firstName,
      last_name: editedUser.lastName,
      email: editedUser.email,
      phone: editedUser.phone
    };
    onSave(apiUser);
  };

  return (
    <div className={`bg-[#1E1E1E] py-6 rounded-lg shadow-md text-white ${className}`}>
      <ul className="space-y-3 pl-6 pr-6">
        {userData.map(({name, label, value, editable}) => (
          <li className="flex items-center" key={label}>
            <span className="text-white text-lg font-semibold min-w-[180px] capitalize">
              {label.replace(/([A-Z])/g, ' $1').trim()}:
            </span>
            {isEditing && editable ? (
              <input 
                type="text" 
                name={name} 
                value={value || ''} 
                onChange={handleChange} 
                className="focus:outline-none bg-[#333] text-white px-2 py-1 rounded-md w-full max-w-[250px]"
              />
            ) : (
              <span className="text-gray-300">
                {name === "joinedAt" ? new Date(value).toLocaleDateString() : value || "-"}
              </span>
            )}
          </li>
        ))}
      </ul>
      {isEditing && (
        <div className="mt-4 pl-6">
          <button 
            onClick={handleSave} 
            className="bg-[#7D511F] px-4 py-2 rounded-md text-white hover:bg-[#8d5d23] transition-colors">
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
};

export default UserInfoCard;