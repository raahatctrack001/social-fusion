import { useNavigate } from "react-router-dom"

export default function ShowBooks({ heading, books }){
    const navigate = useNavigate();
    const handleShowDetails = (book)=>{
        localStorage.setItem("bookDetail", JSON.stringify({title: book.title, summary: book.summary}))
        navigate('/books/book-detail')
      } 
return <div className="pl-16 author-books-dashboard px-4 py-6">
    <h2 className="text-2xl font-bold mb-4"> {heading|| "Books"} </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {books.length > 0 ? (
          books.map((book, index) => (
              <div
              key={index}
              ref={books.length === index + 1 ? lastBookElementRef : null}  // Attach ref to the last book
              className="book-card p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md"
              >
            <img
              src={book.coverImage || "https://static.vecteezy.com/system/resources/previews/020/422/215/non_2x/a4-size-book-cover-template-pastel-color-hand-drawn-floral-background-for-notebooks-books-reports-diaries-leaflets-school-books-vector.jpg"}
              alt={`${book.title} cover`}
              className="w-full h-48 object-cover rounded-md mb-3"
              />
            
            <h3 className="text-lg font-semibold mb-1">{book.title}</h3>
            <p className="text-xs text-gray-400 mb-1">Genre: {book.category || "not known now"}</p>
            <p className="text-xs text-gray-400 mb-1">Pages: {Math.floor(book.content.length / 300) || 1}</p>
            <p className="text-xs text-gray-400 mb-1">Published: {new Date(book.createdAt).toLocaleDateString()}</p>
            <p className="text-xs text-gray-400 mb-1">Rating: {book.starRating || 0}</p>
            
            {showSummary && <BookSummary summary={book.summary || "No Description by author"} isOpen={showSummary} onClose={setShowSummary}/>}
            {book.summary && <p 
              className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3 mb-3">
                  Description: {book.summary?.length > 200 ? 
                      <DisplayContent content={book.summary.substr(0, 200)} /> : 
                      <DisplayContent content={book.summary} />}
              </p>}
            <p className="text-xs font-semibold text-green-600 mb-1">Type: <span className='font-bold'> {book.bookType} </span></p>
            <div className='flex justify-between mt-5'>
                <Button 
                    className="cursor-pointer hover:underline" 
                    onClick={()=>handleShowDetails(book)}
                    >View Details
                </Button>
            </div>
          </div>
        ))
      ) : (
        <div className="text-gray-600 dark:text-gray-400 w-full min-h-screen flex justify-center items-center flex-col">
            No published book yet.
        </div>
      )}
    </div>
    {loading && <p>Loading more books...</p>}
  </div>
}