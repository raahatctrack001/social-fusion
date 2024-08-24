import { BrowserRouter, Routes, Route } from "react-router-dom"
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

function App() {
  return   <BrowserRouter>
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
                </Route>
                  
                  <Route path="/posts/post/:postId" element={<PostPage />} />
                  <Route path="/" element={<HomePage />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/register/terms-and-conditions" element={<TermsAndConditions />}  />
                  <Route path="/register/post-registration" element={<PostRegistration /> } />
                  <Route path="/register/profile" element={<CreateProfile />} />
                  <Route path="/sign-in" element={<SignIn />} />
                  <Route path="/about" element={<UnderDevelopment />} />
                  <Route path="/projects" element={<UnderDevelopment />} />
                  <Route path="/services" element={<UnderDevelopment />} />
                  {/* <Route path="/test-route" element={<LandingPage />} /> */}
                  <Route path="/contacts" element={<UnderDevelopment />} />
                  <Route path="/prices" element={<UnderDevelopment />} />
                  <Route path="/test-route" element={<AccountCreatedPopup heading={"Account Created!"} info={"your account has been created!"}  />} />
                  <Route path="/*" element={<AllRoute />} />
                </Routes>
                <FooterComp />
            </BrowserRouter>
}

export default App
