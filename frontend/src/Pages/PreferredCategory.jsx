import React, { useState } from 'react';
import { apiEndPoints } from '../apiEndPoints/api.addresses';
import { useDispatch, useSelector } from 'react-redux';
import { signInSuccess } from '../redux/slices/user.slice';
import { useNavigate } from 'react-router-dom';
import LoaderPopup from '../Compnents/Loader';

const categories = [
  "Technology", "Health & Wellness", "Business & Finance", "Education", "Entertainment",
  "Lifestyle", "Travel", "Food & Drink", "Fashion", "Sports", "Art & Design", "Science",
  "DIY & Crafts", "Personal Development", "Uncategorised", "All Category",
];

export default function PreferredCategories() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state=>state.user);  
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const navigate = useNavigate();

  const handleCategorySelect = (category) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(category)
        ? prevSelected.filter((cat) => cat !== category)
        : [...prevSelected, category]
    );
  };

  const handleSubmit = async () => {
    // Handle the submit action here
    console.log("Selected Categories:", selectedCategories);
    setLoading(true);
    try {
        const formData = new FormData();
        formData.append("selectedCategory[]", selectedCategories);

        const response = await fetch(apiEndPoints.updatePreference(currentUser?._id), {
            method: "PATCH",
            body: formData,
        })
        const data = await response.json();
        if(data.success){
            console.log(data);
            dispatch(signInSuccess(data.data));
            localStorage.removeItem("askPreferredCategory");
            navigate('/')
        }
    } catch (error) {
        setError(error.message);
        console.log(error)
    }
    finally{
        setLoading(false);
    }
  };

  const colors = [
    "bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-pink-500", "bg-purple-500",
    "bg-indigo-500", "bg-red-500", "bg-teal-500", "bg-orange-500", "bg-gray-500"
  ];

  return (
    <div className="container mx-auto p-4 w-full flex flex-col h-full justify-center items-center">
      <h1 className="text-2xl font-bold text-center mb-4 text-gray-800 dark:text-gray-200">Choose Your Preferred Categories</h1>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
        Select the categories you're most interested in. We'll use these to recommend posts just for you.
      </p>
      <LoaderPopup loading={loading} setLoading={setLoading} info={"setting you preference. please wait"} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-4">
        {categories.map((category, index) => (
          <div
            key={category}
            onClick={() => handleCategorySelect(category)}
            className={`p-3 border rounded-lg cursor-pointer text-center transition-colors duration-300 ${
              selectedCategories.includes(category)
                ? `${colors[index % colors.length]} text-white`
                : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200"
            }`}
            
          >
            {category}
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-6 gap-2">
        {error && <Alert colors={'failure'} > {error.message} </Alert>}
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Save Preferences
        </button>
        {/* <button
            
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        > 
            skip 
        </button> */}
      </div>
    </div>
  );
}
