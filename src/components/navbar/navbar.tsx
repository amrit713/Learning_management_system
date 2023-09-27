"use client";

import { MobileSidebar } from "@/components/sidebar/mobile-sidebar";
import { NavbarRoutes } from "./navbar-routes";
import { SafeUser } from "@/types";

interface NavbarProps {
  currentUser?: SafeUser | null;
}

export const Navbar = ({ currentUser }: NavbarProps) => {
  return (
    <div className=" p-4 border-b h-full flex items-center bg-white shadow-sm relative">
      <MobileSidebar />
      <NavbarRoutes currentUser={currentUser} />
    </div>
  );
};
