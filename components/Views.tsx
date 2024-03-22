import { PostWithAuthorAndCategoryProps } from "@/app/(blogPages)/page";
import VisibilityIcon from "@mui/icons-material/Visibility";
const Views = ({ post }: PostWithAuthorAndCategoryProps) => {
  return (
    <div className="hidden  bg-slate-50 text-[10px] mr-2 text-gray-500 font-semibold sm:flex items-center px-1 lg:px-4 ">
      {" "}
      <VisibilityIcon fontSize="small" color="disabled" />
      {post && post.views && post.views < 1000 && (
        <p className="mx-1">{post?.views}</p>
      )}
      {post && post.views && post.views > 999 && post.views < 9999 && (
        <p className="mx-1">
          {post?.views.toString().slice(0, 1)}.
          {post?.views.toString().slice(1, 2)}K{" "}
        </p>
      )}
      {post && post.views && post.views > 9999 && post.views < 99999 && (
        <p className="mx-1">
          {post?.views.toString().slice(0, 2)}.
          {post?.views.toString().slice(2, 3)}K{" "}
        </p>
      )}
      Views
    </div>
  );
};

export default Views;
