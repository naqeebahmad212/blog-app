import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { Post, Prisma } from "@prisma/client";


type Posts=Prisma.PostGetPayload<{
  include:{categories:true , author:true}
} | null>

const Views = ({post}:any) => {
  return (
    <div
    className="bg-slate-50 text-[10px] mr-2 text-gray-500 font-semibold flex items-center px-4 "
  >
    {" "}
    <p>
      {" "}
      <RemoveRedEyeOutlinedIcon
        fontSize="small"
        color="disabled"
      />
    </p>{" "}
    {post && post.views && post.views < 1000 && (
      <p className="mx-1">{post?.views}</p>
    )}
    {post &&
      post.views &&
      post.views > 999 &&
      post.views < 9999 && (
        <p className="mx-1">
          {post?.views.toString().slice(0, 1)}.
          {post?.views.toString().slice(1, 2)}K{" "}
        </p>
      )}
    {post &&
      post.views &&
      post.views > 9999 &&
      post.views < 99999 && (
        <p className="mx-1">
          {post?.views.toString().slice(0, 2)}.
          {post?.views.toString().slice(2, 3)}K{" "}
        </p>
      )}
    Views
  </div>  )
}

export default Views