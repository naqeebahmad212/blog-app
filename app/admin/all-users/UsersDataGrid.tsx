"use client";
import Link from "next/link";
import React, {useState, useTransition } from "react";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import { deleteProductHandler } from "@/app/admin/all-posts/action";
import { deleteUserHandler, userRoleHandler } from "@/lib/db/action";

const UserDataGrid = ({ users }: any) => {
  const [pending, startTransition] = useTransition();
  const [userId, setUserId] = useState("");
  const columns = [
    { field: "id", headerName: "User ID", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      type: "text",
      minWidth: 80,
      flex: 0.3,
    },

    {
      field: "createdAt",
      headerName: "Joined On",
      type: "number",
      minWidth: 170,
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
            {/* <button
              className="ml-4 hover:text-warning"
              disabled={pending}
              onClick={() =>
                startTransition(async () => {
                  deleteUserHandler(params.row.id);
                })
              }
            >
              <NoteAltIcon />
            </button> */}

            <button
              onClick={() => {
                setUserId(params.row.id);
              }}
            >
              <label
                htmlFor="my_modal_6"
                className="items-center text-center cursor-pointer hover:text-warning"
              >
                <NoteAltIcon />
              </label>
            </button>
            <button
              className="ml-4 hover:text-warning"
              disabled={pending}
              onClick={() =>
                startTransition(async () => {
                  deleteUserHandler(params.row.id);
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
  if (users) {
    users.forEach((item: any) => {
      rows.push({
        id: item.id,
        name: item.name,
        email: item.email,
        role: item.role,
        createAt: item.createdAt,
      });
    });
  }

  return (
    <div className="relative">
      <div className="absolute top-[40%] left-[0%] h-[100vh] w-full">
        {pending && (
          <span className="loading loading-spinner loading-lg"></span>
        )}
      </div>
      <h1 className="text-center my-3">All Products</h1>
      <DataGrid
        rows={rows}
        columns={columns}
        // pageSize={10}
        // disableSelectionOnClick
        className="productListTable"
        autoHeight
      />

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Change User Role</h3>
          <form action={userRoleHandler}>
            <select
              name="userRole"
              className="input input-bordered w-full"
              id=""
            >
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
            <input type="hidden" value={userId} name="userId" />
            <div className="modal-action">
              <button type="submit">
                <label htmlFor="my_modal_6" className="mb-0 btn btn-primary">
                  Update
                </label>
              </button>
              <label htmlFor="my_modal_6" className="btn">
                Close
              </label>
            </div>
          </form>
          <div className="modal-action"></div>
        </div>
      </div>
    </div>
  );
};

export default UserDataGrid;
