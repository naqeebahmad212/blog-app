"use server"

import { HomeProps } from "@/app/page";
import { prisma } from "./prisma"
import { revalidatePath } from "next/cache";

export const getProducts=async( page='1')=>{
    const perPage = 8;
    const currentPage = parseInt(page);
    const totalPostCount = await prisma.post.count();
    const totalPages = Math.ceil(totalPostCount / perPage);
    return await prisma.post.findMany({
      
      orderBy: { id: "desc" },
      skip: (currentPage - 1) * perPage,
      take: perPage,
    });}



export const deleteUserHandler=async(id:string)=>{
  await prisma.user.delete({
    where:{id}
  })

  revalidatePath('/admin/all-users')
}


export const userRoleHandler=async(data:FormData)=>{

  const role= data.get("userRole")?.toString()
  const userId=data.get("userId")?.toString()


  await prisma.user.update({
    where:{id:userId},
    data:{
      role:role
    }
  })
  revalidatePath('/admin/all-users')

}