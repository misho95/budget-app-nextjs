import { delelteInvoiceFromDB } from "@/libs/action";
import { Trash2 } from "lucide-react";

type PropsType = {
  id: string;
};

export const DeleteInvoice = ({ id }: PropsType) => {
  const deletePost = delelteInvoiceFromDB.bind(null, id);

  return (
    <form action={deletePost}>
      <button>
        <Trash2 />
      </button>
    </form>
  );
};
