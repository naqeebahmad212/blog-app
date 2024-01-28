"use server";
import MainNav from "@/components/shared/MainNav";
import { getServerSession } from "next-auth";
import { getUser } from "./add-blog/action";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
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
    <div>
      <main className="p-5 bg-base-100 w-[85vw] m-auto">{children}</main>
    </div>
  );
}
