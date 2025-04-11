"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { signOut } from "next-auth/react";
import PeopleIcon from "@mui/icons-material/People";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { usePathname } from "next/navigation";

const SideTest = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full">
      {/* Hamburger Menu for Mobile */}
      <button
        onClick={toggleSidebar}
        className="absolute top-6  left-4 z-50 p-2  rounded-md lg:hidden"
      >
        {isOpen ? (
          <CloseIcon className="absolute top-[9px] left-0" />
        ) : (
          <MenuIcon className="text-white" />
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 w-[70%] md:w-[40%] z-40 h-full bg-gray-100 shadow-lg transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 lg:translate-x-0 lg:w-56`}
      >
        <div className="flex h-full flex-col justify-between pt-2 pb-6">
          <div>
            <div className="text-center py-4">
              <h2 className="text-sm lg:text-xl">SEOMrush</h2>
            </div>
            <ul className="mt-6 space-y-2 tracking-wide">
              <li className="min-w-max">
                <Link
                  href="/admin/dashboard"
                  aria-label="dashboard"
                  className="relative flex items-center rounded-r-lg space-x-4 bg-gradient-to-r from-sky-600 to-cyan-400 px-4 py-3 text-white"
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
                  href="/"
                  aria-label="home"
                  className="group flex items-center space-x-4 rounded-full px-4 py-3 text-gray-600 rounded-r-lg"
                >
                  <HomeIcon
                    fontSize="small"
                    className={`fill-current group-hover:text-cyan-300 ${
                      pathname === "/" ? "text-cyan-300" : "text-gray-600"
                    }`}
                  />
                  <span className="-mr-1 font-medium">Home</span>
                </Link>
              </li>
              <li className="min-w-max">
                <Link
                  href="/admin/all-categories"
                  className="bg group flex items-center space-x-4 rounded-full px-4 py-3 text-gray-600 rounded-r-lg"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      className={`fill-current group-hover:text-cyan-300 ${pathname === "/admin/all-categories" ? "text-cyan-300" : "text-gray-600"}`}
                      fillRule="evenodd"
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
                  className="group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600 rounded-r-lg"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      className={`fill-current group-hover:text-cyan-600 ${pathname === "/admin/all-posts" ? "text-cyan-600" : "text-gray-600"}`}
                      fillRule="evenodd"
                      d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"
                      clip-rule="evenodd"
                    />
                    <path
                      className={`fill-current group-hover:text-cyan-300 ${pathname === "/admin/all-posts" ? "text-cyan-300" : "text-gray-300"}`}
                      d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"
                    />
                  </svg>
                  <span className="group-hover:text-gray-700">Posts</span>
                </Link>
              </li>
              <li className="min-w-max">
                <Link
                  href="/admin/all-users"
                  className="group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600 rounded-r-lg"
                >
                  <PeopleIcon
                    fontSize="small"
                    className={`fill-current group-hover:text-cyan-300 ${pathname === "/admin/all-users" ? "text-cyan-300" : "text-gray-600"}`}
                  />
                  <span className="group-hover:text-gray-700">Users</span>
                </Link>
              </li>
              <li className="min-w-max">
                <Link
                  href="/admin/add-blog"
                  className="group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600 rounded-r-lg"
                >
                  <NoteAddIcon
                    className={`h-5 w-5 group-hover:text-cyan-300 ${pathname === "/admin/add-blog" ? "text-cyan-300" : "text-gray-600"}`}
                    fontSize="small"
                  />
                  <span className="group-hover:text-gray-700">Add Post</span>
                </Link>
              </li>

              {/* Add more menu items here */}
              <li className="min-w-max">
                <button
                  onClick={async () => await signOut({ callbackUrl: "/" })}
                  className="group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600"
                >
                  <LogoutIcon
                    fontSize="small"
                    className={`h-5 w-5 group-hover:text-cyan-300 ${
                      pathname === "/logout" ? "text-cyan-300" : "text-gray-600"
                    }`}
                  />
                  <span className="group-hover:text-gray-700">Logout</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 z-30 bg-black opacity-50 lg:hidden"
        ></div>
      )}
    </div>
  );
};

export default SideTest;
