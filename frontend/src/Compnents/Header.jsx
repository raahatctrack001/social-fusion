import { Button, Navbar, TextInput } from "flowbite-react";
import { HiArrowSmUp, HiDocumentSearch, HiLogin, HiOutlineDocumentSearch, HiOutlineSearch, HiSearch, HiSearchCircle, HiSun } from "react-icons/hi";

export function Header() {
  return (
    <Navbar fluid rounded className="border-b-4 border-b-gray-600">
      <Navbar.Brand href="">
        {/* <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" /> */}
        <div className="border-2 border-teal-600 p-1 rounded-lg">          
          <span className="self-center whitespace-nowrap font-bold text-2xl dark:text-white">Soul Echo </span>
        </div>
      </Navbar.Brand>

      <form className="hidden sm:block sm:w-32 lg:w-96">
        <TextInput 
          placeholder="search..."
          icon={HiOutlineSearch}
          rightIcon={HiOutlineDocumentSearch}
        />
      </form>

      <div className="flex md:order-2 gap-2 pl-1">        
        <Button> <span className="flex justify-center items-center pr-1"> <HiSun /> </span> </Button>
        <Button > <span className="flex justify-center items-center pr-1"> <HiLogin /> </span>  Sign In </Button>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="#" active>
          Home
        </Navbar.Link>
        <Navbar.Link href="#">About</Navbar.Link>
        <Navbar.Link href="#">Services</Navbar.Link>
        <Navbar.Link href="#">Pricing</Navbar.Link>
        <Navbar.Link href="#">Contact</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
