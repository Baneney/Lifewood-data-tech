import { useRef } from "react"
import { Link } from "react-router-dom"

interface FeaturedCardProps {
  title: string
  tag: string
  video: string
  to: string
}

export default function FeaturedCard({ title, tag, video, to }: FeaturedCardProps) {
  const ref = useRef<HTMLVideoElement>(null)
  return (
    <Link
      to={to}
      className="group relative rounded-2xl overflow-hidden block"
      onMouseEnter={() => ref.current?.play()}
      onMouseLeave={() => { if (ref.current) { ref.current.pause(); ref.current.currentTime = 0 } }}
    >
      <video ref={ref} muted loop playsInline src={video} className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105" />
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute bottom-0 p-6">
        <span className="text-xs text-[#FFB347] font-semibold uppercase tracking-widest">{tag}</span>
        <h3 className="mt-1 text-white text-xl font-bold">{title}</h3>
        <span className="mt-3 inline-flex items-center gap-1 text-sm text-[#708E7C] font-medium group-hover:gap-3 transition-all duration-200">
          Learn more <span>→</span>
        </span>
      </div>
    </Link>
  )
}