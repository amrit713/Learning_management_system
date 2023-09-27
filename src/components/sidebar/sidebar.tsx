import { SafeUser } from "@/types";
import { Logo } from "./logo";
import { SidebarRoutes } from "./sidebar-routes";
import { Role } from "@prisma/client";

interface SidebarProps {
  role?: Role;
}
export const Sidebar = ({ role }: SidebarProps) => {
  return (
    <div className="h-full border-r flex flex-col  bg-white shadow-sm w-full">
      <div className="p-6 cursor-pointer">
        <Logo />
      </div>
      <div className=" flex flex-col w-full">
        <SidebarRoutes role={role} />
      </div>
    </div>
  );
};
