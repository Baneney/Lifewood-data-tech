import { BrowserRouter, Routes, Route, useLocation, Outlet } from "react-router-dom"
import { useEffect, lazy, Suspense } from "react"
import Lenis from "lenis"
import Navbar from "./pages/Navbar"
import Footer from "./pages/Footer"
import { Toaster } from "./components/ui/sonner"
import ProtectedRoute from "./pages/ProtectedRoutes"

const Hero = lazy(() => import("./pages/Hero"))
const About = lazy(() => import("./pages/About"))
const Services = lazy(() => import("./pages/Services"))
const Contact = lazy(() => import("./pages/Contact"))
const Projects = lazy(() => import("./pages/Projects"))
const ApplicationForm = lazy(() => import("./pages/ApplicationForm"))
const Careers = lazy(() => import("./pages/Careers"))
const RestrictedPage = lazy(() => import("./pages/Restricted"))
const AdminLayout = lazy(() => import("./pages/admin/AdminLayout"))
const Overview = lazy(() => import("./pages/admin/pages/Overview"))
const Applications = lazy(() => import("./pages/admin/pages/Applications"))
const Positions = lazy(() => import("./pages/admin/pages/Positions"))
const SignIn = lazy(() => import("./pages/admin/pages/signIn"))

// Lenis instance shared so ScrollToTop can call lenis.scrollTo(0)
let lenisInstance: Lenis | null = null;

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    if (lenisInstance) {
      lenisInstance.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname])
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
  useEffect(() => {
    lenisInstance = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    function raf(time: number) {
      lenisInstance!.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => {
      lenisInstance?.destroy()
      lenisInstance = null
    }
  }, [])

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Toaster position="bottom-right" />
      <Suspense fallback={null}>
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
      </Suspense>
    </BrowserRouter>
  );
}

export default App
