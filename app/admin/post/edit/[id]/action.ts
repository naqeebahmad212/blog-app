"use server";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import cloudinary from "@/utils/cloudinary";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const updateHandler = async (formaData: FormData) => {
  const title = formaData.get("title")?.toString();
  const snippet = formaData.get("snippet")?.toString();
  const body = formaData.get("body")?.toString();
  const file: any = formaData.get("imgs")?.toString();
  const category: string | undefined = formaData.get("category")?.toString();
  const postId = formaData.get("postId")?.toString();

  const session = await getServerSession(authOptions);

  const post = await prisma.post.findUnique({
    where: { id: postId },
  });

  const postCategory=await prisma.category.findFirst({
    where:{name:{contains:category}}
  })

  if (!title || !snippet || !body || !category) {
    throw Error("Fields required");
  }

  if (session) {

    if (file) {
      if (post) {
        await cloudinary.v2.uploader.destroy(post.public_id);
      }
      const result = await cloudinary.v2.uploader.upload(file, {
        folder: "blog",
      });

      await prisma.post.update({
        where: { id: postId },
        include: { categories: true },
        data: {
          title,
          body,
          snippet,
          image: result.secure_url,
          public_id: result.public_id,
          categoryId:postCategory?.id
        },
      });
    } else {
      await prisma.post.update({
        where: { id: postId },
        include: { categories: true },
        data: {
          title,
          body,
          snippet,
          categoryId:postCategory?.id
        },
      });
    }
}

redirect("/");
  // }
};
