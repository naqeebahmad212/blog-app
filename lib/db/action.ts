"use server";

import { HomeProps } from "@/app/(blogPages)/page";
import { prisma } from "./prisma";
import { revalidatePath } from "next/cache";
import { boolean } from "zod";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";

interface DataProps {
  data: {
    name: string;
    email: string;
    password: string;
  };
}

export const getProducts = async (page = "1") => {
  const perPage = 8;
  const currentPage = parseInt(page);
  const totalPostCount = await prisma.post.count();
  const totalPages = Math.ceil(totalPostCount / perPage);
  return await prisma.post.findMany({
    orderBy: { id: "desc" },
    skip: (currentPage - 1) * perPage,
    take: perPage,
  });
};

export const registerUser = async (formData: DataProps) => {
  const salt = await bcrypt.genSalt();

  try {
    if (formData.data.password.length < 8) {
      return "Password should be atleast 8 character";
    }
    const hashedPassword = await bcrypt.hash(formData.data.password, salt);
    const user = await prisma.user.create({
      data: {
        name: formData.data.name,
        email: formData.data.email,
        password: hashedPassword,
      },
    });
    redirect(
      "/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2Fregister"
    );
  } catch (err: any) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (err.code === "P2002") {
        return "Email already exists";
      }
    }
  }
};

export const deleteUserHandler = async (id: string) => {
  await prisma.user.delete({
    where: { id },
  });

  revalidatePath("/admin/all-users");
};

export const userRoleHandler = async (data: FormData) => {
  const role = data.get("userRole")?.toString();
  const userId = data.get("userId")?.toString();
  if (!role || !userId) return;

  await prisma.user.update({
    where: { id: userId },
    data: {
      role: role,
    },
  });
  revalidatePath("/admin/all-users");
};

export const addNewCategory = async (formaData: FormData) => {
  const newCategory = formaData.get("newCategory")?.toString();

  if (newCategory) {
    const categoryExists = await prisma.category.findFirst({
      where: { name: { contains: newCategory, mode: "insensitive" } },
    });
    if (!categoryExists) {
      await prisma.category.create({
        data: { name: newCategory.toUpperCase() },
      });
    } else {
      return;
    }
  } else {
    return;
  }
  revalidatePath("/admin/all-categories");
};

export const deleteCategory = async (id: string | undefined) => {
  await prisma.category.delete({
    where: { id },
  });

  revalidatePath("/admin/all-categories");
};
