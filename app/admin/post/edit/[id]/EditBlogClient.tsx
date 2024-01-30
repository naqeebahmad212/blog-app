"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { getAllcategories } from "@/app/admin/add-blog/action";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Image from "next/image";

import PostSubmitBtn from "@/app/admin/add-blog/PostSubmitBtn";
import { updateHandler } from "./action";
import { Prisma } from "@prisma/client";

interface CategoriesProps {
  id: string;
  name: string;
}

interface UserProps {
  id: string;
  email: string;
  name: string | null;
  role: string;
  emailVerified: Date | null;
  image: string | null;
}

export type PostProps = Prisma.PostGetPayload<{
  include: { categories: true };
}>;

const EditBlogClient = ({ post }: any) => {
  const [pending, startTransition] = useTransition();

  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };
  const [title, setTitle] = useState(post.title);
  const [snippet, setSnippet] = useState(post.snippet);
  const [body, setBody] = useState(post.body);
  const initArr: any = "";
  const [files, setFiles] = useState(initArr);
  const [imagePreview, setImagePreview] = useState(post.image);

  const addCategory = useRef<HTMLDialogElement>(null);
  let initArrCate: CategoriesProps[] = [];
  // Array<{ id: number, name: string }>
  const [categoriesDatabase, setCategoriesDatabase] = useState(initArrCate);

  useEffect(() => {
    startTransition(async () => {
      const categories = await getAllcategories();
      setCategoriesDatabase(categories);
    });
  }, []);

  const imagesHandler = (e: any) => {
    if (e.target.files.length > 0) {
      setFiles("");
      setImagePreview("");

      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          if (reader.result) {
            setImagePreview(reader.result);
            setFiles(reader.result);
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div>
      <div>
        {imagePreview && (
          <Image
            key={imagePreview}
            src={imagePreview}
            alt="pic"
            width={100}
            height={200}
          />
        )}
      </div>
      <form action={updateHandler}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          name="title"
          placeholder="Title"
          className="input input-bordered w-full my-4"
        />

        <input type="hidden" name="imgs" value={files} id="" />
        <input
          value={snippet}
          onChange={(e) => setSnippet(e.target.value)}
          type="text"
          name="snippet"
          placeholder="Snippet"
          className="input input-bordered w-full my-4"
        />

        <input type="hidden" value={post.id} name="postId" id="" />

        <input
          name="images"
          onChange={imagesHandler}
          type="file"
          accept="images/*"
          className=" file-input file-input-ghost input-bordered w-full my-4"
        />

        <select
          name="category"
          id=""
          className="select select-bordered w-full mb-4"
        >
          {post && post.categories.name && (
            <option value={post.categories.name}>{post.categories.name}</option>
          )}
          <option value="dev">No Category</option>
          {categoriesDatabase.map((categoryName: any) => (
            <option value={categoryName.name} key={categoryName.name}>
              {categoryName.name}
            </option>
          ))}
        </select>

        <ReactQuill
          className="h-[30vh] mb-20"
          value={body}
          onChange={(newValue) => setBody(newValue)}
          modules={modules}
        />
        <input type="hidden" name="body" value={body} id="" />
        <PostSubmitBtn>Update Post</PostSubmitBtn>
      </form>
    </div>
  );
};

export default EditBlogClient;
