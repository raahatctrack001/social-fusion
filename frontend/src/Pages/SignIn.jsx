import { Alert, Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiArrowRight, HiCheck, HiEye, HiEyeOff, HiUser } from "react-icons/hi";
import { Link, useNavigate } from 'react-router-dom'
import { passwordSchema } from "../../../backend/src/Validators/user.validator";
import { fromPairs } from "lodash";
import { apiEndPoints } from "../apiEndPoints/api.addresses";
import { useDispatch } from "react-redux";
import { signInFailure, signInStart, signInSuccess } from "../redux/slices/user.slice";
import LoaderPopup from "../Compnents/Loader";
import ResetPasswordPopup from "../Compnents/ResetPassword/FindUserPopup";

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
  const [formData, setFormData] = useState({userEmail: '', password: ''});
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [seePassword, setSeePassword] = useState(false);
  const [error, setError] = useState(null);
  const [isCapsLockOn, setIsCapsLockOn] = useState(false)
  const [loading, setLoading] = useState(false);
  const [openForgotPasswordPopup, setOpenForgotPasswordPopup] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationResults = validatePassword(formData.password);
  // console.log(formData);

  const handleSignIn = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true)
    try {
      setError(null)
      dispatch(signInStart());
      const response = await fetch(apiEndPoints.loginAddress(), {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json',
           },
           body: JSON.stringify(formData),
         });

       if (!response.ok) {
          setError(response.message)
       }

       const data = await response.json();
      //  console.log('Form submitted successfully:', data);

       if(data.success){
        // console.log(data.data)
        dispatch(signInSuccess(data.data));
        navigate("/")
        localStorage.setItem("currentUser", JSON.stringify(data?.data))
        if(localStorage.getItem("askPreferredCategory")){
          navigate('/select-preference')
        }
       }
       else{
        setError(data.message);
        return;
       }
    }  catch (error) {
      setError(error.message)
      console.error('Error submitting form:', error);
      dispatch(signInFailure(error));
    }
    finally{
      setLoading(false)
    }
  };
  console.log("localstorageitem", localStorage.getItem("askPreferredCategory"));
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="flex flex-col lg:flex-row justify-center max-w-full gap-3 items-center m-5 border-2 border-gray-400 rounded-xl md:m-16 lg:m-10 xl:m-52 xl:mt-28 ">
        {loading && <LoaderPopup loading={loading} setLoading={setLoading} info={"verifying credentials"} />}
        {openForgotPasswordPopup && <ResetPasswordPopup isOpen={openForgotPasswordPopup} onClose={setOpenForgotPasswordPopup} />}
        <div className=" flex flex-col justify-start items-center mt-5 gap-5 px-5 rounded-xl">
          <div className="">
            <h1 className=" flex lg:mb-10 justify-center items-center text-3xl tracking-widest md:tracking-normal md:text-6xl font-bold mb-2 text-nowrap"> Welcome Back! </h1>
            <div className="mt-5 pt-3 flex justify-center items-center gap-5 mb-5  rounded-lg px-3">
              {/* <p className="flex-1 w-full self-center whitespace-nowrap text-xl md:text-2xl xl:text-3xl font-bold  p-2 rounded-2xl text-gray-900 mb-5 flex justify-center">Soul Echo </p> */}
              <span className="flex-3 font-semibold text-lg pb-4 ">Plz login to continue. <span className="hidden md:inline">Dont' forget to share your deepest thoughts and stories with us.</span></span>
            </div>
            {/* <p className="hidden md:inline font-semibold text-gray-400"> Your voice is unique, and your story is powerful. Join our community and share your journey with the world. Together, we inspire, connect, and grow. Register today and become a part of something extraordinary.</p> */}
          </div>     
        </div>
        <form className=" m-10 mt-0 lg:mt-5 flex flex-col w-full gap-4 justify-center  rounded px-2" >
          <div>
            <div className="mb-2 block">
              <Label htmlFor="userEmail" value="Your unique identifier" />
            </div>
            <TextInput 
                id="userEmail" 
                type="text" 
                placeholder="enter username or email" 
                required
                shadow 
                onChange={(e)=>{setFormData({...formData, [e.target.id]: e.target.value})}}
                />
          </div>

          <div>
            <div className="mb-2 block">
              {isCapsLockOn && (
                                 <Alert color={"warning"} className="text-red-500 font-semibold mt-2 text-lg w-full flex items-center justify-center">Caps Lock is on!</Alert>
                               )}
              
              <div className="flex justify-between items-center">                
                  <Label className="" htmlFor="password" value="Your password" />
                  {formData.password && ((formData.password.length >= 8) &&(validationResults.hasUpperCase && validationResults.hasLowerCase && validationResults.hasNumber && validationResults.hasSpecialChar) && formData.password?
                   (<p className="text-green-700 font-bold relative"> Strong Password 
                  {(!seePassword ? <HiEye onClick={()=>setSeePassword(seePassword?false:true)} className="absolute top-11 right-5 z-10 text-gray-500 "/> : <HiEyeOff onClick={()=>setSeePassword(seePassword?false:true)} className="absolute  text-gray-500 top-11 right-5 z-10" />)} </p>) :
                   (<p className="text-red-900 font-bold relative"> Week Password 
                  {(!seePassword ? <HiEye onClick={()=>setSeePassword(seePassword?false:true)} className="absolute top-11 right-5 z-10 text-gray-500 "/> : <HiEyeOff onClick={()=>setSeePassword(seePassword?false:true)} className="absolute  text-gray-500 top-11 right-5 z-10" />)}</p>))}
              </div>
            </div>
              <TextInput
                className="" 
                id="password"
                type={seePassword?"text":"password"} 
                placeholder="************" 
                required 
                shadow 
                onKeyDown={(event)=>setIsCapsLockOn(event.getModifierState('CapsLock'))}
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
          {/* <div>
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
            
          </div> */}
          {/* <div className="flex items-center gap-2">
            <Checkbox id="agree" />
            <Label htmlFor="agree" className="flex">
              I agree with the&nbsp;
              <Link href="#" className="text-cyan-600 hover:underline dark:text-cyan-500">
                terms and conditions
              </Link>
            </Label>
          </div> */}
          {error && <Alert color={"failure"} > {error} </Alert>}
          <Button onClick={handleSignIn} type="submit" outline className="hover:bg-gray-800"> Proceed </Button>
          <p className="w-full flex justify-center items-center text-red-500"> <span onClick={()=>setOpenForgotPasswordPopup(true)} className="hover:text-lg cursor-pointer"> forgot password </span> </p>
          <p> Doesn't have an accound? <Link to={"/register"} className="text-blue-400 text-lg tracking-widest"> Register Here </Link></p>
      </form>
    </div>
  );
}
