import { useEffect, useState } from "react";
import CustomDropdown from "./CustomDropdown";
import { apiEndPoints } from "../apiEndPoints/api.addresses";
import ShowPosts from "./ShowPosts";

export default function CategorisedPost({setCategory}) {

  const [posts, setPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("")
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); // Track current page
  const [hasMorePosts, setHasMorePosts] = useState(true); // Track if there are more posts to load

  const categories = [
    "Technology",
    "Health & Wellness",
    "Business & Finance",
    "Education",
    "Entertainment",
    "Lifestyle",
    "Travel",
    "Food & Drink",
    "Fashion",
    "Sports",
    "Art & Design",
    "Science",
    "DIY & Crafts",
    "Personal Development",
    "Uncategorised",
    "All Category",
  ];

  const handleCategorySelect = (value) => {
    console.log("values selected at home category", value);
    setSelectedCategory(value);
    setCategory(value)
    if (value === "All Category") setSelectedCategory("");
  };

  useEffect(() => {
    setPage(1); // Reset to first page when category changes
    setPosts([]); // Clear previous posts
  }, [selectedCategory]);

  useEffect(() => {
    const fetchPosts = async () => {
      if (loading || !hasMorePosts) return; // Prevent fetching if already loading or no more posts

      setLoading(true);
      try {
        const response = await fetch(apiEndPoints.searchPostByCategory(selectedCategory, page));

        const data = await response.json();

        console.log("data category inside ", data.data);
        console.log("posts", posts)
        if (data.data && data.data?.length > 0) {
            setPosts((prevPosts) => {
                const uniquePosts = data.data.filter(post => 
                    !prevPosts.some(prevPost => prevPost.id === post.id)
                );
                return [...prevPosts, ...uniquePosts];
            });
            setHasMorePosts(data?.data?.length > 0); // Set hasMorePosts to false if no new posts
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [selectedCategory, page]);

  const handleScroll = (e) => {
    const bottom = e.target.scrollHeight === e.target.scrollTop + e.target.clientHeight;
    if (bottom && !loading && hasMorePosts) {
      setPage((prevPage) => prevPage + 1); // Load next page when scrolled to bottom
    }
  };

  return (
    <div
      onScroll={handleScroll}
      className="overflow-y-auto h-screen" // Adjust as needed for scroll behavior
    >
        {/* {
            posts.length > 0 ? 
                <ShowPosts heading={"categorised result"} postData={posts} /> :
                <h1> No Result found for this category </h1>
        } */}
      <CustomDropdown options={categories} onSelect={handleCategorySelect} />
      {posts?.length > 0 ? (
        <ShowPosts heading={"Categorized search result"} posts={posts} />
      ) : (
        <h1 className="w-full flex justify-center items-center mt-5">
          {selectedCategory !== "" && (
            <span className="bg-gray-500 text-white px-2 rounded-lg font-semibold">
              No result for this category
            </span>
          )}
        </h1>
      )}

      {/* Loading spinner */}
      {loading && (
        <div className="w-full flex justify-center items-center mt-4">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500"></div>
        </div>
      )}

      {/* Message when no more posts */}
      {!hasMorePosts && (
        <div className="w-full flex justify-center items-center mt-5">
          <span className="bg-gray-500 text-white px-2 rounded-lg font-semibold">
            No more posts available
          </span>
        </div>
      )}
    </div>
  );
}
