import { getPostsFromDB } from "@/libs/action";
import OptionsPosts from "./options.posts";

type PropsType = {
  currentPage: number;
  query: { dateFrom: string; dateTo: string; category: string; type: string };
};

const RenderPosts = async ({ currentPage, query }: PropsType) => {
  const posts = await getPostsFromDB(currentPage, query);

  if (posts.length === 0) {
    return <div className="p-5 w-full text-center">No invoices found</div>;
  }

  return posts.map((post) => {
    return (
      <article
        key={post.id}
        className={`w-full p-3 text-[#2c2e36] hover:bg-[#ff5367] hover:text-white border-[1px] ${
          post.type === "expense"
            ? "border-red-500/30 text-red-500"
            : "border-green-500/30 text-green-600"
        } relative`}
      >
        <h3>Type: {post.type}</h3>
        <h4>Category: {post.category}</h4>
        <h5>Amount: {post.amount}</h5>
        <h6>Date: {post.date.toISOString().split("T")[0]}</h6>
        <div className="absolute top-3 right-3">
          <OptionsPosts id={post.id} />
        </div>
      </article>
    );
  });
};

export default RenderPosts;
