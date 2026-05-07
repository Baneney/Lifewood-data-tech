// import { useRef } from "react"
// import { Link } from "react-router-dom"

// interface FeaturedCardProps {
//   title: string
//   tag: string
//   video: string
//   to: string
// }

// export default function FeaturedCard({ title, tag, video, to }: FeaturedCardProps) {
//   const ref = useRef<HTMLVideoElement>(null)
//   return (
//     <Link
//       to={to}
//       className="group relative rounded-2xl overflow-hidden block"
//       onMouseEnter={() => ref.current?.play()}
//       onMouseLeave={() => { if (ref.current) { ref.current.pause(); ref.current.currentTime = 0 } }}
//     >
//       <video ref={ref} muted loop playsInline src={video} className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105" />
//       <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
//       <div className="absolute bottom-0 p-6">
//         <span className="text-xs text-[#FFB347] font-semibold uppercase tracking-widest">{tag}</span>
//         <h3 className="mt-1 text-white text-xl font-bold">{title}</h3>
//         <span className="mt-3 inline-flex items-center gap-1 text-sm text-[#708E7C] font-medium group-hover:gap-3 transition-all duration-200">
//           Learn more <span>→</span>
//         </span>
//       </div>
//     </Link>
//   )
// }

// import { useRef } from "react"
// import { Link } from "react-router-dom"

// interface FeaturedCardProps {
//   id: string
//   title: string
//   tag: string
//   video: string
//   to: string
// }

// export default function FeaturedCard({ id, title, tag, video, to }: FeaturedCardProps) {
//   const ref = useRef<HTMLVideoElement>(null)

//   return (
//     <Link
//       to={to}
//       className="group relative block h-112.5 w-full overflow-hidden rounded-3xl border border-[#034E34]/10 dark:border-white/5 bg-[#f0f7f4] dark:bg-[#021a11]"
//       onMouseEnter={() => ref.current?.play()}
//       onMouseLeave={() => {
//         if (ref.current) {
//           ref.current.pause()
//           ref.current.currentTime = 0
//         }
//       }}
//     >
//       {/* ── Background Video Layer ── */}
//       <div className="absolute inset-0 z-0">
//         <video
//           ref={ref}
//           muted
//           loop
//           playsInline
//           src={video}
//           className="h-full w-full object-cover scale-110 transition-transform duration-1000 group-hover:scale-100 opacity-60 group-hover:opacity-100"
//         />
//         {/* Dynamic Darkening Overlay */}
//         <div className="absolute inset-0 bg-linear-to-t from-[#034E34] via-[#034E34]/40 to-transparent dark:from-[#021a11] dark:via-[#021a11]/40" />
//       </div>

//       {/* ── Floating Interface UI (Unique to FeaturedCard) ── */}
//       <div className="relative z-10 h-full w-full p-8 flex flex-col justify-between">

//         {/* Top: Tech Detail */}
//         <div className="flex justify-between items-start">
//           <div className="bg-white/10 backdrop-blur-md border border-white/10 px-3 py-1 rounded-sm text-[10px] text-white tracking-[0.2em] font-bold uppercase">
//             {tag} // {id}
//           </div>
//           <div className="w-8 h-px bg-[#FFB347]/50 mt-2 group-hover:w-16 transition-all duration-500" />
//         </div>

//         {/* Bottom: Title and Custom CTA */}
//         <div className="space-y-4">
//           <h3 className="text-3xl font-bold text-white max-w-[80%] leading-tight tracking-tight transition-colors duration-300">
//             {title}
//           </h3>

//           <div className="relative pt-4 overflow-hidden">
//             {/* The "Orange Line" Accent - Expands on hover */}
//             <div className="absolute top-0 left-0 h-px w-12 bg-[#FFB347] group-hover:w-full transition-all duration-700 ease-in-out" />

//             <div className="flex items-center justify-between text-[#FFB347] font-black text-[11px] uppercase tracking-widest pt-4">
//               <span>Launch Service</span>
//               <div className="flex items-center gap-1 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
//                 <span className="w-1.5 h-1.5 bg-[#FFB347] rounded-full animate-pulse" />
//                 <span className="w-1.5 h-1.5 bg-[#FFB347] rounded-full animate-pulse delay-75" />
//                 <span className="w-1.5 h-1.5 bg-[#FFB347] rounded-full animate-pulse delay-150" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ── Hover Border "Ignition" ── */}
//       <div className="absolute inset-0 border border-[#FFB347] opacity-0 scale-105 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100 pointer-events-none rounded-3xl" />
//     </Link>
//   )
// }

import { useRef } from "react";
import { Link } from "react-router-dom";

interface FeaturedCardProps {
  id: string;
  title: string;
  tag: string;
  video: string;
  to: string;
}

export default function FeaturedCard({
  id,
  title,
  tag,
  video,
  to,
}: FeaturedCardProps) {
  const ref = useRef<HTMLVideoElement>(null);

  return (
    <Link
      to={to}
      // THE FIX: Changed bg-white/light-green to match dark mode precisely
      // Added dark:border-white/10 to ensure the border isn't too bright
      className="group relative block h-112.5 w-full overflow-hidden rounded-3xl border border-[#034E34]/10 dark:border-white/10 bg-[#f8faf9] dark:bg-[#021a11] transition-all duration-500 shadow-sm hover:shadow-2xl"
      onMouseEnter={() => ref.current?.play()}
      onMouseLeave={() => {
        if (ref.current) {
          ref.current.pause();
          ref.current.currentTime = 0;
        }
      }}
    >
      {/* ── Background Video Layer ── */}
      {/* THE FIX: Added dark:bg-[#021a11] to the container layer so the video doesn't have a white backdrop */}
      <div className="absolute inset-0 z-0 bg-[#034E34] dark:bg-[#021a11]">
        <video
          ref={ref}
          muted
          loop
          playsInline
          src={video}
          // The key: Using dark:opacity-40 to keep it consistent in dark mode
          className="h-full w-full object-cover scale-110 transition-transform duration-1000 group-hover:scale-100 opacity-80 group-hover:opacity-100"
        />

        {/* PROFESSIONAL OVERLAY: Switched to dynamic dark mode colors */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#034E34] via-[#034E34]/20 to-transparent dark:from-[#021a11] dark:via-[#021a11]/40" />

        {/* THE FIX: Soften the inner shadow for dark mode so it doesn't look like a white glow */}
        <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.2)] dark:shadow-none" />
      </div>

      {/* ── Floating Interface UI ── */}
      <div className="relative z-10 h-full w-full p-8 flex flex-col justify-between">
        {/* Top: Tech Detail */}
        <div className="flex justify-between items-start">
          <div className="bg-black/20 backdrop-blur-md px-3 py-1 rounded-sm text-[10px] text-white tracking-[0.2em] font-bold uppercase border border-white/10">
            {tag} // {id}
          </div>
          <div className="w-8 h-px bg-[#FFB347] mt-2 group-hover:w-16 transition-all duration-500" />
        </div>

        {/* Bottom: Title and Custom CTA */}
        <div className="space-y-4">
          <h3 className="text-3xl font-black text-white max-w-[80%] leading-tight tracking-tight">
            {title}
          </h3>

          <div className="relative pt-4 overflow-hidden">
            <div className="absolute top-0 left-0 h-px w-12 bg-[#FFB347] group-hover:w-full transition-all duration-700 ease-in-out" />

            <div className="flex items-center justify-between text-[#FFB347] font-black text-[11px] uppercase tracking-widest pt-4">
              <span>Launch Service</span>
              <div className="flex items-center gap-1.5 opacity-80">
                <span className="w-1.5 h-1.5 bg-[#FFB347] rounded-full animate-pulse" />
                <span className="w-1.5 h-1.5 bg-[#FFB347] rounded-full animate-pulse delay-75" />
                <span className="w-1.5 h-1.5 bg-[#FFB347] rounded-full animate-pulse delay-150" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Hover Border ── */}
      <div className="absolute inset-0 border-2 border-[#FFB347] opacity-0 scale-105 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100 pointer-events-none rounded-3xl" />
    </Link>
  );
}