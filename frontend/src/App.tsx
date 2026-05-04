import { BrowserRouter, Routes, Route, useLocation, Outlet } from "react-router-dom"
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

import AdminLayout from "./pages/admin/AdminLayout"
import Overview from "./pages/admin/pages/Overview"
import Applications from "./pages/admin/pages/Applications"
import Positions from "./pages/admin/pages/Positions"
import SignIn from "./pages/admin/pages/signIn"
import RestrictedPage from "./pages/Restricted"

import ProtectedRoute from "./pages/ProtectedRoutes"


function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function PublicLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Toaster position="bottom-right" />
      <Routes>
        {/* Public */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Hero />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/go-back-now" element={<RestrictedPage />} />
        </Route>
        {/* Admin — no Navbar/Footer */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Overview />} />
            <Route path="applications" element={<Applications />} />
            <Route path="positions" element={<Positions />} />
          </Route>
        </Route>
        {/* Auth — no Navbar/Footer */}
        <Route path="/admin/login" element={<SignIn />} />
        <Route path="/apply" element={<ApplicationForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
