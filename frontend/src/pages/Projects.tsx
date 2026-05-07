import { useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { Link } from "react-router-dom"

//assets
import imgAI       from "@/assets/projects/project-aicustomerservice.jpeg"
import imgAuto     from "@/assets/projects/project-autodriving.jpeg"
import imgExtract  from "@/assets/projects/project-dataextraction.jpeg"
import imgGenealogy from "@/assets/projects/project-geneology.jpeg"
import imgML       from "@/assets/projects/project-machinelearning.jpeg"
import imgNLP      from "@/assets/projects/project-nlp.jpeg"
import imgCV       from "@/assets/projects/projects-computervision.jpeg"


//components
import { StickyProjects } from "../components/StickyProjects"
import { FilterGrid } from "../components/FilterGrid"
import SplashCursor from "../components/SplashCursor"
import LightRays from "../components/LightRays"


// ── Data ──────────────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    id: 0,
    tag: "Computer Vision",
    index: "01",
    title: "Autonomous Driving",
    subtitle: "Perception at 120km/h",
    desc: "We built a 2M+ frame dataset for a Tier-1 automotive client — covering night driving, adverse weather, and rare edge cases across 14 countries. Every frame annotated with 3D bounding boxes, lane markings, and drivable area segmentation.",
    stats: [
      { value: "2M+", label: "Annotated Frames" },
      { value: "14", label: "Countries" },
      { value: "99.4%", label: "Accuracy" },
    ],
    img: imgAuto,
    color: "#FFB347",
  },
  {
    id: 1,
    tag: "NLP",
    index: "02",
    title: "NLP at Scale",
    subtitle: "Language that understands context",
    desc: "Delivered a 50-language conversational dataset for a leading LLM provider. Our linguists handled dialect variation, cultural nuance, and domain-specific terminology across legal, medical, and financial verticals.",
    stats: [
      { value: "50", label: "Languages" },
      { value: "8M+", label: "Utterances" },
      { value: "97%", label: "Inter-annotator Agreement" },
    ],
    img: imgNLP,
    color: "#FFB347",
  },
  {
    id: 2,
    tag: "AI",
    index: "03",
    title: "AI Customer Service",
    subtitle: "Human-quality responses, machine speed",
    desc: "We trained and validated the intent classification and entity extraction models behind a Fortune 500 customer service AI — reducing escalation rates by 38% and handling 2M+ monthly interactions.",
    stats: [
      { value: "2M+", label: "Monthly Interactions" },
      { value: "38%", label: "Escalation Reduction" },
      { value: "12", label: "Intent Categories" },
    ],
    img: imgAI,
    color: "#FFB347",
  },
  {
    id: 3,
    tag: "Data",
    index: "04",
    title: "Data Extraction Pipeline",
    subtitle: "Structure from chaos",
    desc: "Built an end-to-end extraction pipeline converting 10M+ unstructured documents — PDFs, scans, handwritten forms — into structured, queryable datasets for a global insurance provider.",
    stats: [
      { value: "10M+", label: "Documents Processed" },
      { value: "99.1%", label: "Field Accuracy" },
      { value: "6x", label: "Faster than Manual" },
    ],
    img: imgExtract,
    color: "#FFB347",
  },
  {
    id: 4,
    tag: "Computer Vision",
    index: "05",
    title: "Computer Vision Systems",
    subtitle: "Eyes for industrial AI",
    desc: "Developed a defect detection dataset for a semiconductor manufacturer — 500K+ annotated microscopy images across 40 defect classes, enabling a vision model that outperformed human inspectors.",
    stats: [
      { value: "500K+", label: "Microscopy Images" },
      { value: "40", label: "Defect Classes" },
      { value: "99.8%", label: "Detection Rate" },
    ],
    img: imgCV,
    color: "#FFB347",
  },
  {
    id: 5,
    tag: "AI",
    index: "06",
    title: "Machine Learning Enablement",
    subtitle: "Data pipelines that scale",
    desc: "Partnered with a healthcare AI startup to build a HIPAA-compliant medical imaging dataset — 300K+ radiology scans annotated by certified medical professionals across 8 pathology types.",
    stats: [
      { value: "300K+", label: "Radiology Scans" },
      { value: "8", label: "Pathology Types" },
      { value: "HIPAA", label: "Compliant" },
    ],
    img: imgML,
    color: "#FFB347",
  },
  {
    id: 6,
    tag: "Data",
    index: "07",
    title: "Genealogy Research",
    subtitle: "Connecting generations through data",
    desc: "Digitized and structured 4M+ historical records — birth certificates, census data, immigration documents — for a genealogy platform serving 20M users worldwide.",
    stats: [
      { value: "4M+", label: "Historical Records" },
      { value: "20M", label: "Platform Users" },
      { value: "120+", label: "Years of Records" },
    ],
    img: imgGenealogy,
    color: "#FFB347",
  },
]

const TAGS = ["All", "Computer Vision", "NLP", "AI", "Data"]

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Projects() {
  const containerRef = useRef(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const scrollToProject = (id: number) => {
    const idx = PROJECTS.findIndex((p) => p.id === id);
    const el = itemRefs.current[idx];
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  // ── Section refs for scoped parallax ──────────────────────────────────────
  const heroRef       = useRef<HTMLElement>(null);
  const stickyRef     = useRef<HTMLDivElement>(null);
  const filterRef     = useRef<HTMLDivElement>(null);

  // Hero — bg scales up, content lifts + fades
  const { scrollYProgress: heroP } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroBgScale   = useTransform(heroP, [0, 1], [1, 1.15]);
  const heroContentY  = useTransform(heroP, [0, 1], ["0%", "-20%"]);
  const heroOpacity   = useTransform(heroP, [0, 0.8], [1, 0]);
  const heroScale     = useTransform(heroP, [0, 1], [1, 0.95]);

  // StickyProjects — large watermark drifts horizontally
  const { scrollYProgress: stickyP } = useScroll({ target: stickyRef, offset: ["start end", "end start"] });
  const stickyWatermarkX = useTransform(stickyP, [0, 1], ["0%", "-40%"]);

  // FilterGrid — heading drifts up, bg tint drifts down
  const { scrollYProgress: filterP } = useScroll({ target: filterRef, offset: ["start end", "end start"] });
  const filterHeadingY = useTransform(filterP, [0, 1], ["80px", "-80px"]);
  const filterBgY      = useTransform(filterP, [0, 1], ["-8%", "8%"]);

  // CTA scroll (existing)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "center center"],
  });

  // Images start centered (0) and fly out
  // Images pull inward at start, settle at visible edges at end
  const xLeft = useSpring(useTransform(scrollYProgress, [0, 1], [280, -120]), {
    stiffness: 60,
    damping: 20,
  });
  const xRight = useSpring(useTransform(scrollYProgress, [0, 1], [-280, 120]), {
    stiffness: 60,
    damping: 20,
  });
  const yUp = useSpring(useTransform(scrollYProgress, [0, 1], [180, -80]), {
    stiffness: 60,
    damping: 20,
  });
  const yDown = useSpring(useTransform(scrollYProgress, [0, 1], [-180, 80]), {
    stiffness: 60,
    damping: 20,
  });

  // Images are visible at start, fade slightly as they leave (optional)
  const imgOpacity = useTransform(scrollYProgress, [0, 0.3, 1], [1, 1, 0.6]);

  // Text fades in as images clear out
  const textOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.3, 1]);
  const textY = useTransform(scrollYProgress, [0, 1], [40, 0]);

  return (
    <div style={{ backgroundColor: "var(--site-bg)" }} className="text-white">
      {/* ── Hero ── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col justify-end pb-20 px-8 md:px-16 overflow-hidden bg-[#F8F9F5] dark:bg-[#021a11] transition-colors duration-700"
      >
        {/* SplashCursor bg */}
        <div className="absolute inset-0 z-0">
          <SplashCursor
            DENSITY_DISSIPATION={2}
            VELOCITY_DISSIPATION={1.5}
            PRESSURE={0.05}
            CURL={5}
            SPLAT_RADIUS={0.15}
            SPLAT_FORCE={4000}
            TRANSPARENT={true}
            RAINBOW_MODE={false}
            COLOR="#FFB347"
          />
        </div>

        {/* Bg layer that slowly scales up as you scroll out — creates zoom parallax */}
        <motion.div
          style={{ scale: heroBgScale }}
          className="absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-transparent to-[#F8F9F5]/60 dark:to-[#021a11]/60 pointer-events-none will-change-transform"
        />

        {/* Hero content — lifts up and fades */}
        <motion.div
          style={{ y: heroContentY, opacity: heroOpacity, scale: heroScale }}
          className="relative z-10 w-full will-change-transform"
        >
          <div className="max-w-7xl mx-auto">
            {/* Eyebrow */}
            <div className="overflow-hidden mb-8">
              <motion.p
                className="text-[10px] font-black text-[#FFB347] uppercase tracking-[0.6em] flex items-center gap-4"
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="w-12 h-[2px] bg-[#FFB347]" />
                Dataset Archive v2.0
              </motion.p>
            </div>

            {/* Headline — masked line reveal */}
            <h1 className="text-7xl md:text-9xl lg:text-[12rem] font-black leading-[0.85] tracking-tighter uppercase text-[#034E34] dark:text-white">
              {["Projects"].map((line, i) => (
                <div key={line} className="overflow-hidden block">
                  <motion.span
                    className="block"
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.7, delay: 0.2 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {line}
                  </motion.span>
                </div>
              ))}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16 items-end">
              {/* Subtext */}
              <div className="overflow-hidden">
                <motion.p
                  className="text-[#034E34]/70 dark:text-gray-400 text-xl max-w-md leading-relaxed font-medium"
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  Turning massive noise into{" "}
                  <span className="text-[#034E34] dark:text-white font-bold">
                    structured intelligence.
                  </span>{" "}
                  A curated look at our global data operations.
                </motion.p>
              </div>

              {/* Tags */}
              <motion.div
                className="flex flex-wrap gap-3 justify-start md:justify-end"
                initial="hidden"
                animate="show"
                variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 0.6 } } }}
              >
                {["Active Pipeline", "99.9% Precision", "Global Scale"].map((tag) => (
                  <motion.span
                    key={tag}
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
                    }}
                    className="px-6 py-2 rounded-full border-2 border-[#034E34]/5 dark:border-white/5 text-[#034E34]/50 dark:text-white/40 text-[10px] font-black uppercase tracking-widest"
                  >
                    {tag}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* ── Scroll UI ── */}
        <div className="absolute bottom-12 right-8 md:right-16 flex items-center gap-6">
          <span className="text-[#034E34]/20 dark:text-white/10 text-[10px] uppercase tracking-[0.5em] font-black rotate-180 [writing-mode:vertical-lr]">
            Explore Work
          </span>
          <div className="w-px h-24 bg-linear-to-b from-[#FFB347] to-transparent" />
        </div>
      </section>

      {/* ── Sticky scroll ── */}
      <div ref={stickyRef} className="relative">
        {/* Watermark sweeps left as you scroll through */}
        <motion.div
          style={{ x: stickyWatermarkX }}
          className="absolute top-1/2 -translate-y-1/2 whitespace-nowrap text-[200px] font-black uppercase text-[#034E34]/[0.06] dark:text-white/[0.05] pointer-events-none select-none will-change-transform z-0"
        >
          Computer Vision · NLP · AI · Data · Machine Learning
        </motion.div>
        <StickyProjects projects={PROJECTS} itemRefs={itemRefs} />
      </div>

      {/* ── Filter grid ── */}
      <div ref={filterRef} className="relative overflow-hidden">
        {/* Bg tint drifts down slower than content */}
        <motion.div
          style={{ y: filterBgY }}
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(3,78,52,0.06),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(255,179,71,0.04),transparent_60%)] pointer-events-none will-change-transform"
        />
        <FilterGrid
          projects={PROJECTS}
          tags={TAGS}
          onCardClick={scrollToProject}
        />
      </div>

      {/* ── CTA ── */}
      <section
        ref={containerRef}
        className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden bg-[#E6E6E6] dark:bg-[#021a11]"
      >
        {/* Sticky container so content stays in view while scrolling */}
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
          {/* Light Rays Background */}
          <div className="absolute inset-0">
            <LightRays
              raysOrigin="top-center"
              raysColor="#FFB347"
              raysSpeed={0.6}
              lightSpread={1.2}
              rayLength={2}
              pulsating
              fadeDistance={1.2}
              saturation={0.8}
              followMouse
              mouseInfluence={0.08}
            />
          </div>

          {/* Floating Images — start centered, fly out on scroll */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Top Left → flies left+up */}
            <motion.img
              style={{ x: xLeft, y: yUp, opacity: imgOpacity }}
              src={imgAuto}
              className="absolute top-[20%] left-[20%] w-48 md:w-64 aspect-square object-cover rounded-2xl border border-white/10 shadow-2xl will-change-transform"
            />

            {/* Top Right → flies right+up */}
            <motion.img
              style={{ x: xRight, y: yUp, opacity: imgOpacity }}
              src={imgNLP}
              className="absolute top-[15%] right-[20%] w-40 md:w-72 aspect-video object-cover rounded-2xl border border-white/10 shadow-2xl will-change-transform"
            />

            {/* Bottom Left → flies left+down */}
            <motion.img
              style={{ x: xLeft, y: yDown, opacity: imgOpacity }}
              src={imgAI}
              className="absolute bottom-[20%] left-[15%] w-36 md:w-60 aspect-square object-cover rounded-2xl border border-white/10 will-change-transform"
            />

            {/* Bottom Right → flies right+down */}
            <motion.img
              style={{ x: xRight, y: yDown, opacity: imgOpacity }}
              src={imgML}
              className="absolute bottom-[15%] right-[15%] w-48 md:w-80 aspect-video object-cover rounded-2xl border border-white/10 will-change-transform"
            />

            {/* Center accent → flies left */}
            <motion.img
              style={{ x: xLeft, opacity: imgOpacity }}
              src={imgCV}
              className="absolute top-[42%] left-[8%] w-24 md:w-44 aspect-square object-cover rounded-xl opacity-60 will-change-transform"
            />

            {/* Center accent right → flies right */}
            <motion.img
              style={{ x: xRight, opacity: imgOpacity }}
              src={imgGenealogy}
              className="absolute top-[42%] right-[8%] w-24 md:w-44 aspect-square object-cover rounded-xl opacity-60 will-change-transform"
            />
          </div>

          {/* Center Text — fades in as images leave */}
          <motion.div
            style={{ opacity: textOpacity, y: textY }}
            className="relative z-10 text-center px-8 flex flex-col items-center"
          >
            <p className="text-xs font-bold text-[#FFB347] uppercase tracking-[0.4em] mb-10">
              Start a Project
            </p>

            <h2 className="text-5xl md:text-8xl text-[#034E34] dark:text-white font-black leading-none tracking-tighter uppercase max-w-4xl">
              Your project
              <br />
              could be <span className="text-[#FFB347]">next.</span>
            </h2>

            <p className="mt-10 text-[#034E34]/60 dark:text-gray-400 max-w-md leading-relaxed text-lg mb-12">
              Tell us about your data challenge and we'll scope a solution
              within 48 hours.
            </p>

            <Link
              to="/contact"
              className="group relative overflow-hidden bg-[#FFB347] text-[#021a11] px-8 py-3 rounded-full font-bold text-md transition-all duration-300 hover:shadow-[0_0_40px_8px_rgba(255,179,71,0.3)] hover:-translate-y-1"
            >
              <span className="relative z-10">Get In Touch Now</span>
              <div className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 origin-right transition-transform duration-500" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}






