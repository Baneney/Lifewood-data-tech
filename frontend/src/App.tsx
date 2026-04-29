import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import { useEffect } from "react"
import Navbar from "./pages/Navbar"
import Footer from "./pages/Footer"
import Hero from "./pages/Hero"
import About from "./pages/About"
import Services from "./pages/Services"
import Contact from "./pages/Contact"
import Projects from "./pages/Projects"
import ApplicationForm from "./pages/ApplicationForm"
import Careers from "./pages/Careers"
import { Toaster } from "./components/ui/sonner"



function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Toaster position="bottom-right" />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/apply" element={<ApplicationForm />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
