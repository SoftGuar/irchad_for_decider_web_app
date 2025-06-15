"use client";
import React, { useState, useEffect } from "react";
import { User } from "../../../type/user";

interface UserInfoCardProps {
  user: User;
  isEditing: boolean;
  onSave: (updatedUser: Partial<User>) => void;
}

interface Field {
  name: keyof User;
  label: string;
  value: string | number;
  editable?: boolean;
}

const UserInfoCard: React.FC<UserInfoCardProps> = ({ user, isEditing, onSave }) => {
  const [fields, setFields] = useState<Field[]>([
    { name: "first_name", label: "First name", value: user.first_name, editable: true },
    { name: "last_name", label: "Last name", value: user.last_name, editable: true },
    { name: "email", label: "E-mail address", value: user.email, editable: true },
    { name: "phone", label: "Phone number", value: user.phone, editable: true },
    { name: "id", label: "User ID", value: user.id, editable: false },
  ]);

  // Update fields when user prop changes
  useEffect(() => {
    setFields([
      { name: "first_name", label: "First name", value: user.first_name, editable: true },
      { name: "last_name", label: "Last name", value: user.last_name, editable: true },
      { name: "email", label: "E-mail address", value: user.email, editable: true },
      { name: "phone", label: "Phone number", value: user.phone, editable: true },
      { name: "id", label: "User ID", value: user.id, editable: false },
    ]);
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: keyof User) => {
    const updatedFields = fields.map(field => 
      field.name === fieldName 
        ? { ...field, value: e.target.value } 
        : field
    );
    setFields(updatedFields);
  };

  const handleSave = () => {
    const updatedUser: Partial<User> = {};
    fields.forEach(field => {
      if (field.editable) {
        updatedUser[field.name] = field.value as any;
      }
    });
    onSave(updatedUser);
  };

  return (
    <div className="bg-[#1E1E1E] p-8 rounded-lg shadow-md text-white ">
      <ul className="space-y-3 pl-16">
        {fields.map(({ name, label, value, editable }) => (
          <li className="flex items-center" key={name}>
            <span className="text-white text-lg font-semibold min-w-[250px]">
              {label}:
            </span>
            {isEditing && editable ? (
              <input
                type="text"
                name={name}
                value={value}
                onChange={(e) => handleChange(e, name)}
                className="focus:outline-none bg-[#333] text-white px-2 py-1 rounded-md ml-2 w-full max-w-md"
              />
            ) : (
              <span className="ml-2">{value}</span>
            )}
          </li>
        ))}
      </ul>
      {isEditing && (
        <div className="mt-4 ml-16">
          <button
            onClick={handleSave}
            className="w-1/4 bg-[#7D511F] px-4 py-2 rounded-md text-white hover:bg-[#9a6a30] transition-colors"
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default UserInfoCard;