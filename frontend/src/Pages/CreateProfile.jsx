import { Button, Checkbox, Label, Textarea, TextInput } from "flowbite-react";
import { HiArrowRight, HiGlobeAlt } from "react-icons/hi";
import { Link, useNavigate } from 'react-router-dom'

export default function CreateProfile() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col lg:flex-row justify-center max-w-full gap-3 items-center m-5 border-2 border-gray-400 rounded-xl md:m-10 lg:my-8 xl:my-10 ">
      
        <div className=" flex flex-col justify-start items-center mt-5 gap-5 px-5 rounded-xl">
          <div className="">
            <h1 className=" flex lg:mb-10 justify-center items-center text-3xl md:text-6xl font-bold mb-2 text-nowrap"> Introduce Yourself </h1>
            <div className="mt-5 flex justify-center items-center gap-5 mb-5 bg-gray-200 rounded-lg px-3">
              {/* <p className="flex-1 w-full self-center whitespace-nowrap text-xl md:text-2xl xl:text-3xl font-bold  p-2 rounded-2xl text-gray-900 mb-5 flex justify-center">Soul Echo </p> */}
              <span className="flex-3 font-semibold text-lg pb-4 text-gray-500">Hang on! We are setting up your space <span className="hidden md:inline">— Dont' forget to share your deepest thoughts and stories with us.</span></span>
            </div>
            {/* <p className="hidden md:inline font-semibold text-gray-400"> Your voice is unique, and your story is powerful. Join our community and share your journey with the world. Together, we inspire, connect, and grow. Register today and become a part of something extraordinary.</p> */}
          </div>     
        </div>
        <form className=" m-10 mt-5 flex flex-col w-full gap-4 justify-center  rounded px-2" >
          <div>
            <div className="mb-2 block">
              <Label htmlFor="fullName" value="Full Name" />
            </div>
            <TextInput id="fullName" type="text" placeholder="Your Name" required shadow />
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="bio" value="Bio" />
            </div>
            <Textarea className="h-32" id="bio" type="text" placeholder="Describe your passions and interests (max 250 characters)" required shadow />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="important links" value="Let the world connect with you (feel free to modify name and links)" />
            </div>
            <div className="border-2 border-gray-600 rounded-lg">
                <div className="flex w-full gap-1 ">
                    <TextInput className="w-1/4 font-bold text-black" placeholder="Instagram" />
                    <TextInput className="w-3/4" id="link1" type="text"  placeholder="Instagram account link" required shadow />
                </div> 
                <div className="flex w-full gap-1 ">
                    <TextInput className="w-1/4 font-bold text-black" placeholder="X" />
                    <TextInput className="w-3/4" id="link1" type="text"  placeholder="x link" required shadow />
                </div> 
                <div className="flex w-full gap-1 ">
                    <TextInput className="w-1/4 font-bold text-black" placeholder="YouTube" />
                    <TextInput className="w-3/4" id="link1" type="text"  placeholder="youtube channel link" required shadow />
                </div> 
                <div className="flex w-full gap-1 ">
                    <TextInput className="w-1/4 font-bold text-black" placeholder="Other" />
                    <TextInput className="w-3/4" id="link1" type="text"  placeholder="other account link" required shadow />
                </div> 

            </div>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="agree" />
            <Label htmlFor="agree" className="flex">
              I agree with the&nbsp;
              <Link href="#" className="text-cyan-600 hover:underline dark:text-cyan-500">
                terms and conditions
              </Link>
            </Label>
          </div>
          <Button  type="submit" outline className="hover:bg-gray-800">Create Account</Button>
          <p> Already have an accound? <Link to={"/sign-in"} className="text-blue-400 text-lg tracking-widest"> sign in </Link></p>
      </form>
    </div>
  );
}
