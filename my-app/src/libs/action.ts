"use server";

import Post from "@/models/post.schema";
import connectMongoDB from "./mongodb";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const getPostsFromDB = async () => {
  noStore();
  try {
    await connectMongoDB();
    const posts = await Post.find();
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
