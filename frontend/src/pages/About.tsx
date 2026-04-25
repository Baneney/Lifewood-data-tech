import { Link } from "react-router-dom"

// Assets
import imgMission from "@/assets/about-us/about-mission.jpeg"
import imgVision from "@/assets/about-us/about-vision.jpeg"
import vidCuration from "@/assets/about-us/about-lifewoodvid.mp4"


// Components
import VideoHero from "../components/VideoModal"
import ScrollStack from "../components/ScrollStack"
import OfficeGrid from "../components/OfficeMaps"



export default function About() {

  const aboutItems = [
    { tag: "01", label: "Diversity", desc: "We celebrate differences in belief, philosophy and ways of life, because they bring unique perspectives and ideas that encourage everyone to move forward." },
    { tag: "02", label: "Caring", desc: "We care for every person deeply and equally, because without care work becomes meaningless." },
    { tag: "03", label: "Innovation", desc: "Innovation is at the heart of all we do, enriching our lives and challenging us to continually improve ourselves and our service." },
    { tag: "04", label: "Integrity", desc: "We are dedicated to act ethically and sustainably in everything we do. More than just the bare minimum. It is the basis of our existence as a company." }
  ];


  return (
    <div className="bg-[#021a11] text-white selection:bg-[#FFB347] selection:text-[#034E34]">

      {/* ── 1. HERO — Asymmetric Grid (NRG Style) ── */}
      <section className="relative min-h-screen grid grid-cols-12 items-end pb-20 px-8 md:px-16 pt-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={imgMission} alt="" className="w-full h-full object-cover opacity-20 transition-transform duration-1000 scale-105" />
          <div className="absolute inset-0 bg-linear-to-t from-[#021a11] via-transparent to-transparent" />
        </div>

        {/* Headline Section */}
        <div className="relative z-10 col-span-12 lg:col-span-8">
          <p className="text-xs font-bold text-[#FFB347] uppercase tracking-[0.5em] mb-8 animate-pulse">
            Established 2004
          </p>
          <h1 className="text-7xl md:text-[9rem] lg:text-[11rem] font-black leading-[0.8] tracking-tighter uppercase mb-6">
            We Are<br />
            <span className="text-transparent border-text">Lifewood.</span>
          </h1>
          <p className="mt-8 text-gray-400 text-lg max-w-md leading-relaxed">
            A data technology company on a mission to power the world's most ambitious AI systems.
          </p>
        </div>

        {/* ── Video Component replaces the old button and modal code ── */}
        <div className="relative z-10 col-span-12 lg:col-span-4 flex flex-col items-start lg:items-end mt-12 lg:mt-0">
          <VideoHero 
            thumbnailVideo={vidCuration} 
            modalVideo={vidCuration}
            label="Watch Our Story"
            timestamp="02:14"
          />
        </div>
      </section>
 
      {/* ── 2. MANIFESTO — Minimalist Split ── */}
      <section className="py-40 px-8 md:px-16 border-t border-white/5 grid grid-cols-12 gap-8">
        <div className="col-span-12 md:col-span-4">
          <p className="text-[#FFB347] text-xs font-bold uppercase tracking-[0.4em] mb-4">The Core Belief</p>
        </div>
        <div className="col-span-12 md:col-span-8">
          <h2 className="text-4xl md:text-6xl font-light leading-tight tracking-tight text-gray-200">
            Data is the <span className="text-white font-medium italic">foundation</span> of every intelligent system. We build that foundation with <span className="text-[#FFB347] font-bold">Precision.</span>
          </h2>
        </div>
      </section>

      {/* ── 3. FULL-BLEED VIDEO ── */}
      {/* <InteractiveVision videoSrc={vidCollection} /> */}
      <ScrollStack 
        bgText="LIFEWOOD" 
        headline="Core"
        headlineAccent="Values"
        items={aboutItems} 
      />

      {/* ── 4. MISSION & VISION — Grid Masonry ── */}
      <section className="grid md:grid-cols-2 gap-px bg-white/5">
        <div className="flex flex-col justify-center px-10 md:px-20 py-32 bg-[#021a11]">
          <p className="text-xs font-bold text-[#FFB347] uppercase tracking-[0.3em] mb-6">Our Mission</p>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-8">Delivering Data<br />That Performs</h2>
          <p className="text-gray-400 leading-relaxed max-w-md">
            To develop and deploy cutting edge Al technologies that solve real-world problems, empower communities, and advance sustainable practices. We are committed to fostering a culture of innovation, collaborating with stakeholders across sectors, and making a meaningful impact on society and the environment.
          </p>
        </div>
        <div className="relative h-[60vh] md:h-auto overflow-hidden">
          <img src={imgMission} alt="" className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
        </div>
        <div className="relative h-[60vh] md:h-auto overflow-hidden order-last md:order-0">
          <img src={imgVision} alt="" className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
        </div>
        <div className="flex flex-col justify-center px-10 md:px-20 py-32 bg-[#032418]">
          <p className="text-xs font-bold text-[#FFB347] uppercase tracking-[0.3em] mb-6">Our Vision</p>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-8">A World Powered<br />By Trust</h2>
          <p className="text-gray-400 leading-relaxed max-w-md">
            To be the global champion in Al data solutions, igniting a culture of innovation and sustainability that enriches lives and transforms communities worldwide.
          </p>
        </div>
      </section>

      {/* ── 5. STATS ── */}
      {/* <section className="py-32 px-8 md:px-16 bg-[#021a11]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {[
            { value: 40, suffix: "+", label: "Centers" },
            { value: 30, suffix: "+", label: "Countries" },
            { value: 50, suffix: "+", label: "Languages" },
            { value: 56000, suffix: "+", label: "Resources" },
          ].map(s => (
            <div key={s.label} className="group">
              <div className="text-5xl md:text-7xl font-black text-white/10 group-hover:text-[#FFB347] transition-colors duration-500">
                <StatCounter value={s.value} suffix={s.suffix} />
              </div>
              <p className="mt-4 text-[10px] uppercase tracking-[0.3em] text-gray-500 font-bold">{s.label}</p>
            </div>
          ))}
        </div>
      </section> */}
      <OfficeGrid />

      {/* ── 6. CTA — Massive NRG Style ── */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-8 py-32 border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-black text-white/2 uppercase pointer-events-none whitespace-nowrap">
          Lifewood
        </div>
        
        <p className="relative z-10 text-xs font-bold text-[#FFB347] uppercase tracking-[0.5em] mb-12">Next Steps</p>
        <h2 className="relative z-10 text-6xl md:text-[10rem] font-black leading-[0.8] tracking-tighter uppercase mb-16">
          Ready to<br /><span className="text-transparent border-text">Scale?</span>
        </h2>
        <Link
          to="/contact"
          className="relative z-10 bg-[#FFB347] text-[#021a11] px-12 py-6 font-black text-sm uppercase tracking-[0.2em] hover:bg-white transition-all duration-300"
        >
          Get In Touch →
        </Link>
      </section>
    </div>
  )
}