import { delelteInvoiceFromDB } from "@/libs/action";
import { Trash2, Pencil } from "lucide-react";
import Link from "next/link";

type PropsType = {
  id: string;
};

export const DeleteInvoice = ({ id }: PropsType) => {
  const deletePost = delelteInvoiceFromDB.bind(null, id);

  return (
    <form action={deletePost}>
      <button>
        <Trash2 className="size-5" />
      </button>
    </form>
  );
};

export const EditInovice = ({ id }: PropsType) => {
  return (
    <Link href={`/${id}/edit`}>
      <Pencil className="size-5" />
    </Link>
  );
};
