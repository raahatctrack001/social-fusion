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

function App() {
  return   <BrowserRouter>
              <Header />
                <Routes>
                  <Route path="/" element={<Home/>} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/register/profile" element={<CreateProfile />} />
                  <Route path="/sign-in" element={<SignIn />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="services" element={<Services />} />
                </Routes>
                <FooterComp />
            </BrowserRouter>
}

export default App
