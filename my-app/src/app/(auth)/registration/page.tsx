import Link from "next/link";

const Registration = () => {
  return (
    <div className="w-fit h-fit bg-[#ffffff] p-5 rounded-md shadow-sm shadow-black/30">
      <form className="flex flex-col gap-3">
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
          />
        </fieldset>
        <div className="text-sm text-[#ffa001] capitalize">
          already have an account?{" "}
          <Link href={"/login"} className="text-[#80475b] uppercase">
            login
          </Link>
        </div>
        <button className="bg-[#80475b] py-2 rounded-md text-white uppercase">
          Registration
        </button>
      </form>
    </div>
  );
};

export default Registration;
