import { useEffect, useState } from "react";
import { apiEndPoints } from "../apiEndPoints/api.addresses";
import { TextInput } from "flowbite-react";
import { HiDocumentSearch, HiSearch } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

export default function HeaderSearch() {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [showSearchedResult, setShowSearchedResult] = useState(false);
  const [searchedPost, setSearchedPost] = useState([]);
  const [hasMorePosts, setHasMorePosts] = useState(true); // Flag to check if more posts exist
  const navigate = useNavigate();

  useEffect(() => {
    // Only fetch if search term is not empty
    if (searchTerm.trim() === '') {
      setShowSearchedResult(false);
      return;
    }

    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch(apiEndPoints.searchPostsAddress(searchTerm, page), {
          method: "POST",
          headers: {
            'content-type': 'application/json',
          },
        });

        const data = await response.json();
        if (data.posts && data.posts.length > 0) {
          setSearchedPost(prevPosts => [...prevPosts, ...data.posts]); // Append new posts
          setHasMorePosts(data.posts.length > 0); // Check if more posts are available
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [searchTerm, page]);

  const handleScroll = (e) => {
    const bottom = e.target.scrollHeight === e.target.scrollTop + e.target.clientHeight;
    if (bottom && !loading && hasMorePosts) {
      setPage(prevPage => prevPage + 1); // Load next page when scrolled to the bottom
    }
  };

  return (
    <div className="relative w-full max-w-lg mx-auto">
      <TextInput
        className="w-full max-w-lg rounded-lg border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-500"
        placeholder="Search posts..."
        rightIcon={HiDocumentSearch}
        icon={HiSearch}
        id="searchTerm"
        value={searchTerm}
        autoComplete="off"
        onChange={(e) => { setShowSearchedResult(true); setSearchTerm(e.target.value); setSearchedPost([]); setPage(1); }}
      />

      {showSearchedResult && (
        <div
          onScroll={handleScroll}
          onWheel={(e) => e.stopPropagation()}
          className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 shadow-lg rounded-lg mt-2 py-2 max-h-60 overflow-y-auto border border-gray-300 dark:border-gray-700 z-20"
        >
          {searchedPost.length > 0 ? (
            searchedPost.map((post, index) => (
              <div
                key={index}
                onClick={() => { setShowSearchedResult(false); navigate(`/posts/post/${post._id}`); setSearchTerm(''); }}
                className="cursor-pointer flex items-center justify-between gap-3 hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-white rounded-lg py-2 px-3 transition-colors duration-150 ease-in-out"
              >
                <div className="flex items-center gap-2">
                  <HiSearch className="text-gray-600 dark:text-gray-300" />
                  <h1 className="text-gray-800 dark:text-gray-100 font-medium truncate max-w-[180px]">{post?.title?.length > 50 ? post?.title?.substring(0, 45) + "..." : post?.title}</h1>
                </div>
                <img src={post?.thumbnail?.at(-1) || "https://www.freeiconspng.com/uploads/no-image-icon-4.png"} className="h-8 w-8 rounded-lg" alt="Post Thumbnail" />
              </div>
            ))
          ) : (
            <div className="text-gray-500 dark:text-gray-400 w-full text-center py-2">
              No results found
            </div>
          )}
          {loading && (
            <div className="text-center py-2">Loading more posts...</div>
          )}
        </div>
      )}
    </div>
  );
}
