import { Alert, Button, Footer, Textarea, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";
import { HiDocument, HiX } from "react-icons/hi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { apiEndPoints } from "../apiEndPoints/api.addresses";

export function FooterComp() {
  
  const navigate = useNavigate();
  const [showFeedbackPopup, setShowFeedbackPopup] = useState(false);
  const { currentUser } = useSelector(state=>state.user);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [formData, setFormData] = useState({
    subject: "",
    problem: "",
    solution: ""
  });

  useEffect(()=>{
    const savedFormData = JSON.parse(localStorage.getItem("feedbackData"));
    if (savedFormData) {
      setFormData(savedFormData);
    }
  }, [])

  const handleInputChange = (e)=>{
    setFormData({...formData, [e.target.id]: e.target.value});
  }

  const handleFeedbackSubmit = async (e)=>{
    e.preventDefault();
    try {
      setError(null);
      setMessage(null);
      if(!currentUser){
        localStorage.setItem("feedbackData", JSON.stringify(formData))
        alert("Please sign in to send feedback!");
        setShowFeedbackPopup(false);
        navigate("/sign-in");
        return;
      }

      const response = await fetch(apiEndPoints.createFeedbackAddress(currentUser?._id), {
        method: "POST",
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if(!response.ok){
        throw new Error(response.message||"Network response is not ok!");
      }

      const data = await response.json();

      if(data.success){
        setMessage(data.message);
        localStorage.removeItem("feedbackData");
        setFormData({subject: "", problem: "", solution: ""});
      }      
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <Footer bgDark className="rounded-none">
      <div className="w-full">
        <div className="grid w-full grid-cols-2 gap-8 px-6 py-8 md:grid-cols-4">
          <div>
            <Footer.Title title="Company" />
            <Footer.LinkGroup col>
              <Footer.Link href="#">About</Footer.Link>
              <Footer.Link href="#">Careers</Footer.Link>
              <Footer.Link href="#">Brand Center</Footer.Link>
              <Footer.Link href="#">Blog</Footer.Link>
            </Footer.LinkGroup>
          </div>
          <div>
            <Footer.Title title="Help Center" />
            <Footer.LinkGroup col>
              <Footer.Link href="#">Discord Server</Footer.Link>
              <Footer.Link href="#">Twitter</Footer.Link>
              <Footer.Link href="#">Facebook</Footer.Link>
              <Footer.Link href="#">Contact Us</Footer.Link>
            </Footer.LinkGroup>
          </div>
          <div>
            <Footer.Title title="Legal" />
            <Footer.LinkGroup col>
              <Footer.Link href="#">Privacy Policy</Footer.Link>
              <Footer.Link href="#">Licensing</Footer.Link>
              <Footer.Link href="#">Terms & Conditions</Footer.Link>
            </Footer.LinkGroup>
          </div>
          <div className="">
            <Footer.Title title="Feedback" />
            <Button onClick={()=>setShowFeedbackPopup(!showFeedbackPopup)}> Send Your Feedback</Button>

            {/* feedback popup starts here! */}
            {showFeedbackPopup && (
              <div className="fixed inset-0 top-16 md:flex justify-center items-center bg-black bg-opacity-50 z-20 p-5">
                <div className="bg-gray-500 p-6 w-full md:w-2/3 rounded-lg shadow-lg">
                  <div className="flex justify-between relative">
                    <div> </div>
                    <div onClick={()=>setShowFeedbackPopup(!showFeedbackPopup)} className="relative bottom-3 right-2"> 
                      <HiX className="text-red-700 cursor-pointer"/> 
                    </div>
                  </div>
                  <h1 className=" flex justify-center items-center p-2 border-2 border-b-8 border-b-gray-500 relative top-2 z-10 rounded-lg md:w-96">
                    Feedbacks are always welcome
                  </h1>
                  
                  <form action="" onSubmit={handleFeedbackSubmit} className="flex flex-col gap-1 p-2 rounded-lg rounded-l-sm border-2">
                    <TextInput
                      icon={HiDocument}
                      placeholder="Subject"
                      type="text"
                      id="subject"
                      onChange={handleInputChange}
                      value={formData.subject || ""}
                    />
                    <Textarea
                      placeholder="Write your complain/concern"
                      rows={3}
                      id="problem"
                      onChange={handleInputChange}
                      value={formData.problem || ""}
                    />
                    <Textarea 
                      placeholder="Solution that you think should work!"
                      rows={5}
                      id="solution"
                      onChange={handleInputChange}
                      value={formData.solution || ""}
                    />
                    {error && <Alert color={'failure'} > {error} </Alert>}
                    {message && <Alert color={'success'} > {message} </Alert>}
                    <Button type="submit" className="mt-2"> Send Feedback </Button>
                  </form> 
                  
                </div>
              </div>
            )}
            {/* feedback popup ends here */}
          </div>
        </div>
        <div className="w-full bg-gray-700 px-4 py-6 sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright href="#" by="Raahat Khan" year={new Date().getFullYear()} />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <Footer.Icon href="#" icon={BsFacebook} />
            <Footer.Icon href="#" icon={BsInstagram} />
            <Footer.Icon href="#" icon={BsTwitter} />
            <Footer.Icon href="#" icon={BsGithub} />
            <Footer.Icon href="#" icon={BsDribbble} />
          </div>
        </div>
      </div>
    </Footer>
  );
}
