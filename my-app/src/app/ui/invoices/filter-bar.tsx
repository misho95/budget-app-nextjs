const FilterBar = () => {
  return (
    <div className="w-full bg-[#f4f3fa] py-2 px-5 rounded-md shadow-sm shadow-black/10 mb-3">
      <form className="flex flex-col md:flex-row gap-1">
        <label className="flex gap-1 items-center">
          <div className="w-max">Date-From: </div>
          <input
            type="date"
            className="w-full p-1 rounded-md border-[1px] focus:outline-none"
          />
        </label>
        <label className="flex gap-1 items-center">
          <div>Date-To: </div>
          <input
            type="date"
            className="w-full p-1 rounded-md border-[1px] focus:outline-none"
          />
        </label>
        <label className="flex gap-1 items-center">
          <div>Category: </div>
          <select className="w-full p-1 rounded-md border-[1px] focus:outline-none">
            <option>any</option>
            <option>shopping</option>
            <option>gym</option>
          </select>
        </label>
        <label className="flex gap-1 items-center">
          <div>Type: </div>
          <select className="w-full p-1 rounded-md border-[1px] focus:outline-none">
            <option>any</option>
            <option>expense</option>
            <option>income</option>
          </select>
        </label>
        <button>Filter</button>
      </form>
    </div>
  );
};

export default FilterBar;
