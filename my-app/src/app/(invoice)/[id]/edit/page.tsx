import EditForm from "@/app/ui/invoices/edit-form";
import { getPostById } from "@/libs/action";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Edit",
};

const Edit = async ({ params }: { params: { id: string } }) => {
  const postId = params.id;
  const post = await getPostById(postId);

  if (!post) {
    notFound();
  }

  const { _id, amount, date, type, category } = post;

  return (
    <EditForm post={{ id: _id.toString(), amount, date, type, category }} />
  );
};

export default Edit;
