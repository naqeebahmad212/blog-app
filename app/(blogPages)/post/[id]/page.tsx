import PostDate from "@/components/PostDate";
import { prisma } from "@/lib/db/prisma";
import Image from "next/image";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import { Metadata } from "next";
import Views from "@/components/Views";
import PageDetailsClient from "@/components/PageDetailsClient";
import { Suspense } from "react";
import SlickCarousel from "@/components/SlickCarousel";
import PostCard from "@/components/PostCard";
import IncrementViews from "@/components/IncrementViews";
import { ObjectId } from "bson";
interface PostdetailsPageProps {
  params: {
    id: string;
  };
}

export const generateMetadata = async ({
  params: { id },
}: PostdetailsPageProps): Promise<Metadata> => {
  const isValidObjectId = ObjectId.isValid(id);

  const post = await prisma.post.findFirst({
    where: {
      OR: [
        { slug: id }, // Match by slug
        ...(isValidObjectId ? [{ id: id }] : []), // Match by ObjectId if valid
      ],
    },
    include: { categories: true, author: true },
  });
  if (post) {
    return {
      title: post.title,
      description: post.title,
      openGraph: { images: [{ url: post.image }] },
    };
  } else {
    return {
      title: "Post Page",
      description: "Post details page",
    };
  }
};

const PostdetailsPage = async ({ params: { id } }: PostdetailsPageProps) => {
  // page views
  // Check if the `id` is a valid ObjectId
  const isValidObjectId = ObjectId.isValid(id);

  const post = await prisma.post.findFirst({
    where: {
      OR: [
        { slug: id }, // Match by slug
        ...(isValidObjectId ? [{ id: id }] : []), // Match by ObjectId if valid
      ],
    },
    include: { categories: true, author: true },
  });
  // console.log(post);
  const posts = await prisma.post.findMany({
    orderBy: { id: "desc" },
  });

  const topViewedPosts = await prisma.post.findMany({
    orderBy: { views: "desc" },
  });

  const relatedPosts = await prisma.post.findMany({
    where: {
      AND: [{ categoryId: post?.categoryId }, { id: { not: post?.id } }],
    },
    include: { author: true, categories: true },
  });

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 2000, // Autoplay speed in milliseconds
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto">
      <IncrementViews postId={id} />
      {post && (
        <PageDetailsClient
          post={post}
          posts={posts}
          topViewedPosts={topViewedPosts}
        />
      )}

      {relatedPosts.length > 2 && (
        <div className="my-7  max-w-[90%] md:max-w-[100%] mx-auto ">
          <h2 className="p-2 mb-3 bg-black text-white text-lg md:text-2xl font-bold max-w-[100%] md:max-w-[65%]">
            More related posts
          </h2>
          <SlickCarousel settings={settings} relatedPosts={relatedPosts} />
        </div>
      )}
    </div>
  );
};

export default PostdetailsPage;
