"use client";

import { createNewInvoiceInDB } from "@/libs/action";

const Create = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <h1 className="bg-[#fff0dd] text-[#2c2e36] py-5 px-3 text-xl font-bold uppercase border-b-[1px] border-[#ffa001]">
        Create New Invoice
      </h1>
      <div className="p-5">
        <form action={createNewInvoiceInDB} className="flex flex-col gap-3 p-2">
          <label className="w-full p-1">
            <input
              type="number"
              placeholder="amount"
              name="amount"
              className="w-full p-1 rounded-md border-[1px] focus:outline-none"
              required
            />
          </label>
          <label className="w-full p-1">
            <input
              type="date"
              name="date"
              className="w-full p-1 rounded-md border-[1px] focus:outline-none"
              required
            />
          </label>
          <label className="w-full p-1">
            <input
              type="text"
              placeholder="type"
              id="type"
              name="type"
              className="w-full p-1 rounded-md border-[1px] focus:outline-none"
              required
            />
          </label>
          <label className="w-full p-1">
            <input
              type="text"
              placeholder="category"
              name="category"
              className="w-full p-1 rounded-md border-[1px] focus:outline-none"
              required
            />
          </label>
          <button className="bg-[#80475b] py-3 text-white uppercase text-lg font-semibold rounded-lg">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Create;
