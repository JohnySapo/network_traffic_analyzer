"use client";

import { type LucideIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";

export function NavMain(
  {
    items
  }: {
    items: {
      title: string;
      url: string;
      icon?: LucideIcon
    }[]
  }
) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Link to={item.url}>
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton tooltip={item.title} className="cursor-pointer">
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </Link>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
