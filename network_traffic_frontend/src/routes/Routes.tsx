import { App } from "@/App";
import { HomePage } from "@/pages/home/home"
import { Layout } from "@/pages/layout/layout";
import { ProtectedRoute } from "./protected-route";
import { Settings } from "@/pages/settings/settings";
import { Dashboard } from "@/pages/dashboard/dashboard";
import { Account } from "@/pages/settings/sub-pages/account";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { ResetPasswordPage } from "@/pages/settings/sub-pages/reset-password";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "/", element: <HomePage /> },
            {
                path: "/dashboard",
                element: (
                    <ProtectedRoute requiredRole={["USER", "ADMIN"]}>
                        <Layout />
                    </ProtectedRoute>
                ),
                children: [
                    { index: true, element: <Dashboard /> },
                    { 
                        path: "settings",
                        element: <Settings />,
                        children: [
                            { index: true, element: <Navigate to="account" replace /> },
                            { path: "account", element: <Account /> },
                            { path: "reset-password", element: <ResetPasswordPage />},
                        ],
                    },
                ]
            },
        ]
    }
]);