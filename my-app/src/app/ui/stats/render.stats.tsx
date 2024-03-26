import { getInvoiceStats } from "@/libs/action";

const RenderStats = async ({ id }: { id: string }) => {
  const stats = await getInvoiceStats(id);

  const objectArray = Object.entries(stats.category).map(([key, value]) => ({
    key,
    value,
  }));

  return (
    <div className="w-full flex justify-start items-start gap-5 ">
      <div className="bg-white p-3 rounded-md shadow-sm">
        <p>total income: {stats.income?.total}</p>
        <p>income amount: {stats.income?.amount}</p>
      </div>
      <div className="bg-white p-3 rounded-md shadow-sm">
        <p>total expense: {stats.expense?.total}</p>
        <p>expense amount: {stats.expense?.amount}</p>
      </div>
      <div className="bg-white p-3 rounded-md shadow-sm grid grid-cols-2 gap-[0_12px]">
        {objectArray.map((c) => {
          return (
            <div className="flex gap-3">
              <p>{String(c.key)}:</p>
              <p>{String(c.value)}</p>
            </div>
          );
        })}
      </div>
      <div className="bg-white p-3 rounded-md shadow-sm">
        <p>diff: {stats.diff}</p>
      </div>
    </div>
  );
};

export default RenderStats;
