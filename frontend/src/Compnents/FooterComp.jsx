import { Alert, Button, Footer, Textarea, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { BsDribbble, BsEnvelope, BsFacebook, BsGithub, BsGlobe, BsInstagram, BsLinkedin, BsMailbox, BsMailbox2, BsTwitter, BsWhatsapp } from "react-icons/bs";
import { HiDocument, HiX } from "react-icons/hi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { apiEndPoints } from "../apiEndPoints/api.addresses";
import LoaderPopup from "./Loader";

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
  const [loading, setLoading] = useState(false);
  // const [showPopup, setShowPopup] = useState(false);

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
    setLoading(true)
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

      if(formData.subject?.trim() === '' || formData.problem?.trim() === ''){
        throw new Error("subject or problem is empty!")
      }
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
    finally{
      setLoading(false)
    }
  }

  return (
    <Footer bgDark className="rounded-none bg-gray-100">
    {loading && <LoaderPopup loading={loading} setLoading={setLoading} />}
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
              <Footer.Link target="_blank" rel="noopener noreferrer" href="mailto:socialfusion001.sf@gmail.com">E-Mail</Footer.Link>
              <Footer.Link target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/captainr01">Instagram</Footer.Link>
              <Footer.Link target="_blank" rel="noopener noreferrer" href="https://wa.me/+918920151361">Whatsapp</Footer.Link>
              <Footer.Link target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/raahat-khan-93722a22a">LinkedIn</Footer.Link>
              <Footer.Link target="_blank" rel="noopener noreferrer" href="https://www.github.com/raahatctrack001">Github</Footer.Link>
              <Footer.Link target="_blank" rel="noopener noreferrer" href="/contacts">Contact Us</Footer.Link>
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
              <div className="fixed inset-0 top-16 md:flex justify-center items-center bg-opacity-100 z-20 p-5 dark:bg-gray-600 bg-white ">
                <div className=" p-6 w-full md:w-2/3 rounded-lg shadow-lg">
                  <div className="flex justify-between relative">
                    <div> </div>
                    <div onClick={()=>setShowFeedbackPopup(!showFeedbackPopup)} className="relative bottom-3 right-2"> 
                      <HiX className=" cursor-pointer"/> 
                    </div>
                  </div>
                  <h1 className=" flex dark:bg-gray-600  justify-center items-center p-2 border border-b-0 relative top-[1px] 2 z-10 rounded-lg rounded-b-none md:w-96">
                    Feedbacks are always welcome
                  </h1>
                  
                  <form action="" onSubmit={handleFeedbackSubmit} className="flex flex-col gap-1 p-2 rounded-lg rounded-l-sm border">
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
        <div className="w-full  px-4 py-6 sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright href={''} by="made with love by CaptainR01" year={new Date().getFullYear()} />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <Footer.Icon href="mailto:socialfusion001.sf@gmail.com" icon={BsEnvelope} target="_blank" rel="noopener noreferrer"/>
            <Footer.Icon href="https://www.instagram.com/captainr01" icon={BsInstagram} target="_blank" rel="noopener noreferrer" />
            <Footer.Icon href="https://www.linkedin.com/in/raahat-khan-93722a22a" icon={BsLinkedin} />
            <Footer.Icon href="https://www.github.com/raahatctrack001" icon={BsGithub} target="_blank" rel="noopener noreferrer" />
            <Footer.Icon href="https://social-fusion.onrender.com/authors/author/66cf3d0fce7ad9beeb414b9b" icon={BsGlobe} />
            <Footer.Icon href="https://wa.me/+918920151361" icon={BsWhatsapp} target="_blank" rel="noopener noreferrer"/>
          </div>
        </div>
      </div>
    </Footer>
  );
}
