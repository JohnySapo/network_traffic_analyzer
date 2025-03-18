import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import ProtectedRoute from "./ProtectedRoute";
import HomePage from "@/pages/home/home";
import User from "@/pages/User";
import { SidebarProvider } from "@/components/ui/sidebar";


export const router = createBrowserRouter([
    { 
        path: "/", 
        element: <App />, 
        children: [
            { path: "/", element: <HomePage /> },
            { path: "/dashboard", element: (
                <ProtectedRoute requiredRole={["USER", "ADMIN"]}>
                    <SidebarProvider>
                        <User />
                    </SidebarProvider>
                </ProtectedRoute>
            )}
        ]}
]);