import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { HiArrowRight, HiCheck, HiEye, HiEyeOff, HiUser } from "react-icons/hi";
import { Link, useNavigate } from 'react-router-dom'
import { passwordSchema } from "../../../backend/src/Validators/user.validator";
import { fromPairs } from "lodash";

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




export default function Register() {
  const [formData, setFormData] = useState({email: '', password: '', repeatPassword: ''})
  const [passwordFocus, setPasswordFocus] = useState(false)
  const [repeatPasswordFocus, setRepeatPasswordFocus] = useState(false)
  const validationResults = validatePassword(formData.password);
  console.log(formData);
  console.log(formData.password == formData.repeatPassword)
  const navigate = useNavigate();
  return (
    <div className="flex flex-col lg:flex-row justify-center max-w-full gap-3 items-center m-5 border-2 border-gray-400 rounded-xl ">
      
        <div className=" flex flex-col justify-start items-center mt-5 gap-5 px-5 rounded-xl">
          <div className="">
            <h1 className=" flex lg:mb-10 justify-center items-center text-3xl tracking-widest md:tracking-normal md:text-6xl font-bold mb-2 flex-nowrap"> Register Here </h1>
            <div className="mt-5 pt-3 flex justify-center items-center gap-5 mb-5 bg-gray-200 rounded-lg px-3">
              {/* <p className="flex-1 w-full self-center whitespace-nowrap text-xl md:text-2xl xl:text-3xl font-bold  p-2 rounded-2xl text-gray-900 mb-5 flex justify-center">Soul Echo </p> */}
              <span className="flex-3 font-semibold text-lg pb-4 text-gray-500">Unleash your soul's voice <span className="hidden md:inline">—share your deepest thoughts and stories with us.</span></span>
            </div>
            <p className="hidden md:inline font-semibold text-gray-400"> Your voice is unique, and your story is powerful. Join our community and share your journey with the world. Together, we inspire, connect, and grow. Register today and become a part of something extraordinary.</p>
          </div>     
        </div>
        <form className=" m-10 mt-0 lg:mt-5 flex flex-col w-full gap-4 justify-center  rounded px-2" >
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="Your email" />
            </div>
            <TextInput 
                id="email" 
                type="email" 
                placeholder="name@company.com" 
                required
                shadow 
                onChange={(e)=>{setFormData({...formData, [e.target.id]: e.target.value})}}
                />
          </div>

          <div>
            <div className="mb-2 block">
            <div className="flex justify-between items-center">
                <Label className="" htmlFor="password" value="Your password" />
                {formData.password && ((formData.password.length >= 8) &&(validationResults.hasUpperCase && validationResults.hasLowerCase && validationResults.hasNumber && validationResults.hasSpecialChar) && formData.password?
                 (<p className="text-green-700 font-bold"> Strong Password </p>) :
                 (<p className="text-red-900 font-bold"> Week Password </p>))}
              </div>
            </div>
            <TextInput 
              id="password"
              type="password" 
              placeholder="************" 
              required 
              shadow 
              onFocus={()=>setPasswordFocus(true)}
              onBlur={()=>setPasswordFocus(false)}
              onChange={(e)=>{setFormData({...formData, [e.target.id]: e.target.value})}}
              />
            {passwordFocus && !(validationResults.hasUpperCase && validationResults.hasLowerCase && validationResults.hasNumber && validationResults.hasSpecialChar) && <p>Password must contain at least one </p>}
            {passwordFocus && !validationResults.hasUpperCase&&(<p>  uppercase letter</p>)}
            {passwordFocus && !validationResults.hasLowerCase&&(<p>  lowercase letter</p>)}
            {passwordFocus && !validationResults.hasNumber&&(<p> number</p>)}
            {passwordFocus && !validationResults.hasSpecialChar&&(<p> special chars ! @ # $ % ^ & * ( ) , . ? " : { } | </p>)}
            {passwordFocus && !(formData.password.length >= 8) && <p> at least 8 characters long</p>}
            
          </div>
          <div>
            <div className="mb-2 block">
              <div className="flex justify-between items-center px-1">
                <Label htmlFor="repeat-password" value="Repeat password" />
                {
                  (formData.password && formData.repeatPassword &&
                  repeatPasswordFocus)&&((formData.password == formData.repeatPassword) ? 
                  (<HiCheck className="w-10 text-2xl" />) : 
                  (<p> password didn't matched </p>))}
              </div>
            </div>
            <TextInput 
                  id="repeatPassword" 
                  type="password"  
                  placeholder="************" 
                  required 
                  shadow 
                  onFocus={()=>setRepeatPasswordFocus(true)}
                  onBlur={()=>setRepeatPasswordFocus(false)}
                  onChange={(e)=>{setFormData({...formData, [e.target.id]:e.target.value})}}

                  />
            
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
