import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { HiArrowRight } from "react-icons/hi";
import { Link, useNavigate } from 'react-router-dom'

export default function Register() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col lg:flex-row justify-center max-w-full gap-3 items-center m-5 border-2 border-gray-400 rounded-xl ">
      
        <div className=" flex flex-col justify-start items-center gap-5  py-20 px-5 rounded-xl">
          <div className="">
            <h1 className=" py-10 flex justify-center items-center text-2xl md:text-6xl font-bold mb-2 flex-nowrap"> Register Here </h1>
            <div className="flex justify-center items-center gap-5 pt-3 mb-5 bg-gray-200 rounded-lg px-3">
              <p className="flex-1 w-full self-center whitespace-nowrap text-xl md:text-2xl xl:text-3xl font-bold  p-2 rounded-2xl text-gray-900 mb-5 flex justify-center">Soul Echo </p>
              <span className="flex-3 font-semibold text-lg pb-4 text-gray-500">Unleash your soul's voice <span className="hidden md:inline">—share your deepest thoughts and stories with us.</span></span>
            </div>
            <p className="hidden md:inline font-semibold text-gray-400"> Your voice is unique, and your story is powerful. Join our community and share your journey with the world. Together, we inspire, connect, and grow. Register today and become a part of something extraordinary.</p>
          </div>     
        </div>
        <form className=" flex flex-col w-full gap-4 justify-center py-10 rounded px-2">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email2" value="Your email" />
            </div>
            <TextInput id="email2" type="email" placeholder="name@flowbite.com" required shadow />
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="password2" value="Your password" />
            </div>
            <TextInput id="password2" type="password" required shadow />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="repeat-password" value="Repeat password" />
            </div>
            <TextInput id="repeat-password" type="password" required shadow />
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
          <Button  type="submit" outline className="hover:bg-gray-800">Register new account</Button>
          <p> Already have an accound? <Link to={"/sign-in"} className="text-blue-400 text-lg tracking-widest"> sign in </Link></p>
      </form>
    </div>
  );
}
