"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { signOut } from "next-auth/react";
import PeopleIcon from "@mui/icons-material/People";
import DescriptionIcon from "@mui/icons-material/Description";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import { usePathname } from "next/navigation";

const SideTest = () => {
  const pathname = usePathname();
  return (
    <div className="">
      <div className="min-h-screen bg-gray-100 fixed z-50 ">
        <div className="sidebar min-h-screen sticky top-0 w-[3.35rem] overflow-hidden border-r hover:w-56 lg:w-56 hover:bg-white hover:shadow-lg">
          <div className="flex h-screen flex-col justify-between pt-2 pb-6">
            <div>
              <div className="">
                <h2 className="text-center text-sm lg:text-xl ">SEOMrush</h2>
              </div>
              <ul className="mt-6 space-y-2 tracking-wide">
                <li className="min-w-max">
                  <Link
                    href="/admin/dashboard"
                    aria-label="dashboard"
                    className="relative flex items-center space-x-4 bg-gradient-to-r from-sky-600 to-cyan-400 px-4 py-3 text-white"
                  >
                    <svg
                      className="-ml-1 h-6 w-6"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M6 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8ZM6 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-1Z"
                        className="fill-current text-cyan-400 dark:fill-slate-600"
                      ></path>
                      <path
                        d="M13 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2V8Z"
                        className="fill-current text-cyan-200 group-hover:text-cyan-300"
                      ></path>
                      <path
                        d="M13 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-1Z"
                        className="fill-current group-hover:text-sky-300"
                      ></path>
                    </svg>
                    <span className="-mr-1 font-medium">Dashboard</span>
                  </Link>
                </li>
                <li className="min-w-max">
                  <Link
                    href="/admin/all-categories"
                    className="bg group flex items-center space-x-4 rounded-full px-4 py-3 text-gray-600"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        className={`fill-current text-gray-300 group-hover:text-cyan-300 ${pathname === "/admin/all-categories" ? "text-cyan-300" : "text-gray-600"}`}
                        fill-rule="evenodd"
                        d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z"
                        clip-rule="evenodd"
                      />
                      <path
                        className={`fill-current group-hover:text-cyan-600 ${pathname === "/admin/all-categories" ? "text-cyan-600" : "text-gray-600"}`}
                        d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z"
                      />
                    </svg>
                    <span className={`group-hover:text-gray-700 `}>
                      Categories
                    </span>
                  </Link>
                </li>
                <li className="min-w-max">
                  <Link
                    href="/admin/all-posts"
                    className="group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        className={`fill-current text-gray-600 group-hover:text-cyan-600 ${pathname === "/admin/all-posts" ? "text-cyan-600" : "text-gray-600"}`}
                        fill-rule="evenodd"
                        d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"
                        clip-rule="evenodd"
                      />
                      <path
                        className={`fill-current text-gray-300 group-hover:text-cyan-300 ${pathname === "/admin/all-posts" ? "text-cyan-300" : "text-gray-300"}`}
                        d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"
                      />
                    </svg>
                    <span className="group-hover:text-gray-700">Posts</span>
                  </Link>
                </li>
                <li className="min-w-max">
                  <Link
                    href="/admin/all-users"
                    className="group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600"
                  >
                    <PeopleIcon
                      fontSize="small"
                      className={`fill-current text-gray-600 group-hover:text-cyan-300 ${pathname === "/admin/all-users" ? "text-cyan-300" : "text-gray-600"}`}
                    />
                    <span className="group-hover:text-gray-700">Users</span>
                  </Link>
                </li>
                <li className="min-w-max">
                  <Link
                    href="/admin/add-blog"
                    className="group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600"
                  >
                    <NoteAddIcon
                      className={`h-5 w-5 group-hover:text-cyan-300 ${pathname === "/admin/add-blog" ? "text-cyan-300" : "text-gray-600"}`}
                      fontSize="small"
                    />
                    <span className="group-hover:text-gray-700">Add Post</span>
                  </Link>
                </li>

                <li className="min-w-max">
                  <button
                    onClick={async () => await signOut({ callbackUrl: "/" })}
                    className="group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600"
                  >
                    <LogoutIcon
                      fontSize="small"
                      className={`h-5 w-5 group-hover:text-cyan-300 ${pathname === "/logout" ? "text-cyan-300" : "text-gray-600"}`}
                    />
                    <span className="group-hover:text-gray-700">Logout</span>
                  </button>
                </li>
              </ul>
            </div>
            <div className="w-max -mb-3">
              <a
                href="#"
                className="group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 group-hover:fill-cyan-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span className="group-hover:text-gray-700">Settings</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideTest;
