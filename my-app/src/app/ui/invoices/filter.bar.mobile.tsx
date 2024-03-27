"use client";
import { useState } from "react";
import FilterBar from "./filter-bar";

const FilterBarMobile = () => {
  const [show, setShow] = useState(false);

  return (
    <div className="w-full bg-[#f4f3fa] py-2 px-5 rounded-md shadow-sm shadow-black/10 mb-3">
      <button
        className="bg-[#80475b] text-white px-2 py-1 rounded-md"
        onClick={() => setShow(true)}
      >
        filter
      </button>
      {show && (
        <div
          onClick={() => setShow(false)}
          className="w-full h-screen bg-black/20 fixed top-0 left-0 z-30 p-3 flex justify-center items-center"
        >
          <div onClick={(e) => e.stopPropagation()} className="">
            <FilterBar handler={() => setShow(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBarMobile;
