import { auth } from "@/auth";
import RenderStats from "./render.stats";
import { Suspense } from "react";

const Stats = async () => {
  const user = await auth();

  if (!user || !user.user?.id) {
    return null;
  }

  return (
    <div>
      <Suspense>
        <RenderStats id={user?.user?.id} />
      </Suspense>
    </div>
  );
};

export default Stats;
