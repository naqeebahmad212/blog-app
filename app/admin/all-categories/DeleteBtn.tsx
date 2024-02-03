"use client";
import { deleteCategory } from "@/lib/db/action";
import { ComponentProps, useState, useTransition } from "react";
import { useFormStatus } from "react-dom";

type DeleteBtnProps = {
  children: React.ReactNode;
  className?: string;
  id:string,
  btnStatus: boolean,
} & ComponentProps<"button">;

const DeleteBtn = ({ children, className, id , btnStatus, ...props }: DeleteBtnProps) => {
    const [isPending  , startTransition]=useTransition()
  return (
    <button
    onClick={()=>{
        startTransition(async()=>{
           await deleteCategory(id)
        })
    }}
      {...props}
      // onClick={()=> setPending(true) }
      disabled={isPending || btnStatus}
      className={`btn btn-primary px-2 py-0 min-h-[1rem] h-[2rem]  ${className}`}
    >
      {isPending && <span className="loading loading-spinner loading-xs" />}
      {children}
    </button>
  );
};

export default DeleteBtn;
