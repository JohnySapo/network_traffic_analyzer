import { NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { NavigationMenu, NavigationMenuList } from "@radix-ui/react-navigation-menu";
import { KeyRound, User } from "lucide-react";
import { Link } from "react-router-dom";

const items = [
    { title: "Account", url: "account", icon: User },
    { title: "Reset Password", url: "reset-password", icon: KeyRound },
];


export const NavSettings = () => {
    return (
        <aside className="aspect-video border-none rounded-r-lg dark:bg-muted/50 p-6 ps-5 
        bg-slate-50 shadow dark:shadow-blue-50/20">
            <NavigationMenu>
                <NavigationMenuList>
                    {items.map((item) => (
                        <NavigationMenuItem key={item.title}>
                            <Link to={`/dashboard/settings/${item.url}`}>
                                <NavigationMenuLink className="flex-row justify-start items-center text-left font-extralight">
                                    {item.icon && <item.icon />}
                                    <span className="ms-1">
                                        {item.title}
                                    </span>
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                    ))}
                </NavigationMenuList>
            </NavigationMenu>
        </aside>
    )
}

export default NavSettings;