const PostSkeleton = () => {
  const totalPosts = Array.from({ length: 8 }, (_, i) => i + 1);

  return (
    <>
      {totalPosts.map((r) => {
        return (
          <article
            key={r}
            className={`w-full min-[100px] p-3 bg-neutral-200 rounded-md flex flex-col gap-2 animate-pulse`}
          >
            <div className="bg-neutral-300 w-full rounded-full h-[15px] animate-pulse" />
            <div className="bg-neutral-300 w-full rounded-full h-[15px] animate-pulse" />
            <div className="bg-neutral-300 w-full rounded-full h-[15px] animate-pulse" />
            <div className="bg-neutral-300 w-full rounded-full h-[15px] animate-pulse" />
          </article>
        );
      })}
    </>
  );
};

export default PostSkeleton;
