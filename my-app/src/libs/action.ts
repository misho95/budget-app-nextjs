"use server";

import Post from "@/models/post.schema";
import connectMongoDB from "./mongodb";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn } from "../auth";
import { AuthError } from "next-auth";
import { getSession } from "next-auth/react";

type QueryType = {
  dateFrom: string;
  dateTo: string;
  category: string;
  type: string;
};

export const getPostsFromDB = async (currentPage: number, query: QueryType) => {
  noStore();
  try {
    await connectMongoDB();

    const posts = await Post.find({
      $and: [
        query.category ? { category: query.category } : {},
        query.type ? { type: query.type } : {},
        query.dateFrom ? { date: { $gte: new Date(query.dateFrom) } } : {},
        query.dateTo ? { date: { $lte: new Date(query.dateTo) } } : {},
      ],
    })
      .skip((currentPage - 1) * 8)
      .limit(8)
      .exec();

    return posts;
  } catch (err) {
    throw `error: ${err}`;
  }
};

export const getPostsTotalPage = async (query: QueryType) => {
  noStore();
  try {
    await connectMongoDB();

    const posts = await Post.find({
      $and: [
        query.category ? { category: query.category } : {},
        query.type ? { type: query.type } : {},
        query.dateFrom ? { date: { $gte: new Date(query.dateFrom) } } : {},
        query.dateTo ? { date: { $lte: new Date(query.dateTo) } } : {},
      ],
    })
      .countDocuments()
      .exec();
    return posts;
  } catch (err) {
    throw `error: ${err}`;
  }
};

export const createNewInvoiceInDB = async (formData: FormData) => {
  const rawFormData = {
    type: formData.get("type"),
    amount: formData.get("amount"),
    category: formData.get("category"),
    date: formData.get("date"),
  };

  const { type, amount, category, date } = rawFormData;

  try {
    await connectMongoDB();
    await Post.create({ type, amount, category, date });
  } catch (err) {
    return {
      message: "Database Error: Failed to Create Invoice.",
    };
  }

  revalidatePath("/");
  redirect("/");
};

export const delelteInvoiceFromDB = async (id: string) => {
  try {
    await connectMongoDB();
    await Post.findByIdAndDelete(id);
    revalidatePath("/");
    return { message: "Deleted Invoice" };
  } catch (err) {
    return { message: "Database Error: Failed to Delete Invoice" };
  }
};

export async function authenticate(_currentState: unknown, formData: FormData) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}
