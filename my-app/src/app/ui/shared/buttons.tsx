import Link from "next/link";
import { ReactNode } from "react";

type PropsType = {
  type: "link" | "button";
  href?: string;
  children: ReactNode;
  onClick?: () => void;
};

const Buttons = ({ children, onClick, type, href }: PropsType) => {
  if (type === "button") {
    return (
      <button onClick={onClick} className=" text-[#565656] p-2 rounded-full">
        {children}
      </button>
    );
  }

  if (type === "link") {
    return (
      <Link
        href={href || ""}
        onClick={onClick}
        className=" text-[#565656] p-2 rounded-full"
      >
        {children}
      </Link>
    );
  }
};

export default Buttons;
