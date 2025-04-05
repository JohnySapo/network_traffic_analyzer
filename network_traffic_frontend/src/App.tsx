import { ThemeProvider } from "@/components/theme/theme-provider";
import { UserProvider } from "./context/user-authentication";
import { Toaster } from "@/components/ui/sonner";
import { Outlet } from "react-router-dom";

export function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <UserProvider>
        <Outlet />
        <Toaster />
      </UserProvider>
    </ThemeProvider>
  )
}

export default App;