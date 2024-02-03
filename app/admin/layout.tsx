"use server";
import MainNav from "@/components/shared/MainNav";
import { getServerSession } from "next-auth";
import { getUser } from "./add-blog/action";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import DashbaordSideBar from "@/components/DashbaordSideBar";
import SideTest from "@/components/SideTest";
// import SessionProvider from './SessionProvider'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;
  if (userId) {
    const user = await getUser(userId);
    if (user?.role !== "admin") {
      redirect("/");
    }
  } else {
    redirect("/auth/signin");
  }

  return (
    <main>
      {/* <MainNav /> */}
      <div className="dashboardContainer flex">
        <div className="w-[17%]">
          <SideTest />
        </div>
        <div className="dashboard w-[84%] px-3">
          <h1 className="text-2xl  text-center bg-primary text-white p-3 m-auto mt-5">
            Admin Dshboard
          </h1>
          {children}
        </div>
      </div>
    </main>
  );
}
