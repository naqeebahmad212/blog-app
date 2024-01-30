"use server"
import { prisma } from "@/lib/db/prisma"
import { getServerSession } from "next-auth"
import DataGridComp from "@/components/DataGridComp";
import { authOptions } from "@/lib/auth";


const AllPosts = async() => {
  "use server"
    const session= await getServerSession(authOptions)
    const userId=session?.user.id
    const userPosts= await prisma.post.findMany({
        where:{authorId:userId},
        include:{categories:true , author:true}
    })





   

  return (
    <div className=" m-auto">
        <DataGridComp userPosts={userPosts} />
    </div>
  )
}

export default AllPosts