import { Post, Prisma } from "@prisma/client";

type PostDateProps = {
  post: Post;
  className?: string;
};
const PostDate = ({ post, className }: PostDateProps) => {
  return (
    <div className="w-full">
      {Math.floor(
        (Date.now() - Number(new Date(post.createdAt))) / 1000 / 60 / 60 / 24
      ) >= 7 && (
        <p className={`w-full ${className}`}>
          Posted On {new Date(post.createdAt).toDateString()}
        </p>
      )}

      {Math.floor(
        (Date.now() - Number(new Date(post.createdAt))) / 1000 / 60 / 60 / 24
      ) > 0 &&
        Math.floor(
          (Date.now() - Number(new Date(post.createdAt))) / 1000 / 60 / 60 / 24
        ) < 7 && (
          <p className={`w-full ${className}`}>
            {Math.floor(
              (Date.now() - Number(new Date(post.createdAt))) /
                1000 /
                60 /
                60 /
                24
            )}{" "}
            day(s) ago
          </p>
        )}
      {Math.floor(
        (Date.now() - Number(new Date(post.createdAt))) / 1000 / 60 / 60
      ) >= 1 &&
        Math.floor(
          (Date.now() - Number(new Date(post.createdAt))) / 1000 / 60 / 60
        ) < 24 && (
          <p className={`w-full ${className}`}>
            {Math.floor(
              (Date.now() - Number(new Date(post.createdAt))) / 1000 / 60 / 60
            )}{" "}
            hour(s) ago
          </p>
        )}
      {Math.floor(
        (Date.now() - Number(new Date(post.createdAt))) / 1000 / 60
      ) >= 1 &&
        Math.floor(
          (Date.now() - Number(new Date(post.createdAt))) / 1000 / 60
        ) <= 59 && (
          <p className={`w-full ${className}`}>
            {Math.floor(
              (Date.now() - Number(new Date(post.createdAt))) / 1000 / 60
            )}
            minute(s) ago
          </p>
        )}
    </div>
  );
};

export default PostDate;
