import { Alert, Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import {
  HiArrowCircleRight,
  HiCheck, 
  HiEye,
  HiEyeOff,
  HiInformationCircle, 
} from "react-icons/hi";
import { Link, useNavigate } from 'react-router-dom'
import { passwordSchema } from "../../../backend/src/Validators/user.validator";
import { apiEndPoints } from "../apiEndPoints/api.addresses";
import { useRecoilState } from "recoil";
import { profileState, registrationState } from "../store/userAtom";
// import { register } from "module";


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
  const prevData = JSON.parse(localStorage.getItem("registerationData"));
  const [registerData, setRegisterData] = useState(prevData||{email:'', password:'', repeatPassword:''});
  const [error, setError] = useState(null);
  // const [profileData, setProfileData] = useRecoilState(profileState);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [seePassword, setSeePassword] = useState(false);
  const [repeatPasswordFocus, setRepeatPasswordFocus] = useState(false);
  const [agree, setAgree] = useState(false);
  const validationResults = validatePassword(registerData.password);
  const navigate = useNavigate();
  




  const handleRegister = async (e)=>{
    e.preventDefault();
    setError(null);
    try {
      if(registerData.email?.trim()?0:1){
        setError("Oops! Looks like your email took a coffee break. Let's bring it back, shall we?")
        return;
      }

      if(registerData.password?.trim()?0:1){
        setError("No password? That's like leaving your front door open and hoping burglars are on vacation.")
        return;
      }

      if(registerData["password"] !== registerData["repeatPassword"]){
        setError("Looks like your passwords are in a disagreement. Maybe one needs to apologize?")
        return;
      }

      const formDataString = JSON.stringify(registerData);
      localStorage.setItem('registerationData', formDataString);

      navigate('profile')

    } catch (err) {
        console.log("error during registration page! email or password might be missing", err);
        setError(err);
    }
  }
  console.log(registerData)
  return (
    <div className="flex flex-col lg:flex-row justify-center max-w-full gap-3 items-center m-5 border-2 border-gray-400 rounded-xl md:m-16 lg:m-10  ">
      
        <div className=" flex flex-col justify-start items-center mt-5 gap-5 px-5 rounded-xl">
          <div className="">
            <h1 className=" flex lg:mb-10 justify-center items-center text-3xl tracking-widest md:tracking-normal md:text-6xl font-bold mb-2 flex-nowrap"> Register Here </h1>
            <div className="border mt-5 pt-3 flex justify-center items-center gap-5 mb-5  rounded-lg px-3">
              {/* <p className="flex-1 w-full self-center whitespace-nowrap text-xl md:text-2xl xl:text-3xl font-bold  p-2 rounded-2xl text-gray-900 mb-5 flex justify-center">Soul Echo </p> */}
              <span className="flex-3 font-semibold text-lg pb-4 ">Unleash your soul's voice <span className="hidden md:inline">—share your deepest thoughts and stories with us.</span></span>
            </div>
            <p className="hidden md:inline font-semibold"> Your voice is unique, and your story is powerful. Join our community and share your journey with the world. Together, we inspire, connect, and grow. Register today and become a part of something extraordinary.</p>
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
                value={registerData.email&&registerData.email}
                required
                shadow 
                onChange={(e)=>{setRegisterData({...registerData, [e.target.id]: e.target.value})}}
                />
          </div>

          <div>
            <div className="mb-2 block">
              <div className="flex justify-between items-center">                
                    <Label className="" htmlFor="password" value="Your password" />
                    {registerData.password && ((registerData.password.length >= 8) &&(validationResults.hasUpperCase && validationResults.hasLowerCase && validationResults.hasNumber && validationResults.hasSpecialChar) && registerData.password?
                     (<p className="text-green-700 font-bold relative"> Strong Password 
                    {(!seePassword ? <HiEye onClick={()=>setSeePassword(seePassword?false:true)} className="absolute top-11 right-5 z-10 text-gray-500 cursor-pointer "/> : <HiEyeOff onClick={()=>setSeePassword(seePassword?false:true)} className="absolute  text-gray-500 top-11 right-5 z-10" />)} </p>) :
                     (<p className="text-red-900 font-bold relative"> Week Password 
                    {(!seePassword ? <HiEye onClick={()=>setSeePassword(seePassword?false:true)} className="absolute top-11 right-5 z-10 text-gray-500 cursor-pointer "/> : <HiEyeOff onClick={()=>setSeePassword(seePassword?false:true)} className="absolute  text-gray-500 top-11 right-5 z-10" />)}</p>))}
              </div>
            </div>
            <TextInput 
              id="password"
              type={seePassword?"text":"password"}
              placeholder="************" 
              value={registerData.password&&registerData.password}
              required 
              shadow 
              onFocus={()=>setPasswordFocus(true)}
              onBlur={()=>setPasswordFocus(false)}
              onChange={(e)=>{setRegisterData({...registerData, [e.target.id]: e.target.value})}}
              />
            {passwordFocus && !(validationResults.hasUpperCase && validationResults.hasLowerCase && validationResults.hasNumber && validationResults.hasSpecialChar) && <p>Password must contain at least one </p>}
            {passwordFocus && !validationResults.hasUpperCase&&(<p>  uppercase letter</p>)}
            {passwordFocus && !validationResults.hasLowerCase&&(<p>  lowercase letter</p>)}
            {passwordFocus && !validationResults.hasNumber&&(<p> number</p>)}
            {passwordFocus && !validationResults.hasSpecialChar&&(<p> special chars ! @ # $ % ^ & * ( ) , . ? " : { } | </p>)}
            {passwordFocus && !(registerData.password.length >= 8) && <p> at least 8 characters long</p>}
            
          </div>
          <div>
            <div className="mb-2 block">
              <div className="flex justify-between items-center px-1">
                <Label htmlFor="repeat-password" value="Repeat password" />
                {
                  (registerData.password && registerData.repeatPassword &&
                  repeatPasswordFocus)&&((registerData.password == registerData.repeatPassword) ? 
                  (<HiCheck className="w-10 text-2xl" />) : 
                  (<p> password didn't matched </p>))}
              </div>
            </div>
            <TextInput 
                  id="repeatPassword" 
                  type="password"  
                  placeholder="************" 
                  value={registerData.repeatPassword&&registerData.repeatPassword}
                  required 
                  shadow 
                  onFocus={()=>setRepeatPasswordFocus(true)}
                  onBlur={()=>setRepeatPasswordFocus(false)}
                  onChange={(e)=>{setRegisterData({...registerData, [e.target.id]:e.target.value})}}

                  />
            
          </div>
          {/* <div className="flex items-center gap-2">
            <Checkbox id="agree" onChange={(e)=>setAgree(agree?false:true)} />
            <Label htmlFor="agree" className="flex" >
              I agree with the&nbsp;
              <Link to={"terms-and-conditions"} className="text-cyan-600 hover:underline dark:text-cyan-500" > Terms and Conditions </Link>
            </Label>
          </div> */}
          {error && <Alert color="failure" icon={HiInformationCircle}>
            <span className="font-medium">Alert HOOOOOOMAAANNNN!!! </span> {error}
          </Alert>}
          <Button onClick={handleRegister} type="submit" outline className="hover:bg-gray-800 flex justify-center items-center" > <span className="pr-2">Register Account</span> <HiArrowCircleRight className="text-2xl" /> </Button>
          <p> Already have an accound? <Link to={"/sign-in"} className="text-blue-400 text-lg tracking-widest"> sign in </Link></p>
      </form>
    </div>
  );
}
