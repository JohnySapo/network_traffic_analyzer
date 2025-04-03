import { ModeToggle } from "@/components/theme/mode-toggle";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import HeaderBreadcrumb from "./components/header-breadcrumb";

export const AppHeader = () => {

  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 
    items-center gap-2 border-b transition-[width,height] ease-linear sticky top-0 dark:bg-zinc-950 bg-zinc-100">
      <div className="flex w-full justify-between">
        <div className="flex items-center gap-1 px-4 lg:gap-2 lg:px-6">
          <SidebarTrigger className="-ml-1 cursor-pointer" />
          <Separator
            orientation="vertical"
            className="mx-2 data-[orientation=vertical]:h-4"
          />
          <HeaderBreadcrumb />
        </div>
        <div className="flex me-3">
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}

export default AppHeader;