"use server"
import { prisma } from "@/lib/db/prisma"
import { getServerSession } from "next-auth"
import DataGridComp from "@/components/DataGridComp";
import UserDataGrid from "./UsersDataGrid";


const AllUser = async() => {
  "use server"
    const users= await prisma.user.findMany({
        orderBy:{id:"desc"}
    })





   

  return (
    <div>
        <UserDataGrid users={users}/>
    </div>
  )
}

export default AllUser