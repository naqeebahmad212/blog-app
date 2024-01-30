import { Prisma } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Profile from '@/images/pngwing.com (6).png'

type PostWithAuthor=Prisma.PostGetPayload<{
    include:{author:true}
}>
interface PostsArry{
    posts:PostWithAuthor[]
}

const TopViewedPost = ({posts} : PostsArry) => {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th className="text-center">
                Writer
            </th>
            <th className="text-center">Post Title</th>
            <th className="text-center">Views</th>
            <th className="text-center">Posted On</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
       {posts.slice(0,5).map((post)=> (
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
                     src={post.author.image ? post.author.image : Profile }
                     alt="Author"
                   />
                 </div>
               </div>
               <div>
                 <div className="font-bold">{post.author.name}</div>
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
    </div>
  );
};

export default TopViewedPost;
