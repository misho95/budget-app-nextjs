import RenderPosts from "./ui/render.posts";

const Home = () => {
  return (
    <div className="w-full h-full overflow-y-auto flex flex-wrap gap-5 justify-start items-start">
      <RenderPosts />
    </div>
  );
};

export default Home;
