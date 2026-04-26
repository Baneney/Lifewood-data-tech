import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

// Assets
import vidAnnotation   from "@/assets/services/services-dataannotation.mp4"
import vidCollection   from "@/assets/services/services-datacollection.mp4"
import vidCuration     from "@/assets/services/services-datacuration.mp4"
import vidValidation   from "@/assets/services/services-datavalidation.mp4"
import vidAcquisition  from "@/assets/services/services-dataacquisition.mp4"

const SERVICES = [
  { 
    id: 0, tag: "01", title: "Data Annotation", headline: "Precision\nLabeling", 
    desc: "Transforming raw pixels into high-fidelity intelligence.", 
    detail: "From 3D LiDAR point clouds to complex semantic segmentation.", 
    video: vidAnnotation, color: "#FFB347",
    features: ["Image & Video Annotation", "Lidar Semantic Segmentation", "Text & Audio Processing", "Sentiment Analysis"]
  },
  { 
    id: 1, tag: "02", title: "Data Collection", headline: "Structured\nGathering", 
    desc: "Global-scale sourcing tailored to your specific edge cases.", 
    detail: "Deploying field experts to capture diverse demographics and rare scenarios.", 
    video: vidCollection, color: "#00E5FF",
    features: ["Biometric Data", "Multilingual Speech", "Handwritten Text", "Point of Interest (POI)"]
  },
  { 
    id: 2, tag: "03", title: "Data Curation", headline: "Intelligent\nRefinery", 
    desc: "Refining real-world noise into structured, high-value assets.", 
    detail: "Our pipeline audits for bias and optimizes for maximum model performance.", 
    video: vidCuration, color: "#A0FF47",
    features: ["Dataset Cleaning", "Bias Auditing", "Metadata Indexing", "Redundant Data Removal"]
  },
  { id: 3, tag: "04", title: "Data Validation", headline: "Verified\nAccuracy", desc: "The gold standard of quality assurance for mission-critical AI.", detail: "Multi-layer human-in-the-loop validation ensures data integrity.", video: vidValidation, color: "#FF4747", features: ["HITL Verification", "Consistency Checks", "Golden Set Creation"] },
  { id: 4, tag: "05", title: "Data Acquisition", headline: "Strategic\nSourcing", desc: "Navigating complex compliance to fuel your growth.", detail: "We handle licensing and ethics, securing exclusive datasets.", video: vidAcquisition, color: "#FFFFFF", features: ["IP Licensing", "Ethical Procurement", "Third-party Sourcing"] },
]

export default function Services() {
  const [active, setActive] = useState(0)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY })
  }

  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return
      if (i === active) {
        v.currentTime = 0
        v.play().catch(() => {})
      } else {
        v.pause()
      }
    })
  }, [active])

  const current = SERVICES[active]

  return (
    <div onMouseMove={handleMouseMove} className="w-full bg-black text-white selection:bg-[#FFB347]/30">
      
      {/* ── SECTION 1: HERO (Sticky Video Engine) ── */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Dynamic Mouse Glow */}
        <div 
          className="pointer-events-none absolute inset-0 z-50 opacity-20 transition-opacity duration-500 hidden md:block"
          style={{ background: `radial-gradient(600px at ${mousePos.x}px ${mousePos.y}px, ${current.color}33, transparent 80%)` }}
        />

        {/* Background Videos */}
        {SERVICES.map((s, i) => (
          <video
            key={s.id}
            ref={el => { videoRefs.current[i] = el }}
            src={s.video}
            muted loop playsInline
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
            style={{ 
              opacity: i === active ? 1 : 0,
              filter: i === active ? 'grayscale(0.2) brightness(0.4)' : 'grayscale(1) brightness(0.2)' 
            }}
          />
        ))}

        {/* Overlays */}
        <div className="absolute inset-0 bg-linear-to-r from-black via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-black/40" />

        {/* Content Block */}
        <div className="absolute bottom-32 md:bottom-20 left-6 md:left-24 z-20 w-full pr-12 md:pr-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-4 mb-4 md:mb-6">
                <span className="h-px w-8 md:w-12 bg-[#FFB347]" />
                <p className="text-[#FFB347] text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] md:tracking-[0.5em]">{current.tag}</p>
              </div>
              
              <h1 className="text-4xl sm:text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter uppercase whitespace-pre-line mb-6 md:mb-8">
                {current.headline}
              </h1>

              <div className="p-5 md:p-6 backdrop-blur-md bg-white/5 border-l-2 border-white/20 rounded-r-lg max-w-[85%] md:max-w-lg">
                <p className="text-gray-200 text-base md:text-lg font-medium leading-relaxed">
                  {current.desc}
                </p>
                <p className="mt-3 md:mt-4 text-gray-400 text-xs md:text-sm italic leading-relaxed">
                  {current.detail}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── RESTORED: Right Navigation Menu ── */}
        <div className="absolute right-8 md:right-16 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-2">
          {SERVICES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setActive(i)}
              className="group relative flex items-center justify-end py-4 pr-6 transition-all"
            >
              <motion.div 
                className={`absolute right-0 h-full bg-white/5 border-r-2 transition-all duration-300 hidden md:block ${
                  active === i ? "w-full border-[#FFB347] bg-white/10" : "w-0 border-transparent group-hover:w-full group-hover:border-white/20"
                }`} 
              />
              
              <div className="relative text-right mr-4 transition-all duration-300 group-hover:-translate-x-2 pl-4 hidden md:block">
                <p className={`text-[9px] font-bold tracking-[0.2em] mb-1 ${active === i ? "text-[#FFB347]" : "text-white/30"}`}>
                  {s.tag}
                </p>
                <p className={`text-[10px] lg:text-sm font-black uppercase tracking-widest ${active === i ? "text-white" : "text-white/40"}`}>
                  {s.title}
                </p>
              </div>

              <div className={`h-2.5 w-2.5 rounded-full transition-all duration-500 ${
                active === i ? "bg-[#FFB347] scale-125 shadow-[0_0_15px_#FFB347]" : "bg-white/20 group-hover:bg-white/50"
              }`} />
            </button>
          ))}
        </div>
      </section>

      {/* ── SECTION 2: CAPABILITIES (Scroll down to see this) ── */}
      <section className="relative z-10 py-32 px-6 md:px-24 bg-[#021a11] overflow-hidden">
        
        {/* Subtle Background Decorative Element - A faint grid or pulse */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" 
            style={{ backgroundImage: `radial-gradient(${current.color}22 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6"
          >
            <div>
              <h2 className="text-[#FFB347] text-sm font-bold tracking-widest uppercase mb-4 flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FFB347] animate-pulse" />
                Depth of Service
              </h2>
              <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
                What we <span className="text-transparent border-b border-white/20" style={{ WebkitTextStroke: '1px white' }}>deliver</span>
              </h3>
            </div>
            <p className="text-zinc-400 max-w-xs text-sm italic">
              Select a service from the menu above to see specialized capabilities.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatePresence mode="popLayout">
              {SERVICES[active].features.map((feature, idx) => (
                <motion.div 
                  key={feature}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  whileHover={{ y: -10, transition: { duration: 0.2 } }}
                  transition={{ delay: idx * 0.05, type: "spring", stiffness: 100 }}
                  className="relative p-8 bg-white/5 border border-white/10 rounded-2xl transition-all group overflow-hidden"
                >
                  {/* Animated Glow Border on Hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute -inset-px bg-linear-to-br from-transparent via-white/20 to-transparent rounded-2xl" />
                  </div>

                  {/* Corner Accent */}
                  <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-all">
                    <div className="w-4 h-4 border-t-2 border-r-2 border-[#FFB347]" />
                  </div>

                  <div className="relative z-10">
                    <div className="text-4xl mb-6 opacity-20 group-hover:opacity-100 group-hover:text-[#FFB347] group-hover:scale-110 transition-all duration-500 font-black inline-block">
                      0{idx + 1}
                    </div>
                    
                    <h4 className="text-xl font-bold mb-4 uppercase leading-tight group-hover:text-white transition-colors">
                      {feature}
                    </h4>
                    
                    <p className="text-zinc-500 text-sm group-hover:text-zinc-300 transition-colors leading-relaxed">
                      Industrial-grade excellence in {current.title.toLowerCase()} specifically for {feature.toLowerCase()} requirements.
                    </p>
                  </div>

                  {/* Background "Ghost" Text for Fun */}
                  <div className="absolute -bottom-4 -right-2 text-6xl font-black text-white/2 pointer-events-none select-none uppercase tracking-tighter">
                    {feature.split(' ')[0]}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: INTERACTIVE PROCESS ── */}
      <section className="py-32 px-6 md:px-24 bg-[#021a11] border-t border-white/5 relative overflow-hidden">
        {/* Background glow for atmosphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-[#FFB347]/5 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-4xl md:text-6xl font-black uppercase mb-16 tracking-tighter"
            >
              The Human-in-the-loop<br/>
              <span className="text-[#FFB347]">Advantage</span>
            </motion.h2>

            <div className="space-y-6">
              {[
                { 
                  title: "Sourcing", 
                  body: "Ethical acquisition from diverse global streams.",
                  metric: "120+ Countries",
                  icon: "🌐"
                },
                { 
                  title: "Production", 
                  body: "High-precision manual labeling and curation.",
                  metric: "Pixel-Perfect",
                  icon: "✍️"
                },
                { 
                  title: "Quality Control", 
                  body: "Triple-layer validation for zero-error outcomes.",
                  metric: "99.9% Accuracy",
                  icon: "🛡️"
                }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  onMouseEnter={() => setActive(i)} // Reusing active state or create a local processActive state
                  className={`group relative p-8 rounded-2xl border transition-all duration-500 cursor-pointer ${
                    active === i ? "bg-white/5 border-white/20" : "bg-transparent border-transparent"
                  }`}
                >
                  <div className="flex gap-8 items-start">
                    <div className={`text-4xl font-black transition-colors duration-500 ${
                      active === i ? "text-[#FFB347]" : "text-white/10"
                    }`}>
                      0{i+1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="text-xl font-bold uppercase tracking-tight">{item.title}</h5>
                        <span className={`text-[10px] font-mono px-2 py-1 rounded border transition-opacity ${
                          active === i ? "opacity-100 border-[#FFB347] text-[#FFB347]" : "opacity-0"
                        }`}>
                          {item.metric}
                        </span>
                      </div>
                      <p className={`transition-colors duration-500 ${
                        active === i ? "text-zinc-200" : "text-zinc-500"
                      }`}>
                        {item.body}
                      </p>
                    </div>
                  </div>
                  
                  {/* Progress bar on the bottom of the active item */}
                  {active === i && (
                    <motion.div 
                      layoutId="process-progress"
                      className="absolute bottom-0 left-0 h-1 bg-[#FFB347] rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.8 }}
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* VISUAL ENGINE SIDE */}
          <div className="relative aspect-square md:aspect-video lg:aspect-square rounded-3xl overflow-hidden border border-white/10 bg-[#133020] flex items-center justify-center group">
            {/* Animated Scanline */}
            <motion.div 
              animate={{ top: ["0%", "100%", "0%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-[#FFB347]/50 to-transparent z-10"
            />

            <div className="absolute inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] bg-size-[20px_20px]" />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 0.8, rotateY: 20 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 1.1, rotateY: -20 }}
                className="text-center relative z-20"
              >
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="text-9xl font-black text-white/5 absolute inset-0 flex items-center justify-center select-none"
                >
                  {active + 1}
                </motion.div>
                
                <h4 className="text-[#FFB347] text-8xl font-black mb-2 tracking-tighter">
                  {active === 0 ? "80TB" : active === 1 ? "12M" : "99%"}
                </h4>
                <p className="font-bold uppercase tracking-[0.4em] text-sm text-zinc-400">
                  {active === 0 ? "Daily Throughput" : active === 1 ? "Labels / Month" : "Precision Rate"}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Decorative HUD corners */}
            <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-white/10" />
            <div className="absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 border-[#FFB347]/40" />
                        
          </div>
        </div>
      </section>      

    </div>
  )
}












