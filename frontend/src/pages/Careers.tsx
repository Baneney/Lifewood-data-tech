import { useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  Search,
  Loader2,
  ShieldCheck,
  ArrowRight,
  Zap,
  Sparkles,
  Globe,
} from "lucide-react";

import ElectricBorder from "../components/ElectricBorder";
import { Dialog, DialogContent, DialogTitle } from "../components/ui/dialog";
import { toast } from "sonner";

// API Hooks
import {
  useTrackApplication,
  type ApplicationTrackingDataType,
} from "../api/applicant/applicantFetchAPI";
import { useFetchPositions } from "../api/application/ApplicationFetchAPI";

// --- TYPES ---
type ApplicationWithLogs = ApplicationTrackingDataType & {
  current_status?: string;
  previous_logs?: ApplicationTrackingDataType["logs"] | null;
};

export default function Careers() {
  const navigate = useNavigate();

  // Parallax refs
  const heroRef     = useRef<HTMLElement>(null);
  const trackerRef  = useRef<HTMLElement>(null);
  const benefitsRef = useRef<HTMLElement>(null);
  const missionRef  = useRef<HTMLElement>(null);

  // Hero — content lifts up and fades
  const { scrollYProgress: heroP } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroContentY = useTransform(heroP, [0, 1], ["0%", "-15%"]);
  const heroOpacity  = useTransform(heroP, [0, 0.8], [1, 0]);

  // Tracker — card drifts up slightly
  const { scrollYProgress: trackerP } = useScroll({ target: trackerRef, offset: ["start end", "end start"] });
  const trackerBgY = useTransform(trackerP, [0, 1], ["-8%", "8%"]);

  // Benefits — bg tint drifts
  const { scrollYProgress: benefitsP } = useScroll({ target: benefitsRef, offset: ["start end", "end start"] });
  const benefitsBgY = useTransform(benefitsP, [0, 1], ["-10%", "10%"]);

  // Mission — watermark drifts up, blob drifts down
  const { scrollYProgress: missionP } = useScroll({ target: missionRef, offset: ["start end", "end start"] });
  const missionWatermarkY = useTransform(missionP, [0, 1], ["10%", "-10%"]);
  const missionBlobY      = useTransform(missionP, [0, 1], ["-15%", "15%"]);

  // 1. Data Fetching
  const { positions, isLoading: isPositionsLoading } = useFetchPositions();
  const { getApplicationById, isLoading: isTrackingLoading } =
    useTrackApplication();

  // 2. State Management
  const [activeDept, setActiveDept] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleItems, setVisibleItems] = useState(6);
  const [inputId, setInputId] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchResult, setSearchResult] = useState<ApplicationWithLogs | null>(
    null,
  );

  // --- Handlers ---
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputId.trim()) return;

    const result = await getApplicationById(inputId);
    if (result) {
      setSearchResult({
        ...result,
        current_status: result.logs?.[0]?.status || "Pending",
        previous_logs: result.logs?.slice(1) || null,
      });
      setIsDialogOpen(true);
    } else {
      toast.error("Registry Access Denied: ID not found.");
    }
  };

  const filteredPositions = useMemo(() => {
    return positions.filter((pos) => {
      const matchesSearch = pos.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      if (activeDept === "All") return matchesSearch;
      return (
        matchesSearch && pos.status.toLowerCase() === activeDept.toLowerCase()
      );
    });
  }, [positions, activeDept, searchQuery]);

  const dynamicDepts = [
    "All",
    ...Array.from(new Set(positions.map((p) => p.status))),
  ];

  return (
    <div className="min-h-screen text-white selection:bg-[#FFB347] selection:text-black overflow-x-hidden bg-[#E6E6E6] dark:bg-[#021a11]">
      {/* 0. DYNAMIC BACKGROUND LAYER */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#FFB347]/5 blur-[120px] rounded-full animate-pulse" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(#fff 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* 1. HERO SECTION */}
      <section ref={heroRef} className="relative z-10 pt-40 pb-24 px-8 text-center overflow-hidden">
        <motion.div
          style={{ y: heroContentY, opacity: heroOpacity }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="will-change-transform"
        >
          <span className="text-[#FFB347] text-[11px] font-bold tracking-[0.8em] mb-6 block">
            LIFEWOOD GLOBAL OPERATIONS SYNC
          </span>
          <h1 className="text-[#133020] dark:text-white text-7xl md:text-[10rem] font-black tracking-tighter leading-none mb-8 italic">
            THE{" "}
            <span
              className="text-transparent bg-clip-text bg-gradient-to-b 
                   /* High Contrast Light Mode: Deep Green to Sage */
                   from-[#034E34] via-[#034E34] to-[#417256] 
                   /* Dark Mode: White to Translucent */
                   dark:from-white dark:to-white/20"
            >
              FRONTIER.
            </span>
          </h1>
          <div className="flex items-center justify-center gap-4 text-[#133020] dark:text-white/40 text-[10px] font-bold tracking-[0.4em]">
            <span className="h-[1px] w-12 bg-white/10" />
            LIVE NODE STATUS: ACTIVE
            <span className="h-[1px] w-12 bg-white/10" />
          </div>
        </motion.div>
      </section>

      {/* 2. TRACKER SECTION */}
      <section ref={trackerRef} className="relative z-10 max-w-7xl mx-auto px-8 mb-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-[2.5rem] bg-[#034E34] dark:bg-[#0d2b1e] border border-[#034E34]/20 dark:border-white/5 shadow-2xl shadow-[#034E34]/20 will-change-transform"
          style={{ y: trackerBgY }}
        >
          {/* Background texture */}
          <div
            className="absolute inset-0 opacity-[0.06] pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(#fff 1px, transparent 1px)`,
              backgroundSize: "28px 28px",
            }}
          />
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#FFB347]/10 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-[#417256]/20 blur-[80px] rounded-full pointer-events-none" />

          <div className="relative z-10 grid lg:grid-cols-2 gap-0">
            {/* Left: Copy */}
            <div className="p-12 lg:p-16 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2.5 bg-[#FFB347]/15 rounded-xl border border-[#FFB347]/20">
                  <ShieldCheck className="text-[#FFB347]" size={22} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#FFB347]/80">
                  Secure Registry
                </span>
              </div>

              <h2 className="text-4xl lg:text-5xl font-black tracking-tighter leading-[1.05] text-white mb-6">
                Already applied?
                <br />
                <span className="text-white/30">Track your status.</span>
              </h2>

              <p className="text-white/50 text-sm font-medium leading-relaxed max-w-sm">
                Enter your Application ID below and get a real-time update on
                where you stand in the hiring process.
              </p>

              <div className="mt-10 flex items-center gap-3">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFB347] opacity-60" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FFB347]" />
                </span>
                <span className="text-[11px] font-bold text-white/30 uppercase tracking-widest">
                  Live sync enabled
                </span>
              </div>
            </div>

            {/* Right: Form */}
            <div className="p-12 lg:p-16 flex flex-col justify-center lg:border-l border-white/5">
              <form onSubmit={handleSearch} className="space-y-4">
                <label className="block text-[10px] font-black uppercase tracking-[0.4em] text-white/40 mb-3">
                  Application ID
                </label>
                <input
                  value={inputId}
                  onChange={(e) => setInputId(e.target.value)}
                  placeholder="e.g. APP-12345"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-base font-semibold outline-none focus:border-[#FFB347]/60 focus:bg-white/8 transition-all text-white placeholder:text-white/20"
                />
                <button
                  type="submit"
                  disabled={isTrackingLoading || !inputId.trim()}
                  className="w-full py-5 bg-[#FFB347] hover:bg-[#ffc46a] disabled:opacity-40 disabled:cursor-not-allowed text-black font-black text-sm uppercase tracking-[0.3em] rounded-2xl transition-all flex justify-center items-center gap-3 shadow-lg shadow-[#FFB347]/20 active:scale-[0.98]"
                >
                  {isTrackingLoading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" /> Syncing...
                    </>
                  ) : (
                    <>
                      <ShieldCheck size={18} /> Check My Status
                    </>
                  )}
                </button>
              </form>

              <p className="mt-6 text-[10px] text-white/20 font-bold uppercase tracking-widest leading-relaxed">
                Your ID was sent to your email upon application submission.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 3. MAIN JOB LISTINGS */}
      <main className="relative z-10 max-w-7xl mx-auto px-8 pb-32 transition-colors duration-300">
        <div className="space-y-12">
          {/* --- SEARCH BAR --- */}
          <div className="relative flex items-center gap-4 border-b-2 border-[#034E34]/20 dark:border-white/10 pb-4 focus-within:border-[#034E34] dark:focus-within:border-[#FFB347] transition-colors duration-300">
            <Search
              size={22}
              className="text-[#034E34]/40 dark:text-[#FFB347]/60 shrink-0"
            />
            <input
              type="text"
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleItems(6);
              }}
              placeholder="Search for a role..."
              className="bg-transparent outline-none text-xl font-semibold w-full text-[#034E34] dark:text-white placeholder:text-[#034E34]/25 dark:placeholder:text-white/20"
            />
          </div>

          {/* --- FILTER PILLS --- */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#034E34]/30 dark:text-white/20 shrink-0 mr-2">
              Filter
            </span>
            {dynamicDepts.map((d) => (
              <button
                key={d}
                onClick={() => {
                  setActiveDept(d);
                  setVisibleItems(6);
                }}
                className={`whitespace-nowrap px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${
                  activeDept === d
                    ? "bg-[#034E34] border-[#034E34] text-white dark:bg-[#FFB347] dark:border-[#FFB347] dark:text-black"
                    : "border-[#034E34]/15 dark:border-white/10 text-[#034E34]/40 dark:text-white/30 hover:border-[#034E34]/40 dark:hover:border-white/30 hover:text-[#034E34] dark:hover:text-white"
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          {/* --- GRID CONTENT --- */}
          <div className="min-h-[600px]">
            {isPositionsLoading ? (
              <div className="flex flex-col items-center justify-center py-40 gap-4">
                <Loader2
                  className="animate-spin text-[#034E34] dark:text-[#FFB347]"
                  size={32}
                />
                <p className="text-[10px] uppercase font-black tracking-widest text-[#034E34]/40 dark:text-white/20">
                  Synchronizing Positions...
                </p>
              </div>
            ) : (
              <>
                <motion.div layout className="grid md:grid-cols-2 gap-8">
                  <AnimatePresence mode="popLayout">
                    {filteredPositions
                      .slice(0, visibleItems)
                      .map((pos, idx) => (
                        <motion.div
                          key={pos.id}
                          layout
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ delay: idx * 0.05 }}
                          whileHover={{ y: -8 }}
                          className="group relative cursor-pointer"
                          onClick={() => navigate("/apply")}
                        >
                          {pos.status?.toLowerCase() === "urgent" ? (
                            /* URGENT CARD STYLE */
                            <ElectricBorder color="#FFB347" borderRadius={40} chaos={0.07} className="h-full">
                            <div className="relative h-full bg-white dark:bg-white/[0.02] border border-[#FFB347]/30 dark:border-[#FFB347]/20 p-10 rounded-[2.5rem] flex flex-col justify-between transition-all shadow-xl shadow-[#FFB347]/5">
                              <div>
                                <div className="flex items-center gap-2 mb-8">
                                  <div className="h-1 w-6 bg-[#FFB347] rounded-full" />
                                  <span className="text-[11px] font-black uppercase text-[#FFB347] tracking-widest">
                                    {pos.status}
                                  </span>
                                  <span className="relative flex h-2 w-2 ml-1">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFB347] opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FFB347]" />
                                  </span>
                                </div>
                                <h3 className="text-2xl font-black uppercase tracking-tight leading-tight text-[#034E34] dark:text-white group-hover:text-[#034E34] dark:group-hover:text-[#FFB347] transition-colors">
                                  {pos.title}
                                </h3>
                                <p className="mt-5 text-slate-600 dark:text-white/40 text-sm font-medium line-clamp-4 leading-relaxed">
                                  {pos.desc}
                                </p>
                              </div>
                              <div className="mt-12 flex items-center justify-between border-t border-[#FFB347]/10 pt-6">
                                <span className="text-[11px] font-black text-[#034E34]/20 dark:text-white/20 uppercase tracking-widest">
                                  Global / Remote
                                </span>
                                <div className="p-3 rounded-full bg-[#FFB347]/10 text-[#FFB347] group-hover:bg-[#FFB347] group-hover:text-black transition-all">
                                  <ArrowRight size={18} />
                                </div>
                              </div>
                            </div>
                            </ElectricBorder>
                          ) : (
                            /* STANDARD CARD STYLE */
                            <>
                              <div className="absolute inset-0 bg-[#034E34] dark:bg-[#FFB347] rounded-[2.5rem] opacity-0 group-hover:opacity-[0.03] dark:group-hover:opacity-5 blur-3xl transition-opacity" />
                              <div className="relative h-full bg-white dark:bg-white/[0.02] border border-[#034E34]/10 dark:border-white/10 p-10 rounded-[2.5rem] flex flex-col justify-between group-hover:border-[#034E34]/40 dark:group-hover:border-[#FFB347]/40 transition-all shadow-lg shadow-[#034E34]/5 dark:shadow-none">
                                <div>
                                  <div className="flex items-center gap-2 mb-8">
                                    <div className="h-1 w-6 bg-[#034E34] dark:bg-[#FFB347] rounded-full" />
                                    <span className="text-[11px] font-black uppercase text-[#034E34]/40 dark:text-[#FFB347] tracking-widest">
                                      {pos.status}
                                    </span>
                                  </div>
                                  <h3 className="text-2xl font-black uppercase tracking-tight leading-tight text-[#034E34] dark:text-white group-hover:text-[#034E34] dark:group-hover:text-[#FFB347] transition-colors">
                                    {pos.title}
                                  </h3>
                                  <p className="mt-5 text-slate-600 dark:text-white/40 text-sm font-medium line-clamp-4 leading-relaxed">
                                    {pos.desc}
                                  </p>
                                </div>
                                <div className="mt-12 flex items-center justify-between border-t border-[#034E34]/5 dark:border-white/5 pt-6">
                                  <span className="text-[11px] font-black text-[#034E34]/20 dark:text-white/20 uppercase tracking-widest">
                                    Global / Remote
                                  </span>
                                  <div className="p-3 rounded-full bg-[#034E34]/5 dark:bg-white/5 text-[#034E34] dark:text-[#FFB347] group-hover:bg-[#034E34] dark:group-hover:bg-[#FFB347] group-hover:text-white dark:group-hover:text-black transition-all">
                                    <ArrowRight size={18} />
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                        </motion.div>
                      ))}
                  </AnimatePresence>
                </motion.div>

                {/* --- LOAD MORE --- */}
                {visibleItems < filteredPositions.length && (
                  <div className="flex justify-center mt-20">
                    <button
                      onClick={() => setVisibleItems((v) => v + 6)}
                      className="group flex flex-col items-center gap-4"
                    >
                      <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#034E34]/30 dark:text-white/20 group-hover:text-[#034E34] dark:group-hover:text-[#FFB347] transition-colors">
                        Expand Data Stream
                      </span>
                      <div className="h-16 w-[1px] bg-gradient-to-b from-[#034E34] dark:from-[#FFB347] to-transparent animate-bounce" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>

      {/* 3. SYSTEM BENEFITS: THE CORE DIRECTIVES */}
      <section ref={benefitsRef} className="relative z-10 py-32 overflow-hidden border-y border-black/5 dark:border-white/5 bg-[#F8F9F8] dark:bg-black/10 transition-colors duration-300">
        {/* --- BACKGROUND EFFECTS --- */}
        {/* Light Mode: Subtle Green Glow | Dark Mode: Deep Green Glow */}
        <motion.div style={{ y: benefitsBgY }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[400px] bg-[#034E34]/5 dark:bg-[#417256]/5 blur-[120px] rounded-full pointer-events-none z-0 will-change-transform" />

        {/* Grid Texture - Swaps from black to white lines based on mode */}
        <div
          className="absolute inset-0 opacity-[0.05] dark:opacity-[0.03] pointer-events-none z-0"
          style={{
            backgroundImage: `linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="flex flex-col items-center mb-24 text-center">
            <span className="text-[#FFB347] text-xs font-bold tracking-[0.4em] mb-4 uppercase">
              Our Culture
            </span>
            {/* High Contrast Header */}
            <h2 className="text-5xl md:text-6xl font-black italic tracking-tighter uppercase leading-tight text-[#034E34] dark:text-white">
              Why Sync with{" "}
              <span className="text-[#034E34]/20 dark:text-white/20">
                Lifewood?
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                title: "Work from Anywhere",
                desc: "Enjoy the freedom of a fully remote setup. Work from home or your favorite coffee shop on your own terms.",
                icon: (
                  <Globe
                    size={28}
                    className="group-hover:rotate-12 transition-transform"
                  />
                ),
                tag: "REMOTE",
              },
              {
                title: "Grow Your Skills",
                desc: "Get hands-on experience with the latest tech and build a career that constantly moves forward.",
                icon: (
                  <Zap
                    size={28}
                    className="group-hover:scale-125 transition-transform"
                  />
                ),
                tag: "LEARNING",
              },
              {
                title: "Healthy Balance",
                desc: "We value your time. We keep a flexible schedule so you can stay refreshed and truly productive.",
                icon: (
                  <Sparkles size={28} className="group-hover:animate-pulse" />
                ),
                tag: "WELLNESS",
              },
            ].map((perk, i) => (
              <motion.div
                key={perk.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative"
              >
                {/* Card Styling: Pure White in Light Mode for Depth */}
                <div className="relative h-full bg-white dark:bg-white/[0.03] border border-[#034E34]/10 dark:border-white/10 p-10 rounded-[2.5rem] shadow-xl shadow-[#034E34]/5 dark:shadow-none backdrop-blur-xl transition-all group-hover:border-[#FFB347]/40 group-hover:bg-[#FFB347]/5 overflow-hidden">
                  {/* Icon Container: Darker in Light Mode for contrast */}
                  <div className="mb-10 p-5 w-fit rounded-2xl bg-[#034E34] dark:bg-[#133020] border border-white/10 text-[#FFB347] shadow-xl shadow-[#034E34]/20">
                    {perk.icon}
                  </div>

                  {/* Tag: Stronger Green for Light Mode */}
                  <span className="text-xs font-bold text-[#417256] dark:text-[#417256] tracking-[0.2em] block mb-4 uppercase">
                    {perk.tag}
                  </span>

                  {/* Card Header: Deep Green vs White */}
                  <h3 className="text-2xl font-black tracking-tight mb-5 text-[#034E34] dark:text-white transition-colors">
                    {perk.title}
                  </h3>

                  {/* Description: Slate-600 is much more readable on light backgrounds than white/60 */}
                  <p className="text-slate-600 dark:text-white/60 text-sm md:text-base font-medium leading-relaxed">
                    {perk.desc}
                  </p>

                  <div className="absolute bottom-0 left-0 w-full h-1.5 bg-transparent overflow-hidden rounded-b-[2.5rem]">
                    <div className="w-0 h-full bg-[#FFB347] group-hover:w-full transition-all duration-700 ease-in-out" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer Status Bar: High Contrast */}
          <div className="mt-24 flex justify-center">
            <div className="inline-flex items-center gap-4 px-8 py-3 rounded-full border border-[#034E34]/10 dark:border-white/10 bg-white dark:bg-black/40 shadow-sm backdrop-blur-md">
              <div className="h-2 w-2 rounded-full bg-[#417256] animate-pulse" />
              <span className="text-[11px] font-bold text-[#034E34]/40 dark:text-white/40 tracking-[0.2em] uppercase">
                All perks are subject to regional availability
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. MISSION SECTION: The Philosophy */}
      <section ref={missionRef} className="relative z-10 py-48 px-8 transition-colors duration-300 bg-[#F8F9F8] dark:bg-transparent overflow-hidden">
        {/* Texture Layer: Dotted Grid for Light Mode */}
        <motion.div
          style={{
            y: missionBlobY,
            backgroundImage: "radial-gradient(#034E34 0.5px, transparent 0.5px)",
            backgroundSize: "24px 24px",
          }}
          className="absolute inset-0 opacity-[0.4] dark:opacity-0 pointer-events-none will-change-transform"
        />
        <motion.div
          style={{ y: missionWatermarkY }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-black text-[#034E34]/[0.03] dark:text-white/[0.02] uppercase whitespace-nowrap pointer-events-none select-none will-change-transform"
        >
          CAREERS
        </motion.div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-32 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="space-y-12">
                <h2 className="text-8xl font-black tracking-tighter leading-[0.8] mb-12 text-[#034E34] dark:text-white">
                  HUMAN <br />
                  <span className="text-[#034E34]/70 dark:text-white/10 italic">
                    INTELLIGENCE.
                  </span>
                </h2>

                <div className="h-1.5 w-24 bg-[#FFB347] rounded-full" />

                <p className="text-[#034E34] dark:text-white/40 text-[14px] font-semibold leading-[1.8] max-w-lg tracking-wide">
                  Lifewood is the architect of the ethical AI revolution. We
                  transform raw data into refined wisdom through our global
                  network. Joining us means steering the future of machine
                  learning with human-centric values.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8">
                  {/* Security Feature - Higher Contrast */}
                  <div className="space-y-4 p-6 bg-white/50 dark:bg-transparent rounded-3xl border border-[#034E34]/5 dark:border-transparent backdrop-blur-sm">
                    <p className="text-[#034E34] dark:text-white font-black text-[12px] tracking-[0.4em] flex items-center gap-3">
                      <span className="h-2 w-2 bg-[#417256] rounded-full shadow-[0_0_10px_rgba(65,114,86,0.4)]" />{" "}
                      SECURITY
                    </p>
                    <p className="text-[#034E34]/60 dark:text-white/20 text-[10px] font-bold tracking-widest leading-relaxed uppercase">
                      Enterprise-grade ISO compliance rigidly applied at every
                      global node.
                    </p>
                  </div>

                  {/* Diversity Feature - Higher Contrast */}
                  <div className="space-y-4 p-6 bg-white/50 dark:bg-transparent rounded-3xl border border-[#034E34]/5 dark:border-transparent backdrop-blur-sm">
                    <p className="text-[#034E34] dark:text-white font-black text-[12px] tracking-[0.4em] flex items-center gap-3">
                      <span className="h-2 w-2 bg-[#FFB347] rounded-full shadow-[0_0_10px_rgba(255,179,71,0.4)]" />{" "}
                      DIVERSITY
                    </p>
                    <p className="text-[#034E34]/60 dark:text-white/20 text-[10px] font-bold tracking-widest leading-relaxed uppercase">
                      Supporting 100+ linguistic dialects to eliminate
                      algorithmic bias.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Visual Element: Deepened Gradients */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative group"
            >
              {/* Soft Glow Under Card */}
              <div className="absolute inset-0 bg-[#034E34]/10 dark:bg-[#FFB347]/5 blur-[120px] rounded-full" />

              <div className="aspect-square bg-white dark:bg-[#021a11] border-2 border-[#034E34]/10 dark:border-white/10 rounded-[5rem] flex items-center justify-center relative overflow-hidden shadow-[0_40px_80px_-15px_rgba(3,78,52,0.1)] dark:shadow-none">
                {/* Radial Interior Glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(3,78,52,0.08)_0%,transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(65,114,86,0.1)_0%,transparent_70%)]" />

                <div className="relative z-10 flex flex-col items-center">
                  <div className="h-40 w-40 rounded-full bg-[#034E34]/5 dark:bg-white/5 border border-[#034E34]/10 dark:border-white/10 flex items-center justify-center mb-8 relative">
                    {/* Rotating Amber Ring */}
                    <div className="absolute inset-0 rounded-full border-[3px] border-[#FFB347] border-dashed animate-[spin_15s_linear_infinite] opacity-80" />
                    <Zap
                      size={56}
                      className="text-[#FFB347] drop-shadow-[0_0_15px_rgba(255,179,71,0.5)]"
                      fill="#FFB347"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- TRACKER DIALOG --- */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-[#021a11] border-white/10 text-white max-w-lg rounded-[2.5rem] p-0 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] outline-none">
          {/* Animated Header Section */}
          <div className="relative p-10 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#417256]/30 to-transparent z-0" />
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#FFB347]/10 blur-[80px] rounded-full" />

            <div className="relative z-10 flex justify-between items-start">
              <div>
                <DialogTitle className="text-[#FFB347] font-black uppercase tracking-[0.4em] text-[10px] mb-4 flex items-center gap-2">
                  <span className="h-1 w-8 bg-[#FFB347] rounded-full" />
                  Live Tracker
                </DialogTitle>
                <h2 className="text-4xl font-black tracking-tighter uppercase leading-none">
                  {searchResult?.applicant.fname}
                  <br />
                  <span className="text-white/40">
                    {searchResult?.applicant.lname}
                  </span>
                </h2>
              </div>

              {/* Status Badge */}
              <div className="flex flex-col items-end gap-2">
                <div className="bg-[#FFB347] text-[#021a11] px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-[0_0_20px_rgba(255,179,71,0.3)]">
                  {searchResult?.current_status}
                </div>
                <span className="text-[9px] font-bold text-white/20 uppercase tracking-tighter">
                  Last Sync:{" "}
                  {new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          </div>

          {searchResult && (
            <div className="px-10 pb-7 pt-4 space-y-10 relative z-10">
              {/* Main Info Card */}
              <div className="grid grid-cols-1">
                <div className="bg-white/5 border border-white/10 p-5 rounded-3xl backdrop-blur-md">
                  <label className="text-[13px] font-black uppercase text-[#FFB347] block mb-1">
                    Position Applied
                  </label>
                  <p className="text-[100%] font-bold uppercase truncate">
                    {searchResult.position.title}
                  </p>
                </div>
              </div>

              {/* Timeline Logs Section */}
              <div className="space-y-6">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 flex items-center gap-4">
                  Application Journey <div className="h-px flex-1 bg-white/5" />
                </h4>

                <div className="space-y-4">
                  {/* Timeline Line */}
                  <div className="relative pl-8 space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-[#FFB347] before:to-white/5">
                    {/* Latest Log (Special Styling) */}
                    <div className="relative group">
                      <div className="absolute -left-[21px] top-1.5 h-[10px] w-[10px] rounded-full bg-[#FFB347] shadow-[0_0_15px_#FFB347] z-20 transition-transform group-hover:scale-125" />

                      <div className="relative overflow-hidden bg-gradient-to-br from-[#FFB347]/10 via-[#FFB347]/5 to-transparent border border-[#FFB347]/30 p-5 rounded-[1rem] backdrop-blur-xl shadow-2xl transition-all hover:border-[#FFB347]/50">
                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_left,rgba(255,179,71,0.05),transparent)] pointer-events-none" />

                        <div className="flex justify-between items-start relative z-10">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFB347] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FFB347]"></span>
                              </span>
                              <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#FFB347]">
                                {searchResult.logs?.[0]?.status}
                              </span>
                            </div>

                            <p className="text-[10px] text-white/40 font-medium uppercase tracking-tight">
                              Current Stage reached
                            </p>
                          </div>

                          {/* Date Badge */}
                          <div className="bg-white/5 border border-white/10 px-3 h-5 flex items-center justify-center rounded-full backdrop-blur-sm">
                            <span className="text-[9px] text-white/80 font-black tabular-nums tracking-widest leading-none">
                              {new Date(
                                searchResult.logs?.[0]?.datetime || "",
                              ).toLocaleDateString(undefined, {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </span>
                          </div>
                        </div>

                        <div className="absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-[#FFB347]/20 to-transparent" />
                      </div>
                    </div>

                    {/* Previous Logs */}
                    <div className="max-h-[90px] overflow-y-auto space-y-8 pr-1
                      [&::-webkit-scrollbar]:w-1
                      [&::-webkit-scrollbar-track]:bg-transparent
                      [&::-webkit-scrollbar-thumb]:bg-white/10
                      hover:[&::-webkit-scrollbar-thumb]:bg-white/30
                      [&::-webkit-scrollbar-thumb]:rounded-full">
                    {searchResult.previous_logs?.map((log) => (
                      <div
                        key={log.id}
                        className="relative opacity-50 hover:opacity-100 transition-opacity"
                      >
                        <div className="absolute -left-[21px] top-1.5 h-[8px] w-[8px] rounded-full bg-white/20 border border-[#021a11]" />
                        <div className="flex justify-between items-center group">
                          <span className="text-[11px] font-bold uppercase tracking-tight group-hover:text-white transition-colors">
                            {log.status}
                          </span>
                          <span className="text-[10px] text-white tabular-nums">
                            {new Date(log.datetime).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ))}

                    {!searchResult.previous_logs && (
                      <p className="text-[10px] font-bold text-white/10 uppercase tracking-widest italic pl-2">
                        No prior history
                      </p>
                    )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Action */}
              <button
                onClick={() => setIsDialogOpen(false)}
                className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] text-white/40 transition-all hover:text-white"
              >
                Close Tracker
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}


