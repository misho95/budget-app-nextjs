"use client";

import { editPostById } from "@/libs/action";
import { useState } from "react";
import { useFormState } from "react-dom";

type PropsType = {
  post: {
    id: string;
    amount: number;
    date: string;
    category: string;
    type: string;
  };
};

const EditForm = ({ post }: PropsType) => {
  const [type, setType] = useState(post.type);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-based
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const updateInvoice = editPostById.bind(null, post.id);
  const [errorMessage, dispatch] = useFormState(updateInvoice, undefined);

  return (
    <div className="w-full h-full flex flex-col">
      <h1 className="bg-[#fff0dd] text-[#2c2e36] py-5 px-3 text-xl font-bold uppercase border-b-[1px] border-[#ffa001]">
        Create New Invoice
      </h1>
      <div className="p-5">
        <form action={dispatch} className="flex flex-col gap-3 p-2">
          <label className="w-full p-1">
            <input
              type="number"
              placeholder="amount"
              name="amount"
              className="w-full p-1 rounded-md border-[1px] focus:outline-none"
              defaultValue={post.amount}
              required
            />
          </label>
          <label className="w-full p-1">
            <input
              type="date"
              name="date"
              className="w-full p-1 rounded-md border-[1px] focus:outline-none"
              defaultValue={formatDate(post.date)}
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
              defaultValue={post.category}
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

export default EditForm;
