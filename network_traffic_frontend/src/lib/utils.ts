import { clsx, type ClassValue } from "clsx";
import { useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const PageTitle = () => {
  const location = useLocation();
  const path = location.pathname.replace(/^\/dashboard\//, "").split("/").filter(Boolean);

  const mainPage = 
  path.length > 0 ? path[0].replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase()) : "Dashboard";

  const subPage = 
  path.length > 1 ? path[1].replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase()) : null;

  return { mainPage, subPage, mainPagePath: `/dashboard/${path[0]}` };
};

export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{1,12}$/;