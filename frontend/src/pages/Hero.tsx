import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Highlight from "../components/Highlights";
import FeaturedCard from "../components/FeaturedCard";
import InsightCard from "../components/InsightCard";
import StatCounter from "../helpers/statcounter";
import TrueFocus from "../components/TrueFocus";
import GlobeBackground from "../components/GlobeBackground";

import vidAnnotation from "@/assets/services/services-dataannotation.mp4";
import vidCollection from "@/assets/services/services-datacollection.mp4";
import vidCuration from "@/assets/services/services-datacuration.mp4";

import imgAI from "@/assets/projects/project-aicustomerservice.jpeg";
import imgAuto from "@/assets/projects/project-autodriving.jpeg";
import imgML from "@/assets/projects/project-machinelearning.jpeg";
import imgNLP from "@/assets/projects/project-nlp.jpeg";
import imgCV from "@/assets/projects/projects-computervision.jpeg";
import imgExtract from "@/assets/projects/project-dataextraction.jpeg";

import logoV2 from "@/assets/Lifewood-LogoV2.png";

export default function Home() {
  const [showSplash, setShowSplash] = useState(() => !sessionStorage.getItem("splashSeen"));

  // ── Section refs for scoped parallax ──────────────────────────────────────
  const heroRef       = useRef<HTMLElement>(null);
  const servicesRef   = useRef<HTMLElement>(null);
  const highlightsRef = useRef<HTMLElement>(null);
  const statsRef      = useRef<HTMLElement>(null);
  const projectsRef   = useRef<HTMLElement>(null);

  // ── Hero: globe drifts down, content lifts + fades out ────────────────────
  const { scrollYProgress: heroP } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const globeY        = useTransform(heroP, [0, 1], ["0%", "30%"]);
  const heroContentY  = useTransform(heroP, [0, 1], ["0%", "-18%"]);
  const heroOpacity   = useTransform(heroP, [0, 0.75], [1, 0]);
  const indicatorOp   = useTransform(heroP, [0, 0.2], [1, 0]);

  // ── Services: bg drifts at half speed of content ──────────────────────────
  const { scrollYProgress: servicesP } = useScroll({ target: servicesRef, offset: ["start end", "end start"] });
  const servicesBgY = useTransform(servicesP, [0, 1], ["-8%", "8%"]);

  // ── Highlights: dot grid drifts opposite to scroll ────────────────────────
  const { scrollYProgress: highlightsP } = useScroll({ target: highlightsRef, offset: ["start end", "end start"] });
  const dotGridY = useTransform(highlightsP, [0, 1], ["-15%", "15%"]);

  // ── Stats: ambient glow blob drifts vertically ────────────────────────────
  const { scrollYProgress: statsP } = useScroll({ target: statsRef, offset: ["start end", "end start"] });
  const statsGlowY = useTransform(statsP, [0, 1], ["-25%", "25%"]);

  // ── Projects: bg text sweeps horizontally, scanner line moves across ──────
  const { scrollYProgress: projectsP } = useScroll({ target: projectsRef, offset: ["start start", "end end"] });
  const bgTextX  = useTransform(projectsP, [0, 1], ["0%", "-30%"]);
  const scannerX = useTransform(projectsP, [0, 1], ["-200px", "100vw"]);


  useEffect(() => {
    if (!showSplash) return;
    sessionStorage.setItem("splashSeen", "1");
    const timer = setTimeout(() => setShowSplash(false), 3200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* ── Splash Screen ── */}
      <AnimatePresence>
        {showSplash && (
          <motion.div
            key="splash"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[9999] flex flex-col gap-6 items-center justify-center bg-[#021a11]"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <TrueFocus
                sentence="Powering World's Data"
                borderColor="#FFB347"
                glowColor="rgba(255,179,71,0.5)"
                animationDuration={0.5}
                pauseBetweenAnimations={0.6}
                blurAmount={6}
                textColor="white"
              />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-white/30 text-xs uppercase tracking-[0.5em] font-bold"
            >
              Powering the World's AI
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HERO ── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-start md:items-center pt-32 md:pt-0 overflow-hidden bg-[#021a11]"
      >
        {/* Globe — drifts down slower than scroll */}
        <motion.div
          style={{ y: globeY }}
          className="absolute inset-0 will-change-transform"
        >
          <GlobeBackground />
        </motion.div>

        {/* Gradient mask */}
        {/* <div className="absolute inset-0 bg-gradient-to-r from-[#021a11] from-[15%] via-[#021a11]/60 via-[40%] to-transparent z-[2] pointer-events-none" /> */}

        {/* Content — lifts up and fades as hero exits viewport */}
        <motion.div
          style={{ y: heroContentY, opacity: heroOpacity }}
          className="relative z-[3] max-w-7xl mx-auto px-8 md:px-16 w-full pointer-events-none will-change-transform"
        >
          <div className="max-w-3xl pointer-events-auto">
            <h1 className="text-5xl md:text-7xl lg:text-[100px] font-black text-white leading-[0.95] tracking-tighter pt-15">
              Powering the <br />
              World's{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFB347] to-[#FFC370]">
                Data Intelligence
              </span>
            </h1>

            <p className="mt-12 text-white/50 text-base md:text-xl leading-relaxed max-w-xl font-medium border-l border-white/10 pl-8">
              High-quality data solutions that fuel machine learning, computer
              vision, and AI systems at scale.
            </p>

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
        </motion.div>

        {/* Scroll indicator — fades out early */}
        <motion.div
          style={{ opacity: indicatorOp }}
          className="absolute bottom-15 right-8 md:right-16 flex flex-col items-center gap-4 z-20"
        >
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
        </motion.div>
      </section>

      {/* ── MARQUEE ── */}
      <section className="bg-[#034E34] py-5 overflow-hidden">
        <div className="flex gap-16 animate-[marquee_20s_linear_infinite] whitespace-nowrap">
          {[...Array(5)].map((_, i) =>
            [
              "Data Annotation",
              "Data Collection",
              "Data Curation",
              "Data Validation",
              "Data Acquisition",
              "Computer Vision",
              "NLP",
              "Machine Learning",
            ].map((s) => (
              <span
                key={`${s}-${i}`}
                className="text-white/70 text-sm font-medium uppercase tracking-widest shrink-0"
              >
                {s}
              </span>
            )),
          )}
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section
        ref={servicesRef}
        className="relative py-24 overflow-hidden"
        style={{ backgroundColor: "var(--site-bg-alt)" }}
      >
        {/* Background layer drifts at half speed */}
        <motion.div
          style={{ y: servicesBgY }}
          className="absolute inset-0 pointer-events-none will-change-transform"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(3,78,52,0.08),transparent_70%)]" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative z-10 max-w-7xl mx-auto px-6"
        >
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-[#FFB347] text-xs font-bold uppercase tracking-[0.4em] mb-4 block">
                What We Do
              </span>
              <h2 className="mt-2 text-3xl md:text-4xl font-bold text-[#034E34] dark:text-white">
                Our Services
              </h2>
            </div>
            <Link
              to="/services"
              className="hidden md:inline-flex items-center gap-2 text-[#034E34] dark:text-white font-semibold hover:gap-4 transition-all duration-200"
            >
              View all <span>→</span>
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <FeaturedCard
              id="01"
              title="Data Annotation"
              tag="Services"
              video={vidAnnotation}
              to="/services"
            />
            <FeaturedCard
              id="02"
              title="Data Collection"
              tag="Services"
              video={vidCollection}
              to="/services"
            />
            <FeaturedCard
              id="03"
              title="Data Curation"
              tag="Services"
              video={vidCuration}
              to="/services"
            />
          </div>
        </motion.div>
      </section>

      {/* ── HIGHLIGHTS ── */}
      <section
        ref={highlightsRef}
        className="relative bg-[#E6E6E6] dark:bg-[#021a11] transition-colors duration-500 py-24 overflow-hidden"
      >
        {/* Dot grid drifts upward as you scroll down — opposite to content */}
        <motion.div
          style={{ y: dotGridY }}
          className="absolute inset-0 opacity-[0.25] pointer-events-none will-change-transform
            [background-image:radial-gradient(circle_at_1.5px_1.5px,#034E34_1.5px,transparent_0)]
            dark:[background-image:radial-gradient(circle_at_1.5px_1.5px,#FFB347_1.5px,transparent_0)]
            [background-size:32px_32px]"
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative z-10 max-w-7xl mx-auto px-6"
        >
          <div className="text-center mb-20">
            <span className="text-[#C17110] dark:text-[#FFB347] text-xs font-black uppercase tracking-[0.6em]">
              Our Impact
            </span>
            <h2 className="mt-4 text-4xl md:text-6xl font-black text-[#034E34] dark:text-white tracking-tighter">
              Industry Highlights
            </h2>
            <div className="mt-6 w-24 h-1 bg-[#FFB347] mx-auto rounded-full" />
          </div>

          <div className="flex flex-col gap-16">
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
        </motion.div>
      </section>

      {/* ── STATS ── */}
      <section ref={statsRef} className="relative bg-[#034E34] overflow-hidden">
        {/* Ambient glow blob drifts vertically through the section */}
        <motion.div
          style={{ y: statsGlowY }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[450px] bg-white/5 blur-[120px] rounded-full pointer-events-none will-change-transform"
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative z-10 max-w-7xl mx-auto px-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-0">
            {[
              { value: 40, suffix: "+", label: "Global Delivery Centers" },
              { value: 30, suffix: "+", label: "Countries Across Continents" },
              { value: 50, suffix: "+", label: "Language Capabilities" },
              { value: 56, suffix: "K+", label: "Global Online Resources" },
            ].map((s) => (
              <div
                key={s.label}
                className="group relative py-16 px-8 flex flex-col items-center justify-center transition-all duration-500 overflow-hidden"
              >
                <span className="absolute bottom-0 right-0 text-9xl font-black text-white/[0.02] select-none transition-all duration-1000 group-hover:-translate-y-12 group-hover:-translate-x-8 group-hover:text-[#FFB347]/[0.07] group-hover:rotate-6">
                  {s.value}
                </span>
                <div className="absolute top-10 left-10 w-0 h-0 border-t-2 border-l-2 border-[#FFB347] opacity-0 transition-all duration-500 group-hover:w-6 group-hover:h-6 group-hover:opacity-100" />
                <div className="absolute bottom-10 right-10 w-0 h-0 border-b-2 border-r-2 border-[#FFB347] opacity-0 transition-all duration-500 group-hover:w-6 group-hover:h-6 group-hover:opacity-100" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_center,rgba(255,179,71,0.1)_0%,transparent_70%)] pointer-events-none" />
                <div className="relative z-10 flex flex-col items-center">
                  <div className="text-5xl md:text-6xl font-black text-[#FFB347] mb-2 transition-transform duration-500 group-hover:scale-110 drop-shadow-[0_0_20px_rgba(255,179,71,0.2)]">
                    <StatCounter value={s.value} suffix={s.suffix} />
                  </div>
                  <div className="h-0.5 w-6 bg-white/20 rounded-full transition-all duration-500 group-hover:w-16 group-hover:bg-[#FFB347]" />
                  <p className="mt-6 text-white/40 text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-center max-w-40 leading-relaxed group-hover:text-white transition-colors duration-300">
                    {s.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── PROJECTS ── */}
      <section
        ref={projectsRef}
        className="relative py-40 overflow-hidden bg-[#E6E6E6] dark:bg-[#021a11] transition-colors duration-700"
      >
        {/* Background layer — large text sweeps left as you scroll */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
          <motion.div
            style={{ x: bgTextX }}
            className="absolute top-1/4 whitespace-nowrap text-[200px] font-black text-[#034E34]/[0.03] dark:text-white/[0.02] uppercase will-change-transform"
          >
            Innovation Precision Scalability Data Intelligence
          </motion.div>

          {/* Scanner line sweeps left to right across the full section */}
          <motion.div
            style={{
              x: scannerX,
              background:
                "linear-gradient(90deg, transparent, rgba(255,179,71,0.08), rgba(255,179,71,0.35), rgba(255,179,71,0.08), transparent)",
            }}
            className="absolute top-0 bottom-0 left-0 w-64 pointer-events-none will-change-transform"
          >
            {/* Sharp laser edge */}
            <div className="absolute inset-y-0 left-1/2 w-[2px] bg-gradient-to-b from-transparent via-[#FFB347] to-transparent opacity-90" />
            {/* Glow bloom around the laser */}
            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-6 bg-[#FFB347]/20 blur-sm" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 max-w-7xl mx-auto px-6"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-32">
            <div className="max-w-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-12 bg-[#FFB347]" />
                <span className="text-[#C17110] dark:text-[#FFB347] text-xs font-black uppercase tracking-[0.5em]">
                  Selected Works
                </span>
              </div>
              <h2 className="text-6xl md:text-8xl font-black text-[#034E34] dark:text-white tracking-tighter leading-[0.85]">
                Featured
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#034E34] via-[#FFB347] to-[#034E34] bg-[length:200%_auto] animate-gradient-x">
                  Projects.
                </span>
              </h2>
            </div>
            <Link
              to="/projects"
              className="group px-10 py-5 bg-[#034E34] text-white font-black text-xs uppercase tracking-widest hover:bg-[#FFB347] hover:text-[#021a11] transition-all duration-500"
            >
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            <div className="lg:mt-0">
              <InsightCard
                img={imgNLP}
                tag="NLP"
                title="Natural Language Processing"
                to="/projects"
              />
            </div>
            <div className="relative lg:mt-32">
              <div className="absolute -inset-6 border border-[#034E34]/5 dark:border-white/5 rounded-[3rem] -z-10" />
              <InsightCard
                img={imgCV}
                tag="Vision"
                title="Computer Vision Industrial"
                to="/projects"
              />
            </div>
            <div className="lg:mt-16">
              <InsightCard
                img={imgExtract}
                tag="Data"
                title="Automated Extraction"
                to="/projects"
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-32 overflow-hidden bg-[#021a11]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#417256]/20 blur-[120px] rounded-full" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-[#FFB347]/10 blur-[100px] rounded-full animate-pulse" />
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative max-w-4xl mx-auto px-6 text-center"
        >
          <div className="group relative inline-block p-px mb-8 rounded-2xl overflow-hidden shadow-2xl">
            <div
              className="absolute inset-[-50%] bg-[conic-gradient(from_0deg,transparent_45%,#FFB347_50%,transparent_55%)] animate-[spin_6s_linear_infinite] blur-xs opacity-40"
              style={{ willChange: "transform" }}
            />
            <div
              className="absolute -inset-full bg-[conic-gradient(from_0deg,transparent_35%,#FFB347_50%,transparent_65%)] animate-[spin_6s_linear_infinite] opacity-60"
              style={{ willChange: "transform" }}
            />
            <div className="relative p-4 rounded-2xl bg-[#043523] backdrop-blur-3xl border border-white/10 transition-all duration-500 group-hover:scale-105 group-hover:border-[#FFB347]/30">
              <img
                src={logoV2}
                alt="Lifewood"
                className="h-10 transition-all duration-500 group-hover:brightness-110 group-hover:drop-shadow-[0_0_10px_rgba(255,179,71,0.2)]"
              />
            </div>
            <div className="absolute inset-0 bg-[#FFB347]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
          </div>

          <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            Ready to power your AI <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFB347] to-[#FFC370]">
              with better data?
            </span>
          </h2>

          <p className="mt-8 text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Stop letting poor data quality hold back your innovation. Partner
            with Lifewood and get the infrastructure your models deserve.
          </p>

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

          <div className="mt-20 pt-10 border-t border-white/5">
            <p className="text-white/30 text-xs uppercase tracking-[0.3em] font-medium">
              Trusted by global AI leaders across 30+ countries
            </p>
          </div>
        </motion.div>
      </section>
    </>
  );
}
