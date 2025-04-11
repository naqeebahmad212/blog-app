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
      <div className="dashboard  flex">
        <div className=" lg:w-[250px] ">
          <SideTest />
        </div>
        <div className="dashboard w-full  px-3">
          <h1 className="text-2xl  text-center bg-gray-800 text-white p-3 m-auto mt-4 sticky top-4 z-10 ">
            Admin Dshboard
          </h1>
          {children}
        </div>
      </div>
    </main>
  );
}
