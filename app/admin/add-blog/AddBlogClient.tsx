"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { formHandler, getAllcategories } from "./action";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";
import PostSubmitBtn from "./PostSubmitBtn";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/db/prisma";
import { User } from "@prisma/client";
import { Metadata } from "next";
import { useFormStatus } from "react-dom";

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

// page metadata

const AddBlogClient = () => {
  const [isPending, startTransition] = useTransition();
  const { pending } = useFormStatus();

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
  const [title, setTitle] = useState("");
  const [snippet, setSnippet] = useState("");
  const [body, setBody] = useState("");
  const initArr: any = "";
  const [files, setFiles] = useState(initArr);
  const [imagePreview, setImagePreview] = useState(initArr);

  const addCategory = useRef<HTMLDialogElement>(null);
  let initArrCate: CategoriesProps[] = [];
  // Array<{ id: number, name: string }>
  const [categoriesDatabase, setCategoriesDatabase] = useState(initArrCate);
  const [cat, setCat] = useState("");

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
      <form action={formHandler}>
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
          <option value="dev">No Category</option>
          {categoriesDatabase.map((categoryName: any) => (
            <option value={categoryName.name} key={categoryName.name}>
              {categoryName.name}
            </option>
          ))}
        </select>

        <div className="rounded-md overflow-hidden border h-full">
          <ReactQuill
            className="h-[300px] rounded-md "
            value={body}
            onChange={(newValue) => setBody(newValue)}
            modules={modules}
          />
        </div>
        <input type="hidden" name="body" value={body} id="" />
        <PostSubmitBtn className="mt-2">Add Post</PostSubmitBtn>
      </form>
    </div>
  );
};

export default AddBlogClient;
