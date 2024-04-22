"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { PostWithAuthorAndCategoryProps } from "@/app/(blogPages)/page";
import PostCard, { PostsProps } from "./PostCard";
import { Post } from "@prisma/client";
import { Poor_Story } from "next/font/google";

interface SlickCarouselProps {
  settings: any;
  relatedPosts: PostsProps[];
}

const SlickCarousel = ({ settings, relatedPosts }: SlickCarouselProps) => {
  return (
    <Slider {...settings} className="  ">
      {relatedPosts.length > 2 &&
        relatedPosts.map((post) => (
          <PostCard className="mx-3" post={post} key={post.id} />
        ))}
    </Slider>
  );
};

export default SlickCarousel;
