"use client";

import { LogIn, LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { NavbarUserDropdown } from "./navbar-user-dropdown";
import { SafeUser } from "@/types";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

interface NavbarRoutesProps {
  currentUser?: SafeUser | null;
}
export const NavbarRoutes = ({ currentUser }: NavbarRoutesProps) => {
  const { onOpen } = useModal();
  const pathname = usePathname();
  const router = useRouter();

  const isTeacherPage =
    pathname.startsWith("/teacher") && currentUser?.role === "TEACHER";
  const isPlayerPage = pathname.includes("/chapter");

  return (
    <div className="ml-auto  flex gap-x-2 items-center   ">
      {isTeacherPage || isPlayerPage ? (
        <Link href="/">
          <Button size="sm" variant="ghost">
            <LogOut className="h-4 w-4 mr-2" />
            Exist
          </Button>
        </Link>
      ) : (
        currentUser?.role === "TEACHER" && (
          <Link href="/teacher/courses">
            <Button size="sm" variant="ghost">
              Teacher Mode
            </Button>
          </Link>
        )
      )}

      <div className="">
        {currentUser ? (
          <NavbarUserDropdown currentUser={currentUser} />
        ) : (
          <Button
            variant="outline"
            onClick={() => onOpen("login")}
            className="flex gap-x-2"
          >
            <LogIn size="16" />
            <p>Login</p>
          </Button>
        )}

        {/* TODO: Need to fix to drop down and google profile url */}
      </div>
    </div>
  );
};
