import { prisma } from "@/lib/db/prisma";
import Image from "next/image";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import Link from "next/link";
import Views from "./Views";

const HomeTopSix = async () => {
  "use server";
  const oldPosts = await prisma.post.findMany({
    include: { categories: true, author: true },
    orderBy: { id: "asc" },
  });

  const topViewedPosts= await prisma.post.findMany({
    include: { categories: true, author: true },
    orderBy: { views: "desc" },
  });
  return (
    <>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6 border-b-2 pb-3">
        {oldPosts.slice(0, 6).map((post) => (
          // <div key={post.id} className="bg-slate-500">
          <Link href={`/post/${post.id}`} key={post.id}>
            <div className="flex flex-col items-center">
              <div
                className="h-[100px] hover:scale-105 transition duration-1000 ease-out bg-cover bg-top object-cover w-[100%] overflow-hidden"
                style={{ backgroundImage: `url(${post.image})` }}
              >
                <div className="overlay w-[100%] transition duration-1000 ease-out h-[100%] hover:bg-black  hover:bg-opacity-30"></div>
              </div>
              <p className="post-snippet text-start font text-sm">
                {post.snippet}
              </p>
            </div>
          </Link>
          // </div>
        ))}
      </div>

      <div className="flex mt-10 flex-col lg:flex-row">
        <div className="w-[100%] lg:w-[70%] relative mr-2">
          <button className="btn btn-success rounded-sm absolute -top-4 left-4 z-[999] ">
            TOP STORIES
          </button>

          <div
            className="h-[400px] m-2 hover:scale-95 transition duration-1000 ease-out bg-cover object-cover bg-top w-[100%] overflow-hidden relative"
            style={{ backgroundImage: `url('${topViewedPosts[0].image}')` }}
          >
            <Link
              href={"/post/" + topViewedPosts[0].id}
              className="overlay flex items-end p-6 w-[100%] transition duration-1000 ease-out h-[100%] hover:bg-black  hover:bg-opacity-30"
            >
              <div className="content">
                <div className="flex items-center">
                  <Views post={topViewedPosts[0]} />
                  <p className="text-sm font-semibold bg-slate-50 px-4">
                    {topViewedPosts[0].categories.name}
                  </p>
                </div>

                <h1 className="text-white text-2xl post-title">
                  {topViewedPosts[0].title}
                </h1>
              </div>
            </Link>
          </div>
        </div>
        <div className="w-[100%] lg:w-[28%] overflow-hidden flex lg:block">
          <div className="w-[50%] lg:w-[100%]">
            <div
              className="h-[195px] hover:scale-95 transition duration-1000 ease-out m-2 bg-top bg-cover object-cover w-[100%] overflow-hidden "
              style={{ backgroundImage: `url('${topViewedPosts[1].image}')` }}
            >
              <Link
                href={"/post/" + topViewedPosts[1].id}
                className="overlay flex items-end transition duration-1000 ease-out w-[100%] h-[100%] hover:bg-black hover:bg-opacity-30"
              >
                <div className="content">
                  <div className="flex items-center">
                  <Views post={topViewedPosts[1]} />

                    <p className="text-sm font-semibold bg-slate-50 lg:px-4">
                      {topViewedPosts[1].categories.name}
                    </p>
                  </div>

                  <h1 className="text-white  text-xs px-2 lg:text-xl post-title">
                    {topViewedPosts[1].title}
                  </h1>
                </div>
              </Link>
            </div>
          </div>
          <div className="w-[50%] lg:w-[100%]">
            <div
              className="h-[195px] hover:scale-95 transition duration-1000 ease-out bg-top m-2 bg-cover object-cover w-[100%] overflow-hidden"
              style={{ backgroundImage: `url('${topViewedPosts[2].image}')` }}
            >
              <Link
                href={"/post/" + topViewedPosts[2].id}
                className="overlay flex items-end transition duration-1000 ease-out w-[100%] h-[100%] hover:bg-black hover:bg-opacity-30"
              >
                <div className="content">
                  <div className="flex items-center">
                  <Views post={topViewedPosts[2]} />

                    <p className="text-sm font-semibold bg-slate-50 lg:px-4">
                      {topViewedPosts[2].categories.name}
                    </p>
                  </div>

                  <h1 className="text-white text-xs lg:text-xl lg:px-2 post-title">
                    {topViewedPosts[2].title}
                  </h1>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeTopSix;
