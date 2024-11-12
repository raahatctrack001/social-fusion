import { useEffect, useState } from "react";
import CustomDropdown from "./CustomDropdown";
import { apiEndPoints } from "../apiEndPoints/api.addresses";
import ShowPosts from "./ShowPosts";
import PostCategoryDropdown from "./PostCategoryDropdown";

export default function CategorisedPost() {
  const [posts, setPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMorePosts, setHasMorePosts] = useState(true);

  const categories = [
    "Technology", "Health & Wellness", "Business & Finance", "Education", "Entertainment",
    "Lifestyle", "Travel", "Food & Drink", "Fashion", "Sports", "Art & Design", "Science",
    "DIY & Crafts", "Personal Development", "Uncategorised", "All Category",
  ];

  const handleCategorySelect = (value) => {
    console.log("values selected at home category", value);
    setSelectedCategory(value === "All Category" ? null : value);
    setPage(1); // Reset pagination
    setPosts([]); // Clear posts when category changes
  };

  useEffect(() => {
    const fetchPosts = async () => {
      if (loading || !hasMorePosts) return;

      setLoading(true);
      try {
        const categoryToFetch = selectedCategory ? selectedCategory : ""; // Fetch all if no category
        const response = await fetch(apiEndPoints.searchPostByCategory(selectedCategory, page));

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Network response wasn't ok");
        }

        if (data.data && data.data.posts.length > 0) {
          setPosts((prevPosts) => [
            ...prevPosts,
            ...data.data.posts.filter(
              (post) => !prevPosts.some((prevPost) => prevPost.id === post.id)
            ),
          ]);
          setHasMorePosts(data.data.posts.length > 0); // Check if more posts are available

          console.log("posts count", posts.length);
          console.log("total posts", data.data.totalCount);
        } else {
          setHasMorePosts(false);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [selectedCategory, page]);

  const handleScroll = (e) => {
    const bottom = e.target.scrollHeight === e.target.scrollTop + e.target.clientHeight;
    if (bottom && !loading && hasMorePosts) {
      setPage((prevPage) => prevPage + 1); // Increment page for pagination
    }
  };

  return (
    <div
      onScroll={handleScroll}
      className="overflow-y-auto h-screen"
    >
      <CustomDropdown options={categories} onSelect={handleCategorySelect} />
      {/* Conditionally render posts if a specific category is selected or show paginated data */}
      {selectedCategory && posts.length > 0 && (
        <ShowPosts heading={"Categorised result"} postData={posts} />
      )}

      {/* Loading spinner */}
      {loading && (
        <div className="w-full flex justify-center items-center mt-4">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500"></div>
        </div>
      )}

      {/* Message when no more posts */}
      {!hasMorePosts && posts.length > 0 && (
        <div className="w-full flex justify-center items-center mt-5">
          <span className="bg-gray-500 text-white px-2 rounded-lg font-semibold">
            No more posts available
          </span>
        </div>
      )}
    </div>
  );
}
