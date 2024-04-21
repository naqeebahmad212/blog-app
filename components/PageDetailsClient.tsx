"use client";
import { Post, Prisma } from "@prisma/client";
import Image from "next/image";
import React, { Suspense } from "react";
import PostDate from "./PostDate";
import Views from "./Views";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Link from "next/link";
import { TracingBeam } from "./ui/tracing-beam";

type PostWithAuthorAndCategoryType = Prisma.PostGetPayload<{
  include: { categories: true; author: true };
}>;

export interface PostPageClientProps {
  post: PostWithAuthorAndCategoryType;
  posts: Post[];
  topViewedPosts: Post[];
}

const PageDetailsClient = ({
  post,
  posts,
  topViewedPosts,
}: PostPageClientProps) => {
  return (
    <main className="p-5 bg-white w-[85vw] m-auto">
      <div className="flex flex-col gap-5 mt-10 lg:flex-row">
        <div className="w-[100%] lg:w-[65%]">
          <div className=" flex items-start justify-between">
            <h1 className="text-xl mb-5 mr-5 font-bold lg:text-2xl">
              {post?.title}
            </h1>
            <p className=" w-[10%] text-center rounded-sm text-[15px]  bg-slate-200 mt-1 py-0">
              {post?.categories.name}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-[30px] w-[30px] rounded-full overflow-hidden">
                <Image
                  src={post?.author.image ? post.author.image : "no"}
                  alt={post?.title ? post.title : "author"}
                  width={100}
                  height={100}
                />
              </div>

              <div className="flex text-sm items-center flex-wrap mx-2">
                <p className="text-gray-600">by</p>
                <p className="mx-2">{post?.author.name}</p>

                {post && (
                  <PostDate post={post} className="text-gray-600 text-xs" />
                )}
              </div>
            </div>
            <div>{post && <Views post={post} />}</div>
          </div>
          <TracingBeam>
            <article>
              <div className="post-image overflow-hidden my-5">
                <Image
                  src={
                    post?.image
                      ? post.image
                      : "https://images.unsplash.com/photo-1497864979123-ef3595423b92?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aW1hZ2UlMjBibHVyfGVufDB8fDB8fHww"
                  }
                  alt="Post Image"
                  width={800}
                  height={500}
                />
              </div>

              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-primary">
                  Sharing is Caring
                </h3>{" "}
                <div className="flex items-center">
                  <Link href="https://web.facebook.com/codesmartyt">
                    <FacebookIcon
                      fontSize="large"
                      className="hover:text-black"
                      color="primary"
                    />
                  </Link>
                  <p className="mx-2">
                    <TwitterIcon
                      fontSize="large"
                      color="primary"
                      className="hover:text-black"
                    />
                  </p>
                  <p>
                    <LinkedInIcon
                      fontSize="large"
                      color="primary"
                      className="hover:text-black transition duration-1000 ease-out"
                    />
                  </p>
                </div>
              </div>

              <main className="mt-5" id="postBody">
                <h2>{post?.title}</h2>

                {post && (
                  <div dangerouslySetInnerHTML={{ __html: post?.body }} />
                )}
              </main>
            </article>
          </TracingBeam>
        </div>
        <div className=" w-[100%] lg:w-[30%]">
          <div className="flex flex-col ads">
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

          <div className="latest-post mt-7">
            <p className="w-full text-xl font-bold bg-black text-white p-2">
              {" "}
              Recent Posts
            </p>
            <ul>
              {posts.slice(0, 6).map((post) => (
                <li key={post.id} className="my-3">
                  <Link
                    href={`/post/${post.id}`}
                    className="hover:text-warning post-title"
                  >
                    {post.title}
                  </Link>
                  <PostDate post={post} className="text-xs text-gray-600" />
                </li>
              ))}
            </ul>
          </div>

          <div className="latest-post mt-7">
            <p className="w-full text-xl font-bold bg-black text-white p-2">
              {" "}
              Trending Now
            </p>
            <ul>
              {topViewedPosts.slice(0, 4).map((post) => (
                <li key={post.id} className="my-3">
                  <Link
                    href={`/post/${post.id}`}
                    className="hover:text-warning post-title"
                  >
                    {post.title}
                  </Link>
                  <PostDate post={post} className="text-xs text-gray-600" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PageDetailsClient;
