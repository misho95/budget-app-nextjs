"use client";

import { createNewInvoiceInDB } from "@/libs/action";
import { useState } from "react";

const Create = () => {
  const [type, setType] = useState("expense");

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
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              name="type"
              className="w-full p-1 rounded-md border-[1px] focus:outline-none"
              required
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </label>
          <label className="w-full p-1">
            <select
              name="category"
              className="w-full p-1 rounded-md border-[1px] focus:outline-none"
              required
            >
              {type === "expense" ? (
                <>
                  <option value="shopping">Shopping</option>
                  <option value="gym">Gym</option>
                </>
              ) : (
                <>
                  <option value="invoice">Invoice</option>
                  <option value="other">Other</option>
                </>
              )}
            </select>
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
