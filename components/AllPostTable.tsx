"use client";
import Link from "next/link";
import React, {  useTransition } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import Image from 'next/image'
import { Prisma } from "@prisma/client";

type PostWithAuthor=Prisma.PostGetPayload<{include:{author:true , categories:true}}>

interface UserPostProps{
    posts:PostWithAuthor[]
}




const AllPostTable = ({posts}:UserPostProps) => {
    const [pending, startTransition] = useTransition();

  return (
<div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th className="text-center">
                Image / Category
            </th>
            <th className="text-center">Post Title</th>
            <th className="text-center">Views</th>
            <th className="text-center">Posted On</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
       {posts.map((post)=> (
         <tbody key={post.id}>
         {/* row 1 */}
         <tr>
           <td>
             <div className="flex items-center gap-3">
               <div className="avatar">
                 <div className="mask mask-squircle w-12 h-12">
                   <Image
                   width={100}
                   height={100}
                     src={post.image }
                     alt="Post Image"
                   />
                 </div>
               </div>
               <div>
                 <div className="font-bold">{post.categories.name}</div>
                 {/* <div className="text-sm opacity-50">United States</div> */}
               </div>
             </div>
           </td>
           <td>
             <p className="post-title">{post.title}</p>
             
           </td>
           <td>{post.views}</td>
           <th>
             {new Date(post.createdAt).toDateString()}
           </th>
           <td><Link className="link text-blue-700" href={`/post/${post.id}`}>Visit</Link></td>
         </tr>
       </tbody>
       ))}
      </table>
    </div>  )
}

export default AllPostTable