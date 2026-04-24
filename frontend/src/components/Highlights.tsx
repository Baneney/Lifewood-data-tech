import { useState } from "react"
import { Link } from "react-router-dom"

interface HighlightProps {
  img: string
  tag: string
  title: string
  desc: string
  to: string
  reverse?: boolean
}

export default function Highlight({ img, tag, title, desc, to, reverse }: HighlightProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className={`group flex flex-col ${reverse ? "md:flex-row-reverse" : "md:flex-row"} 
      items-stretch gap-0 overflow-hidden rounded-2xl shadow-sm transition-all duration-500 
      ${hovered ? "shadow-2xl -translate-y-1" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ── Image side ── */}
      {/* 1. h-72 sets the mobile height.
          2. md:h-auto + self-stretch ensures it matches the text side on desktop.
          3. flex + relative prepares it for the absolute image.
      */}
      <div className="relative w-full md:w-1/2 h-72 md:h-auto self-stretch overflow-hidden flex bg-gray-200">
        <img
          src={img}
          alt={title}
          // Using absolute + inset-0 is the 'nuclear' fix for gaps
          className="absolute inset-0 w-full h-full object-cover block transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Colour wash overlay that fades in on hover */}
        <div className="absolute inset-0 bg-[#034E34]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Floating tag pill that slides up on hover */}
        <div className="absolute bottom-4 left-4 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <span className="bg-[#FFB347] text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow">
            {tag}
          </span>
        </div>
      </div>

      {/* ── Text side ── */}
      <div
        className={`relative w-full md:w-1/2 flex flex-col justify-center px-10 py-12 overflow-hidden transition-colors duration-500 
        ${hovered ? "bg-[#034E34]" : "bg-gray-50"}`}
      >
        {/* Animated background circles */}
        <div className={`absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#FFB347]/10 transition-transform duration-700 ${hovered ? "scale-150" : "scale-0"}`} />
        <div className={`absolute -bottom-6 -left-6 w-28 h-28 rounded-full bg-[#FFB347]/10 transition-transform duration-700 delay-100 ${hovered ? "scale-150" : "scale-0"}`} />

        {/* Tag — transitions color on hover */}
        <span className={`text-xs font-semibold uppercase tracking-widest transition-colors duration-300 ${hovered ? "text-[#FFB347]" : "text-[#666666]"}`}>
          {tag}
        </span>

        <h3 className={`mt-3 text-2xl md:text-3xl font-bold leading-snug transition-colors duration-300 ${hovered ? "text-white" : "text-[#034E34]"}`}>
          {title}
        </h3>

        <p className={`mt-4 leading-relaxed transition-colors duration-300 ${hovered ? "text-gray-300" : "text-[#666666]"}`}>
          {desc}
        </p>

        {/* CTA button morphs into a pill button */}
        <Link
          to={to}
          className={`mt-6 inline-flex items-center gap-2 font-semibold transition-all duration-300 w-fit ${
            hovered
              ? "bg-[#FFB347] text-white px-5 py-2 rounded-full gap-3 shadow-lg hover:bg-[#FFC370]"
              : "text-[#034E34] hover:gap-4"
          }`}
        >
          Learn more <span className={`transition-transform duration-300 ${hovered ? "translate-x-1" : ""}`}>→</span>
        </Link>
      </div>
    </div>
  )
}