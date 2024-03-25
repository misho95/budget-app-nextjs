"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const FilterBar = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const filterPostsAction = (formData: FormData) => {
    const rawFormData = {
      type: formData.get("type"),
      category: formData.get("category"),
      dateFrom: formData.get("dateFrom"),
      dateTo: formData.get("dateTo"),
    };

    const { type, category, dateFrom, dateTo } = rawFormData;

    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (type && type !== "any") {
      params.set("type", type.toString());
    } else {
      params.delete("type");
    }
    if (category && category !== "any") {
      params.set("cat", category.toString());
    } else {
      params.delete("cat");
    }
    if (dateFrom) {
      params.set("from", dateFrom.toString());
    } else {
      params.delete("dateFrom");
    }
    if (dateTo) {
      params.set("to", dateTo.toString());
    } else {
      params.delete("dateTo");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="w-full bg-[#f4f3fa] py-2 px-5 rounded-md shadow-sm shadow-black/10 mb-3">
      <form
        action={filterPostsAction}
        className="flex flex-col md:flex-row gap-3 items-center justify-between"
      >
        <div className="flex flex-col md:flex-row gap-5">
          <label className="flex gap-1 items-center">
            <div className="w-max">Date-From: </div>
            <input
              type="date"
              className="w-full p-1 rounded-md border-[1px] focus:outline-none"
              name="dateFrom"
            />
          </label>
          <label className="flex gap-1 items-center">
            <div>Date-To: </div>
            <input
              type="date"
              className="w-full p-1 rounded-md border-[1px] focus:outline-none"
              name="dateTo"
            />
          </label>
          <label className="flex gap-1 items-center">
            <div>Category: </div>
            <select
              name="category"
              className="w-full p-1 rounded-md border-[1px] focus:outline-none"
            >
              <option>any</option>
              <option>shopping</option>
              <option>gym</option>
            </select>
          </label>
          <label className="flex gap-1 items-center">
            <div>Type: </div>
            <select
              name="type"
              className="w-full p-1 rounded-md border-[1px] focus:outline-none"
            >
              <option>any</option>
              <option>expense</option>
              <option>income</option>
            </select>
          </label>
        </div>
        <button className="bg-[#80475b] px-5 py-1 rounded-md text-white">
          Filter
        </button>
      </form>
    </div>
  );
};

export default FilterBar;
