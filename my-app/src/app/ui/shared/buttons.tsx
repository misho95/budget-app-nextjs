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
      <button
        onClick={onClick}
        className="bg-citrine text-richBlack p-2 rounded-full border-2 border-snow/50 shadow-sm"
      >
        {children}
      </button>
    );
  }

  if (type === "link") {
    return (
      <Link
        href={href || ""}
        onClick={onClick}
        className="bg-citrine text-richBlack p-2 rounded-full border-2 border-snow/50 shadow-sm"
      >
        {children}
      </Link>
    );
  }
};

export default Buttons;
