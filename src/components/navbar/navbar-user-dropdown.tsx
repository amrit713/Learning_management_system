"use client";

import { signOut } from "next-auth/react";
import toast from "react-hot-toast";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useModal } from "@/hooks/use-modal-store";
import { SafeUser } from "@/types";

interface NavbarUserDropdownProps {
  currentUser: SafeUser;
}
export const NavbarUserDropdown = ({
  currentUser,
}: NavbarUserDropdownProps) => {
  const { onOpen } = useModal();

  console.log(
    "🚀 ~ file: navbar-user-dropdown.tsx:26 ~ currentUser:",
    currentUser.image
  );

  const logoutHandler = async () => {
    try {
      await signOut();

      toast.success("Logout successfull");
    } catch (error: any) {
      console.log(error);
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer bg-red-300">
          {currentUser.image ? (
            <AvatarImage src={currentUser.image} className="object-cover" />
          ) : (
            <AvatarFallback className="capitalize text-white font-semibold bg-purple-800">
              {currentUser.name && currentUser.name[0]}
            </AvatarFallback>
          )}
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-44 absolute -right-4">
        <DropdownMenuLabel> My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="capitalize font-medium text-zinc-600">
          {currentUser.name}
        </DropdownMenuLabel>
        <DropdownMenuItem
          className="capitalize font-bold  text-rose-500"
          onClick={logoutHandler}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
