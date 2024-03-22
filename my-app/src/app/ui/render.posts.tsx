import { getPostsFromDB } from "@/libs/action";
import { DeleteInvoice } from "./buttons";

const RenderPosts = async () => {
  const posts = await getPostsFromDB();

  return posts.map((post) => {
    return (
      <article
        key={post.id}
        className="w-[calc(25%-20px)] bg-iceBlue p-3 rounded-md shadow-sm border-[1px] border-richBlack/20"
      >
        <h3>Type: {post.type}</h3>
        <h4>Category: {post.category}</h4>
        <h5>Amount: {post.amount}</h5>
        <h6>Date: {post.date.toISOString().split("T")[0]}</h6>
        <DeleteInvoice id={post.id} />
      </article>
    );
  });
};

export default RenderPosts;
