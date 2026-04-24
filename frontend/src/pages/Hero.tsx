import { useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import Highlight from "../components/Highlights"
import FeaturedCard from "../components/FeaturedCard"
import InsightCard from "../components/InsightCard"
import StatCounter from "../helper/statcounter"

import homevid from "@/assets/home/home-world-vid.mp4"

import vidAnnotation from "@/assets/services/services-dataannotation.mp4"
import vidCollection from "@/assets/services/services-datacollection.mp4"
import vidCuration from "@/assets/services/services-datacuration.mp4"
import vidValidation from "@/assets/services/services-datavalidation.mp4"
import vidAcquisition from "@/assets/services/services-dataacquisition.mp4"

import imgAI from "@/assets/projects/project-aicustomerservice.jpeg"
import imgAuto from "@/assets/projects/project-autodriving.jpeg"
import imgML from "@/assets/projects/project-machinelearning.jpeg"
import imgNLP from "@/assets/projects/project-nlp.jpeg"
import imgCV from "@/assets/projects/projects-computervision.jpeg"
import imgExtract from "@/assets/projects/project-dataextraction.jpeg"

import logo from "@/assets/Lifewood-Logo.png"
import logoV2 from "@/assets/Lifewood-LogoV2.png"

export default function Home() {
  const v1 = useRef<HTMLVideoElement>(null)
  const v2 = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const a = v1.current!, b = v2.current!
    const FADE = 1.5
    a.addEventListener("timeupdate", () => {
      const left = a.duration - a.currentTime
      if (left > FADE) return
      b.style.opacity = String(1 - left / FADE)
      if (b.paused) { b.currentTime = 0; b.play() }
      if (left <= 0.05) { a.currentTime = 0; a.play(); b.style.opacity = "0"; b.pause() }
    })
  }, [])

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <video ref={v1} autoPlay muted playsInline className="absolute inset-0 w-full h-full object-cover" src={homevid} />
        <video ref={v2} muted playsInline className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0 }} src={homevid} />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative text-center px-6 max-w-4xl mx-auto">
          <span className="text-sm font-semibold text-[#FFB347] uppercase tracking-widest">Lifewood Data Technology</span>
          <h1 className="mt-4 text-5xl md:text-7xl font-bold text-white leading-tight">
            Powering the World's <span className="text-white">Data</span>
          </h1>
          <p className="mt-6 text-gray-300 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            High-quality data solutions that fuel machine learning, computer vision, and AI systems at scale.
          </p>
          <div className="mt-10 flex gap-4 justify-center flex-wrap">
            <Link to="/services" className="bg-[#FFB347] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#FFC370] transition-colors">Our Services</Link>
            <Link to="/about" className="bg-[#FFB347]/20 border border-[#FFB347] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#FFC370] hover:text-white transition-colors">Learn More</Link>
          </div>
        </div>
        {/* scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/50 text-xs">
          <span>Scroll</span>
          <span className="animate-bounce">↓</span>
        </div>
      </section>

      {/* ── Marquee strip ── */}
      <section className="bg-[#034E34] py-5 overflow-hidden">
        <div className="flex gap-16 animate-[marquee_20s_linear_infinite] whitespace-nowrap">
          {[...Array(5)].map((_, i) =>
            ["Data Annotation", "Data Collection", "Data Curation", "Data Validation", "Data Acquisition", "Computer Vision", "NLP", "Machine Learning"].map(s => (
              <span key={`${s}-${i}`} className="text-white/70 text-sm font-medium uppercase tracking-widest shrink-0">{s}</span>
            ))
          )}
        </div>
      </section>

      {/* ── Featured cards ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-xs text-[#666666] font-semibold uppercase tracking-widest">What We Do</span>
              <h2 className="mt-2 text-3xl md:text-4xl font-bold text-[#034E34]">Our Services</h2>
            </div>
            <Link to="/services" className="hidden md:inline-flex items-center gap-2 text-[#1a3c5e] font-semibold hover:gap-4 transition-all duration-200">
              View all <span>→</span>
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <FeaturedCard title="Data Annotation" tag="Services" video={vidAnnotation} to="/services" />
            <FeaturedCard title="Data Collection" tag="Services" video={vidCollection} to="/services" />
            <FeaturedCard title="Data Curation" tag="Services" video={vidCuration} to="/services" />
          </div>
        </div>
      </section>

      {/* ── Highlights ── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 flex flex-col gap-8">
          <Highlight
            img={imgAI}
            tag="AI Solutions"
            title="AI Customer Service"
            desc="We build and annotate datasets that power next-generation AI customer service systems, enabling natural, accurate, and context-aware interactions."
            to="/projects"
          />
          <Highlight
            img={imgAuto}
            tag="Automotive"
            title="Autonomous Driving Technology"
            desc="Precision-labeled datasets for autonomous vehicle perception — from object detection to lane segmentation at scale."
            to="/projects"
            reverse
          />
          <Highlight
            img={imgML}
            tag="Machine Learning"
            title="ML Enablement"
            desc="From raw data acquisition to validated, model-ready datasets — we handle the full pipeline so your team can focus on building."
            to="/projects"
          />
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="bg-[#034E34] py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10 text-center text-[#FFB347]">
          {[
            { value: 40, suffix: "+", label: "Global Delivery Centers" },
            { value: 30, suffix: "+", label: "Countries Across All Continents" },
            { value: 50, suffix: "+", label: "Languages Capabilities and Dialects" },
            { value: 56000, suffix: "+", label: "Global Online Resources" },
          ].map(s => ( 
            <div key={s.label}>
              <div className="text-4xl md:text-5xl font-bold"><StatCounter value={s.value} suffix={s.suffix} /></div>
              <div className="mt-2 text-white text-sm uppercase tracking-widest">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Insights / Projects ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-xs text-[#666666] font-semibold uppercase tracking-widest">Our Work</span>
              <h2 className="mt-2 text-3xl md:text-4xl font-bold text-[#034E34]">Featured Projects</h2>
            </div>
            <Link to="/projects" className="hidden md:inline-flex items-center gap-2 text-[#1a3c5e] font-semibold hover:gap-4 transition-all duration-200">
              View all <span>→</span>
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <InsightCard img={imgNLP} tag="NLP" title="Natural Language Processing at Scale" to="/projects" />
            <InsightCard img={imgCV} tag="Computer Vision" title="Computer Vision for Industrial Use" to="/projects" />
            <InsightCard img={imgExtract} tag="Data" title="Automated Data Extraction Pipeline" to="/projects" />
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="relative bg-[#021a11] py-32 overflow-hidden">
        {/* 1. Creative Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-250 h-100 bg-[#417256]/20 blur-[120px] rounded-full" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-[#FFB347]/10 blur-[100px] rounded-full animate-pulse" />

        {/* 2. Grid Pattern Overlay (Tech feel) */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none" 
          style={{ 
            backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, 
            backgroundSize: '40px 40px' 
          }} 
        />

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          {/* Animated Logo */}
          <div className="inline-block p-4 mb-8 rounded-2xl bg-white/5 backdrop-blur-3xl border border-white/10 transition-transform duration-500 hover:scale-110">
            <img src={logoV2} alt="Lifewood" className="h-10" />
          </div>

          <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            Ready to power your AI <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#FFB347] to-[#FFC370]">
              with better data?
            </span>
          </h2>

          <p className="mt-8 text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Stop letting poor data quality hold back your innovation. 
            Partner with Lifewood and get the infrastructure your models deserve.
          </p>

          {/* 3. High-Interaction Button */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link 
              to="/contact" 
              className="group relative overflow-hidden bg-[#FFB347] text-[#021a11] px-12 py-5 rounded-full font-bold text-lg transition-all duration-300 hover:shadow-[0_0_40px_8px_rgba(255,179,71,0.3)] hover:-translate-y-1"
            >
              <span className="relative z-10">Get In Touch Now</span>
              <div className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 origin-right transition-transform duration-500" />
            </Link>

            <Link 
              to="/services" 
              className="text-white font-semibold flex items-center gap-2 hover:text-[#FFB347] transition-colors"
            >
              Explore Our Solutions <span>→</span>
            </Link>
          </div>

          {/* 4. Social Proof / Trust Mini-Strip */}
          <div className="mt-20 pt-10 border-t border-white/5">
            <p className="text-white/30 text-xs uppercase tracking-[0.3em] font-medium">
              Trusted by global AI leaders across 30+ countries
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
