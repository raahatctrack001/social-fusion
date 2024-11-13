import { Button, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiSearch } from "react-icons/hi";
import { apiEndPoints } from "../apiEndPoints/api.addresses";
import AuthorCard from "./AuthorCard";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateSuccess } from "../redux/slices/user.slice";

export default function ShareWithUser({ heading, selectedUsers, setSelectedUsers }) {
    const { currentUser } = useSelector(state => state.user);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchedUsers, setSearchedUsers] = useState([]);
    const [userFound, setUserFound] = useState(false);
    const [users, setUsers] = useState([]);
    const [currentUserPage, setCurrentUserPage] = useState(1);
    const mapperList = searchedUsers.length > 0 ? searchedUsers : users;
    
    const [isLoadingUsers, setIsLoadingUsers] = useState(false);
    const dispatch = useDispatch();

    // Fetch users on page load and whenever the currentUserPage changes
    useEffect(() => {
        const fetchUsers = async () => {
            setIsLoadingUsers(true);
            try {
                const response = await fetch(apiEndPoints.getUsersAddress(currentUserPage));
                if (!response.ok) throw new Error("Failed to fetch users");
                const data = await response.json();
                setUsers(prevUsers => [...prevUsers, ...data.data?.safeUsers]);
            } catch (err) {
                console.error("Error fetching users", err);
            } finally {
                setIsLoadingUsers(false);
            }
        };
        fetchUsers();
    }, [currentUserPage]);

    // Scroll event handler for users
    const handleUserScroll = (e) => {
        const { scrollTop, scrollHeight, clientHeight } = e.target;
        if (scrollTop + clientHeight >= scrollHeight - 5 && !isLoadingUsers) {
            setCurrentUserPage(prevPage => prevPage + 1);
        }
    };

    // Search for users
    useEffect(() => {
        if (searchTerm.trim() !== '') {
            const timeout = setTimeout(async () => {
                try {
                    const response = await fetch(apiEndPoints.searchUsersAddress(searchTerm), { method: "POST" });
                    if (!response.ok) throw new Error("Error searching users");
                    const data = await response.json();
                    if (data.success) {
                        setSearchedUsers(data.data);
                        setUserFound(true);
                    }
                } catch (err) {
                    console.error("Error searching users", err);
                }
            }, 1000);
            return () => clearTimeout(timeout);
        } else {
            setSearchedUsers([]);
            setUserFound(false);
        }
    }, [searchTerm]);

    const handleToggleFollowButtonClick = async (author) => {
        try {
            await fetch(apiEndPoints.toggleFollowUserAddress(author._id), {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                }
            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(response.message || "Network response isn't ok!");
                }
                return response.json();
            })
            .then((data) => {
                if (data.success) {
                    dispatch(updateSuccess(data?.data?.follower));
                }
            });
        } catch (error) {
            alert(error.message);
        }
    };

    const handleUserClick = (authorId)=>{
        if(selectedUsers.includes(authorId)){
            setSelectedUsers(prevSelected=>prevSelected.filter(userId=>userId !== authorId))
        }
        else{
            setSelectedUsers(prevSelected=>[...prevSelected, authorId]);
        }
    }
    // Check if a user is in selectedUsers
    const isSelected = (userId) => selectedUsers && selectedUsers.includes(userId);

    return (
        <div className="mt-2 p-2 rounded-lg shadow-lg bg-white dark:bg-gray-800">
            <h1 className="text-center font-bold text-3xl tracking-wide text-gray-800 dark:text-gray-200 mb-1">
                {heading || "Users"}
                {searchTerm && searchedUsers.length === 0 && (
                    <p>{!userFound ? <span className='text-green-500'>searching...</span> : <span className='text-red-500'>user not found</span>}</p>
                )}
            </h1>
            <TextInput
                className='mb-2'
                icon={HiSearch}
                placeholder='search user...'
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div
                className="flex flex-col gap-4 overflow-y-scroll mb-1 bg-gray-100 dark:bg-gray-900 p-4 rounded-lg shadow-inner"
                style={{ height: '44rem' }}
                onScroll={handleUserScroll}>
                {mapperList.length > 0 ? mapperList.map((author, index) => (
                    <div
                        onClick={()=>handleUserClick(author?._id)}
                        key={index}
                        className={`flex justify-between items-center gap-4 p-4 rounded-lg cursor-pointer transition-shadow duration-300 
                            ${isSelected(author._id) ? 'bg-yellow-200 dark:bg-yellow-700' : 'bg-white dark:bg-gray-700'}
                            border border-gray-300 dark:border-gray-600 shadow-md hover:shadow-lg`}
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
                )) : <div>No Users! Be the first to sign in.</div>}
            </div>
        </div>
    );
}
