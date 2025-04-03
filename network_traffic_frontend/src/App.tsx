import { ThemeProvider } from "@/components/theme/theme-provider";
import { UserProvider } from "./context/UseAuth";
import { Outlet } from "react-router-dom";

export function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <UserProvider>
        <Outlet />
      </UserProvider>
    </ThemeProvider>
  )
}

export default App;