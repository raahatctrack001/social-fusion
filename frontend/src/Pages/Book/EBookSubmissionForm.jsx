import React, { useState } from 'react';
import EditorForSummary from './EditorForSummary';
import PopupWindow from '../PopupWindow';

function EBookSubmissionForm() {
  
  const [formData, setFormData] = useState({
    isOpenSource: 'No',
    bookType: 'Free',
    price: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Process formData here, such as submitting to an API endpoint
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-gray-100 shadow-lg rounded-lg my-10">
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
            <option value="No">No</option>
            <option value="Yes">Yes</option>
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
  );
}

export default EBookSubmissionForm
