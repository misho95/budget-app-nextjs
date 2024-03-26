import CreateForm from "@/app/ui/invoices/create-from";
import { auth } from "@/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create",
};

const Create = async () => {
  const user = await auth();

  if (!user || !user.user?.id) {
    return null;
  }

  return (
    <>
      <CreateForm id={user?.user?.id} />
    </>
  );
};

export default Create;
