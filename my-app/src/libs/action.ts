"use server";

import Post from "@/models/post.schema";
import connectMongoDB from "./mongodb";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth, signIn } from "../auth";
import { AuthError } from "next-auth";
import User from "@/models/user.schema";
import { hashSync } from "bcrypt";

type QueryType = {
  dateFrom: string;
  dateTo: string;
  category: string;
  type: string;
};

export const getPostsFromDB = async (
  currentPage: number,
  query: QueryType,
  userId: string | undefined
) => {
  noStore();
  try {
    if (!userId) {
      return [];
    }

    await connectMongoDB();

    const posts = await Post.find({
      userId: userId,
      $and: [
        query.category ? { category: query.category } : {},
        query.type ? { type: query.type } : {},
        query.dateFrom ? { date: { $gte: new Date(query.dateFrom) } } : {},
        query.dateTo ? { date: { $lte: new Date(query.dateTo) } } : {},
      ],
    })
      .skip((currentPage - 1) * 16)
      .limit(16)
      .exec();

    return posts;
  } catch (err) {
    throw `error: ${err}`;
  }
};

export const getPostsTotalPage = async (
  query: QueryType,
  userId: string | undefined
) => {
  noStore();
  try {
    if (!userId) {
      return 0;
    }

    await connectMongoDB();

    const posts = await Post.find({
      userId: userId,
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

export const createNewInvoiceInDB = async (
  id: string,
  _currentState: unknown,
  formData: FormData
) => {
  const rawFormData = {
    type: formData.get("type"),
    amount: formData.get("amount"),
    category: formData.get("category"),
    date: formData.get("date"),
  };

  const { type, amount, category, date } = rawFormData;

  try {
    await connectMongoDB();
    await Post.create({ type, amount, category, date, userId: id });
  } catch (err) {
    return {
      message: "Database Error: Failed to Create Invoice.",
    };
  }

  revalidatePath("/");
  redirect("/");
};

export const getPostById = async (id: string) => {
  try {
    await connectMongoDB();
    const post = await Post.findById(id);
    return post;
  } catch (err) {
    return null;
  }
};

export const editPostById = async (
  id: string,
  _currentState: unknown,
  formData: FormData
) => {
  try {
    const rawFormData = {
      type: formData.get("type"),
      amount: formData.get("amount"),
      category: formData.get("category"),
      date: formData.get("date"),
    };

    const { type, amount, category, date } = rawFormData;

    await Post.findOneAndUpdate({
      _id: id,
      $set: {
        type,
        amount,
        category,
        date,
      },
    });
  } catch (err) {
    return { message: "no access" };
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

export const getInvoiceStats = async (id: string) => {
  try {
    const posts = await Post.find({ userId: id });

    const expense = posts.filter((f) => f.type === "expense");
    const income = posts.filter((f) => f.type === "income");
    const expenseTotalAmount = posts.reduce((total, f) => {
      if (f.type === "expense") {
        return total + f.amount;
      }
      return total;
    }, 0);
    const incomeTotalAmount = posts.reduce((total, f) => {
      if (f.type === "income") {
        return total + f.amount;
      }
      return total;
    }, 0);

    const totalCategory = posts.reduce(
      (total, f) => {
        if (f.category === "shopping") {
          return { ...total, shopping: total.shopping + 1 };
        } else if (f.category === "gym") {
          return { ...total, gym: total.gym + 1 };
        } else if (f.category === "invoice") {
          return { ...total, invoice: total.invoice + 1 };
        } else if (f.category === "other") {
          return { ...total, other: total.other + 1 };
        }
        return total;
      },
      {
        shopping: 0,
        gym: 0,
        invoice: 0,
        other: 0,
      }
    );

    return {
      expense: { total: expense.length, amount: expenseTotalAmount },
      income: { total: income.length, amount: incomeTotalAmount },
      diff: incomeTotalAmount - expenseTotalAmount,
      category: totalCategory,
    };
  } catch (err) {
    return { message: "no invoices found" };
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

export const registrateUser = async (
  _currentState: unknown,
  formData: FormData
) => {
  let success = false;

  try {
    const rawFormData = {
      email: formData.get("email"),
      password: formData.get("password"),
      rePassword: formData.get("re-password"),
    };

    await connectMongoDB();

    const { email, password, rePassword } = rawFormData;

    const isEmailExist = await User.findOne({ email });

    if (isEmailExist) {
      throw { message: "email shoud be unique" };
    }

    if (password?.toString() !== rePassword?.toString()) {
      throw { message: "passwords do not match" };
    }
    if (password) {
      const hashedPass = hashSync(password.toString(), 10);
      await User.create({ email: email, password: hashedPass });
      success = true;
    }
  } catch (error: any) {
    console.log(error);
    switch (error.message) {
      case "email shoud be unique":
        return "Email must be unique";
      case "passwords do not match":
        return "Passwords do not match";
      default:
        return "Something went wrong.";
    }
  }

  if (success) {
    await authenticate(undefined, formData);
  }
};

export const getUserProfile = async (id: string | undefined) => {
  try {
    if (!id) {
      return { message: "no access" };
    }

    return User.findById(id);
  } catch (err) {
    return { message: "no access!" };
  }
};

export const updateUserProfile = async (
  id: string,
  _currentState: unknown,
  formData: FormData
) => {
  try {
    const rawFormData = {
      username: formData.get("username"),
      firstname: formData.get("firstname"),
      lastname: formData.get("lastname"),
    };

    const { username, firstname, lastname } = rawFormData;

    await connectMongoDB();

    await User.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          username,
          firstname,
          lastname,
        },
      }
    );
  } catch (err) {
    return { message: "no access" };
  }

  revalidatePath("/profile");
};
