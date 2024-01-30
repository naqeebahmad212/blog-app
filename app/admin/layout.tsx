"use server";
import MainNav from "@/components/shared/MainNav";
import { getServerSession } from "next-auth";
import { getUser } from "./add-blog/action";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import DashbaordSideBar from "@/components/DashbaordSideBar";
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
      redirect("/api/auth/signin?callbackUrl=/admin/add-blog");
    }
  } else {
    redirect("/");
  }

  return (
    <main>
      {/* <MainNav /> */}
      <div className="dashboardContainer flex">
        <div className="sidebar lg:w-80 fixed md:static">
          <DashbaordSideBar />
        </div>
        <div className="dashboard w-[75%] mx-auto">
          <h1 className="text-2xl  text-center bg-primary text-white p-3 m-auto mt-5">
            Admin Dshboard
          </h1>
          {children}
        </div>
      </div>
    </main>
  );
}
