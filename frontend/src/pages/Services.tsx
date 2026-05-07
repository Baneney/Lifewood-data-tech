import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion"
import ScrollVelocity from "../components/ScrollVelocity"

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
  const [active, setActive] = useState(0);
  const [processActive, setProcessActive] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const ref = useRef(null);

  // ── Section refs for scoped parallax ──────────────────────────────────────
  const heroRef         = useRef<HTMLElement>(null);
  const capabilitiesRef = useRef<HTMLElement>(null);
  const processRef      = useRef<HTMLElement>(null);

  // Hero — video bg drifts down, content lifts + fades
  const { scrollYProgress: heroP } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroBgY      = useTransform(heroP, [0, 1], ["0%", "40%"]);
  const heroContentY = useTransform(heroP, [0, 1], ["0%", "-25%"]);
  const heroOpacity  = useTransform(heroP, [0, 0.8], [1, 0]);

  // Capabilities — heading drifts up, watermark sweeps left
  const { scrollYProgress: capP } = useScroll({ target: capabilitiesRef, offset: ["start end", "end start"] });
  const capWatermarkX = useTransform(capP, [0, 1], ["5%", "-40%"]);
  const capHeadingY   = useTransform(capP, [0, 1], ["80px", "-80px"]);

  // Process — heading drifts up, glow moves diagonally
  const { scrollYProgress: processP } = useScroll({ target: processRef, offset: ["start end", "end start"] });
  const processHeadingY = useTransform(processP, [0, 1], ["80px", "-80px"]);
  const processGlowY   = useTransform(processP, [0, 1], ["-50%", "50%"]);
  const processGlowX   = useTransform(processP, [0, 1], ["-30%", "30%"]);

  // ── 1. SCROLL PROGRESS (existing, kept for mouse particles) ──
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // ── 2. MOUSE TRAIL LOGIC ──
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: any) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    // Normalize coordinates to -0.5 to 0.5
    mouseX.set((clientX - left) / width - 0.5);
    mouseY.set((clientY - top) / height - 0.5);
  };

  // Smooth out mouse movement
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  // ── 3. PARALLAX TRANSFORMS ──
  const moveX = useTransform(springX, [-0.5, 0.5], ["-20px", "20px"]);
  const moveY = useTransform(springY, [-0.5, 0.5], ["-20px", "20px"]);
  const rotateS = useTransform(scrollYProgress, [0, 1], [0, 45]);



  const STEPS = [
    {
      title: "Sourcing",
      body: "Ethical acquisition from diverse global streams.",
      metric: "120+ Countries",
      val: "80",
      unit: "TB",
      label: "Daily Throughput",
    },
    {
      title: "Production",
      body: "High-precision manual labeling and curation.",
      metric: "Pixel-Perfect",
      val: "12",
      unit: "M",
      label: "Labels / Month",
    },
    {
      title: "Quality Control",
      body: "Triple-layer validation for zero-error outcomes.",
      metric: "99.9% Accuracy",
      val: "99",
      unit: "%",
      label: "Precision Rate",
    },
  ];

  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === active) {
        v.currentTime = 0;
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
  }, [active]);

  const current = SERVICES[active];

  return (
    <div
      onMouseMove={handleMouseMove}
      className="w-full text-[#034E34] dark:text-white selection:bg-[#FFB347] selection:text-[#021a11]"
      style={{ backgroundColor: "var(--site-bg)" }}
    >
      {/* ── SECTION 1: HERO (Sticky Video Engine) ── */}
      <section ref={heroRef} className="relative h-screen w-full overflow-hidden">
        {/* Background Videos — drift down slower than scroll */}
        <motion.div style={{ y: heroBgY }} className="absolute inset-0 will-change-transform">
          {SERVICES.map((s, i) => (
          <video
            key={s.id}
            ref={(el) => {
              videoRefs.current[i] = el;
            }}
            src={s.video}
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
            style={{
              opacity: i === active ? 1 : 0,
              filter:
                i === active
                  ? "grayscale(0.3) brightness(0.6)"
                  : "grayscale(1) brightness(0.2)",
              zIndex: i === active ? 1 : 0,
            }}
            onError={(e) => {
              console.error(`Video failed to load: ${s.title}`, e);
              e.currentTarget.style.backgroundColor = "#021a11";
            }}
          />
        ))}
        </motion.div>

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#021a11] via-transparent to-[#021a11]/40 z-10" />

        {/* Content Block — lifts up and fades as hero exits */}
        <motion.div
          style={{ y: heroContentY, opacity: heroOpacity }}
          className="absolute inset-0 z-20 will-change-transform pointer-events-none"
        >
        <div className="absolute bottom-32 md:bottom-20 left-6 md:left-24 w-full pr-12 md:pr-0">
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
                <p className="text-[#FFB347] text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] md:tracking-[0.5em]">
                  {current.tag}
                </p>
              </div>

              <h1 className="text-white text-4xl sm:text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter uppercase whitespace-pre-line mb-6 md:mb-8">
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
        </motion.div>

        {/* ── RESTORED: Right Navigation Menu ── */}
        <motion.div
          style={{ y: heroContentY, opacity: heroOpacity }}
          className="absolute right-8 md:right-16 bottom-32 md:bottom-20 z-30 flex flex-col gap-2 will-change-transform"
        >
          {SERVICES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setActive(i)}
              className="group relative flex items-center justify-end py-4 pr-6 transition-all"
            >
              <motion.div
                className={`absolute right-0 h-full bg-white/5 border-r-2 transition-all duration-300 hidden md:block ${
                  active === i
                    ? "w-full border-[#FFB347] bg-white/10"
                    : "w-0 border-transparent group-hover:w-full group-hover:border-white/20"
                }`}
              />

              <div className="relative text-right mr-4 transition-all duration-300 group-hover:-translate-x-2 pl-4 hidden md:block">
                <p
                  className={`text-[9px] font-bold tracking-[0.2em] mb-1 ${active === i ? "text-[#FFB347]" : "text-white/30"}`}
                >
                  {s.tag}
                </p>
                <p
                  className={`text-[10px] lg:text-sm font-black uppercase tracking-widest ${active === i ? "text-white" : "text-white/40"}`}
                >
                  {s.title}
                </p>
              </div>

              <div
                className={`h-2.5 w-2.5 rounded-full transition-all duration-500 ${
                  active === i
                    ? "bg-[#FFB347] scale-125 shadow-[0_0_15px_#FFB347]"
                    : "bg-white/20 group-hover:bg-white/50"
                }`}
              />
            </button>
          ))}
        </motion.div>
      </section>

      {/* ── SCROLL VELOCITY TICKER ── */}
      <div className="relative bg-[#034E34] dark:bg-[#133020] overflow-hidden border-y border-white/5">
        {/* Amber accent line top */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FFB347]/60 to-transparent" />

        {/* Row 1 — service names scrolling right, styled as glowing tags */}
        <ScrollVelocity
          velocity={60}
          className="text-[#FFB347] font-black uppercase tracking-[0.25em] text-sm"
          parallaxClassName="py-4"
          scrollerClassName="gap-0"
          texts={[
            <>
              Data Annotation&nbsp;
              <span className="text-white/20 font-light mx-4">✦</span>&nbsp;Data
              Collection&nbsp;
              <span className="text-white/20 font-light mx-4">✦</span>&nbsp;Data
              Curation&nbsp;
              <span className="text-white/20 font-light mx-4">✦ </span>&nbsp;Data
              Validation&nbsp;
              <span className="text-white/20 font-light mx-4">✦</span>&nbsp;Data
              Acquisition&nbsp;
              <span className="text-white/20 font-light mx-4">✦</span>
            </>,
            <>
              Precision Labeling&nbsp;
              <span className="text-[#FFB347]/30 font-light mx-4">◆</span>
              &nbsp;Global Sourcing&nbsp;
              <span className="text-[#FFB347]/30 font-light mx-4">◆</span>
              &nbsp;Intelligent Refinery&nbsp;
              <span className="text-[#FFB347]/30 font-light mx-4">◆</span>
              &nbsp;Verified Accuracy&nbsp;
              <span className="text-[#FFB347]/30 font-light mx-4">◆</span>
              &nbsp;Strategic Sourcing&nbsp;
              <span className="text-[#FFB347]/30 font-light mx-4">◆</span>
            </>,
          ]}
          numCopies={4}
          velocityMapping={{ input: [0, 1000], output: [0, 8] }}
          parallaxStyle={{ background: "transparent" }}
          scrollerStyle={{ fontSize: "0.7rem", letterSpacing: "0.2em" }}
        />

        {/* Amber accent line bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FFB347]/60 to-transparent" />
      </div>

      {/* ── SECTION 2: CAPABILITIES ── */}
      <section
        ref={capabilitiesRef}
        onMouseMove={handleMouseMove}
        className="relative z-10 py-32 px-6 md:px-24 overflow-hidden bg-[#F9F7F7] dark:bg-[#021a11] transition-colors duration-700"
      >
        <div className="absolute inset-0 pointer-events-none select-none">
          {/* Large watermark text sweeps left as you scroll — clearly visible */}
          <motion.div
            style={{ x: capWatermarkX }}
            className="absolute top-1/2 -translate-y-1/2 whitespace-nowrap text-[180px] font-black uppercase text-[#034E34]/[0.04] dark:text-white/[0.03] will-change-transform"
          >
            Data Annotation · Collection · Curation · Validation
          </motion.div>

          {/* Dot grid — static background texture */}
          <div
            style={{
              backgroundImage: `radial-gradient(#034E34 2px, transparent 2px)`,
              backgroundSize: "60px 60px",
            }}
            className="absolute inset-0 opacity-[0.15] dark:opacity-[0.05]"
          />

          {/* Blobs react to mouse */}
          <motion.div
            style={{ x: moveX, y: moveY, rotate: rotateS }}
            className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-[#034E34]/5 blur-[120px] dark:opacity-20"
          />
          <motion.div
            style={{
              x: useTransform(springX, [-0.5, 0.5], ["40px", "-40px"]),
              y: useTransform(springY, [-0.5, 0.5], ["40px", "-40px"]),
            }}
            className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-[#FFB347]/10 blur-[100px] dark:opacity-10"
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header — drifts up as you scroll through the section */}
          <motion.div
            style={{ y: capHeadingY }}
            className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6 will-change-transform"
          >
            <div>
              <h2 className="text-[#FFB347] text-sm font-black tracking-[0.3em] uppercase mb-4 flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-[#FFB347] animate-ping" />
                Service Ecosystem
              </h2>
              <h3 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.8] text-[#034E34] dark:text-white">
                Creative <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#034E34] to-[#FFB347] dark:from-white dark:to-[#FFB347]">
                  Impact
                </span>
              </h3>
            </div>
            <p className="text-[#034E34]/50 dark:text-zinc-500 max-w-[250px] text-xs font-bold uppercase tracking-widest leading-loose">
              Hover to ignite specialized capabilities.
            </p>
          </motion.div>

          {/* --- The Cards (Logic preserved as requested) --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {current.features.map((feature, idx) => (
                <motion.div
                  key={feature}
                  layout
                  whileHover={{
                    y: -15,
                    scale: 1.02,
                    transition: { type: "spring", stiffness: 400, damping: 10 },
                  }}
                  className="relative p-10 min-h-[400px] flex flex-col cursor-pointer rounded-[2.5rem] transition-all duration-500 group overflow-hidden
                           bg-white/30 dark:bg-white/5 backdrop-blur-xl border border-white/50 dark:border-white/10
                           hover:bg-[#034E34] dark:hover:bg-[#FFB347] shadow-xl hover:shadow-[#034E34]/20"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="text-5xl mb-8 font-black text-[#034E34]/10 dark:text-white/10 group-hover:text-white/20 group-hover:scale-125 transition-all duration-500">
                      0{idx + 1}
                    </div>

                    <h4 className="text-2xl font-black uppercase tracking-tight leading-none mb-6 text-[#034E34] dark:text-white group-hover:text-white dark:group-hover:text-[#021a11] transition-colors duration-300">
                      {feature}
                    </h4>

                    <p className="text-sm font-medium leading-relaxed text-[#034E34]/60 dark:text-zinc-400 group-hover:text-white/80 dark:group-hover:text-[#021a11]/70 transition-colors duration-300">
                      Propelling your strategy through bespoke{" "}
                      {feature.toLowerCase()} architectures.
                    </p>

                    <div className="mt-auto pt-6">
                      <div className="w-12 h-1 bg-[#FFB347] group-hover:w-full group-hover:bg-white dark:group-hover:bg-[#021a11] transition-all duration-500" />
                    </div>
                  </div>

                  <div className="absolute -bottom-6 -right-4 text-8xl font-black text-[#034E34]/[0.02] dark:text-white/[0.03] group-hover:text-white/[0.05] group-hover:-translate-y-4 transition-all duration-700 pointer-events-none select-none uppercase tracking-tighter">
                    {feature.split(" ")[0]}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: INTERACTIVE PROCESS ── */}
      <section ref={processRef} className="py-32 px-6 md:px-24 relative overflow-hidden bg-[#F8F9F5] dark:bg-[#021a11] transition-colors duration-700">
        {/* Glow blob drifts diagonally — large range so it's clearly visible */}
        <motion.div
          style={{ y: processGlowY, x: processGlowX }}
          className="absolute top-1/2 left-1/2 w-[700px] h-[700px] bg-[#FFB347]/8 dark:bg-[#FFB347]/10 blur-[100px] rounded-full pointer-events-none will-change-transform"
        />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            {/* Heading drifts up as you scroll through */}
            <motion.h2
              style={{ y: processHeadingY }}
              className="text-4xl md:text-6xl font-black uppercase mb-16 tracking-tighter text-[#034E34] dark:text-white will-change-transform"
            >
              The Human-in-the-loop
              <br />
              <span className="text-[#FFB347]">Advantage</span>
            </motion.h2>

            <div className="space-y-4">
              {STEPS.map((item, i) => (
                <motion.div
                  key={i}
                  onMouseEnter={() => setProcessActive(i)}
                  className={`group relative p-8 rounded-3xl border-2 transition-all duration-500 cursor-pointer 
                  ${
                    processActive === i
                      ? "bg-white dark:bg-white/5 border-[#FFB347] shadow-[0_20px_50px_rgba(3,78,52,0.06)] scale-[1.02]"
                      : "bg-transparent border-transparent"
                  }`}
                >
                  <div className="flex gap-8 items-start">
                    <div
                      className={`text-4xl font-black transition-colors duration-500 ${
                        processActive === i
                          ? "text-[#FFB347]"
                          : "text-[#034E34]/10 dark:text-white/10"
                      }`}
                    >
                      0{i + 1}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h5
                          className={`text-xl font-bold uppercase tracking-tight transition-colors ${
                            processActive === i
                              ? "text-[#034E34] dark:text-white"
                              : "text-[#034E34]/40 dark:text-zinc-500"
                          }`}
                        >
                          {item.title}
                        </h5>
                        <span
                          className={`text-[10px] font-mono px-2 py-1 rounded border transition-all duration-500 ${
                            processActive === i
                              ? "opacity-100 border-[#FFB347] text-[#FFB347]"
                              : "opacity-0 border-transparent"
                          }`}
                        >
                          {item.metric}
                        </span>
                      </div>
                      <p
                        className={`transition-colors duration-500 text-sm leading-relaxed ${
                          processActive === i
                            ? "text-[#034E34]/70 dark:text-zinc-300"
                            : "text-[#034E34]/30 dark:text-zinc-600"
                        }`}
                      >
                        {item.body}
                      </p>
                    </div>
                  </div>

                  {/* Left side indicator bar */}
                  <div
                    className={`absolute left-0 top-1/2 -translate-y-1/2 h-12 w-1 rounded-r-full transition-all duration-500 ${
                      processActive === i
                        ? "bg-[#FFB347] opacity-100"
                        : "bg-transparent opacity-0"
                    }`}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* VISUAL ENGINE SIDE */}
          <div className="relative aspect-square rounded-[3rem] overflow-hidden bg-[#034E34] dark:bg-[#133020] flex items-center justify-center group shadow-2xl border border-[#034E34]/10">
            {/* Animated Scanline */}
            <motion.div
              animate={{ top: ["0%", "100%", "0%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-[#FFB347]/40 to-transparent z-10"
            />

            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-[size:20px_20px]" />

            <AnimatePresence mode="wait">
              <motion.div
                key={processActive}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.1, y: -20 }}
                className="text-center relative z-20"
              >
                <h4 className="text-[#FFB347] text-8xl md:text-9xl font-black mb-2 tracking-tighter flex items-baseline justify-center">
                  {STEPS[processActive].val}
                  <span className="text-3xl text-white/40 ml-2">
                    {STEPS[processActive].unit}
                  </span>
                </h4>
                <p className="font-bold uppercase tracking-[0.4em] text-xs text-zinc-400">
                  {STEPS[processActive].label}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Decorative Corners */}
            <div className="absolute top-10 left-10 w-12 h-12 border-t-2 border-l-2 border-white/10" />
            <div className="absolute bottom-10 right-10 w-12 h-12 border-b-2 border-r-2 border-[#FFB347]/30" />
          </div>
        </div>
      </section>
    </div>
  );
}












