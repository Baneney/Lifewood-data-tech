import { useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import Highlight from "../components/Highlights"
import FeaturedCard from "../components/FeaturedCard"
import InsightCard from "../components/InsightCard"
import StatCounter from "../helper/statcounter"

import homevid from "@/assets/home/home-world-vid.mp4"

import vidAnnotation from "@/assets/services/services-dataannotation.mp4"
import vidCollection from "@/assets/services/services-datacollection.mp4"
import vidCuration from "@/assets/services/services-datacuration.mp4"

import imgAI from "@/assets/projects/project-aicustomerservice.jpeg"
import imgAuto from "@/assets/projects/project-autodriving.jpeg"
import imgML from "@/assets/projects/project-machinelearning.jpeg"
import imgNLP from "@/assets/projects/project-nlp.jpeg"
import imgCV from "@/assets/projects/projects-computervision.jpeg"
import imgExtract from "@/assets/projects/project-dataextraction.jpeg"

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
<section className="relative min-h-screen flex items-start md:items-center pt-32 md:pt-0 overflow-hidden">
  {/* Video Background */}
  <video ref={v1} autoPlay muted playsInline className="absolute inset-0 w-full h-full object-cover" src={homevid} />
  <video ref={v2} muted playsInline className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0 }} src={homevid} />
  
  {/* The "Safe Zone" Mask */}
  <div className="absolute inset-0 bg-gradient-to-r from-[#021a11] via-[#021a11]/80 to-transparent z-0" />

  <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16 w-full">
    <div className="max-w-3xl"> 
    
      
      {/* 2. Headline */}
      <h1 className="text-5xl md:text-7xl lg:text-[100px] font-black text-white leading-[0.95] tracking-tighter pt-15">
        Powering the <br /> 
        World's <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFB347] to-[#FFC370]">Data Intelligence</span>
      </h1>

      {/* 3. Subtext */}
      <p className="mt-12 text-white/50 text-base md:text-xl leading-relaxed max-w-xl font-medium border-l border-white/10 pl-8">
        High-quality data solutions that fuel machine learning, computer vision, and AI systems at scale.
      </p>

      {/* 4. Actions */}
      <div className="mt-16 flex flex-col sm:flex-row gap-10 items-center sm:items-start">
        <Link 
          to="/services" 
          className="group relative px-12 py-5 bg-[#FFB347] rounded-full overflow-hidden transition-all duration-300 hover:shadow-[0_0_50px_rgba(255,179,71,0.3)] hover:-translate-y-1"
        >
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
          <span className="relative z-10 text-[#021a11] font-black uppercase tracking-widest text-xs">
            Our Services
          </span>
        </Link>

        <Link 
          to="/about" 
          className="group text-white/60 font-bold uppercase tracking-[0.3em] text-[10px] flex items-center gap-4 py-5 hover:text-[#FFB347] transition-all"
        >
          Learn More
          <span className="w-12 h-px bg-white/20 group-hover:w-20 group-hover:bg-[#FFB347] transition-all duration-500" />
        </Link>
      </div>
    </div>
  </div>

  {/* 5. Refined Scroll Indicator (Moved to Right Side) */}
  <div className="absolute bottom-15 right-8 md:right-16 flex flex-col items-center gap-4 z-20">
      <div className="w-px h-12 bg-white/10 relative overflow-hidden">
        <motion.div 
          animate={{ y: [0, 48, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-full h-1/3 bg-[#FFB347]"
        />
      </div>
      <span className="text-white/30 text-[10px] uppercase tracking-[0.3em] font-bold">
        Scroll
      </span>
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
      <section className="py-24 bg-[#021a11]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-[#FFB347] text-xs font-bold uppercase tracking-[0.4em] mb-4">What We Do</span>
              <h2 className="mt-2 text-3xl md:text-4xl font-bold text-white">Our Services</h2>
            </div>
            <Link to="/services" className="hidden md:inline-flex items-center gap-2 text-white font-semibold hover:gap-4 transition-all duration-200">
              View all <span>→</span>
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <FeaturedCard id="01" title="Data Annotation" tag="Services" video={vidAnnotation} to="/services" />
            <FeaturedCard id="02" title="Data Collection" tag="Services" video={vidCollection} to="/services" />
            <FeaturedCard id="03" title="Data Curation" tag="Services" video={vidCuration} to="/services" />
          </div>
        </div>
      </section>



      {/* ── Highlights Section (HIGH VISIBILITY VERSION) ── */}
      <section className="relative py-24 bg-[#021a11] overflow-hidden">
        
        {/* 1. POWERFUL CENTER GLOW - Increased Opacity and Size */}
        <div className="absolute top-0 left-1/4 w-250 h-full bg-[#417256]/10 blur-[120px] rounded-full pointer-events-none rotate-12" />
        
        {/* 2. SECONDARY ORANGE GLOW - Adds a 'warmth' to the green */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#FFB347]/10 blur-[100px] rounded-full pointer-events-none z-0" />

        {/* 3. VISIBLE GRID - Changed opacity from 0.05 to 0.15 */}
        <div 
          className="absolute inset-0 opacity-[0.3] pointer-events-none" 
          style={{ 
            backgroundImage: `radial-gradient(circle at 1.5px 1.5px, rgba(255,255,255,0.15) 1.5px, transparent 0)`, 
            backgroundSize: '24px 24px' 
          }} 
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="text-[#FFB347] text-xs font-black uppercase tracking-[0.5em] drop-shadow-md">
              Our Impact
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl font-bold text-white tracking-tight">
              Industry Highlights
            </h2>
          </div>

          <div className="flex flex-col gap-12">
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
        </div>

        {/* Orange Orb */}
        <div className="absolute top-1/4 right-12 w-3 h-3 bg-[#FFB347] rounded-full blur-[2px] animate-bounce opacity-60 z-20" />
        
        {/* White Orb */}
        <div className="absolute bottom-1/4 left-12 w-2.5 h-2.5 bg-[#FFB347] rounded-full blur-[1px] animate-bounce opacity-40 z-20" />
      </section>     



      {/* ── Stats Section: High-Interaction "Data Scanner" Version ── */}
      <section className="relative bg-[#034E34] overflow-hidden">
        
        {/* Ambient Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-250 h-125 bg-white/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-0">
            {[
              { value: 40, suffix: "+", label: "Global Delivery Centers" },
              { value: 30, suffix: "+", label: "Countries Across Continents" },
              { value: 50, suffix: "+", label: "Language Capabilities" },
              { value: 56, suffix: "K+", label: "Global Online Resources" },
            ].map((s, _index) => (
              <div 
                key={s.label} 
                className="group relative py-16 px-8 flex flex-col items-center justify-center transition-all duration-500 overflow-hidden"
              >
                {/* A. THE GHOST NUMBER (Background) */}
                <span className="absolute bottom-0 right-0 text-9xl font-black text-white/2 select-none transition-all duration-1000 group-hover:-translate-y-12 group-hover:-translate-x-8 group-hover:text-[#FFB347]/[0.07] group-hover:rotate-6">
                  {s.value}
                </span>

                {/* B. CORNER SCANNER FRAMES (Appears on Hover) */}
                <div className="absolute top-10 left-10 w-0 h-0 border-t-2 border-l-2 border-[#FFB347] opacity-0 transition-all duration-500 group-hover:w-6 group-hover:h-6 group-hover:opacity-100" />
                <div className="absolute bottom-10 right-10 w-0 h-0 border-b-2 border-r-2 border-[#FFB347] opacity-0 transition-all duration-500 group-hover:w-6 group-hover:h-6 group-hover:opacity-100" />

                {/* C. RADIAL HOVER GLOW */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_center,rgba(255,179,71,0.1)_0%,transparent_70%)] pointer-events-none" />

                {/* D. MAIN CONTENT */}
                <div className="relative z-10 flex flex-col items-center">
                  {/* The Counter */}
                  <div className="text-5xl md:text-6xl font-black text-[#FFB347] mb-2 transition-transform duration-500 group-hover:scale-110 drop-shadow-[0_0_20px_rgba(255,179,71,0.2)]">
                    <StatCounter value={s.value} suffix={s.suffix} />
                  </div>

                  {/* Decorative Divider Line */}
                  <div className="h-0.5 w-6 bg-white/20 rounded-full transition-all duration-500 group-hover:w-16 group-hover:bg-[#FFB347]" />

                  {/* The Label */}
                  <p className="mt-6 text-white/40 text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-center max-w-40 leading-relaxed group-hover:text-white transition-colors duration-300">
                    {s.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* ── Insights / Projects ── */}
      <section className="py-24 bg-[#021a11]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-[#FFB347] text-xs font-bold uppercase tracking-[0.4em] mb-4">Our Work</span>
              <h2 className="mt-2 text-3xl md:text-4xl font-bold text-white">Featured Projects</h2>
            </div>
            <Link to="/projects" className="hidden md:inline-flex items-center gap-2 text-white font-semibold hover:gap-4 transition-all duration-200">
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
          <div className="group relative inline-block p-px mb-8 rounded-2xl overflow-hidden shadow-2xl">
            {/* 1. THE SMOOTHING LAYER: A secondary spinning blur that prevents the 'harsh' edge */}
            <div 
              className="absolute inset-[-50%] bg-[conic-gradient(from_0deg,transparent_45%,#FFB347_50%,transparent_55%)] animate-[spin_6s_linear_infinite] blur-xs opacity-40" 
              style={{ willChange: 'transform' }}
            />

            {/* 2. THE MAIN BEAM: Slightly wider transparency range for a 'comet' tail effect */}
            <div 
              className="absolute -inset-full bg-[conic-gradient(from_0deg,transparent_35%,#FFB347_50%,transparent_65%)] animate-[spin_6s_linear_infinite] opacity-60" 
              style={{ willChange: 'transform' }}
            />
            
            {/* 3. THE CONTAINER: Using your specific #043523 background */}
            <div className="relative p-4 rounded-2xl bg-[#043523] backdrop-blur-3xl border border-white/10 transition-all duration-500 group-hover:scale-105 group-hover:border-[#FFB347]/30">
              <img 
                src={logoV2} 
                alt="Lifewood" 
                className="h-10 transition-all duration-500 group-hover:brightness-110 group-hover:drop-shadow-[0_0_10px_rgba(255,179,71,0.2)]" 
              />
            </div>

            {/* 4. STATIC INNER GLOW: Makes the box feel 'charged' */}
            <div className="absolute inset-0 bg-[#FFB347]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
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
