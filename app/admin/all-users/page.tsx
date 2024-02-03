"use server"
import { prisma } from "@/lib/db/prisma"
import { getServerSession } from "next-auth"
import DataGridComp from "@/components/DataGridComp";
import UserDataGrid from "./UsersDataGrid";
import { authOptions } from "@/lib/auth";


const AllUser = async() => {
  "use server"
    const users= await prisma.user.findMany({
        orderBy:{id:"desc"}
    })

    const session=await getServerSession(authOptions)





   

  return (
    <div className="">
        <UserDataGrid session={session} users={users}/>
    </div>
  )
}

export default AllUser