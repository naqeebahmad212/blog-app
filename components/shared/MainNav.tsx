"use server";

import { getUser } from "@/app/admin/add-blog/action";
import Navbar from "@/components/shared/Navbar";
import { authOptions } from "@/lib/auth";
import { env } from "@/lib/env";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";

const MainNav = async () => {
  const session = await getServerSession(authOptions);
  let userInfo = null;
  if (session) {
    const userId = session.user.id;
    userInfo = await getUser(userId);
  }

  return (
    <div>
      <Navbar session={session} userInfo={userInfo} />
    </div>
  );
};

export default MainNav;
