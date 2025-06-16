"use client";
import UserHeaderBar from "../../components/cards/UserHeaderBar";
import UserInfoCard from "../../components/cards/UserInfoCard";
import ActivityHistoryCard from "../../components/cards/ActivityHistoryCard";
import { useState, useEffect } from "react";
import { useUser } from "../../../utils/userContext";
import { User } from "../../../type/user";
import { userApi } from "../../../services/userApi";

const ProfilePage = () => {
  const { user, fetchUser } = useUser();

  // Fetch activities from API instead of using sample data
  const [activities, setActivities] = useState<{ message: string; timestamp: string }[]>([]);
  const [loadingActivities, setLoadingActivities] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      setLoadingActivities(true);
      try {
        const res = await userApi.getHistory();
        if (res.success && Array.isArray(res.data)) {
          setActivities(
            res.data.map((item: { action: string; createdAt: string }) => ({
              message: item.action,
              timestamp: item.createdAt,
            }))
          );
        } else {
          setActivities([]);
        }
      } catch (err) {
        setActivities([]);
      }
      setLoadingActivities(false);
    };
    fetchHistory();
  }, []);

  const [isEditing, setIsEditing] = useState(false);

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
    <div className="p-0 bg-[#262626]">
      <div className="w-full rounded-lg bg-red-600 ">
        <img src="/images/header.svg" />
      </div>

      <UserHeaderBar user={user} onEdit={() => setIsEditing(true)} />

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-12 p-8 m">
        <div className="lg:col-span-2 flex  ">
          <UserInfoCard
            user={{
              userName: user.userName ?? user.username ?? "",
              firstName: user.first_name ?? user.firstName ?? "",
              lastName: user.last_name ?? user.lastName ?? "",
              email: user.email ?? "",
              phone: user.phone ?? "",
              id: user.id ?? "",
              avatar: user.avatar ?? "",
              role: user.role ?? "",
              joinedAt: user.joinedAt ?? user.createdAt ?? "",
            }}
            isEditing={isEditing}
            onSave={handleSave}
            className="w-full h-[450px]"
          />
        </div>
        <div className="lg:col-span-2 flex   ml-12">
          <ActivityHistoryCard
            title="Activity History"
            activities={activities}
            loading={loadingActivities}
            className="w-full h-[450px]"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
