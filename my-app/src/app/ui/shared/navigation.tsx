import { LogOut, CircleUser, FilePlus2, PiggyBank } from "lucide-react";
import Buttons from "./buttons";
import Link from "next/link";
import { signOut } from "@/auth";

const Navigation = () => {
  return (
    <nav className="w-full md:w-[100px] h-[100px] md:h-full bg-white flex flex-row md:flex-col justify-between items-center p-5">
      <Link href="/" className="text-white bg-black/80 p-2 rounded-full">
        <PiggyBank className="size-8" />
      </Link>
      <div className="flex flex-row md:flex-col justify-center items-center gap-2">
        <Buttons type={"link"} href="/create">
          <FilePlus2 className="size-6" />
        </Buttons>
        <Buttons type="button">
          <CircleUser className="size-6" />
        </Buttons>
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <Buttons type="button">
            <LogOut className="size-6" />
          </Buttons>
        </form>
      </div>
    </nav>
  );
};

export default Navigation;
