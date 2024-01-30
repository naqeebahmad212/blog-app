import { prisma } from "@/lib/db/prisma";
import Image from "next/image";
import { Pagination } from "@mui/material";
import PaginationBar from "@/components/shared/PaginationBar";
import HomeTopSix from "@/components/HomeTopSix";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import Link from "next/link";
import PostDate from "@/components/PostDate";
import { revalidatePath } from "next/cache";
import Views from "@/components/Views";
import PostCard, { PostsProps } from "@/components/PostCard";

export interface HomeProps {
  searchParams: {
    page: string;
  };
}

export default async function Home({
  searchParams: { page = "1" },
}: HomeProps) {
  const perPage = 8;
  const currentPage = parseInt(page);
  const totalPostCount = await prisma.post.count();
  const totalPages = Math.ceil(totalPostCount / perPage);
  const posts = await prisma.post.findMany({
    include: { categories: true, author: true },
    orderBy: { id: "desc" },
    skip: (currentPage - 1) * perPage,
    take: perPage,
  });

  revalidatePath("/");
  return (
    <main className="p-5 bg-white w-[85vw] m-auto">
      <HomeTopSix />

      <div className="flex flex-wrap flex-col lg:flex-row m-2">
        <div className="w-full my-5">
          <p className="w-[100%] lg:w-[70%] bg-black text-xl p-2 text-white">
            Latest Blogs
          </p>
        </div>
        <div className="flex flex-col lg:flex-row">
          <div className="w-[100%] lg:w-[70%] grid gap-2 grid-cols-1 lg:grid-cols-2">
            {posts.map((post) => (
              <PostCard post={post} key={post.id}/>
            ))}
          </div>
          <div className="flex flex-col ml-0 mt-5 lg:ml-5 lg:mt-0 w-[100%] lg:w-[25%] ">
            <Image
              src={
                "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHdlYiUyMGRldmVsb3BtZW50JTIwYWRzfGVufDB8fDB8fHww"
              }
              alt="ads"
              width={500}
              height={400}
              className="mb-4"
            />

            <Image
              src={
                "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHdlYiUyMGRldmVsb3BtZW50JTIwYWRzfGVufDB8fDB8fHww"
              }
              alt="ads"
              width={500}
              height={400}
            />
          </div>
        </div>

        <PaginationBar currentPage={currentPage} totalPages={totalPages} />
      </div>
    </main>
  );
}
