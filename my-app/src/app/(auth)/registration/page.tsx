"use client";

import { registrateUser } from "@/libs/action";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";

const Registration = () => {
  const [errorMessage, dispatch] = useFormState(registrateUser, undefined);

  return (
    <div className="w-fit h-fit bg-[#ffffff] p-5 rounded-md shadow-sm shadow-black/30">
      <form action={dispatch} className="flex flex-col gap-3">
        <h1 className="uppercase text-[#80475b] text-lg">registration page</h1>
        <fieldset className="border-[1.5px] border-[#ffa001] rounded-md p-1">
          <legend className="px-2 m-1 bg-[#ffa001] rounded-lg text-white select-none uppercase text-sm">
            email
          </legend>
          <input
            name="email"
            type="text"
            placeholder="email"
            className="w-full p-2 bg-transparent focus:outline-none text-[#2e3038]"
            required
          />
        </fieldset>
        <fieldset className="border-[1.5px] border-[#ffa001] rounded-md p-1">
          <legend className="px-2 m-1 bg-[#ffa001] rounded-lg text-white select-none uppercase text-sm">
            password
          </legend>
          <input
            name="password"
            type="password"
            placeholder="*********"
            className="w-full p-2 bg-transparent focus:outline-none text-[#2e3038]"
            required
          />
        </fieldset>
        <fieldset className="border-[1.5px] border-[#ffa001] rounded-md p-1">
          <legend className="px-2 m-1 bg-[#ffa001] rounded-lg text-white select-none uppercase text-sm">
            re-password
          </legend>
          <input
            name="re-password"
            type="password"
            placeholder="*********"
            className="w-full p-2 bg-transparent focus:outline-none text-[#2e3038]"
            required
          />
        </fieldset>
        <div className="text-sm text-[#ffa001] capitalize">
          already have an account?{" "}
          <Link href={"/login"} className="text-[#80475b] uppercase">
            login
          </Link>
        </div>
        <RegistrationButton />
      </form>
      <div
        className="flex h-8 items-end space-x-1"
        aria-live="polite"
        aria-atomic="true"
      >
        {errorMessage && (
          <>
            <p className="text-sm text-red-500">{errorMessage}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Registration;

const RegistrationButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      aria-disabled={pending}
      disabled={pending}
      type="submit"
      className="bg-[#80475b] py-2 rounded-md text-white uppercase aria-disabled:cursor-not-allowed relative"
    >
      {pending && (
        <div className="m-2 size-5 border-[3px] border-white/50 rounded-full animate-spin absolute left-[5px] top-[2px]">
          <div className="size-5 border-l-[3px] border-white rounded-full absolute -left-[3px] -top-[3px]" />
        </div>
      )}
      Registration
    </button>
  );
};
