import { useSelector } from "react-redux";
import AppLayout from "../components/AppLayout";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";

const Home = () => {
  const { currentUser } = useSelector((state) => state.user);
  const mainPosts = useSelector((state) => state.post.mainPosts);
  return (
    <div>
      <AppLayout>
        {currentUser && <PostForm />}
        {mainPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </AppLayout>
    </div>
  );
};

export default Home;
