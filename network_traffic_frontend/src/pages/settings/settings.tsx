import { Outlet } from "react-router-dom";
import { NavSettings } from "@/pages/settings/components/nav-settings";

export const Settings = () => {

    return (
        <div className="p-8 grid grid-cols-[200px_1fr] gap-4">
            <NavSettings />
            <main className="w-full max-w-screen-lg mx-auto">
                <Outlet />
            </main>
        </div>
    )
}

export default Settings;