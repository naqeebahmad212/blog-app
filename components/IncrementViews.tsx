"use client";

import { useEffect } from "react";

interface IncrementViewsProps {
  postId: string;
}

const IncrementViews = ({ postId }: IncrementViewsProps) => {
  useEffect(() => {
    const incrementViews = async () => {
      try {
        await fetch("/api/incrementViews", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: postId }),
        });
      } catch (error) {
        console.error("Failed to increment views:", error);
      }
    };

    incrementViews();
  }, [postId]);

  return null; // This component doesn't render anything
};

export default IncrementViews;
