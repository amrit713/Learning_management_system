import getCurrentUser, { getSession } from "@/lib/getCurrentUser";

import { Navbar } from "@/components/navbar/navbar";
import { Sidebar } from "@/components/sidebar/sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sessionUser = await getSession();

  const currentUser = await getCurrentUser();

  return (
    <main className="h-full">
      <div className=" w-full h-[87px] md:pl-56 fixed inset-y-0  z-30">
        <Navbar currentUser={currentUser} />
      </div>
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-30">
        <Sidebar role={currentUser?.role} />
      </div>

      <div className="md:pl-56 pt-[87px]  h-full">{children}</div>
    </main>
  );
}
