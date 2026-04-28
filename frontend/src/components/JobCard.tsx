import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { MapPin, ArrowRight } from "lucide-react"

// Defining an interface makes the component reusable and cleaner
interface Job {
  title: string
  type: string
  location: string
  desc: string
}

interface JobCardProps {
  role: Job
}

export default function JobCard({ role }: JobCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative h-full flex flex-col justify-between overflow-hidden rounded-3xl border border-white/5 bg-[#417256]/10 p-8 backdrop-blur-xl transition-all duration-500 hover:border-[#FFB347]/30 hover:bg-[#417256]/20"
    >
      <div>
        <div className="mb-6 flex items-start justify-between">
          <span className="rounded-full bg-[#FFB347]/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-[#FFB347]">
            {role.type}
          </span>
          <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase text-white/40">
            <MapPin size={14} className="text-[#FFB347]" /> {role.location}
          </span>
        </div>

        <h3 className="mb-4 text-2xl font-bold leading-tight text-white transition-colors group-hover:text-[#FFB347]">
          {role.title}
        </h3>

        <p className="mb-8 text-sm font-medium leading-relaxed text-white/50">
          {role.desc}
        </p>
      </div>

      <Link
        to="/contact"
        className="flex items-center justify-between border-t border-white/5 pt-6 text-[11px] font-black uppercase tracking-widest text-white/70 transition-colors group-hover:text-white"
      >
        <span>
          View Details <span className="text-[#FFB347]">/</span> Apply
        </span>
        <div className="rounded-full bg-white/5 p-2 transition-all group-hover:bg-[#FFB347] group-hover:text-[#021a11]">
          <ArrowRight
            size={18}
            className="transition-transform group-hover:translate-x-1"
          />
        </div>
      </Link>
    </motion.div>
  )
}