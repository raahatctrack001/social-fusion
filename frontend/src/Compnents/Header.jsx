
import { Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { HiBell, HiBookOpen, HiChat, HiCog, HiCurrencyDollar, HiDatabase, HiDocumentAdd, HiDocumentSearch, HiLockClosed, HiLockOpen, HiLogin, HiLogout, HiMoon, HiOutlineBell, HiPencil, HiSearch, HiSearchCircle, HiStatusOnline, HiSun, HiUserAdd, HiViewGrid, HiX } from "react-icons/hi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
// import { current } from "@reduxjs/toolkit";
import { useEffect, useRef, useState } from "react";
import { apiEndPoints } from "../apiEndPoints/api.addresses";
import { signoutSuccess, updateSuccess } from "../redux/slices/user.slice";
import { toggleTheme } from "../redux/slices/theme.slice";
import { formatDistanceToNow } from "date-fns";
import { HiChatBubbleBottomCenterText } from "react-icons/hi2";
import HeaderSearch from "./HeaderSearch";



export default function Header() {
  const { currentUser } = useSelector(state=>state.user);
  const { theme } = useSelector(state=>state.theme);

  const [isOnline, setIsOnline] = useState(window.navigator.onLine)
  const [searchTerm, setSearchTerm] = useState('');
  const [searchedPost, setSearchedPost] = useState([]);
  const [showSearchedResult, setShowSearchedResult] = useState(false);
  const [showSearchPopup, setShowSearchPopup] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  useEffect(()=>{
     try {
      const heartBeat = async ()=>{
        const formData = new FormData();
        formData.append("status", window.navigator.onLine);
        const response = await fetch(apiEndPoints.toggleOnlineStatusAddress(currentUser?._id), {method: "PATCH", body: formData});
        const data = await response.json();
        // //console.log(data);
        if(data.success){
          // alert(data.success)
          // //console.log(data)
          //console.log(formatDistanceToNow(new Date(data?.data?.lastActive), { addSuffix: true }))
          dispatch(updateSuccess(data?.data))
          setIsOnline(data?.data?.isActive);
        }
      }
        heartBeat();
        const interval = setInterval(() => {
          heartBeat();
        }, 90000);

        return ()=>clearInterval(interval)
     } catch (error) {
      //console.log(error)
     }
  }, [])
  
  //console.log(isOnline)
  
  const handleSignOut = async()=>{
    try {
      const response = await fetch(apiEndPoints.logoutAddress(), {
        method: "POST",
      });
      const data = await response.json(); 

      // //console.log("response", response);
      //console.log("data", data);
      // alert(data.message)  
      localStorage.removeItem("currentUser")
      dispatch(signoutSuccess())
      // navigate("/sign-in")
        
    } catch (error) {
      //console.log("error logging out!", error)
    }
  }

  return (
    <div className="sticky top-0 z-50">
    {/* ///search popup starts here */}
    {showSearchPopup && (
        <div 
            // onMouseLeave={()=>//console.log("mouse left")}
            className="fixed inset-0 bg-opacity-50 z-20 flex items-start justify-center"
             >
          <div className= "bg-white dark:bg-gray-800 p-6 flex flex-col w-full max-w-lg rounded-lg border border-b-0 border-gray-800">
            <div className="flex justify-between relative">
            <p className="pl-1 font-semibold"> search post...</p>
            <div> </div>
            <div onClick={()=>setShowSearchPopup(!showSearchPopup)} className="relative bottom-3 right-2"> <HiX className="text-red-700 cursor-pointer"/> </div>
            </div>
            <TextInput 
            className="w-full max-w-lg"
            placeholder="search post..."
            rightIcon={HiDocumentSearch}
            icon={HiSearch}
            id="searchTerm"
            value={searchTerm}
            autoComplete="off"
            // onBlur={() => setSearchTerm('')}
            onChange={(e) => {setShowSearchedResult(true); setSearchTerm(e.target.value)}}
          />

          </div>
        </div>
      )}

      {/* ///search popup ends here */}
    <Navbar fluid rounded className="lg:px-10 border-b-2">
      <Navbar.Brand href="/">
        {/* <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" /> */}
        <span className="self-center whitespace-nowrap md:text-xl font-bold md:border-x-2 md:border-x-gray-900 dark:border-x-white px-2 rounded-2xl ">Social Fusion</span>
      </Navbar.Brand>

      {currentUser && 
        <div className="hidden lg:flex flex-col gap-3 w-44 lg:w-44 xl:w-96 p-2 rounded-2xl">
          <HeaderSearch />
        </div>
      }
      


      <Button onClick={()=>setShowSearchPopup(!showSearchPopup)} outline className="bg-gray-800 lg:hidden"> <span className="flex justify-center items-center"><HiSearch /></span> </Button>


      <div className="flex gap-1 md:gap-2 md:order-2">
      {currentUser ?
      <div className=" flex gap-2" >
          <span className={`h-2 w-2 ${currentUser?.isActive ? "bg-green-600": "bg-red-600"} rounded-full relative top-1 left-12`}></span>
          <img onClick={()=>navigate(`authors/author/${currentUser?._id}`)} className="h-10 w-10 aspect-w-1 aspect-h-1 rounded-full cursor-pointer hidden lg:inline" src={currentUser.profilePic.at(-1)} alt={currentUser.username} />
          <div ref={dropdownRef} className=""> 
            <Dropdown label={currentUser?.fullName?.split(' ')[0].length > 10 ? currentUser?.fullName?.substr(0,10) : currentUser?.fullName.split(' ')[0]} outline arrowIcon={false}>
               <Dropdown.Header>
                  <Link to={`/authors/author/${currentUser?._id}`}>        
                   <span className="block text-sm">{currentUser.username}</span>
                   <span className="block truncate text-sm font-medium">{currentUser.email}</span>
                  </Link>
               </Dropdown.Header>
               <div onClick={()=>dispatch(toggleTheme())} className="flex justify-start items-center gap-2 pl-4 cursor-pointer hover:bg-gray-500 h-9 hover-text-white sm:hidden"> {theme === 'dark' ? <HiSun /> : <HiMoon /> } toggle theme </div>
               <Dropdown.Item href="/dashboard?tab=home" icon={HiViewGrid}>Dashboard</Dropdown.Item>
               <Dropdown.Item href="/chatroom?tab=chat" icon={HiChatBubbleBottomCenterText}>Chat Room</Dropdown.Item>

               <Dropdown.Item href="/edit-profile" icon={HiPencil}>Update Profile</Dropdown.Item>
               {/* <Dropdown.Item href=  icon={HiLockOpen}>Update Password</Dropdown.Item> */}
               <Dropdown.Item href="/create-post" icon={HiDocumentAdd}>Create Post</Dropdown.Item>
               <Dropdown.Item href="/write-book" icon={HiBookOpen}> Write Book </Dropdown.Item>
               <Dropdown.Divider />
               <Dropdown.Item icon={HiLogout} onClick={handleSignOut}>Sign out</Dropdown.Item>
            </Dropdown>  
          </div>
      </div>
          : 
       
       (
        <Button 
        onClick={()=>{navigate("/sign-in")}}
        outline className="bg-gray-800"> 
        
          <span className="flex justify-center items-center pr-1"> <HiLogin /> </span>
          <span className="hidden md:inline"> Sign In </span> 
        
        </Button>)}
          <Button
            className='w-12 h-10 hidden sm:inline'
            color='gray'
            pill
            onClick={() => dispatch(toggleTheme())}
          >
            {theme === 'light' ?  <HiMoon /> : <HiSun />}
          </Button>        
      
      <Navbar.Toggle />
      </div>
        {/* <div className="flex gap-2 lg:gap-5 "> */}
      {currentUser && <Navbar.Collapse className="">
          <Navbar.Link className="" href="/" active = {path === '/'} >
            Home
          </Navbar.Link>
          {/* <Button outline className="md:hidden"> <span className="flex justify-center items-center gap-2"> switch to dark theme <HiSun /></span> </Button> */}

          <Navbar.Link className="text-sm" href="/about" active = {path === '/about'} >About</Navbar.Link>
          <Navbar.Link className="text-sm" href="/published-books" active = {path === '/published-books'} >Books</Navbar.Link>
          <Navbar.Link className="text-sm" href="/notifications" active = {path === '/notifications'} >
          <span className="md:hidden flex justify-start items-center"> Notification </span> 

            <div className="hidden md:inline"> 
              <span className="flex justify-start items-center"> Notif<span className="lg:hidden">n</span> <span className="hidden lg:inline">ications</span> <HiOutlineBell /> </span> 
              <div className="flex justify-center items-center gap-2">
                <div className="relative group">
                  <HiChat className="text-gray-600 dark:text-gray-300 hover:text-blue-500" />
                  <span className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden group-hover:block text-sm bg-gray-800 text-white rounded-lg py-1 px-2 shadow-lg">
                    Chat
                  </span>
                </div>
                    
                <div className="relative group">
                  <HiUserAdd className="text-gray-600 dark:text-gray-300 hover:text-blue-500" />
                  <span className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden group-hover:block text-sm bg-gray-800 text-white rounded-lg py-1 px-2 shadow-lg">
                    Follow
                  </span>
                </div>
                    
                <div className="relative group">
                  <HiDocumentAdd className="text-gray-600 dark:text-gray-300 hover:text-blue-500" />
                  <span className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden group-hover:block text-sm bg-gray-800 text-white rounded-lg py-1 px-2 shadow-lg">
                    Post
                  </span>
                </div>
              </div>

            </div>
          </Navbar.Link>
          <Navbar.Link className="text-sm" href="/contacts" active = {path === '/contacts'} >Contact</Navbar.Link>
      </Navbar.Collapse>}
        {/* </div> */}
    </Navbar>
      
      

    </div>
  );
}

