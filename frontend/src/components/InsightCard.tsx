// import { Link } from "react-router-dom"

// interface InsightCardProps {
//   img: string
//   tag: string
//   title: string
//   to: string
// }

// export default function InsightCard({ img, tag, title, to }: InsightCardProps) {
//   return (
//     <Link to={to} className="group block rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
//       <div className="overflow-hidden">
//         <img src={img} alt={title} className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105" />
//       </div>
//       <div className="p-5 bg-white">
//         <span className="text-xs text-[#1a3c5e] font-semibold uppercase tracking-widest">{tag}</span>
//         <h4 className="mt-2 text-gray-900 font-semibold leading-snug group-hover:text-[#1a3c5e] transition-colors">{title}</h4>
//         <span className="mt-3 inline-flex items-center gap-1 text-sm text-[#1a3c5e] font-medium group-hover:gap-3 transition-all duration-200">
//           Read more <span>→</span>
//         </span>
//       </div>
//     </Link>
//   )
// }



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
      className="group relative block rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-transparent hover:border-[#FFB347]/30"
    >
      {/* ── Image Container ── */}
      <div className="relative overflow-hidden h-52">
        <img 
          src={img} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-1" 
        />
        
        {/* Animated Overlay: Slides in from the bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#034E34]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Floating Tag over image on hover */}
        <div className="absolute top-4 left-4 overflow-hidden">
             <span className="block translate-y-10 group-hover:translate-y-0 transition-transform duration-500 bg-[#FFB347] text-white text-[10px] font-bold uppercase tracking-tighter px-2 py-1 rounded shadow-lg">
                Featured
             </span>
        </div>
      </div>

      {/* ── Content Body ── */}
      <div className="relative p-6 bg-white transition-colors duration-500 group-hover:bg-gray-50">
        {/* Decorative corner accent that appears on hover */}
        <div className="absolute top-0 right-0 w-0 h-0 border-t-[15px] border-r-[15px] border-t-transparent border-r-[#FFB347] opacity-0 group-hover:opacity-100 transition-all duration-500" />

        <span className="text-xs text-[#1a3c5e] font-bold uppercase tracking-[0.2em] transition-all duration-300 group-hover:text-[#FFB347]">
            {tag}
        </span>
        
        <h4 className="mt-3 text-lg text-gray-900 font-bold leading-tight group-hover:text-[#034E34] transition-colors duration-300">
            {title}
        </h4>
        
        <div className="mt-5 flex items-center gap-2 text-sm text-[#1a3c5e] font-bold uppercase tracking-wider">
          <span className="relative overflow-hidden">
            <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">Read more</span>
            <span className="absolute left-0 top-0 inline-block translate-y-full transition-transform duration-300 group-hover:translate-y-0 text-[#FFB347]">View Project</span>
          </span>
          <span className="inline-block transition-transform duration-300 transform group-hover:translate-x-2 group-hover:scale-125 text-[#FFB347]">
            →
          </span>
        </div>
      </div>
    </Link>
  )
}