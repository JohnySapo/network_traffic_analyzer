import AppHeader from "@/components/header/app-header";
import AppSidebar from "@/components/sidebar/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

export const Layout = () => (
    <SidebarProvider>
        <AppSidebar />
        <main className="w-screen flex-grow dark:bg-zinc-950 bg-zinc-100">
            <AppHeader />
            <Outlet />
        </main>
    </SidebarProvider>
);

export default Layout;