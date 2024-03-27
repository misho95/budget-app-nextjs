"use client";
import { useState } from "react";
import FilterBar from "./filter-bar";
import { Filter, ArrowDownUp } from "lucide-react";

const FilterBarMobile = () => {
  const [show, setShow] = useState(false);

  return (
    <div className="w-full bg-[#f4f3fa] py-2 px-5 rounded-md shadow-sm shadow-black/10 mb-3 flex justify-between gap-3">
      <button
        className="bg-[#80475b] text-white p-2 rounded-md"
        onClick={() => setShow(true)}
      >
        <Filter />
      </button>
      {show && (
        <div
          onClick={() => setShow(false)}
          className="w-full h-screen bg-black/20 fixed top-0 left-0 z-30 p-3 flex justify-center items-center"
        >
          <div onClick={(e) => e.stopPropagation()}>
            <FilterBar handler={() => setShow(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBarMobile;
