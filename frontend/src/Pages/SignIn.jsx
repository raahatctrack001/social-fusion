import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { HiArrowRight, HiEye, HiUserAdd } from "react-icons/hi";
import { Link, useNavigate } from 'react-router-dom'

const hasUpperCase = /[A-Z]/;
const hasLowerCase = /[a-z]/;
const hasNumber = /\d/;
const hasSpecialChar = /[!@#$%^&*(),.?":{}|]/;


function validatePassword(password) {
  const results = {
    hasUpperCase: hasUpperCase.test(password),
    hasLowerCase: hasLowerCase.test(password),
    hasNumber: hasNumber.test(password),
    hasSpecialChar: hasSpecialChar.test(password),
  };

  return results;
}

export default function SignIn() {
  const [formData, setFormData] = useState({
    userEmail:'',
    password:''
  })
  const [passwordFocus, setPasswordFocus] = useState(false)
  const handleSignIn = async ()=>{

  }
  console.log(formData)
  const validationResults = validatePassword(formData.password);

  return (
    <div className="flex flex-col lg:flex-row justify-center max-w-full gap-3 items-center m-5 border-2 border-gray-400 rounded-xl ">
      
        <div className=" flex flex-col justify-start items-center mt-5 gap-5 px-5 rounded-xl">
          <div className="">
            <h1 className="md:hidden flex flex-col lg:mb-10 justify-center items-center text-3xl font-bold mb-2 flex-nowrap"> <span>Welcome Back!</span> </h1>
            <h1 className="hidden  md:flex lg:mb-10 justify-center items-center text-3xl font-bold mb-2 flex-nowrap"> Let's pick up where you left off —log in now. </h1>
            <div className="mt-5 flex justify-center items-center gap-5 mb-5 bg-gray-200 rounded-lg px-3">
              {/* <p className="flex-1 w-full self-center whitespace-nowrap text-xl md:text-2xl xl:text-3xl font-bold  p-2 rounded-2xl text-gray-900 mb-5 flex justify-center">Soul Echo </p> */}
              <span className="flex-3 py-3 font-semibold text-lg pb-4 text-gray-500"> <span className="flex text-nowrap md:hidden">Log in to continue</span> <span className="hidden md:inline">Your words have power—share your thoughts and inspire others.</span></span>
            </div>
            {/* <p className="hidden md:inline font-semibold text-gray-400"> Your voice is unique, and your story is powerful. Join our community and share your journey with the world. Together, we inspire, connect, and grow. Register today and become a part of something extraordinary.</p> */}
          </div>     
        </div>
        <form className="flex flex-col w-full gap-4 justify-center rounded px-2" >
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="Your Unique Identifier" />
            </div>
            <TextInput 
                  id="userEmail" 
                  type="text" 
                  placeholder="Enter username or email" 
                  required 
                  shadow
                  onChange={(e)=>setFormData({...formData, [e.target.id]: e.target.value})}
                   />
          </div>

          <div>
            <div className="mb-2 block">
              <div className="flex justify-between items-center">
                <Label className="" htmlFor="password2" value="Your password" />
                {(formData.password.length >= 8) &&(validationResults.hasUpperCase && validationResults.hasLowerCase && validationResults.hasNumber && validationResults.hasSpecialChar) && formData.password?
                 (<p className="text-green-700 font-bold"> Strong Password </p>) :
                 (<p className="text-red-900 font-bold"> Week Password </p>)}
              </div>
            
            <div className="flex w-full gap-2 justify-center items-center">
              <TextInput 
                    className="w-full mt-2 border-r-0 relative"
                    id="password" 
                    type="password" 
                    placeholder="************" 
                    required 
                    shadow 
                    onFocus={()=>setPasswordFocus(true)}
                    onBlur={()=>setPasswordFocus(false)}
                    // rightIcon={HiEye}
                    onChange={(e)=>setFormData({...formData, [e.target.id]: e.target.value})}
                    />
                <HiEye className="flex justify-center items-center pt-1 text-2xl relative right-10" />
              </div>
              {passwordFocus && !(validationResults.hasUpperCase && validationResults.hasLowerCase && validationResults.hasNumber && validationResults.hasSpecialChar) && <p>Password must contain at least one </p>}
              {passwordFocus && !validationResults.hasUpperCase&&(<p>  uppercase letter</p>)}
              {passwordFocus && !validationResults.hasLowerCase&&(<p>  lowercase letter</p>)}
              {passwordFocus && !validationResults.hasNumber&&(<p> number</p>)}
              {passwordFocus && !validationResults.hasSpecialChar&&(<p> special chars ! @ # $ % ^ & * ( ) , . ? " : { } | </p>)}
              {passwordFocus && !(formData.password.length >= 8) && <p> at least 8 characters long</p>}
            </div>
          </div>
          {/* <div>
            <div className="mb-2 block">
              <Label htmlFor="repeat-password" value="Repeat password" />
            </div>
            <TextInput id="repeat-password" type="password"  placeholder="************" required shadow />
          </div> */}
          {/* <div className="flex items-center gap-2"> */}
            {/* <Checkbox id="agree" /> */}
            {/* <Label htmlFor="agree" className="flex">
              I agree with the&nbsp;
              <Link href="#" className="text-cyan-600 hover:underline dark:text-cyan-500">
                terms and conditions
              </Link>
            </Label> */}
          {/* </div> */}
          <Button onClick={handleSignIn} type="submit" outline className="hover:bg-gray-800"> Get Started </Button>
          <p> Doesn't have an accound? <Link to={"/register"} className="text-blue-400 text-lg tracking-widest"> Register here </Link></p>
      </form>
    </div>
  );
}
