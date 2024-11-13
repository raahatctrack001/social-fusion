import { Button } from "flowbite-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AuthorCard from "./AuthorCard";

export default function UserCardAtHome({author, handleToggleFollowButtonClick}){
    const { currentUser } = useSelector(state=>state.user);
    const navigate = useNavigate();

    
    return <div
    // key={index}
    onClick={() => navigate(`/authors/author/${author._id}`)}
    className=" flex justify-between items-center gap-4 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 shadow-md hover:shadow-lg transition-shadow duration-300 p-4 rounded-lg cursor-pointer"
  >
    <AuthorCard author={author} />
    {author._id !== currentUser._id ? (
      <Button
        onClick={(e) => { e.stopPropagation(); handleToggleFollowButtonClick(author); }}
        className={`h-7 w-16 md:h-10 md:w-24 ml-7 flex justify-center items-center rounded-lg ${currentUser.followings.includes(author._id) ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'} transition-colors duration-300`}
      >
        {currentUser.followings.includes(author._id) ? 'Unfollow' : 'Follow'}
      </Button>
    ) : (
      <Button disabled className="bg-gray-500 text-white rounded-lg">You</Button>
    )}
  </div>
}