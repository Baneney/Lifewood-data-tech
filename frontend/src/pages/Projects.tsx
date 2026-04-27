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

    const containerRef = useRef(null)
    const itemRefs = useRef<(HTMLDivElement | null)[]>([])

    const scrollToProject = (id: number) => {
      const idx = PROJECTS.findIndex(p => p.id === id)
      const el = itemRefs.current[idx]
      if (!el) return
      el.scrollIntoView({ behavior: "smooth", block: "center" })
    }
    
    // ref for the scroll container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "center center"],
    });

    // Images start centered (0) and fly out
    // Images pull inward at start, settle at visible edges at end
    const xLeft  = useSpring(useTransform(scrollYProgress, [0, 1], [280, -120]), { stiffness: 60, damping: 20 });
    const xRight = useSpring(useTransform(scrollYProgress, [0, 1], [-280,  120]), { stiffness: 60, damping: 20 });
    const yUp    = useSpring(useTransform(scrollYProgress, [0, 1], [180,  -80]), { stiffness: 60, damping: 20 });
    const yDown  = useSpring(useTransform(scrollYProgress, [0, 1], [-180,   80]), { stiffness: 60, damping: 20 });

    // Images are visible at start, fade slightly as they leave (optional)
    const imgOpacity = useTransform(scrollYProgress, [0, 0.3, 1], [1, 1, 0.6]);

    // Text fades in as images clear out
    const textOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.3, 1]);
    const textY       = useTransform(scrollYProgress, [0, 1], [40, 0]);


    //HERO - variables
    const heroRef = useRef(null);
    const { scrollY } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
    });

    //HERO - Parallax effects 
    const heroBgY = useTransform(scrollY, [0, 500], [0, 200]);
    const heroTextY = useTransform(scrollY, [0, 500], [0, -100]);
    const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <div className="bg-black text-white">

      {/* ── Hero ── */}
        <section 
            ref={heroRef}
            className="relative min-h-screen flex flex-col justify-end pb-16 px-8 md:px-16 overflow-hidden border-b border-white/10"
            >
            {/* Dynamic Parallax Background */}
            <motion.div 
                style={{ y: heroBgY }}
                className="absolute inset-0 z-0"
            >
                <img src={imgCV} alt="" className="w-full h-full object-cover opacity-20 scale-110" />
                <div className="absolute inset-0 bg-linear-to-t from-[#021a11] via-transparent to-transparent" />
            </motion.div>

            {/* Animated Foreground Content */}
            <motion.div 
                style={{ y: heroTextY, opacity: heroOpacity }}
                className="relative z-10"
            >
                <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                >
                <p className="text-xs font-bold text-[#FFB347] uppercase tracking-[0.4em] mb-6 flex items-center gap-3">
                    <span className="w-8 h-px bg-[#FFB347]" />
                    Our Work
                </p>
                </motion.div>

                <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black leading-none tracking-tighter uppercase overflow-hidden">
                    {"Projects".split("").map((char, i) => (
                        <motion.span
                            key={i}
                            // Removed the display="..." prop from here
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            transition={{ 
                                duration: 0.8, 
                                delay: i * 0.05, 
                                ease: [0.22, 1, 0.36, 1] 
                            }}
                            // className="inline-block" already handles the display logic
                            className="inline-block"
                            >
                            {/* Handle spaces properly if your string had them */}
                            {char === " " ? "\u00A0" : char}
                        </motion.span>
                    ))}
                </h1>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                >
                    <div className="mt-8 w-16 h-px bg-[#FFB347]/50" />
                    <p className="mt-6 text-gray-400 text-lg max-w-lg leading-relaxed font-medium">
                        Real-world <span className="text-white">AI data projects</span> across computer vision, NLP, and machine learning — delivered at scale.
                    </p>

                    {/* Interactive Stats Chips */}
                    <div className="mt-12 flex flex-wrap items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em]">
                        {[
                        { label: PROJECTS.length + " Projects", color: "#FFB347" },
                        { label: TAGS.length - 1 + " Categories", color: "white" },
                        { label: "Global Delivery", color: "white" }
                        ].map((stat, i) => (
                            <motion.span
                                key={i}
                                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                                className="px-4 py-2 border border-white/10 rounded-full text-white/50 cursor-default transition-colors"
                                style={{ borderColor: i === 0 ? stat.color : "rgba(255,255,255,0.1)" }}
                            >
                                {stat.label}
                            </motion.span>
                        ))}
                    </div>
                </motion.div>
            </motion.div>

            {/* Refined Scroll Indicator */}
            <div className="absolute bottom-8 right-8 md:right-16 flex flex-col items-center gap-4">
                <div className="w-px h-12 bg-linear-to-b from-transparent via-white/20 to-white/20 relative overflow-hidden">
                <motion.div 
                    animate={{ y: [0, 48, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-0 left-0 w-full h-1/3 bg-[#FFB347]"
                />
                </div>
                <span className="text-white/20 text-[10px] uppercase tracking-[0.3em] vertical-text">Scroll</span>
            </div>
        </section>

      {/* ── Sticky scroll ── */}
      <StickyProjects projects={PROJECTS} itemRefs={itemRefs} />

      {/* ── Filter grid ── */}
      <FilterGrid projects={PROJECTS} tags={TAGS} onCardClick={scrollToProject} />

      {/* ── CTA ── */}
        <section
            ref={containerRef}
            className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden bg-[#021a11]"
            >
            {/* Sticky container so content stays in view while scrolling */}
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

                {/* Floating Images — start centered, fly out on scroll */}
                <div className="absolute inset-0 pointer-events-none">

                {/* Top Left → flies left+up */}
                <motion.img
                    style={{ x: xLeft, y: yUp, opacity: imgOpacity }}
                    src={imgAuto}
                    className="absolute top-[20%] left-[20%] w-48 md:w-64 aspect-square object-cover rounded-2xl border border-white/10 shadow-2xl"
                />

                {/* Top Right → flies right+up */}
                <motion.img
                    style={{ x: xRight, y: yUp, opacity: imgOpacity }}
                    src={imgNLP}
                    className="absolute top-[15%] right-[20%] w-40 md:w-72 aspect-video object-cover rounded-2xl border border-white/10 shadow-2xl"
                />

                {/* Bottom Left → flies left+down */}
                <motion.img
                    style={{ x: xLeft, y: yDown, opacity: imgOpacity }}
                    src={imgAI}
                    className="absolute bottom-[20%] left-[15%] w-36 md:w-60 aspect-square object-cover rounded-2xl border border-white/10"
                />

                {/* Bottom Right → flies right+down */}
                <motion.img
                    style={{ x: xRight, y: yDown, opacity: imgOpacity }}
                    src={imgML}
                    className="absolute bottom-[15%] right-[15%] w-48 md:w-80 aspect-video object-cover rounded-2xl border border-white/10"
                />

                {/* Center accent → flies left */}
                <motion.img
                    style={{ x: xLeft, opacity: imgOpacity }}
                    src={imgCV}
                    className="absolute top-[42%] left-[8%] w-24 md:w-44 aspect-square object-cover rounded-xl opacity-60"
                />

                {/* Center accent right → flies right */}
                <motion.img
                    style={{ x: xRight, opacity: imgOpacity }}
                    src={imgGenealogy}
                    className="absolute top-[42%] right-[8%] w-24 md:w-44 aspect-square object-cover rounded-xl opacity-60"
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

                <h2 className="text-5xl md:text-8xl font-black leading-none tracking-tighter uppercase max-w-4xl">
                    Your project<br />could be <span className="text-[#FFB347]">next.</span>
                </h2>

                <p className="mt-10 text-gray-400 max-w-md leading-relaxed text-lg mb-12">
                    Tell us about your data challenge and we'll scope a solution within 48 hours.
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
  )
}






