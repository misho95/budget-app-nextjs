const StatsSkeleton = () => {
  return (
    <div className="w-full min-h-[100px] grid grid-cols-4 gap-3">
      <article
        className={` p-3 bg-neutral-200 rounded-md flex flex-col gap-2 animate-pulse`}
      />
      <article
        className={` p-3 bg-neutral-200 rounded-md flex flex-col gap-2 animate-pulse`}
      />
      <article
        className={` p-3 bg-neutral-200 rounded-md flex flex-col gap-2 animate-pulse`}
      />
      <article
        className={` p-3 bg-neutral-200 rounded-md flex flex-col gap-2 animate-pulse`}
      />
    </div>
  );
};

export default StatsSkeleton;
