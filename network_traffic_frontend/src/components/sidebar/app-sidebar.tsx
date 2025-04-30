import {
  Command,
  Frame,
  LayoutDashboard,
  LifeBuoy,
  Map,
  Send,
} from "lucide-react";
import { NavMain } from "@/components/sidebar/components/nav-man";
import { NavAbuseIPs } from "@/components/sidebar/components/nav-abuseips";
import { NavSecondary } from "@/components/sidebar/components/nav-secondary";
import { NavUser } from "@/components/sidebar/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useAuth } from "@/context/user-authentication";
import { Link } from "react-router-dom";


const platform = {
  navMain: [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  ],
  navSecondary: [
    { title: "Support", url: "#", icon: LifeBuoy },
    { title: "Feedback", url: "#", icon: Send, },
  ],
  abuseips: [
    { name: "Search Abused IPs", url: "/search", icon: Map },
    { name: "Reported IPs", url: "/reported", icon: Frame },
  ],
}

type Props = {};

export const AppSidebar = (props: Props) => {

  const { user, logout } = useAuth();

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Network Analyzer</span>
                  <span className="truncate text-xs">TU DUBLIN</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={platform.navMain} />
        <NavAbuseIPs projects={platform.abuseips} />
        <NavSecondary items={platform.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user!} logout={logout} />
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar;