import PostCard from "@/components/PostCard";
import PostDate from "@/components/PostDate";
import Views from "@/components/Views";
import { prisma } from "@/lib/db/prisma";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface searchParamsProps {
  params: {
    category: string;
  };
}

export const generateMetadata = async ({
  params: { category },
}: searchParamsProps): Promise<Metadata> => {
  return {
    title: `${category.toUpperCase()} BLOGS`,
    description: `All ${category} related posts are found on the current page`,
  };
};

const SeoCategoryPage = async ({ params: { category } }: searchParamsProps) => {
  const seoCategories = await prisma.category.findMany({
    where: { name: { contains: category, mode: "insensitive" } },
    include: { Post: { include: { author: true, categories: true } } },
    orderBy: { id: "desc" },
  });

  return (
    <main className="p-5 bg-white w-[85vw] md:max-w-7xl m-auto">
      <h1 className="text-2xl font-bold mb-8">
        {category.toUpperCase()} BLOGS
      </h1>
      {seoCategories && (
        <div className="w-[100%]  grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {seoCategories.map((category) =>
            category.Post.map((post) => (
              <Link href={"/post/" + post.id} key={post.id}>
                <div
                  className="h-[200px] hover:scale-[1.03] transition duration-1000 ease-out bg-cover object-cover bg-top"
                  style={{ backgroundImage: `url(${post.image})` }}
                >
                  <div className="overlay flex relative p-6 w-[100%] transition duration-1000 ease-out h-[100%] hover:bg-black  hover:bg-opacity-30">
                    <div className="content absolute bottom-0 left-1">
                      <div className="flex items-center">
                        <Views post={post} />
                      </div>
                    </div>
                  </div>
                </div>
                <h2 className=" mt-3 post-title font-semibold">{post.title}</h2>
                <div className="flex items-center">
                  <div className="h-[30px] w-[30px] rounded-full overflow-hidden">
                    <Image
                      src={post.author.image ? post.author.image : "no"}
                      alt={post.title}
                      width={100}
                      height={100}
                    />
                  </div>
                  <div className="flex text-sm items-center flex-wrap mx-2">
                    <p className="text-gray-600">by</p>
                    <p className="mx-2">{post.author.name}</p>

                    <PostDate post={post} className="text-xs text-gray-600" />
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      )}

      {seoCategories.length < 1 && (
        <div className="h-[100vh] w-full flex items-center justify-center">
          <h2 className="text-2xl font-bold">
            No Posts found in the Category!
          </h2>
        </div>
      )}
    </main>
  );
};

export default SeoCategoryPage;
