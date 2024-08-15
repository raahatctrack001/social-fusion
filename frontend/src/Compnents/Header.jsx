
import { Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { HiCog, HiCurrencyDollar, HiDatabase, HiDocumentAdd, HiDocumentSearch, HiLockClosed, HiLockOpen, HiLogin, HiLogout, HiPencil, HiSearch, HiSearchCircle, HiStatusOnline, HiSun, HiViewGrid, HiX } from "react-icons/hi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
// import { current } from "@reduxjs/toolkit";
import { useRef, useState } from "react";
import { apiEndPoints } from "../apiEndPoints/api.addresses";
import { signoutSuccess } from "../redux/slices/user.slice";


export default function Header() {
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const path = useLocation().pathname;
  const { currentUser } = useSelector(state=>state.user);

  const [showSearchPopup, setShowSearchPopup] = useState(false);
  // console.log(currentUser)
  const dispatch = useDispatch();
  const handleSignOut = async()=>{
    try {
      const response = await fetch(apiEndPoints.logoutAddress(), {
        method: "POST",
      });
      const data = await response.json(); 

      // console.log("response", response);
      console.log("data", data);
      alert(data.message)  
      navigate("/sign-in")
      dispatch(signoutSuccess())
        
    } catch (error) {
      console.log("error logging out!", error)
    }
  }
  const handleSearchTerm = async (e)=>{
    navigate(`/search-posts?query=${encodeURIComponent(e.target.value)}`);
  }
  // console.log(searchTerm)
  return (
    <div className="sticky top-0 z-50">
    {/* ///search popup starts here */}
    {showSearchPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-20">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col">
            <div className="flex justify-between relative">
            <div> </div>
            <div onClick={()=>setShowSearchPopup(!showSearchPopup)} className="relative bottom-3 right-2"> <HiX className="text-red-700"/> </div>
            </div>
           <TextInput 
                onChange={(e)=>navigate(`/search-posts/?query=${e.target.value}`)}
                type="text" placeholder="search title content or category of post..." /> 
            
          </div>
        </div>
      )}

      {/* ///search popup ends here */}
    <Navbar fluid rounded className="lg:px-10 border-b-2">
      <Navbar.Brand href="/">
        {/* <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" /> */}
        <span className="self-center whitespace-nowrap md:text-xl font-bold md:border-x-2 md:border-x-gray-900 px-2 rounded-2xl text-gray-900">Soul Echo</span>
      </Navbar.Brand>

      <TextInput 
        className="hidden lg:inline w-44 lg:w-64 xl:w-96 border-gray-900 rounded-2xl font-bold "
        placeholder="search post..."
        rightIcon={HiDocumentSearch}
        icon={HiSearch}
        id="searchTerm"
        onChange={handleSearchTerm}
      />

      <Button onClick={()=>setShowSearchPopup(!showSearchPopup)} outline className="bg-gray-800 lg:hidden"> <span className="flex justify-center items-center"><HiSearch /></span> </Button>


      <div className="flex gap-1 md:gap-2 md:order-2">
      {currentUser ?
      <div className=" flex gap-2" > 
          <img onClick={()=>navigate(`authors/author/${currentUser?._id}`)} className="h-10 w-10 aspect-w-1 aspect-h-1 rounded-full cursor-pointer hidden md:inline" src={currentUser.profilePic} alt={currentUser.username} />
          <div ref={dropdownRef} className=""> 
            <Dropdown label={currentUser?.fullName?.length > 10 ? currentUser?.fullName?.substr(0,10) : currentUser?.fullName} outline arrowIcon={false}>
               <Dropdown.Header>
                 <span className="block text-sm">{currentUser.username}</span>
                 <span className="block truncate text-sm font-medium">{currentUser.email}</span>
               </Dropdown.Header>
               <Dropdown.Item href="/dashboard" icon={HiViewGrid}>Dashboard</Dropdown.Item>
               <Dropdown.Item href="/edit-profile" icon={HiPencil}>Update Profile</Dropdown.Item>
               {/* <Dropdown.Item href=  icon={HiLockOpen}>Update Password</Dropdown.Item> */}
               <Dropdown.Item href="/create-post" icon={HiDocumentAdd}>Create Post</Dropdown.Item>
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
        <Button outline className="bg-gray-800 hidden md:inline"> <span className="flex justify-center items-center"><HiSun /></span> </Button>
        <Navbar.Toggle />
      </div>
        {/* <div className="flex gap-2 lg:gap-5 "> */}
      <Navbar.Collapse className="">
          <Navbar.Link className="" href="/" active = {path === '/'} >
            Home
          </Navbar.Link>
          <Button outline className="md:hidden"> <span className="flex justify-center items-center gap-2"> switch to dark theme <HiSun /></span> </Button>

          <Navbar.Link className="text-sm" href="/about" active = {path === '/about'} >About</Navbar.Link>
          <Navbar.Link className="text-sm" href="/services" active = {path === '/services'} >Services</Navbar.Link>
          <Navbar.Link className="text-sm" href="/prices" active = {path === '/prices'} >Pricing</Navbar.Link>
          <Navbar.Link className="text-sm" href="/contacts" active = {path === '/contacts'} >Contact</Navbar.Link>
      </Navbar.Collapse>
        {/* </div> */}
    </Navbar>
    </div>
  );
}

