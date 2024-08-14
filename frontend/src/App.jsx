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
// import Home from "./Pages/Home.jsx"
function App() {
  return   <BrowserRouter>
              <Header />
                <Routes>

                <Route element={<PrivateRoute />}>
                  <Route path='/' element={<Home />} />
                  <Route path="/authors/author/:authorId" element={<AuthorPage />} />
                  <Route path="/posts/post/:postId" element={<PostPage />} />
                  <Route path="/create-post" element={<CreatePost />} /> 
                  <Route path="/edit-profile" element={<ProfileEditPage />} />  
                  <Route path="/dashboard" element={<Dashboard />} />         
                </Route>
                  
                  <Route path="/" element={<HomePage />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/register/terms-and-conditions" element={<TermsAndConditions />}  />
                  <Route path="/register/post-registration" element={<PostRegistration /> } />
                  <Route path="/register/profile" element={<CreateProfile />} />
                  <Route path="/sign-in" element={<SignIn />} />
                  <Route path="/search-posts" element={<SearchPostResult />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/*" element={<NotFoundPage />} />
                </Routes>
                <FooterComp />
            </BrowserRouter>
}

export default App
