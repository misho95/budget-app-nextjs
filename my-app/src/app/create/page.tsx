"use client";

import { createNewInvoiceInDB } from "@/libs/action";

const Create = () => {
  return (
    <div className="flex w-full h-full justify-center items-center">
      <form
        action={createNewInvoiceInDB}
        className="flex flex-col gap-3 bg-red-200 p-2"
      >
        <h1>Add New Invoice</h1>
        <label>
          <input type="number" placeholder="amount" name="amount" />
        </label>
        <label>
          <input type="date" name="date" />
        </label>
        <input type="text" placeholder="type" id="type" name="type" />
        <input type="text" placeholder="category" name="category" />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Create;
