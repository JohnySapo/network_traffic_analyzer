import AppSidebar from "@/components/sidebar/appsidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useAuth } from "@/context/UseAuth";
import { hello } from "@/service/AuthService";
import { useEffect, useState } from "react";

export const User = () => {
    const { user, token } = useAuth();
    const [message, setMessage] = useState<string>("");

    useEffect(() => {
        const fetchHello = async () => {
          try {
            const response = await hello(token);
    
            const data = await response.data;
            setMessage(data);
          } catch (error) {
            setMessage("Failed to fetch message.");
          }
        };
    
        fetchHello();
      }, []);

    return (
        <>
            <AppSidebar />
            <main className="w-screen bg-zinc-950">
                <SidebarTrigger className="cursor-pointer" />
                <div className="flex flex-col justify-center items-center min-h-screen">
                    <h1 className="text-center text-2xl font-bold mb-4">
                        {message || "Loading..."}
                    </h1>
                </div>
            </main>
        </>
    );
};

export default User;