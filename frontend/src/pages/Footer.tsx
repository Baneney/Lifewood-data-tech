import { Link } from "react-router-dom"
import logo from "@/assets/Lifewood-LogoV2.png"
import facebk from "@/assets/footer/facebook.svg"


export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-r from-[#034E34] to-[#133020] via-[#133020] text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* ── Top Section: Multi-Column ── */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Brand & About */}
          <div className="md:col-span-1">
            <img src={logo} alt="Lifewood Logo" className="h-10 w-auto mb-6" />
            <p className="text-gray-300 text-sm leading-relaxed">
              Powering the next generation of AI with high-quality data solutions. 
              Global scale, ethical sourcing, and human-in-the-loop precision.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Solutions</h4>
            <ul className="space-y-4 text-sm text-gray-300">
              <li><Link to="/services" className="hover:text-[#FFB347] transition-colors">Data Annotation</Link></li>
              <li><Link to="/services" className="hover:text-[#FFB347] transition-colors">Data Collection</Link></li>
              <li><Link to="/services" className="hover:text-[#FFB347] transition-colors">Computer Vision</Link></li>
              <li><Link to="/services" className="hover:text-[#FFB347] transition-colors">NLP Solutions</Link></li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Company</h4>
            <ul className="space-y-4 text-sm text-gray-300">
              <li><Link to="/about" className="hover:text-[#FFB347] transition-colors">About Us</Link></li>
              <li><Link to="/projects" className="hover:text-[#FFB347] transition-colors">Our Work</Link></li>
              <li><Link to="/contact" className="hover:text-[#FFB347] transition-colors">Careers</Link></li>
              <li><Link to="/contact" className="hover:text-[#FFB347] transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Column 4: Newsletter/Connect */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Connect</h4>
            <div className="flex gap-4 mb-6">
              {/* These are placeholder social icons - replace with Lucide or FontAwesome if you have them */}
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#FFB347] transition-all cursor-pointer">
                <span className="text-xs">LI</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#FFB347] transition-all cursor-pointer">
                <span className="text-xs">TW</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#FFB347] transition-all duration-300 cursor-pointer group">
                <img 
                  src={facebk} 
                  alt="Facebook" 
                  className="h-full w-full p-2.5 object-contain transition-transform duration-300 group-hover:scale-110 brightness-0 invert" 
                />
              </div>
            </div>
            <p className="text-xs text-gray-400">
              Follow us for the latest in AI data technology.
            </p>
          </div>
        </div>

        {/* ── Bottom Bar: Copyright & Legal ── */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-400 text-xs">
            © {currentYear} Lifewood Data Technology. All rights reserved.
          </p>
          
          <div className="flex gap-8 text-xs text-gray-400">
            <Link to="/" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/" className="hover:text-white transition-colors">Cookie Settings</Link>
          </div>
        </div>

      </div>
    </footer>
  )
}
