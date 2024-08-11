import { Alert, Button, Checkbox, Label, Textarea, TextInput } from "flowbite-react";
import { useState } from "react";
import { HiArrowRight, HiGlobeAlt, HiInformationCircle } from "react-icons/hi";
import { Link, useNavigate } from 'react-router-dom'
import { apiEndPoints } from "../apiEndPoints/api.addresses";
// import { profile } from "console";


export default function CreateProfile() {
  const prevData = JSON.parse(localStorage.getItem("profileData"));
  const [profileData, setProfileData] = useState(prevData || {fullName:'', username:'', bio:''});
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null);
  const [agree, setAgree] = useState(false);
  const  navigate = useNavigate();

  

  const handleInputChange = (e)=>{
    setProfileData({...profileData, [e.target.id]: e.target.value});
  }

  const registerationData = JSON.parse(localStorage.getItem("registerationData"));
  const handleCreateAccount = async(e)=>{
    e.preventDefault();
    localStorage.setItem("profileData", JSON.stringify(profileData));
    try {
      setError(null)
      setMessage(null)
      if(!agree){
        setError("Please agree to the Terms and Conditions to proceed.");
        return;
      }
      
      if([profileData.username, profileData.fullName].some(value=>value?.trim()?0:1)){
        setError("All field's are necessary!");
        return;
      }
      
      const formData = {...registerationData, ...profileData};
      const response = await fetch(apiEndPoints.registerAddress(), {
        method: "POST",
        'headers': {
          'content-type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      console.log(response)
      
      if(!response.ok){
        setError(response.message);
      }
      
      const data = await response.json();
      data.success ? setMessage(data.message) : setError(data.message);
      if(data.success){
        localStorage.removeItem("registerationData");
        localStorage.removeItem("profileData");
      }

      console.log(data)
      
    } catch (error) {
      setError(error);
    }
  }
  // console.log(agree);
  return (
    <div className="flex flex-col lg:flex-row justify-center max-w-full gap-3 items-center m-5 border-2 border-gray-400 rounded-xl md:m-10 lg:my-8 xl:my-10 ">
      
        <div className=" flex flex-col justify-start items-center mt-5 gap-5 px-5 rounded-xl">
          <div className="">
            <Alert color={"success"} className=" flex lg:mb-10 justify-center items-center text-3xl md:text-6xl font-bold mb-2 text-nowrap"> Introduce Yourself! </Alert>
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
              <Label htmlFor="username" value="username" />
            </div>
            <TextInput value={profileData.username && profileData.username} onChange={handleInputChange} id="username" type="text" placeholder="your unique identifier"  required shadow />
          </div>
          
          <div>
            <div className="mb-2 block">
              <Label htmlFor="fullName" value="Full Name" />
            </div>
            <TextInput value={profileData.fullName&&profileData.fullName} onChange={handleInputChange} id="fullName" type="text" placeholder="Your Name"  required shadow />
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="bio" value="Bio" />
            </div>
            <Textarea value={profileData.bio&&profileData.bio} onChange={handleInputChange} className="h-32" id="bio" type="text" placeholder="Describe your passions and interests (max 250 characters) || OPTIONAL" shadow />
          </div>
          
          <div className="flex items-center gap-2">
            <Checkbox id="agree" onChange={()=>setAgree(agree?false:true)} />
            <Label htmlFor="agree" className="flex">
              I agree with the&nbsp;
              <span onClick={()=>navigate("/register/terms-and-conditions")} className="text-cyan-600 hover:underline dark:text-cyan-500"> Terms and Conditions</span>
            </Label>
          </div>
          {error && <Alert color="failure" icon={HiInformationCircle}>
            <span className="font-medium">Alert HOOOOOOMAAANNNN!!! </span> {error}
          </Alert>}
          {message && <Alert color="success" icon={HiInformationCircle}>
            <span className="font-medium">Alert HOOOOOOMAAANNNN!!! </span> {message}
          </Alert>}
          <Button onClick={handleCreateAccount}  type="submit" outline className="hover:bg-gray-800">Create Account</Button>
          <p> Already have an accound? <Link to={"/sign-in"} className="text-blue-400 text-lg tracking-widest"> sign in </Link></p>
      </form>
    </div>
  );
}
