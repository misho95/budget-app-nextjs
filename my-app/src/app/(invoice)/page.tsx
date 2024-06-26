import { getPostsTotalPage } from "@/libs/action";
import FilterBar from "../ui/invoices/filter-bar";
import Pagination from "../ui/invoices/pagination";
import RenderPosts from "../ui/invoices/render.posts";
import Separator from "../ui/invoices/separator";
import { Suspense } from "react";
import PostSkeleton from "../ui/invoices/post-skeleton";
import { auth } from "@/auth";
import FilterBarMobile from "../ui/invoices/filter.bar.mobile";

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
  const user = await auth();

  const dateFrom = searchParams?.from || "";
  const dateTo = searchParams?.to || "";
  const category = searchParams?.cat || "";
  const type = searchParams?.type || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPage = Math.ceil(
    (await getPostsTotalPage(
      {
        dateFrom,
        dateTo,
        category,
        type,
      },
      user?.user?.id
    )) / 16
  );

  return (
    <div className="flex flex-col justify-between gap-1 w-full h-full p-5">
      <div>
        <div>
          <div className="hidden md:flex">
            <FilterBar />
          </div>
          <div className="flex md:hidden">
            <FilterBarMobile />
          </div>
        </div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-1 ">
          <Suspense fallback={<PostSkeleton />}>
            <RenderPosts
              currentPage={currentPage}
              query={{ dateFrom, dateTo, category, type }}
            />
          </Suspense>
        </div>
      </div>
      <div>
        <Separator />
        <Pagination currentPage={currentPage} totalPage={totalPage} />
        <Separator />
      </div>
    </div>
  );
};

export default Home;
