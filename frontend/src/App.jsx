import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import Home from "./Pages/Home"
import Register from "./Pages/Register"
import SignIn from "./Pages/SignIn"
import { FooterComp } from "./Compnents/FooterComp"
import Header  from "./Compnents/Header"
import About from "./Pages/About"
import Projects from "./Pages/Projects"
import Services from "./Pages/Services"
import CreateProfile from "./Pages/CreateProfile"
import TermsAndConditions from "./Pages/TermsAndConditions"
import PostRegistration from "./Pages/PostRegistration"
import AuthorPage from "./Pages/AuthorPage"
import PostPage from "./Pages/PostPage"
import HomePage from "./Pages/HomePage"
import PrivateRoute from "./Compnents/PrivateRoute"
import CreatePost from "./Pages/CreatePost"
import NotFoundPage from "./Pages/NotFoundPage"
import SearchPostResult from "./Pages/SearchPostResult"
import ProfileEditPage from "./Pages/ProfileEditPage"
import Dashboard from "./Pages/Dashboard"
import EditPost from "./Pages/EditPost"
import ResetPassword from "./Pages/ResetPassword"
import DeleteAccount from "./Pages/DeleteAccount"
import LandingPage from "./Pages/LandingPage"
import UnderDevelopment from "./TestComponent/UnderDevelopment"
import ThemedComponent from "./Compnents/ThemedComponent"
import PageLoader from "./Compnents/PageLoader"
import AllRoute from "./Pages/AllRoute"
import OtpPopup from "./Compnents/OtpPopup"
import AccountCreatedPopup from "./Compnents/AccountCreatedPopup"
import FeaturesPage from "./Compnents/FeaturesPage"
import ContactPage from "./Compnents/ContactPage"
import QRCodeGenerator from "./Compnents/QRCodeGenerator"
import SelectHighlightPopup from "./Compnents/SelectHighlightPopup"
import Chatroom from "./Pages/Chatroom"
// import { forgotPassword } from "../../backend/src/Controllers/auth.controllers"
// import resetPassword from "./Compnents/ResetForgotPassword"
import ResetForgotPassword from "./Compnents/ResetForgotPassword"
import ResetTokenSent from "./Compnents/ResetPassword/ResetTokenSent"
import { io } from 'socket.io-client'
import { useEffect } from "react"
import SocketContext from "./Context/SocketContext"

function App() {
  // console.log("META", import.meta.env);
  const socket = io(import.meta.env.VITE_BACKEND_API_URL)
  socket.on("connect", ()=>{ //each browser will have their own unique socket id
    console.log(`socket connection has been established with socket id: ${socket.id}`);
  })
  
  return  <SocketContext.Provider value={socket} >
            <BrowserRouter>
              <Header />
                <Routes>

                <Route element={<PrivateRoute />}>
                  <Route path='/' element={<Home />} />
                  <Route path="/authors/author/:authorId" element={<AuthorPage />} />
                  <Route path="/edit-post/:postId" element={<EditPost />} />
                  <Route path="/create-post" element={<CreatePost />} /> 
                  <Route path="/edit-profile" element={<ProfileEditPage />} />  
                  <Route path="/dashboard" element={<Dashboard />} />   
                  <Route path="/reset-password/:authorId" element={<ResetPassword />} />
                  <Route path="delete-account" element={<DeleteAccount />} />       
                  <Route path="/search-posts" element={<SearchPostResult />} />
                  <Route path="/projects" element={<UnderDevelopment />} />
                  <Route path="/services" element={<FeaturesPage />} />
                  <Route path="/contacts" element={<ContactPage />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/notifications" element={<UnderDevelopment />} />
                  <Route path="/chatroom" element={<Chatroom />} />
                </Route>
                  
                  <Route path="/subah-ko-bhoola-sham-ko-ghar-aya/reset-forgot-password/:token" element={<ResetForgotPassword />} />
                  <Route path="/posts/post/:postId" element={<PostPage />} />
                  <Route path="/" element={<HomePage />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/register/terms-and-conditions" element={<TermsAndConditions />}  />
                  <Route path="/register/post-registration" element={<PostRegistration /> } />
                  <Route path="/register/profile" element={<CreateProfile />} />
                  <Route path="/sign-in" element={<SignIn />} />
                  {/* <Route path="/test-route" element={<LandingPage />} /> */}
                  <Route path="/test-route" element={<SelectHighlightPopup />} />
                  <Route path="/*" element={<ResetTokenSent isOpen={true} email={'sfsdfsfs2@dseu.ac.in'} />} />
                </Routes>
                {/* <FooterComp /> */}
            </BrowserRouter>
          </SocketContext.Provider>
}

export default App
