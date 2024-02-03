import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import HomeIcon from '@mui/icons-material/Home';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import PeopleIcon from '@mui/icons-material/People';
import DescriptionIcon from '@mui/icons-material/Description';
import CategoryIcon from '@mui/icons-material/Category';
import { signOut } from "next-auth/react";
import LogoutBtn from "./LogoutBtn";
import LogoutIcon from '@mui/icons-material/Logout';
const DashbaordSideBar = () => {
  return (
    <div className="">
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-2"
            className="drawer-button btn btn-ghost fixed m-0 p-0 left-3 top-5 lg:hidden"
          >
            <MenuIcon />
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay bg-black h-[100vh]"
          ></label>
          <ul className="menu w-[200px] lg:w-[20%] z-[9999999] overflow-hidden bg-black text-white p-4 min-h-[100vh]">
            {/* Sidebar content here */}
            <h3 className="text-white mt-2 text-center p-3 bg-primary text-xl mb-5">
              Admin Panel
            </h3>
            <div className="hover:bg-primary border-b border-gray-200 transition-all duration-500 ease-out  p-3 hover:cursor-pointer flex items-center gap-2 ">
              <HomeIcon fontSize="small"/>
              <Link href={"/"}>Home</Link>
            </div>


            <div className="hover:bg-primary border-b border-gray-200 transition-all duration-500 ease-out p-3 hover:cursor-pointer flex items-center gap-2 ">
              <DescriptionIcon fontSize="small"/>
              <Link href={"/admin/all-posts"}>All Posts</Link>
            </div>


            <div className="hover:bg-primary border-b border-gray-200 transition-all duration-500 ease-out p-3 hover:cursor-pointer flex items-center gap-2">
              <NoteAddIcon fontSize="small"/>
              <Link href={"/admin/add-blog"}>Add Post</Link>
            </div>

            <div className="hover:bg-primary border-b border-gray-200  transition-all duration-500 ease-out p-3 hover:cursor-pointer flex items-center gap-2">
              <PeopleIcon fontSize="small"/>
              <Link href={"/admin/all-users"}>All Users</Link>
            </div>

            <div className="hover:bg-primary border-b border-gray-200 transition-all duration-500 ease-out p-3 hover:cursor-pointer flex items-center gap-2">
              <CategoryIcon fontSize="small"/>
              <Link href={"/admin/all-categories"}>Categories</Link>
            </div>

            <div className="hover:bg-primary border-b border-gray-200 transition-all duration-500 ease-out p-3 hover:cursor-pointer flex items-center gap-2">
              <LogoutIcon fontSize="small"/>
              <LogoutBtn>Logout</LogoutBtn>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashbaordSideBar;
