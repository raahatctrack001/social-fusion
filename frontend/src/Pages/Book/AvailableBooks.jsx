import { useEffect, useRef, useState } from "react";
import { apiEndPoints } from "../../apiEndPoints/api.addresses";
import { useNavigate } from "react-router-dom";
import DisplayContent from "../../Compnents/DisplayContent";
import { Button } from "flowbite-react";
import { useSelector } from "react-redux";

export default function AvailableBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSummary, setShowSummary] = useState(false)
  const navigate = useNavigate();

  const { currentUser } = useSelector(state=>state.user)
  const lastBookElementRef = useRef();

  const handleShowDetails = (book)=>{
    localStorage.setItem("bookDetail", JSON.stringify({title: book.title, summary: book.summary}))
    navigate('/books/book-detail')
  }

  
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(apiEndPoints.getAllPublishedBooks());
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch books.");
        }

        console.log("book data", data)
        if (data.success) {
          setBooks(data.data);
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="loader animate-spin border-t-4 border-blue-500 rounded-full h-16 w-16"></div>
      </div>
    );
  }

  if (!books.length) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-semibold text-gray-800">No books available</h1>
      </div>
    );
  }

  const handleReadBookClick = (book)=>{
    localStorage.setItem("bookToPreview", JSON.stringify(book))
    navigate(`/book/preview/${book?._id}}`)
  }
  
  return (
    <div className=" min-h-screen py-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Available Books</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {books.length > 0 ? (
          books.map((book, index) => (
            <div 
                key={index}
                ref={books.length === index + 1 ? lastBookElementRef : null}  // Attach ref to the last book
                className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition duration-200">
              {/* Book Title and Genre */}
              <div className="p-4">
                <h3 className="text-xl font-bold text-gray-800 truncate">{book.title}</h3>
                <div className="flex justify-between mt-2">
                    <p className="text-sm text-gray-500">{book.genre || book.category || "Unknown Genre"}</p>  
                    {
                      (book.subscribers.includes(currentUser?._id) || book.bookType === "FREE") ? 
                        <Button className="" color={'success'} onClick={()=>handleReadBookClick(book)}>
                          Read
                        </Button>:
                        <Button color={'warning'} className="h-8 flex justify-center items-center"> 
                          Buy Now 
                        </Button>  
                    }
                </div>
              </div>
        
              {/* Summary */}
              <div className="px-4 pb-2">
                <p className="text-gray-600 text-sm truncate">{<DisplayContent content={book.summary} /> || "No summary provided."}</p>
              </div>
        
              {/* Author Info */}
              <div
                onClick={()=>navigate(`/authors/author/${book?.author?._id}`)} 
                className="flex cursor-pointer items-center p-4 border-t border-gray-200">
                <img
                  src={book?.author?.profilePic || "/default-avatar.jpg"} // Default profile pic if none provided
                  alt={book?.author?.username}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="ml-3">
                  <h4 className="text-sm font-bold text-gray-800">{book.fullName || book?.author?.username}</h4>
                  <p className="text-sm text-gray-500">@{book?.author?.username}</p>
                </div>
              </div>
        
              {/* Additional Details */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-600">Published: {new Date(book.publishedDate).toDateString()}</p>
                    <p className="text-sm text-gray-600">Type: {book?.bookType}</p>
                    {book?.isOpenSource && (currentUser?._id !== book?.author?._id) && 
                    <div className="flex gap-5">
                      
                      <Button
                        onClick={()=>navigate(`/start-contribution/${book?.author?._id}/${book?._id}/${currentUser?._id}`)} 
                        color={'info'} 
                        className="h-5 flex justify-center items-center mt-2"> 
                          Contribute 
                      </Button>
                    </div> 
                    }
                  </div>
                  <div className="flex items-center">
                    {book?.bookType === "PREMIUM" ? (
                      <p className="text-lg font-bold text-green-500">{book.price} INR</p>
                    ) : (
                      <p className="text-lg font-bold text-blue-500">Free</p>
                    )}
                  </div>
                </div>
              </div>
        
              {/* Rating */}
              <div className="p-4 border-t border-gray-200 flex items-center justify-between">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="w-5 h-5 text-yellow-400"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.3 4.006a1 1 0 00.95.69h4.21c.969 0 1.371 1.24.588 1.81l-3.41 2.48a1 1 0 00-.364 1.118l1.3 4.006c.3.921-.755 1.688-1.538 1.118l-3.41-2.48a1 1 0 00-1.175 0l-3.41 2.48c-.782.57-1.837-.197-1.538-1.118l1.3-4.006a1 1 0 00-.364-1.118L2.51 9.432c-.783-.57-.38-1.81.588-1.81h4.21a1 1 0 00.95-.69l1.3-4.006z" />
                  </svg>
                  <span className="ml-1 text-sm text-gray-700">{book.starRating || "N/A"}</span>
                </div>
                {/* {book.bookType === "FREE" && <Button color={"success"}> Read Book </Button>} */}
                <button onClick={()=>handleShowDetails(book)} className="text-blue-500 hover:underline text-sm">View Details</button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-600 dark:text-gray-400 w-full min-h-screen flex justify-center items-center flex-col">
            No Books
          </div>
        )}
      </div>
      </div>
    </div>
  );
}
