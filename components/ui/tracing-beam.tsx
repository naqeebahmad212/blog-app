"use client";
import React, { useEffect, useRef, useState } from "react";

import {
  motion,
  useTransform,
  useScroll,
  useVelocity,
  useSpring,
} from "framer-motion";
import { cn } from "@/utils/cn";
import { duration } from "@mui/material";

export const TracingBeam = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: contentRef,
    offset: ["start start", "end end"],
  });

  console.log(scrollYProgress);
  return (
    <>
      <div className="fixed top-[20%] left-2 md:left-5 w-1 h-[50dvh] bg-gray-300 rounded-2xl">
        {scrollYProgress.get() == 0 && (
          <span className="absolute -left-[2px] -top-[4px] h-1 w-1 bg-blue-400 p-1 rounded-full"></span>
        )}
      </div>
      <motion.div
        className="fixed top-[20%] left-2 md:left-5 w-1 h-[50dvh] progressBar rounded-3xl "
        style={{
          scaleY: scrollYProgress,
          transformOrigin: "top",
        }}
        transition={{ duration: 0.5, type: "spring" }}
      ></motion.div>
      <div className="" ref={contentRef}>
        {children}
      </div>
      ;
    </>
  );
};
