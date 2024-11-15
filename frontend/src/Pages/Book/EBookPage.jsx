import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiEndPoints } from "../../apiEndPoints/api.addresses";
import PageLoader from "../../Compnents/PageLoader";
import DisplayContent from "../../Compnents/DisplayContent";
import { Button } from "flowbite-react";

function EbookPage() {
    const bookData = JSON.parse(localStorage.getItem("bookToPreview"));
    console.log(bookData);
    const [book, setBook] = useState(bookData);
    const [pages, setPages] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const wordsPerPage = 300; // Adjust for preferred page length
    const navigate = useNavigate();
  
    // useEffect(()=>{
    //     (async ()=>{
    //         const response = await fetch(apiEndPoints.getBook(bookId));
    //         const data = await response.json();

    //         if(!response.ok)
    //             throw new Error(data.message || "Network response wasn't ok while fetching book")
            
    //         console.log(data)
    //         if(data.success){
    //             setBook(data.data)
    //         }
    //     })()
    // }, [bookId])
    if (!book) {
      return <PageLoader info={"Please wait while we load your book!"} />;
    }
  
    const { title, content, coverPage, author } = book;
  
    // Split content into pages
    useEffect(() => {
      if (content) {
        const contentWords = content.split(" ");
        const splitPages = [];
        for (let i = 0; i < contentWords.length; i += wordsPerPage) {
          splitPages.push(contentWords.slice(i, i + wordsPerPage).join(" "));
        }
        setPages(splitPages);
      }
    }, [content]); // Add `content` as a dependency
  
    const handleNextPage = () => {
      if (currentPage < pages.length - 1) {
        setCurrentPage(currentPage + 1);
      }
    };
  
    const handlePreviousPage = () => {
      if (currentPage > 0) {
        setCurrentPage(currentPage - 1);
      }
    };
    const handlePublishNowclick = ()=>{
        localStorage.setItem("bookToPublish", JSON.stringify(book));
        navigate(`/books/book/publish/${book?._id}`);
    }
    return (
      <div className="ebook-container min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
        {/* Cover Section */}
        <div className="w-full flex justify-center items-center">
            <Button
                onClick={handlePublishNowclick} 
                className="w-full max-w-7xl relative top-32" color={'warning'} > Publish Now </Button>
        </div>
        <div
          className="cover-page w-full h-screen bg-cover bg-center flex items-center justify-center text-white"
          style={{
            backgroundImage: `url(${coverPage})`,
          }}
        >
          <div className="text-center backdrop-blur-sm bg-black/50 p-6 rounded-lg">
            <h1 className="text-4xl font-bold mb-4">{title}</h1>
            <p className="text-lg">
              By <span className="font-semibold">{author.fullName}</span>{" "}
              (<span className="italic">@{author.username}</span>)
            </p>
            <button
              onClick={() => setCurrentPage(0)}
              className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold"
            >
              Start Reading
            </button>
          </div>
        </div>
  
        {/* Content Section */}
        <div className="content-section px-4 sm:px-8 lg:px-16 py-8 w-full grid place-items-center relative bottom-28">
          <div className="prose prose-lg dark:prose-invert max-w-7xl mb-8">
            <h2 className="text-2xl font-bold mb-6 text-center">{title}</h2>
            <p className="leading-relaxed">{<DisplayContent content={pages[currentPage]} /> }</p>
          </div>
  
          {/* Page Divider */}
          <div className="divider flex justify-center py-4">
            <span className="block w-3/4 border-t border-gray-300 dark:border-gray-600"></span>
          </div>
  
          {/* Navigation Controls */}
          <div className="flex justify-between items-center mt-8 gap-5">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 0}
              className={`px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold ${
                currentPage === 0 && "opacity-50 cursor-not-allowed"
              }`}
            >
              Previous
            </button>
            <span className="text-gray-500">
              Page {currentPage + 1} of {pages.length}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === pages.length - 1}
              className={`px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold ${
                currentPage === pages.length - 1 && "opacity-50 cursor-not-allowed"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  export default EbookPage;
  