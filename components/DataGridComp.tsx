"use client";
import Link from "next/link";
import React, { useTransition } from "react";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import { deleteProductHandler } from "@/app/admin/all-posts/action";
import { Prisma } from "@prisma/client";
import Image from "next/image";
import { Session } from "next-auth";

type PostWithAuthorAndCategoy = Prisma.PostGetPayload<{
  include: { author: true; categories: true };
}>;

interface UserPostProps {
  posts: PostWithAuthorAndCategoy[];
  session: Session | null;
}

const DataGridComp = ({ posts, session }: UserPostProps) => {
  const [pending, startTransition] = useTransition();
  const columns = [
    { field: "id", headerName: "Post Id", minWidth: 100, flex: 0.5 },

    {
      field: "image",
      headerName: "Post Image",
      minWidth: 100,
      flex: 0.5,
      renderCell: (params: any) => {
        return (
          <div className="w-[45px] h-[40px] rounded-lg overflow-hidden">
            <Image
              alt="d"
              src={params.row.image}
              width={100}
              height={100}
              className="hover:text-success h-[100%]"
            />
          </div>
        );
      },
    },

    {
      field: "title",
      headerName: "Title",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "by",
      headerName: "By",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "category",
      headerName: "Category",
      type: "text",
      minWidth: 100,
      flex: 0.3,
    },

    {
      field: "date",
      headerName: "Date",
      type: "number",
      minWidth: 170,
      // flex: 0.5,
    },

    {
      field: "views",
      headerName: "views",
      type: "number",
      minWidth: 20,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params: any) => {
        return (
          <>
            {session?.user.id == params.row.authorId && (
              <Link
                href={`/admin/post/edit/${params.row.id}`}
                className="hover:text-success"
              >
                <NoteAltIcon />
              </Link>
            )}

            {session?.user.id == params.row.authorId && (
              <button
                className="ml-4 hover:text-warning"
                disabled={pending}
                onClick={() =>
                  startTransition(async () => {
                    deleteProductHandler(params.row.id);
                  })
                }
              >
                <DeleteIcon />
              </button>
            )}
          </>
        );
      },
    },
  ];

  const rows: any[] = [];
  // adminProducts &&
  if (posts) {
    posts.forEach((item: PostWithAuthorAndCategoy) => {
      rows.push({
        id: item.id,
        image: item.image,
        title: item.title,
        date: new Date(item.createdAt).toDateString(),
        category: item.categories.name,
        by: item.author.name,
        views: item.views,
        authorId: item.authorId,
      });
    });
  }

  return (
    <div className="relative">
      {/* <div className="absolute top-[40%] left-[0%] bg-transparent h-[100vh] w-full">
        {pending && (
          <span className="loading loading-spinner loading-lg"></span>
        )}
      </div> */}
      <h1 className="text-center my-3">All Blogs</h1>
      <DataGrid
        rows={rows}
        columns={columns}
        // pageSize={10}
        // disableSelectionOnClick
        className="productListTable"
        autoHeight
      />
    </div>
  );
};

export default DataGridComp;
