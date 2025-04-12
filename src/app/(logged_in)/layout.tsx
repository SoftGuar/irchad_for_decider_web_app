"use client";
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

      return (
        <>
            <Navbar />
            <div className="flex">
                <Sidebar />
                <main className="flex-1 bg-irchad-gray-dark">{children}</main>
            </div>
            
        </>
    )
}
