import React, { useState } from 'react'
import CustomDropdown from './CustomDropdown';
import CategorisedPost from './CategorisedPost';

const PostCategoryDropdown = () => {
    const [category, setCategory] = useState("");
      const categories = [
    "Technology",
    "Health & Wellness",
    "Business & Finance",
    "Education",
    "Entertainment",
    "Lifestyle",
    "Travel",
    "Food & Drink",
    "Fashion",
    "Sports",
    "Art & Design",
    "Science",
    "DIY & Crafts",
    "Personal Development",
    "Uncategorised",
    "All Category",
  ];

    const handleCategorySelect = (value) => {
    console.log("values selected at home category", value);
    setCategory(value);
    if (value === "All Category") setCategory("");
  };
  return (
    <div>
        <CustomDropdown options={categories} onSelect={handleCategorySelect} />
    </div>
  )
}

export default PostCategoryDropdown