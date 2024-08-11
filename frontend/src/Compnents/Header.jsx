
import { Button, Navbar, TextInput } from "flowbite-react";
import { HiDocumentSearch, HiLogin, HiSearch, HiSearchCircle, HiSun } from "react-icons/hi";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const path = useLocation().pathname;
  
  return (
    <Navbar fluid rounded className="lg:px-10 border-b-2 sticky top-0 z-50">
      <Navbar.Brand href="/">
        {/* <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" /> */}
        <span className="self-center whitespace-nowrap text-xl md:text-2xl xl:text-3xl font-bold border-x-2 border-x-gray-900 p-2 rounded-2xl text-gray-900">Soul Echo</span>
      </Navbar.Brand>

      <TextInput 
        className="hidden lg:inline w-44 lg:w-64 xl:w-96 border-y-4 border-gray-900 rounded-2xl font-bold "
        placeholder="search post..."
        rightIcon={HiDocumentSearch}
        icon={HiSearch}
      />

      <Button outline className="bg-gray-800 lg:hidden"> <span className="flex justify-center items-center"><HiSearch /></span> </Button>


      <div className="flex gap-1 md:gap-2 md:order-2">
      <Button 
        onClick={()=>{navigate("/sign-in")}}
        outline className="bg-gray-800"> 
        
          <span className="flex justify-center items-center pr-1"> <HiLogin /> </span>
          <span className="hidden md:inline"> Sign In </span> 
        
        </Button>
      <Button outline className="bg-gray-800"> <span className="flex justify-center items-center"><HiSun /></span> </Button>
        <Navbar.Toggle />
      </div>
        {/* <div className="flex gap-2 lg:gap-5 "> */}
      <Navbar.Collapse className="">
          <Navbar.Link className="" href="/" active = {path === '/'} >
            Home
          </Navbar.Link>
          <Navbar.Link className="" href="/about" active = {path === '/about'} >About</Navbar.Link>
          <Navbar.Link className="" href="/services" active = {path === '/services'} >Services</Navbar.Link>
          <Navbar.Link className="" href="/prices" active = {path === '/prices'} >Pricing</Navbar.Link>
          <Navbar.Link className="" href="/contacts" active = {path === '/contacts'} >Contact</Navbar.Link>
      </Navbar.Collapse>
        {/* </div> */}
    </Navbar>
  );
}

