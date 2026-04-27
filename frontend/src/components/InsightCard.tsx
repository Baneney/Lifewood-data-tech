import { Link } from "react-router-dom"

interface InsightCardProps {
  img: string
  tag: string
  title: string
  to: string
}

export default function InsightCard({ img, tag, title, to }: InsightCardProps) {
  return (
    <Link 
      to={to} 
      className="group relative block rounded-2xl overflow-hidden bg-[#417256]/20 backdrop-blur-xl border border-white/10 transition-all duration-500 hover:-translate-y-2 hover:border-[#FFB347]/50 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
    >
      {/* ── Image Container ── */}
      <div className="relative overflow-hidden h-64">
        <img 
          src={img} 
          alt={title} 
          className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700 ease-out group-hover:scale-110" 
        />
        
        {/* Gradient Overlay: Pulls the image into the dark theme */}
        <div className="absolute inset-0 bg-linear-to-t from-[#034E34] via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-500" />
        
        {/* Floating Tag */}
        <div className="absolute top-4 left-4 overflow-hidden">
          <span className="block translate-y-10 group-hover:translate-y-0 transition-transform duration-500 bg-[#FFB347] text-[#021a11] text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-xl">
            Featured Project
          </span>
        </div>
      </div>

      {/* ── Content Body ── */}
      <div className="relative p-8">
        {/* Minimal Corner Accent */}
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#FFB347] opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 rounded-tr-2xl" />

        <span className="text-[11px] text-[#FFB347] font-black uppercase tracking-[0.3em] block mb-3">
          {tag}
        </span>
        
        <h4 className="text-xl text-white font-bold leading-tight group-hover:text-white transition-colors duration-300">
          {title}
        </h4>
        
        <div className="mt-8 flex items-center gap-3 text-[11px] text-white/50 font-black uppercase tracking-[0.2em] group-hover:text-white transition-all">
          <span className="relative overflow-hidden">
            <span className="inline-block transition-transform duration-500 group-hover:-translate-y-full">
              Explore Case Study
            </span>
            <span className="absolute left-0 top-0 inline-block translate-y-full transition-transform duration-500 group-hover:translate-y-0 text-[#FFB347]">
              View Full Details
            </span>
          </span>
          <span className="text-[#FFB347] transition-transform duration-300 group-hover:translate-x-2">
            →
          </span>
        </div>
      </div>
    </Link>
  )
}