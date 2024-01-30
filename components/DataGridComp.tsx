"use client";
import Link from "next/link";
import React, {  useTransition } from "react";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import { deleteProductHandler } from "@/app/admin/all-posts/action";

const DataGridComp = ({ userPosts }: any) => {
  const [pending, startTransition] = useTransition();
  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },

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
      headerName: "Categpry",
      type: "text",
      minWidth: 80,
      flex: 0.3,
    },

    {
      field: "date",
      headerName: "Date",
      type: "number",
      minWidth: 170,
      flex: 0.5,
    },

    {
      field: "views",
      headerName: "views",
      type: "number",
      minWidth: 50,
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
            <Link
              href={`/admin/post/edit/${params.row.id}`}
              className="hover:text-success"
            >
              <NoteAltIcon />
            </Link>

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
          </>
        );
      },
    },
  ];

  const rows: any[] = [];
  // adminProducts &&
  if (userPosts) {
    userPosts.forEach((item: any) => {
      rows.push({
        id: item.id,
        title: item.title,
        date: item.createdAt,
        category: item.categories.name,
        by: item.author.name,
        views: item.views,
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
