"use server";

import Post from "@/models/post.schema";
import connectMongoDB from "./mongodb";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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

    let filter: any = {};

    if (query.type !== "") {
      filter.type = query.type;
    }

    if (query.category !== "") {
      filter.category = query.category;
    }

    const posts = await Post.find(filter)
      .skip((currentPage - 1) * 8)
      .limit(8);
    return posts;
  } catch (err) {
    throw `error: ${err}`;
  }
};

export const getPostsTotalPage = async (query: QueryType) => {
  noStore();
  try {
    await connectMongoDB();

    let filter: any = {};

    if (query.type !== "") {
      filter.type = query.type;
    }

    if (query.category !== "") {
      filter.category = query.category;
    }

    const posts = await Post.find(filter).countDocuments();
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
