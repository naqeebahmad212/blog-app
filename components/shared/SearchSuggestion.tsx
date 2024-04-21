"use client";

import { getSearchPost } from "@/lib/db/action";
import { light } from "@mui/material/styles/createPalette";
import { Post } from "@prisma/client";
import Link from "next/link";
import { useState, useTransition } from "react";

const SearchSuggestion = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [pending, startTransition] = useTransition();
  const [posts, setPosts] = useState<Post[]>([]);
  const [ifNoPosts, setIfNoPosts] = useState(false);

  return (
    <div className="relative">
      <input
        type="search"
        className=" rounded-full p-1 border-0 px-3 border-none outline-none text-gray-600"
        name="searchTerms"
        placeholder="Search here..."
        id=""
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          startTransition(async () => {
            const posts = await getSearchPost(e.target.value);
            if (posts) {
              setPosts(posts);
            } else {
              setIfNoPosts(true);
            }
          });
        }}
      />

      <div className="searchSuggestion absolute top-[50px] left-0 w-[250px] overflow-hidden z-[999] text-black">
        <ul>
          {posts &&
            searchQuery != "" &&
            posts.map((post) => (
              <li key={post.id} className="py-2 border-b  text-sm bg-white p-3">
                <Link
                  onClick={() => setSearchQuery("")}
                  href={`/post/${post.id}`}
                  className="hover:link hover:text-blue-500"
                >
                  {`${post.title.slice(0, 33)}...`}
                </Link>
              </li>
            ))}

          {pending && (
            <li className="w-full flex justify-center bg-white p-3">
              <span className="loading loading-spinner mx-auto"></span>
            </li>
          )}

          {posts.length < 1 && searchQuery != "" && !pending && (
            <li className="w-full flex justify-center bg-white p-3">
              <span className="text-sm">No search matched.</span>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SearchSuggestion;
