"use client";

import { updateUserProfile } from "@/libs/action";
import { useFormState } from "react-dom";

type PropsType = {
  user: any;
};

const ProfileForm = ({ user }: PropsType) => {
  const [errorMessage, dispatch] = useFormState(updateUserProfile, undefined);

  return (
    <form action={dispatch} className="max-w-[300px] flex flex-col gap-3">
      <input
        type="text"
        defaultValue={user?.email}
        className="w-full p-1 rounded-md border-[1px] focus:outline-none"
        disabled
      />
      <input
        type="text"
        name="username"
        placeholder="username"
        defaultValue={user?.username}
        className="w-full p-1 rounded-md border-[1px] focus:outline-none"
      />
      <input
        type="text"
        name="firstname"
        placeholder="firstname"
        defaultValue={user?.firstname}
        className="w-full p-1 rounded-md border-[1px] focus:outline-none"
      />
      <input
        type="text"
        name="lastname"
        placeholder="lastname"
        defaultValue={user?.lastname}
        className="w-full p-1 rounded-md border-[1px] focus:outline-none"
      />
      <button className="bg-[#80475b] py-3 text-white uppercase rounded-lg">
        edit
      </button>
      <div
        className="flex h-8 items-end space-x-1"
        aria-live="polite"
        aria-atomic="true"
      >
        {errorMessage && (
          <>
            <p className="text-sm text-red-500">{errorMessage.message}</p>
          </>
        )}
      </div>
    </form>
  );
};

export default ProfileForm;
