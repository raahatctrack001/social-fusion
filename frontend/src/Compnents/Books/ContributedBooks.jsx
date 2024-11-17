import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { apiEndPoints } from '../../apiEndPoints/api.addresses';
import { HiEye, HiPencil } from 'react-icons/hi';
import { Button } from 'flowbite-react';
import PageLoader from '../../Compnents/PageLoader';
import DisplayContent from '../../Compnents/DisplayContent';
import BookSummary from '../../Pages/Book/BookSummary';
import ChangeHistory from './changeHistory';

export default function ContributedBooks() {
  const { currentUser } = useSelector(state => state.user);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);  // Track the current page
  const [hasMore, setHasMore] = useState(true);  // Track if there are more books to load
  const [showSummary, setShowSummary] = useState(false);
  const navigate = useNavigate();
  const observer = useRef();  // Create a ref for the observer
  const [showProgress, setShowProgess] = useState(false);
  const [contributionData, setContributionData] = useState([]);
  // Fetch books by page
  const fetchBooks = async (page) => {
    try {
      const response = await fetch(apiEndPoints.getContributedBooks(currentUser?._id));
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Network response isn't ok while fetching author's books");
      }

      if (data.success) {
        
        setBooks(data?.data);
        setHasMore(data.data.length > 0);  // If the current page has no data, set hasMore to false
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchBooks(page);
    }
  }, [currentUser, page]);

  // Infinite Scroll using IntersectionObserver
  const lastBookElementRef = useCallback((node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    });

    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  if (loading && books.length === 0) return <PageLoader info={"Loading your books"} />;
  const handleContinueContributingButtonClick = (book)=>{
    localStorage.setItem("bookToContribute", JSON.stringify(book))
    navigate(`/contribution/${book._id}/${book?._id}`)
  }

  const handleShowDetails = (book)=>{
    localStorage.setItem("bookDetail", JSON.stringify({title: book.documentId?.documentId?.title, summary: book.documentId?.summary}))
    navigate('/books/book-detail')
  }

  if(showProgress){
    return <ChangeHistory isOpen={showProgress} onClose={setShowProgess} data={contributionData} />
  }

  
  return (
    <div className="pl-16 author-books-dashboard px-4 py-6">
      <h2 className="text-2xl font-bold mb-4"> Contributing to: </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {books.length > 0 ? (
            books.map((book, index) => (
                <div
                key={index}
                ref={books.length === index + 1 ? lastBookElementRef : null}  // Attach ref to the last book
                className="book-card p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md"
                >
              <img
                src={book.documentId?.coverPage.length > 0 ? book.documentId?.coverPage.at(-1) : "https://static.vecteezy.com/system/resources/previews/020/422/215/non_2x/a4-size-book-cover-template-pastel-color-hand-drawn-floral-background-for-notebooks-books-reports-diaries-leaflets-school-books-vector.jpg"}
                alt={`${book.documentId?.title} cover`}
                className="w-full h-48 object-cover rounded-md mb-3"
                />
              <h3 className="text-lg font-semibold mb-1">{book.documentId?.title}</h3>
              <p className="text-xs text-gray-400 mb-1">Genre: {book.documentId?.category || "not known now"}</p>
              <p className="text-xs text-gray-400 mb-1">Pages: {Math.floor(book.documentId?.content.length / 300) || 1}</p>
              {book.documentId?.status === "PUBLISHED" && <p className="text-xs mb-1 text-yellow-300 font-bold">Published: {new Date(book.documentId?.publishedDate || book.documentId?.createdAt).toLocaleDateString()}</p>}
              <p className="text-xs text-gray-400 mb-1">Rating: {book.documentId?.starRating || 0}</p>
              
              {showSummary && <BookSummary summary={book.documentId?.summary || "No Description by author"} isOpen={showSummary} onClose={setShowSummary}/>}
              {book.documentId?.summary && <p 
                className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3 mb-3">
                    Description {book.documentId?.summary?.length > 200 ? 
                        <DisplayContent content={book.documentId?.summary.substr(0, 200)} /> : 
                        <DisplayContent content={book.documentId?.summary} />}
                </p>}
              <p className="text-xs font-semibold text-green-600 mb-1">Type: <span className='font-bold'> {book.documentId?.bookType} </span></p>
              <div className='flex justify-between mt-5'>
                {book.contributedContent?.length > 0 ? 
                    <Button 
                        color={'success'}
                        className="cursor-pointer hover:underline" 
                        onClick={()=>{
                            setContributionData(book.contributedContent);
                            setShowProgess(true)
                        }}
                        > See Progress
                    </Button>:
                    <Button 
                        className="cursor-pointer hover:underline" 
                        onClick={()=>handleShowDetails(book)}
                        >View Details
                    </Button>            
                }
                {  book?.contributor === currentUser?._id && 
                    <div className='flex gap-2'>
                    <Button 
                        color={'warning'}
                        onClick={()=>handleContinueContributingButtonClick(book)} 
                        className='cursor-pointer font-bold hover:text-gray-500'
                        > 
                        <div className='flex gap-1 justify-start items-center '> 
                            <HiPencil />  Continue Editing 
                        </div>
                    </Button>
                    <Button 
                      outline 
                      className='flex gap-1 justify-start items-center '
                      onClick={()=>{ localStorage.setItem("bookToPreview", JSON.stringify(book?.documentId)), navigate(`/book/preview/${book.documentId?._id}`)}}
                    >
                       Preview
                    </Button>
                    </div>
                }
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-600 dark:text-gray-400 w-full min-h-screen flex justify-center items-center flex-col">You haven't written any book yet.
            <Button color={'warning'} onClick={()=>navigate('/write-book')}> Start writing your first book </Button>  
          </div>
        )}
      </div>
      {loading && <p>Loading more books...</p>}
    </div>
  );
}
