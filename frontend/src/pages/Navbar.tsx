import { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"
import logo from "../assets/Lifewood-Logo.png"
import { ThemeToggle } from "@/components/ui/ThemeToggle"

const links = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Projects", to: "/projects" },
  { label: "Careers", to: "/careers" },
  { label: "Contact", to: "/contact" },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "backdrop-blur-md shadow-sm" : "bg-transparent"}`}
      style={scrolled ? { backgroundColor: "var(--site-bg)" } : undefined}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <NavLink to="/" onClick={() => setOpen(false)}>
          <img src={logo} alt="Lifewood Logo" className="h-8 w-auto" />
        </NavLink>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1 text-sm font-medium">
          {links.map((l) => (
            <li key={l.label}>
              <NavLink
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `relative px-4 py-2 rounded-full transition-colors duration-200 group
                  ${
                    isActive
                      ? "text-[#FFB347]"
                      : scrolled
                        ? "text-[#034E34] dark:text-white hover:text-[#FFB347]"
                        : "text-[#CCCCCC] dark:text-white hover:text-[#FFB347]"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {l.label}
                    <span
                      className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-[#FFB347] rounded-full transition-all duration-300 ${isActive ? "w-4/5" : "w-0 group-hover:w-1/2"}`}
                    />
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <NavLink
            to="/contact"
            className={`text-sm font-semibold px-5 py-2 rounded-full transition-all duration-200 ${scrolled ? "bg-[#034E34] text-white hover:bg-[#417256]" : "bg-[#034E34]/50 text-white border-2 border-[#034E34] hover:bg-[#417256] hover:text-white"}`}
          >
            Get Started
          </NavLink>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setOpen(!open)}
        >
          <span
            className={`block h-0.5 w-6 rounded-full transition-all duration-300 ${scrolled ? "bg-[#034E34]" : "bg-white"} ${open ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 rounded-full transition-all duration-300 ${scrolled ? "bg-[#034E34]" : "bg-white"} ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 rounded-full transition-all duration-300 ${scrolled ? "bg-[#034E34]" : "bg-white"} ${open ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${open ? "max-h-96" : "max-h-0"}`}
      >
        <div
          className="backdrop-blur-md border-t px-6 py-4 flex flex-col gap-1"
          style={{
            backgroundColor: "var(--site-bg)",
            borderColor: "var(--site-border)",
          }}
        >
          {links.map((l) => (
            <NavLink
              key={l.label}
              to={l.to}
              end={l.to === "/"}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `px-4 py-3 rounded-xl text-sm font-medium transition-colors ${isActive ? "bg-[#034E34]/10 text-[#034E34] font-semibold" : "text-[#034E34]/70 hover:bg-[#034E34]/5"}`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <NavLink
            to="/contact"
            onClick={() => setOpen(false)}
            className="mt-2 bg-[#034E34] text-white px-4 py-3 rounded-xl text-sm font-semibold text-center hover:bg-[#417256] transition-colors"
          >
            Get Started
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
