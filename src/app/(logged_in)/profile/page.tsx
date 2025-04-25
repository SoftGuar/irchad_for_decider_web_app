"use client";
import UserHeaderBar from "../../components/cards/UserHeaderBar";
import UserInfoCard from "../../components/cards/UserInfoCard";
import ActivityHistoryCard from "../../components/cards/ActivityHistoryCard";
import { useState } from "react";
import { useUser } from "../../../utils/userContext";
import { User } from "../../../type/user";
import { userApi } from "../../../services/userApi";

const ProfilePage = () => {
    const { user, fetchUser } = useUser();

    const activities = [
        { message: "Logged in", timestamp: "2025-03-11 10:30 AM" },
        { message: "Updated profile information", timestamp: "2025-03-10 03:15 PM" },
        { message: "Changed password", timestamp: "2025-03-09 06:45 PM" },
        { message: "Updated profile information", timestamp: "2025-02-20 06:45 PM" },
    ]

    const [isEditing, setIsEditing] = useState(false)

    const handleSave = async (updatedUser: Partial<User>) => {
      try {
        const response = await userApi.updateUser({
          first_name: updatedUser.first_name,
          last_name: updatedUser.last_name,
          email: updatedUser.email,
          phone: updatedUser.phone,
        });
        console.log('Update response:', response.data);
        localStorage.setItem('user', JSON.stringify(response.data));
      //  document.cookie = `token=${response.data.token}; path=/; max-age=${60 * 60 * 24}`;
        
        if (response.success) {
          await fetchUser(); 
          setIsEditing(false);
        }
      } catch (error) {
        console.error('Failed to update user:', error);
      }
    };

    if (!user) {
      return <div>Loading user data...</div>;
    }

    return (
      <div className="p-0 bg-black">
        <div className="w-full rounded-lg ">
          <img src="/images/header.svg" />
        </div>

      <UserHeaderBar user={user} onEdit={() => setIsEditing(true)} />

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-6 p-8 ">
        <div className="lg:col-span-2  mt-3">
          <UserInfoCard user={user} isEditing={isEditing} onSave={handleSave}/>
        </div>
        <div className="lg:col-span-2 ">
        <ActivityHistoryCard title="Activity History" activities={activities} />
      </div>
      </div>
    </div>
    )
  }
  
  export default ProfilePage;
  