import Link from "next/link";
import React from "react";
import Views from "./Views";
import Image from "next/image";
import PostDate from "./PostDate";
import { Prisma } from "@prisma/client";
import { PostWithAuthorAndCategoryProps } from "@/app/(blogPages)/page";

export type PostsProps = Prisma.PostGetPayload<{
  include: { author: true; categories: true };
}>;

const PostCard = ({ post, className }: PostWithAuthorAndCategoryProps) => {
  const id = post.slug ? post.slug : post.id;
  return (
    <Link href={"/post/" + id} key={post.id}>
      <div
        className={`${className} h-[180px] md:h-[210px] hover:scale-[1.02] transition duration-1000 ease-out bg-cover object-cover bg-top`}
        style={{ backgroundImage: `url(${post.image})` }}
      >
        <div className="overlay flex relative p-6 w-[100%] transition duration-1000 ease-out h-[100%] hover:bg-black  hover:bg-opacity-30">
          <div className="content absolute bottom-0 left-1">
            <div className="flex items-center">
              <Views post={post} />

              <p className="  text-gray-500 rounded-sm text-[15px] m-2 bg-slate-200 px-4 py-0">
                {post.categories.name}
              </p>
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

          <PostDate post={post} />
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
