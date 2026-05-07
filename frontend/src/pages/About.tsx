import { useRef } from "react"
import { Link } from "react-router-dom"
import { motion, useScroll, useTransform } from "framer-motion"

// Assets
import imgMission from "@/assets/about-us/about-mission.jpeg"
import imgVision from "@/assets/about-us/about-vision.jpeg"
import vidCuration from "@/assets/about-us/about-lifewoodvid.mp4"

// Partner logos
import ancestry from "@/assets/partners/ancestry.avif"
import apple from "@/assets/partners/apple.avif"
import byu from "@/assets/partners/byu.avif"
import familySearch from "@/assets/partners/familySearch.avif"
import google from "@/assets/partners/google.avif"
import microsoft from "@/assets/partners/microsoft.avif"
import moore from "@/assets/partners/moore.avif"

// Components
import VideoHero from "../components/VideoModal"
import ScrollStack from "../components/ScrollStack"
import OfficeGrid from "../components/OfficeMaps"
import InteractiveSplit from "../components/InteractiveSplit"
import ScrollReveal from "../components/ScrollReveal"
import LogoLoop from "../components/LogoLoop"

export default function About() {

  // ── Section refs for scoped parallax ──────────────────────────────────────
  const heroRef      = useRef<HTMLElement>(null);
  const manifestoRef = useRef<HTMLElement>(null);
  const partnersRef  = useRef<HTMLElement>(null);
  const ctaRef       = useRef<HTMLElement>(null);

  // Hero — bg image drifts down, content lifts up
  const { scrollYProgress: heroP } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroBgY      = useTransform(heroP, [0, 1], ["0%", "25%"]);
  const heroContentY = useTransform(heroP, [0, 1], ["0%", "-12%"]);
  const heroOpacity  = useTransform(heroP, [0, 0.8], [1, 0]);

  // Manifesto — bg tint drifts opposite to content
  const { scrollYProgress: manifestoP } = useScroll({ target: manifestoRef, offset: ["start end", "end start"] });
  const manifestoBgY = useTransform(manifestoP, [0, 1], ["-10%", "10%"]);

  // Partners — logo strip drifts slightly
  const { scrollYProgress: partnersP } = useScroll({ target: partnersRef, offset: ["start end", "end start"] });
  const partnersBgY = useTransform(partnersP, [0, 1], ["-8%", "8%"]);

  // CTA — watermark text drifts up, blobs drift down
  const { scrollYProgress: ctaP } = useScroll({ target: ctaRef, offset: ["start end", "end start"] });
  const ctaWatermarkY = useTransform(ctaP, [0, 1], ["10%", "-10%"]);
  const ctaBlobY      = useTransform(ctaP, [0, 1], ["-15%", "15%"]);

  const aboutItems = [
    { tag: "01", label: "Diversity", desc: "We celebrate differences in belief, philosophy and ways of life, because they bring unique perspectives and ideas that encourage everyone to move forward." },
    { tag: "02", label: "Caring", desc: "We care for every person deeply and equally, because without care work becomes meaningless." },
    { tag: "03", label: "Innovation", desc: "Innovation is at the heart of all we do, enriching our lives and challenging us to continually improve ourselves and our service." },
    { tag: "04", label: "Integrity", desc: "We are dedicated to act ethically and sustainably in everything we do. More than just the bare minimum. It is the basis of our existence as a company." }
  ];

  const missionVisionData = [
      {
        id: "01",
        title: "Our Mission",
        headline: "Delivering Data That Performs",
        desc: "To develop and deploy cutting edge AI technologies that solve real-world problems, empower communities, and advance sustainable practices.",
        img: imgMission,
      },
      {
        id: "02",
        title: "Our Vision",
        headline: "A World Powered By Trust",
        desc: "To be the global champion in AI data solutions, igniting a culture of innovation and sustainability that enriches lives worldwide.",
        img: imgVision,
      },
    ];

  return (
    <div
      style={{ backgroundColor: "var(--site-bg-alt)" }}
      className="text-[#034E34] dark:text-white selection:bg-[#FFB347] selection:text-[#034E34]"
    >
      {/* ── 1. HERO — Asymmetric Grid (NRG Style) ── */}
      <section ref={heroRef} className="relative min-h-screen grid grid-cols-12 items-end pb-20 px-8 md:px-16 pt-32 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[#021a11] dark:bg-[#021a11]">
          {/* BG image drifts down slower than scroll */}
          <motion.img
            style={{ y: heroBgY }}
            src={imgMission}
            alt=""
            className="w-full h-full object-cover opacity-50 dark:opacity-20 scale-110 grayscale will-change-transform"
          />
          <div className="absolute inset-0 bg-[#034E34]/5 dark:bg-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#133020]/50 via-[#417256]/20 to-transparent dark:from-[#021a11] dark:via-transparent dark:to-transparent" />
        </div>

        {/* Content lifts up and fades as hero exits */}
        <motion.div
          style={{ y: heroContentY, opacity: heroOpacity }}
          className="contents will-change-transform"
        />

        {/* Headline Section */}
        <motion.div style={{ y: heroContentY, opacity: heroOpacity }} className="relative z-10 col-span-12 lg:col-span-8 will-change-transform">

          {/* Eyebrow — fades + slides up */}
          <div className="overflow-hidden mb-8">
            <motion.p
              className="text-xs font-bold text-[#FFB347] uppercase tracking-[0.5em]"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              Established 2004
            </motion.p>
          </div>

          {/* Headline — each line reveals from behind a mask */}
          <h1 className="text-[#CCCCCC] text-7xl md:text-[9rem] lg:text-[11rem] font-black leading-[0.8] tracking-tighter uppercase mb-6">
            {["We Are", "Lifewood."].map((line, i) => (
              <div key={line} className="overflow-hidden block">
                <motion.span
                  className={`block ${
                    i === 1 ? "border-text" : ""
                  }`}
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{
                    duration: 0.7,
                    delay: 0.2 + i * 0.12,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {line}
                </motion.span>
              </div>
            ))}
          </h1>

          {/* Subtext — fades up after headline */}
          <div className="overflow-hidden mt-8">
            <motion.p
              className="text-gray-400 text-lg max-w-md leading-relaxed"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              A data technology company on a mission to power the world's most
              ambitious AI systems.
            </motion.p>
          </div>

        </motion.div>

        {/* ── Video Component replaces the old button and modal code ── */}
        <motion.div style={{ y: heroContentY, opacity: heroOpacity }} className="relative z-10 col-span-12 lg:col-span-4 flex flex-col items-start lg:items-end mt-12 lg:mt-0 will-change-transform">
          <VideoHero
            thumbnailVideo={vidCuration}
            modalVideo={vidCuration}
            label="Watch Our Story"
            timestamp="02:14"
          />
        </motion.div>
      </section>

      {/* ── 2. MANIFESTO — Minimalist Split ── */}
      <section ref={manifestoRef} className="relative py-40 px-8 md:px-16 bg-[#046241]/10 dark:bg-[#021a11] transition-colors duration-500 overflow-hidden">
        {/* bg tint drifts opposite to scroll */}
        <motion.div
          style={{ y: manifestoBgY }}
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(3,78,52,0.06),transparent_70%)] pointer-events-none will-change-transform"
        />
        <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-4 flex items-start">
            <div className="sticky top-40 flex items-center gap-3">
              <span className="w-12 h-[2px] bg-[#FFB347] origin-left animate-grow-x" />
              <p className="text-[#FFB347] text-xs font-bold uppercase tracking-[0.4em]">
                The Core Belief
              </p>
            </div>
          </div>

          <div className="col-span-12 md:col-span-8">
            <ScrollReveal
              enableBlur={true}
              baseOpacity={0.15}
              baseRotation={15}
              blurStrength={3}
              containerClassName=""
              textClassName="text-5xl md:text-8xl font-light leading-[1.1] tracking-tight text-[#034E34] dark:text-white"
            >
              Data is the{" "}
              <span className="italic font-serif text-[#FFB347]">
                foundation
              </span>{" "}
              of every intelligent system. We build that foundation with{" "}
              <span className="font-bold text-[#FFB347] drop-shadow-sm">
                Precision.
              </span>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── 3. FULL-BLEED VIDEO ── */}
      <ScrollStack
        bgText="LIFEWOOD"
        eyebrow="[Our Foundation]"
        headline="Core"
        headlineAccent="Values"
        items={aboutItems}
      />

      {/* ── 4. MISSION & VISION — Grid Masonry ── */}
      <InteractiveSplit items={missionVisionData} />

      {/* ── 5. PARTNERS ── */}
      <section ref={partnersRef} className="relative pt-20 pb-0 bg-[#F5F5F2] dark:bg-[#021a11] border-t border-[#034E34]/10 dark:border-white/5 overflow-hidden">
        {/* subtle bg drift */}
        <motion.div
          style={{ y: partnersBgY }}
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,179,71,0.04),transparent_60%)] pointer-events-none will-change-transform"
        />
        <p className="text-center text-xs font-bold text-[#FFB347] uppercase tracking-[0.5em] mb-12">
          Trusted By
        </p>
        <LogoLoop
          logos={[
            { src: ancestry, alt: "Ancestry" },
            { src: apple, alt: "Apple" },
            { src: byu, alt: "BYU" },
            { src: familySearch, alt: "FamilySearch" },
            { src: google, alt: "Google" },
            { src: microsoft, alt: "Microsoft" },
            { src: moore, alt: "Moore" },
          ]}
          speed={80}
          logoHeight={150}
          gap={96}
          pauseOnHover
          fadeOut
          width="100%"
          ariaLabel="Our partners"
        />
      </section>

      {/* ── 6. OFIICE MAPS*/}
      <OfficeGrid />

      {/* ── 6. CTA — Massive NRG Style ── */}
      <section ref={ctaRef} className="min-h-screen flex flex-col justify-center items-center text-center px-8 py-32 border-t border-[#034E34]/10 dark:border-white/5 relative overflow-hidden bg-[#F5F5F2] dark:bg-[#021a11] transition-colors duration-700">
        {/* ── 1. INLINE ANIMATION DEFINITIONS (No Global CSS) ── */}
        <style>{`
        @keyframes float-pattern {
          0% { background-position: 0px 0px; }
          100% { background-position: 100px 100px; }
        }
        @keyframes blob-movement {
          0%, 100% { transform: translate(0, 0) scale(1); rotate(0deg); }
          33% { transform: translate(60px, -90px) scale(1.15); rotate(5deg); }
          66% { transform: translate(-40px, 40px) scale(0.95); rotate(-3deg); }
        }
        .kinetic-bg {
          animation: float-pattern 25s linear infinite;
        }
        .blob-animate {
          animation: blob-movement 20s ease-in-out infinite;
        }
      `}</style>

        {/* ── 2. DYNAMIC BACKGROUND LAYERS ── */}
        <div className="absolute inset-0 z-0 overflow-hidden select-none pointer-events-none">
          {/* Layer 1: Technical Blueprint Dot Grid (Subtle Texture) */}
          <div className="absolute inset-0 kinetic-bg bg-[radial-gradient(#034E34_1px,transparent_1px)] dark:bg-[radial-gradient(#FFB347_1px,transparent_1px)] bg-[size:50px_50px] opacity-[0.06] dark:opacity-[0.03]" />

          {/* Layer 2: Moving Kinetic Blobs */}
          <motion.div style={{ y: ctaBlobY }} className="absolute top-1/4 left-1/4 w-[70%] h-[70%] bg-[#FFB347]/15 blur-[120px] rounded-full blob-animate dark:opacity-0 will-change-transform" />
          <motion.div style={{ y: ctaBlobY }} className="absolute bottom-1/4 right-1/4 w-[60%] h-[60%] bg-[#034E34]/10 blur-[100px] rounded-full blob-animate delay-[3000ms] dark:opacity-0 will-change-transform" />

          {/* Layer 3: Large Brand Text Watermark — drifts upward */}
          <motion.div style={{ y: ctaWatermarkY }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-black text-[#034E34]/4 dark:text-white/[0.02] uppercase whitespace-nowrap will-change-transform">
            Lifewood
          </motion.div>
        </div>

        {/* ── 3. CONTENT LAYER ── */}
        <div className="relative z-10">
          <p className="text-xs font-bold text-[#FFB347] uppercase tracking-[0.5em] mb-12 drop-shadow-sm">
            Next Steps
          </p>

          <h2 className="text-6xl md:text-[10rem] font-black leading-[0.8] tracking-tighter uppercase mb-16 text-[#034E34] dark:text-white">
            Ready to
            <br />
            <span className="text-transparent border-text">Scale?</span>
          </h2>

          <Link
            to="/contact"
            className="group relative overflow-hidden bg-[#FFB347] text-[#021a11] px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:shadow-[0_0_40px_8px_rgba(255,179,71,0.3)] hover:-translate-y-1 inline-block"
          >
            {/* Ensure the text stays above the sliding background */}
            <span className="relative z-10 group-hover:text-[#034E34] transition-colors duration-500">
              Get In Touch Now
            </span>

            {/* FIX: Added 'rounded-full' to the sliding div to match the parent 
            and ensured the transform originates from the right as per your previous style.
          */}
            <div className="absolute inset-0 bg-white rounded-full scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out" />
          </Link>
        </div>
      </section>
    </div>
  );
}
