import RegisterForm from "@/components/RegisterForm";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const RegisterPage = async() => {
  const session= await getServerSession(authOptions)
  if(session){
    redirect('/')
  }
  return (
    <div>
     <RegisterForm/>
    </div>
  );
};

export default RegisterPage;
