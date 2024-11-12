import { Alert, Button, Checkbox, Label, Textarea, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiArrowRight, HiCheckCircle, HiGlobeAlt, HiInformationCircle, HiXCircle } from "react-icons/hi";
import { Link, useNavigate } from 'react-router-dom';
import { apiEndPoints } from "../apiEndPoints/api.addresses";
import LoaderPopup from "../Compnents/Loader";
import AccountCreatedPopup from "../Compnents/AccountCreatedPopup";
import SuccessPopup from "../Compnents/AccountCreatedPopup";

export default function CreateProfile() {
  const prevData = JSON.parse(localStorage.getItem("profileData"));
  const [profileData, setProfileData] = useState(prevData || { fullName: '', username: '', bio: '', isVerified: false });
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState(false);
  const [username, setUsername] = useState('');
  const registerationData = JSON.parse(localStorage.getItem("registerationData"));

  const navigate = useNavigate();

  useEffect(() => {
    const isVerified = async () => {
      try {
        setError('');
        const formData = new FormData();
        formData.append("email", registerationData.email);
        const response = await fetch('/api/v1/auth/is-email-verified', { method: "POST", body: formData });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data?.message || "Network response isn't ok while verifying email status in create profile");
        }

        if (data.success) {
          setProfileData(prev => ({
            ...prev,
            isVerified: true
          }));
          setIsVerified(true);
        } else {
          alert("Your email isn't verified yet! Please verify first");
          navigate('/register');
          return;
        }
      } catch (error) {
        setError(error.message);
        //console.log(error);
      }

    }
    isVerified();
  }, []);

  const handleInputChange = (e) => {
    setProfileData({ ...profileData, [e.target.id]: e.target.value });
  }

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    setLoading(true);
    localStorage.setItem("profileData", JSON.stringify(profileData));
    try {
      setError(null);
      setMessage(null);
      if (!usernameAvailable) {
        throw new Error("This username is not available, please choose another username");
      }
      if (!agree) {
        throw new Error("Please agree to the Terms and Conditions to proceed.");
      }

      if ([profileData.username, profileData.fullName].some(value => value?.trim() ? 0 : 1)) {
        throw new Error("All fields are necessary!");
      }

      const formData = { ...registerationData, ...profileData };
      const response = await fetch(apiEndPoints.registerAddress(), {
        method: "POST",
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.message || "Network response isn't ok while creating account!");
      }

      if (data.success) {
        setMessage(data.message);
        localStorage.removeItem("registerationData");
        localStorage.removeItem("profileData");
        
        localStorage.setItem("askPreferredCategory", true);
        setShowSuccessPopup(true);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError(error.message);  // Render error message as a string
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      (async () => {
        try {
          setUsernameAvailable(false);
          const formData = new FormData();
          formData.append("username", profileData.username);
          const response = await fetch(apiEndPoints.checkIfUsernameExistsAddress(), { method: "POST", body: formData });
          const data = await response.json();
          if (!response.ok) {
            throw new Error(data.message || "Network response wasn't ok while checking for availability of username");
          }

          if (data.success) {
            setUsernameAvailable(true);
          }
        } catch (error) {
          //console.log(error);
        }
      })();
    }, 2000);
    return () => clearTimeout(timeout);
  }, [username]);

  return (
    <div className="flex flex-col lg:flex-row justify-center max-w-full gap-3 items-center m-5 border-2 border-gray-400 rounded-xl md:m-10 lg:my-8 xl:my-10 ">
      {loading && <LoaderPopup loading={loading} setLoading={setLoading} info={"Please be patient, we are creating your account!"} />}
      {showSuccessPopup && <SuccessPopup heading={"Account Created!"} info={`We welcome you ${profileData?.fullName}! to our community! Kindly sign in to continue!`} setShowPopup={setShowSuccessPopup} />}
      <div className=" flex flex-col justify-start items-center mt-5 gap-5 px-5 rounded-xl">
        <div>
          {isVerified ?
            <div className="flex justify-center items-center gap-2 mb-2"> <HiCheckCircle className="text-xl text-green-700" /> Email Verified </div> :
            <div className="flex justify-center items-center gap-2 mb-2"> <HiXCircle className="text-xl text-red-700" /> Email isn't verified yet</div>
          }

          <Alert color={"success"} className=" flex lg:mb-10 justify-center items-center text-3xl md:text-6xl font-bold mb-2 text-nowrap"> Introduce Yourself! </Alert>
          <div className="mt-5 flex justify-center items-center gap-5 mb-5  rounded-lg px-3">
            <span className="flex-3 font-semibold text-lg pb-4 ">Hang on! We are setting up your space <span className="hidden md:inline">— Don't forget to share your deepest thoughts and stories with us.</span></span>
          </div>
        </div>
      </div>
      <form className="m-10 mt-5 flex flex-col w-full gap-4 justify-center rounded px-2">
        <div>
          <div className="mb-2 block">
            <div className="flex items-center justify-start gap-2">
              <Label htmlFor="username" value="Username" />
              {profileData?.username && (usernameAvailable ? <p className="text-green-500"> (available) </p> : <p className="text-red-500"> (not available)</p>)}
            </div>
          </div>
          <TextInput value={profileData.username || ''} onChange={(e) => { setUsername(e.target.value); handleInputChange(e); }} id="username" type="text" placeholder="Your unique identifier" required shadow />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="fullName" value="Full Name" />
          </div>
          <TextInput value={profileData.fullName || ''} onChange={handleInputChange} id="fullName" type="text" placeholder="Your Name" required shadow />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="bio" value="Bio" />
          </div>
          <Textarea value={profileData.bio || ''} onChange={handleInputChange} className="h-32" id="bio" type="text" placeholder="Describe your passions and interests (max 250 characters) || OPTIONAL" shadow />
        </div>

        <div className="flex items-center gap-2">
          <Checkbox id="agree" onChange={() => setAgree(agree ? false : true)} />
          <Label htmlFor="agree" className="flex cursor-pointer">
            I agree with the&nbsp;
            <span onClick={() => navigate("/register/terms-and-conditions")} className="text-cyan-600 hover:underline dark:text-cyan-500">Terms and Conditions</span>
          </Label>
        </div>
        {error && <Alert color="failure" icon={HiInformationCircle}>
          <span className="font-medium">Alert HOOOOOOMAAANNNN!!! </span> {error}  {/* Display error message as string */}
        </Alert>}
        {message && <Alert color="success" icon={HiInformationCircle}>
          <span className="font-medium">Alert HOOOOOOMAAANNNN!!! </span> {message}
        </Alert>}
        <Button onClick={handleCreateAccount} type="submit" outline className="hover:bg-gray-800">Create Account</Button>
      </form>
    </div>
  );
}
