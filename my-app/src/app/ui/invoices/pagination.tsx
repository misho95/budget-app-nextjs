import { generatePagination } from "@/libs/utils";
import PageButtons from "./page.buttons";

type PropsType = {
  currentPage: number;
  totalPage: number;
};

const Pagination = ({ currentPage, totalPage }: PropsType) => {
  const allPages = generatePagination(currentPage, totalPage);

  return (
    <div className="w-full flex gap-1 justify-center items-center">
      <PageButtons value={currentPage !== 1 ? currentPage - 1 : 1}>
        prev
      </PageButtons>
      {allPages.map((p) => {
        return (
          <PageButtons key={p} value={p} currentPage={currentPage}>
            {p}
          </PageButtons>
        );
      })}
      <PageButtons
        value={currentPage !== totalPage ? currentPage + 1 : totalPage}
      >
        next
      </PageButtons>
    </div>
  );
};

export default Pagination;
