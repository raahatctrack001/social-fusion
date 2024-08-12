
import { Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { HiCog, HiCurrencyDollar, HiDatabase, HiDocumentSearch, HiLogin, HiLogout, HiSearch, HiSearchCircle, HiStatusOnline, HiSun, HiViewGrid } from "react-icons/hi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
// import { current } from "@reduxjs/toolkit";
import { useRef } from "react";
import { apiEndPoints } from "../apiEndPoints/api.addresses";
import { signoutSuccess } from "../redux/slices/user.slice";
export default function Header() {
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const path = useLocation().pathname;
  const { currentUser } = useSelector(state=>state.user);
  console.log(currentUser)
  const dispatch = useDispatch();
  const handleSignOut = async()=>{
    try {
        const response = await fetch(apiEndPoints.logoutAddress(), {
          method: "POST",
        });

        // console.log(response);

        const data = await response.json();
        // console.log(data);
        if(data.success){
          dispatch(signoutSuccess())
        }
    } catch (error) {
      console.log("error logging out!", error)
    }
  }
  
  return (
    <Navbar fluid rounded className="lg:px-10 border-b-2 sticky top-0 z-50">
      <Navbar.Brand href="/">
        {/* <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" /> */}
        <span className="self-center whitespace-nowrap text-xl md:text-2xl xl:text-3xl font-bold md:border-x-2 md:border-x-gray-900 p-2 rounded-2xl text-gray-900">Soul Echo</span>
      </Navbar.Brand>

      <TextInput 
        className="hidden lg:inline w-44 lg:w-64 xl:w-96 border-y-4 border-gray-900 rounded-2xl font-bold "
        placeholder="search post..."
        rightIcon={HiDocumentSearch}
        icon={HiSearch}
      />

      <Button outline className="bg-gray-800 lg:hidden"> <span className="flex justify-center items-center"><HiSearch /></span> </Button>


      <div className="flex gap-1 md:gap-2 md:order-2">
      {currentUser ?
      <div className=" flex gap-2" > 
          <img onClick={dropdownRef.current && dropdownRef.current.click()} className="h-10 rounded-full cursor-pointer hidden" src={currentUser.profilePic} alt={currentUser.username} />
          <div ref={dropdownRef} className=""> 
            <Dropdown label={currentUser.fullName.length > 10 ? currentUser.fullName.substr(0,10) : currentUser.fullName} outline arrowIcon={false}>
               <Dropdown.Header>
                 <span className="block text-sm">{currentUser.username}</span>
                 <span className="block truncate text-sm font-medium">{currentUser.email}</span>
               </Dropdown.Header>
               <Dropdown.Item icon={HiViewGrid}>Dashboard</Dropdown.Item>
               <Dropdown.Item icon={HiCog}>Edit Profile</Dropdown.Item>
               <Dropdown.Item icon={HiDatabase}>Statistics</Dropdown.Item>
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

          <Navbar.Link className="" href="/about" active = {path === '/about'} >About</Navbar.Link>
          <Navbar.Link className="" href="/services" active = {path === '/services'} >Services</Navbar.Link>
          <Navbar.Link className="" href="/prices" active = {path === '/prices'} >Pricing</Navbar.Link>
          <Navbar.Link className="" href="/contacts" active = {path === '/contacts'} >Contact</Navbar.Link>
      </Navbar.Collapse>
        {/* </div> */}
    </Navbar>
  );
}

