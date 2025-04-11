import { addNewCategory, deleteCategory } from "@/lib/db/action";
import { prisma } from "@/lib/db/prisma";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import React from "react";
import PostSubmitBtn from "../add-blog/PostSubmitBtn";
import DeleteBtn from "./DeleteBtn";

type CatgoriesWithPostsProps = Prisma.CategoryGetPayload<{
  include: { Post: true };
}>;

interface CategoriesPageProps {
  categories: CategoriesPageProps[];
}

const CategoriesPage = async () => {
  const categories = await prisma.category.findMany({
    include: { Post: true },
  });
  return (
    <main>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Posts</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          {categories.map((category) => (
            <tbody key={category.id}>
              {/* row 1 */}
              <tr>
                <td>{category.id}</td>
                <td>{category.name}</td>
                <td>{category.Post.length}</td>
                <td>
                  <div className="flex items-center justify-between gap-2">
                    <Link
                      className="link text-blue-700"
                      href={`/category/${category.name.toLowerCase()}`}
                    >
                      Visit
                    </Link>

                    <DeleteBtn
                      btnStatus={category.Post.length > 0 ? true : false}
                      id={category.id}
                      className="btn btn-warning"
                    >
                      Delete
                    </DeleteBtn>
                  </div>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>

      <div className="createCategory w-full">
        <form action={addNewCategory} className=" m-10">
          <input
            name="newCategory"
            type="text"
            placeholder="Add New Category"
            className="input input-bordered w-full"
          />
          <PostSubmitBtn className="text-white mt-3">Submit</PostSubmitBtn>
          {/* <button type="submit" className="btn btn-primary text-white mt-2">Submit</button> */}
        </form>
      </div>
    </main>
  );
};

export default CategoriesPage;
