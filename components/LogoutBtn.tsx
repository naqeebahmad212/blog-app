"use client";
import { signOut } from "next-auth/react";
import { ComponentProps, useState } from "react";
import { useFormStatus } from "react-dom";


type PostBtnProps = {
  children: React.ReactNode;
  className?: string;
} & ComponentProps<"button">;



const LogoutBtn = ({ children, className, ...props }: PostBtnProps) => {
    const { pending } = useFormStatus();

  return (
<button
onClick={async ()=> await (signOut({callbackUrl:"/"}))}

type="submit"
{...props}
// onClick={()=> setPending(true) }
disabled={pending}
className={` ${className}`}
>
{pending && <span className="loading loading-spinner loading-xs" />}
{children}
</button>  )
}

export default LogoutBtn