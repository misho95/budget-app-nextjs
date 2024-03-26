import { auth } from "@/auth";
import RenderStats from "./render.stats";
import { Suspense } from "react";
import StatsSkeleton from "./stats.skeleton";

const Stats = async () => {
  const user = await auth();

  if (!user || !user.user?.id) {
    return null;
  }

  return (
    <div className="w-full">
      <Suspense fallback={<StatsSkeleton />}>
        <RenderStats id={user?.user?.id} />
      </Suspense>
    </div>
  );
};

export default Stats;
