"use client";
import Link from "next/link";
import { LogOut, CircleUser, FilePlus2 } from "lucide-react";
import Buttons from "./buttons";
import { redirect } from "next/navigation";

const Header = () => {
  return (
    <header className="bg-burgundy px-10 py-2 flex justify-between items-center shadow-sm min-h-10 h-20 border-b-2 border-richBlack">
      <Link href={"/"} className="text-2xl text-snow">
        Budget-App
      </Link>
      <nav className="flex items-center gap-3 text-sm">
        <Buttons type={"link"} href="/create">
          <FilePlus2 className="size-5" />
        </Buttons>
        <Buttons type="button">
          <CircleUser className="size-5" />
        </Buttons>
        <Buttons type="button">
          <LogOut className="size-5" />
        </Buttons>
      </nav>
    </header>
  );
};

export default Header;
