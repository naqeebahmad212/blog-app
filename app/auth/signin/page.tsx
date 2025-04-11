import SignInPageComp from "@/components/SigninPageComp";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const SignInPage = async () => {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/");
  }
  return (
    <div>
      <SignInPageComp />
    </div>
  );
};

export default SignInPage;
