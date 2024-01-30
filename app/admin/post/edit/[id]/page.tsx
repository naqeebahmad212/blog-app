import { prisma } from "@/lib/db/prisma";
import EditBlogClient, { PostProps } from "./EditBlogClient";


interface EditBlogPageProps{
    params:{
        id:string
    }
}

export const metadata = {
  title: "Edit-Blog",
};


const EditBlogPage = async({params:{id}}:EditBlogPageProps) => {

    const post = await prisma.post.findUnique({
        where:{id},
        include:{categories:true}
    })
  return (
    <div>
      <EditBlogClient post={post}  />
    </div>
  )
}

export default EditBlogPage