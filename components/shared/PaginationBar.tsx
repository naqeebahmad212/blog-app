"use client";
import { Pagination } from "@mui/material";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";

interface PaginationBarProps {
  currentPage: number;
  totalPages: number;
}

const PaginationBar = ({ currentPage, totalPages }: PaginationBarProps) => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  return (

      <div className="w-full">
        <Pagination
        className="w-[200px] m-auto"
          count={totalPages}
          page={page}
          onChange={(e, p) => {
            setPage(p);
            router.push("?page=" + p);
          }}
        />
      </div>  
  );
};

export default PaginationBar;
