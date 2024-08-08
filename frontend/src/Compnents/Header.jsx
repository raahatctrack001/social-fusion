
import { Button, Navbar, TextInput } from "flowbite-react";
import { HiDocumentSearch, HiLogin, HiSearch, HiSearchCircle, HiSun } from "react-icons/hi";

export default function Header() {
  return (
    <Navbar fluid rounded className="lg:px-10 border-b-2">
      <Navbar.Brand href="">
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
      <Button outline className="bg-gray-800"> 
        <span className="flex justify-center items-center pr-1"> <HiLogin /> </span>
        <span className="hidden md:inline"> Sign In </span> </Button>
      <Button outline className="bg-gray-800"> <span className="flex justify-center items-center"><HiSun /></span> </Button>
        <Navbar.Toggle />
      </div>
        {/* <div className="flex gap-2 lg:gap-5 "> */}
      <Navbar.Collapse className="">
          <Navbar.Link className="" href="#" active>
            Home
          </Navbar.Link>
          <Navbar.Link className="" href="#">About</Navbar.Link>
          <Navbar.Link className="" href="#">Services</Navbar.Link>
          <Navbar.Link className="" href="#">Pricing</Navbar.Link>
          <Navbar.Link  className=""href="#">Contact</Navbar.Link>
      </Navbar.Collapse>
        {/* </div> */}
    </Navbar>
  );
}

