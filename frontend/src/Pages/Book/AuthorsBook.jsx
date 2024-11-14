import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { apiEndPoints } from '../../apiEndPoints/api.addresses';

export default function AuthorsBook() {
  const { currentUser } = useSelector(state=>state.user)  
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(apiEndPoints.getBooks(currentUser?._id));
        const data = await response.json();
        
        if(!response.ok){
            throw new Error(data.message || "Network response isn't ok while fetching authors book")
        }
        console.log(data)
        if(data.success){
            console.log(data);
            setBooks(data.data);
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  if (loading) return <p>Loading books...</p>;

  return (
    <div className="pl-16 author-books-dashboard px-4 py-6">
      <h2 className="text-2xl font-bold mb-4"> My Books </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.length > 0 ? (
          books.map(book => (
            <div key={book._id} className="book-card p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <img
                src={book.coverImage || "https://static.vecteezy.com/system/resources/previews/020/422/215/non_2x/a4-size-book-cover-template-pastel-color-hand-drawn-floral-background-for-notebooks-books-reports-diaries-leaflets-school-books-vector.jpg"}
                alt={`${book.title} cover`}
                className="w-full h-48 object-cover rounded-md mb-3"
              />
              <h3 className="text-lg font-semibold mb-1">{book.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">By {book.author?.fullName} (@{book.author?.username})</p>
              <p className="text-xs text-gray-400 mb-1">Genre: {book.category || "not known now"}</p>
              <p className="text-xs text-gray-400 mb-1">Pages: {Math.floor(book.content.length/300) || 1}</p>
              <p className="text-xs text-gray-400 mb-1">Published: {new Date(book.createdAt).toLocaleDateString()}</p>
              <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3 mb-3">{book.summary}</p>
              <p className="text-xs font-semibold text-blue-600 mb-1">Type: {book.bookType}</p>
              <a href={`/books/${book._id}`} className="text-blue-500 hover:underline">View Details</a>
            </div>
          ))
        ) : (
          <p className="text-gray-600 dark:text-gray-400">No books found for this author.</p>
        )}
      </div>
    </div>
  );
};

