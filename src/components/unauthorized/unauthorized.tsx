import { Button } from "@/components/ui/button";
import { UnauthorizedLogo } from "./unauthorized-logo";
import { ArrowBigLeft, ArrowLeft, LogOut } from "lucide-react";
import Link from "next/link";

export const Unauthorized = () => {
  return (
    <div className="flex flex-col-reverse  m-auto items-center justify-between">
      <UnauthorizedLogo />

      <Link href="/">
        <Button size="lg" variant="outline" className="font-semibold ">
          <ArrowLeft size={18} className="mr-2" />
          Back to home
        </Button>
      </Link>
    </div>
  );
};
