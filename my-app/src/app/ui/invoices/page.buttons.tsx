"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ReactNode } from "react";

type PropsType = {
  children: ReactNode;
  value: string | number;
  currentPage?: number;
};

const PageButtons = ({ children, value, currentPage }: PropsType) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <Link
      href={createPageURL(value)}
      className={` ${
        currentPage === value ? "bg-black/50 text-white" : "bg-[#f4f3fa]"
      } py-1 px-3 rounded-md`}
    >
      {children}
    </Link>
  );
};

export default PageButtons;
