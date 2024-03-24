import Link from "next/link";
import { ReactNode } from "react";

type PropsType = {
  children: ReactNode;
  value: string | number;
  currentPage?: number;
};

const PageButtons = ({ children, value, currentPage }: PropsType) => {
  return (
    <Link
      href={`/?page=${value}`}
      className={` ${
        currentPage === value ? "bg-black/50 text-white" : "bg-[#f4f3fa]"
      } py-1 px-3 rounded-md`}
    >
      {children}
    </Link>
  );
};

export default PageButtons;
