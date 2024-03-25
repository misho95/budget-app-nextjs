import { getPostsTotalPage } from "@/libs/action";
import FilterBar from "../ui/invoices/filter-bar";
import Pagination from "../ui/invoices/pagination";
import RenderPosts from "../ui/invoices/render.posts";
import Separator from "../ui/invoices/separator";
import { Suspense } from "react";
import PostSkeleton from "../ui/invoices/post-skeleton";
import { auth } from "@/auth";

const Home = async ({
  searchParams,
}: {
  searchParams?: {
    page?: string;
    from?: string;
    to?: string;
    cat?: string;
    type?: string;
  };
}) => {
  const dateFrom = searchParams?.from || "";
  const dateTo = searchParams?.to || "";
  const category = searchParams?.cat || "";
  const type = searchParams?.type || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPage = Math.ceil(
    (await getPostsTotalPage({
      dateFrom,
      dateTo,
      category,
      type,
    })) / 8
  );

  const user = await auth();

  return (
    <div className="flex flex-col gap-1 w-full h-full p-5">
      <FilterBar />
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-1 ">
        <Suspense fallback={<PostSkeleton />}>
          <RenderPosts
            currentPage={currentPage}
            query={{ dateFrom, dateTo, category, type }}
          />
        </Suspense>
      </div>
      <Separator />
      <Pagination currentPage={currentPage} totalPage={totalPage} />
      <Separator />
    </div>
  );
};

export default Home;
