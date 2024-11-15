import React, { useState } from 'react';
import EditorForSummary from './EditorForSummary';
import PopupWindow from '../PopupWindow';
import { useNavigate, useParams } from 'react-router-dom';
import { apiEndPoints } from '../../apiEndPoints/api.addresses';
import { useSelector } from 'react-redux';
import PageLoader from '../../Compnents/PageLoader';

function EBookSubmissionForm() {
  const { currentUser } = useSelector(state=>state.user);
  const params = useParams();
  const  { bookId } = params;
  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    isOpenSource: false,
    bookType: 'FREE',
    price: 0,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(formData.bookType === "PREMIUM"){
      if(formData.price == 0){
        alert("Premium books cost must be greater than 0");
        return;
      }
    }
    const newFormData = new FormData();
    newFormData.append("isOpenSource", formData.isOpenSource);
    newFormData.append("bookType", formData.bookType);
    newFormData.append("price", formData.price)
    
    setLoading(true);
    try {
      const response = await fetch(apiEndPoints.publishBook(bookId, currentUser?._id),{
        method: "PUT",
        body: newFormData,
      });
      const data = await response.json();

      if(!response.ok)
          throw new Error(data.message || "Network response wasnot ok while publishing book")

      console.log(data);
      if(data.success){
        setLoading(false);
        console.log("published data", data);
        navigate(`/books/published/${currentUser?._id}`)
      }
    } catch (error) {
      console.log(error);
    }
    finally{
      setLoading(false)
    }

  };
  if(loading){
    return <PageLoader info={"publishing your book."}/>
  }

  return (
    <div className='min-h-screen w-full flex justify-center items-center'>

<div className="w-full max-w-7xl p-8 bg-gray-100 shadow-lg rounded-lg my-10">
      <h2 className="text-3xl font-bold text-gray-700 mb-6">E-Book Submission</h2>
      <form onSubmit={handleSubmit} className="space-y-5">

        
        {/* Is Open Source */}
        <div>
          <label className="block text-gray-600 font-medium mb-1">Do you want to keep it open source?</label>
          <select
            name="isOpenSource"
            value={formData.isOpenSource}
            onChange={handleChange}
            className="w-full p-3 border text-black rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          >
            <option value={false}> NO </option>
            <option value={true}> YES </option>
          </select>
        </div>

        {/* Book Type */}
        <div>
          <label className="block text-gray-600 font-medium mb-1">Book Type</label>
          <select
            name="bookType"
            value={formData.bookType}
            onChange={handleChange}
            className="w-full p-3 text-black border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          >
            <option value="FREE">FREE</option>
            <option value="PREMIUM">PREMIUM</option>
          </select>
        </div>

        {/* Price (Conditionally Rendered) */}
        {formData.bookType === 'PREMIUM' && (
          <div>
            <label className="block text-gray-600 font-medium mb-1">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              placeholder="Enter the price in INR"
              className="w-full p-3 border rounded-lg text-black focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
        )}

        {/* Summary
        {!formData.summary && <div>
          <label className="block text-gray-600 font-medium mb-1">Summary</label>
          <textarea
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            rows="4"
            placeholder="Brief summary of the book"
            required
            className="w-full p-3 border text-black rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>} */}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Submit Book
        </button>
      </form>
    </div>
    </div>
  );
}

export default EBookSubmissionForm
