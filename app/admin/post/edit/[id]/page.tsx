import { prisma } from "@/lib/db/prisma";
import EditBlogClient, { PostProps } from "./EditBlogClient";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

interface EditBlogPageProps {
  params: {
    id: string;
  };
}

export const metadata = {
  title: "Edit-Blog",
};

const EditBlogPage = async ({ params: { id } }: EditBlogPageProps) => {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;
  const post = await prisma.post.findUnique({
    where: { id },
    include: { categories: true },
  });

  if (userId !== post?.authorId) {
    redirect("/admin/all-posts");
  }
  return (
    <div>
      <EditBlogClient post={post} />
    </div>
  );
};

export default EditBlogPage;
