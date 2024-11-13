import { useEffect, useState } from "react";
import { apiEndPoints } from "../../apiEndPoints/api.addresses";

export default function PostWhileChatting({ userId, isOpen, onClose, setMessageContent }) {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMorePosts, setHasMorePosts] = useState(true);

    const fetchPosts = async (page) => {
        setIsLoading(true);
        try {
            const response = await fetch(apiEndPoints.getPostOfUserInChat(userId) + `?page=${page}`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Error fetching posts.");
            }

            if (data.success) {
                setPosts((prevPosts) => [...prevPosts, ...data.data]);
                setHasMorePosts(data.data.length > 0);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            fetchPosts(currentPage);
        }
    }, [isOpen, currentPage, userId]);

    const handleScroll = (e) => {
        const bottom = e.target.scrollHeight === e.target.scrollTop + e.target.clientHeight;
        if (bottom && !isLoading && hasMorePosts) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    return (
        <div 
            className="fixed inset-0 w-full z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={onClose}
        >
            <div
                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg max-w-5xl w-full mx-4"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    className="text-gray-500 dark:text-gray-400 float-right mr-3 mt-3"
                    onClick={onClose}
                >
                    &times;
                </button>

                {/* Posts Section */}
                <div 
                    className="posts-container bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md overflow-y-scroll" 
                    style={{ maxHeight: "300px" }}
                    onScroll={handleScroll}
                >
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <div 
                                key={post._id} 
                                onClick={() => setMessageContent((prev) => {
                                    const updatedContent = prev.slice(0, -7); // Remove the last 7 characters
                                    return `${updatedContent} /posts/post/${post?._id} `; // Add the new link
                                })}
                                

                                className="post-item cursor-pointer bg-white dark:bg-gray-700 p-4 rounded-lg mb-2 shadow-md"
                            >
                                <div className="post-header flex gap-2 mb-2">
                                    <img 
                                        className="w-10 h-10 rounded-full" 
                                        src={post.author?.profilePic || "default-profile-pic.jpg"} 
                                        alt="author pic"
                                    />
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{post.title}</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">{post.author?.name}</p>
                                    </div>
                                </div>
                                <p className="post-content text-gray-700 dark:text-gray-400">
                                    {post.content.length > 100 ? post.content.slice(0, 100) + "..." : post.content}  
                                    <span
                                        className="text-blue-500 hover:underline mt-2 block">
                                        Read more...
                                    </span>
                                </p>
                                
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-gray-500 dark:text-gray-400">No posts to show</div>
                    )}

                    {/* Loading spinner */}
                    {isLoading && (
                        <div className="text-center mt-2">
                            <div className="spinner-border animate-spin text-blue-500" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    )}
                </div>

                
            </div>
        </div>
    );
}
