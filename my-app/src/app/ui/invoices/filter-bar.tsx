"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Calendar } from "lucide-react";

const FilterBar = ({ handler }: { handler?: () => void }) => {
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

  const handleReset = () => {
    const params = new URLSearchParams(searchParams);
    if (params.get("type")) {
      params.delete("type");
    }
    if (params.get("cat")) {
      params.delete("cat");
    }
    if (params.get("from")) {
      params.delete("from");
    }
    if (params.get("to")) {
      params.delete("to");
    }
    replace(`${pathname}?${params.toString()}`);
    if (handler) {
      handler();
    }
  };

  return (
    <div className="w-full bg-[#f4f3fa] py-5 md:py-2 px-5 rounded-md shadow-sm shadow-black/10 mb-3">
      <form
        onSubmit={handler}
        action={filterPostsAction}
        className="flex flex-col md:flex-row gap-3 items-center justify-between "
      >
        <div className="flex flex-col md:flex-row gap-3 flex-wrap">
          <label className="flex gap-1 items-center">
            <div className="w-max">From:</div>
            <input
              type="date"
              className="w-full p-1 rounded-md border-[1px] focus:outline-none"
              name="dateFrom"
              defaultValue={searchParams.get("from") || ""}
            />
          </label>
          <label className="flex gap-1 items-center">
            <div>To:</div>
            <input
              type="date"
              className="w-full p-1 rounded-md border-[1px] focus:outline-none"
              name="dateTo"
              defaultValue={searchParams.get("to") || ""}
            />
          </label>
          <label className="flex gap-1 items-center">
            <div>Category: </div>
            <select
              name="category"
              className="w-full p-1 rounded-md border-[1px] focus:outline-none"
              defaultValue={searchParams.get("cat") || "any"}
            >
              <option value="any">any</option>
              <option value="shopping">shopping</option>
              <option value="gym">gym</option>
            </select>
          </label>
          <label className="flex gap-1 items-center">
            <div>Type: </div>
            <select
              name="type"
              className="w-full p-1 rounded-md border-[1px] focus:outline-none"
              defaultValue={searchParams.get("type") || "any"}
            >
              <option value="any">any</option>
              <option value="expense">expense</option>
              <option value="income">income</option>
            </select>
          </label>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleReset}
            className="bg-[#ffa001] px-5 py-1 rounded-md text-white"
          >
            Reset
          </button>
          <button className="bg-[#80475b] px-5 py-1 rounded-md text-white">
            Filter
          </button>
        </div>
      </form>
    </div>
  );
};

export default FilterBar;
