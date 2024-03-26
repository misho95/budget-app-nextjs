import { getInvoiceStats } from "@/libs/action";

const RenderStats = async ({ id }: { id: string }) => {
  const stats = await getInvoiceStats(id);

  const objectArray = Object.entries(stats.category).map(([key, value]) => ({
    key,
    value,
  }));

  return (
    <div className="w-full flex justify-start items-start gap-5 flex-wrap">
      <div className="p-3 bg-[#f4f3fa]">
        <h1 className="text-lg font-semibold p-1 uppercase text-black/70">
          income
        </h1>
        <div className="bg-white p-3 rounded-md">
          <p>total: {stats.income?.total}</p>
          <p>amount: {stats.income?.amount}</p>
        </div>
      </div>
      <div className="p-3 bg-[#f4f3fa]">
        <h1 className="text-lg font-semibold p-1 uppercase text-black/70">
          expense
        </h1>
        <div className="bg-white p-3 rounded-md shadow-sm">
          <p>total: {stats.expense?.total}</p>
          <p>amount: {stats.expense?.amount}</p>
        </div>
      </div>
      <div className="p-3 bg-[#f4f3fa]">
        <h1 className="text-lg font-semibold p-1 uppercase text-black/70">
          Category
        </h1>
        <div className="bg-white p-3 rounded-md shadow-sm grid grid-cols-2 gap-[0_12px]">
          {objectArray.map((c, index) => {
            return (
              <div key={index} className="flex gap-3">
                <p>{String(c.key)}:</p>
                <p>{String(c.value)}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="p-3 bg-[#f4f3fa]">
        <h1 className="text-lg font-semibold p-1 uppercase text-black/70">
          difference
        </h1>
        <div className="bg-white p-3 rounded-md shadow-sm">
          <p>amount: {stats.diff}</p>
        </div>
      </div>
    </div>
  );
};

export default RenderStats;
