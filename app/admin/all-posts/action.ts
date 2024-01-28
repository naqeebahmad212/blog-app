"use server";

import { prisma } from "@/lib/db/prisma";
import cloudinary from "@/utils/cloudinary";
import { revalidatePath } from "next/cache";

export const deleteProductHandler = async (id: string) => {
  const post = await prisma.post.findUnique({
    where: { id },
  });
  if (post) {
    await cloudinary.v2.uploader.destroy(post.public_id);
  }
  await prisma.post.delete({
    where: { id },
  });

  revalidatePath("/admin/all-posts");
};
