"use client";
import { NotificationsProvider } from '@/src/utils/notificationsContext';
import Navbar from '../components/shared/navbar/navbar';
import Sidebar from '../components/shared/sidebar/sidebar';
 
import { useRouter } from "next/navigation";

export default function Layout({ 
    children 
} : {
    children: React.ReactNode;
}) {

    const router = useRouter();

    const goToProfile = () => {
        router.push(``);
      };

      const goToNotification = () => {
        router.push(``);
      };
      const user = { id: 3 };// #to-do: replace with actual user data
      return (
        <>
        <NotificationsProvider userId={`${user.id}`}>
            <Navbar />
            <div className="flex">
                <Sidebar />
                <main className="flex-1 bg-irchad-gray-dark">{children}</main>
            </div>
            </NotificationsProvider>
        </>
    )
}
