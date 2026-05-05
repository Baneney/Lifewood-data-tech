// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Search,
//   Loader2,
//   ShieldCheck,
// } from "lucide-react";

// // UI Components
// import JobCard from "../components/JobCard";
// import {
//   Dialog,
//   DialogContent,
//   DialogTitle,
// } from "../components/ui/dialog";
// import { toast } from "sonner";

// // API Hooks
// import {
//   useTrackApplication,
//   type ApplicationTrackingDataType,
// } from "./api/applicant/applicantFetchAPI";
// import { useFetchPositions } from "./api/application/ApplicationFetchAPI";

// // --- TYPES ---
// type ApplicationWithLogs = ApplicationTrackingDataType & {
//   current_status?: string;
//   previous_logs?: ApplicationTrackingDataType["logs"] | null;
// };

// const VALUES = [
//   {
//     tag: "01",
//     title: "People First",
//     desc: "We invest in our people because great teams build great products.",
//   },
//   {
//     tag: "02",
//     title: "Radical Transparency",
//     desc: "Open communication at every level — no hidden agendas.",
//   },
//   {
//     tag: "03",
//     title: "Continuous Learning",
//     desc: "Curiosity is a core competency here.",
//   },
//   {
//     tag: "04",
//     title: "Impact at Scale",
//     desc: "Every role contributes to AI systems that reach millions.",
//   },
// ];

// export default function Careers() {
//   const navigate = useNavigate();

//   // 1. Fetch Dynamic Positions from database
//   const { positions, isLoading: isPositionsLoading } = useFetchPositions();

//   // Job Board Filter State
//   const [activeDept, setActiveDept] = useState("All");
//   const [searchQuery, setSearchQuery] = useState("");

//   // Application Tracking State
//   const [inputId, setInputId] = useState("");
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [searchResult, setSearchResult] = useState<ApplicationWithLogs | null>(
//     null,
//   );

//   const { getApplicationById, isLoading: isTrackingLoading } =
//     useTrackApplication();

//   const handleSearch = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!inputId.trim()) return;

//     const result = await getApplicationById(inputId);

//     if (result) {
//       const latestStatus = result.logs?.[0]?.status || "Pending";
//       const hasPreviousLogs = result.logs && result.logs.length > 1;

//       setSearchResult({
//         ...result,
//         current_status: latestStatus,
//         previous_logs: hasPreviousLogs ? result.logs.slice(1) : null,
//       });
//       setIsDialogOpen(true);
//     } else {
//       toast.error("Application ID not found.");
//     }
//   };

//   // 2. Filter system mapping over dynamic database results
//   // We match active status categories (e.g. "Active", "Closed") or position names.
//   // We can group database rows under default sections or directly filter the list.
//   const filteredPositions = positions.filter((pos) => {
//     const matchesSearch =
//       pos.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       pos.desc.toLowerCase().includes(searchQuery.toLowerCase());

//     if (activeDept === "All") {
//       return matchesSearch;
//     }
//     // If you want to use the sidebar filters to separate status or departments:
//     return (
//       matchesSearch && pos.status.toLowerCase() === activeDept.toLowerCase()
//     );
//   });

//   // Dynamic departments generated from the statuses available in database, plus "All"
//   const dynamicDepts = [
//     "All",
//     ...Array.from(new Set(positions.map((p) => p.status))),
//   ];

//   return (
//     <div className="min-h-screen bg-[#021a11] text-white selection:bg-[#FFB347] selection:text-[#021a11]">
//       {/* Background Grid */}
//       <div
//         className="fixed inset-0 opacity-[0.05] pointer-events-none z-0"
//         style={{
//           backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
//           backgroundSize: "50px 50px",
//         }}
//       />

//       {/* 1. HERO */}
//       <section className="relative z-10 py-32 px-8 md:px-16">
//         <div className="max-w-7xl mx-auto text-left">
//           <span className="text-[10px] font-black text-[#FFB347] uppercase tracking-[0.5em] border-l-4 border-[#FFB347] pl-4 mb-6 block">
//             Why Lifewood
//           </span>
//           <h2 className="text-5xl font-black text-white leading-tight uppercase tracking-tighter">
//             More than a job.
//             <br />A global mission.
//           </h2>
//         </div>
//       </section>

//       {/* 2. JOB BOARD & SEARCH */}
//       <section
//         id="open-positions"
//         className="relative z-10 py-32 px-8 md:px-16 bg-[#021a11]/80 backdrop-blur-3xl"
//       >
//         <div className="max-w-7xl mx-auto">
//           <div className="grid lg:grid-cols-4 gap-16">
//             {/* Sidebar with Tracker */}
//             <div className="lg:col-span-1 space-y-12">
//               <form
//                 onSubmit={handleSearch}
//                 className="bg-[#417256]/20 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 relative overflow-hidden group"
//               >
//                 <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#FFB347]/10 blur-3xl rounded-full" />
//                 <ShieldCheck className="text-[#FFB347] mb-6" size={40} />
//                 <h4 className="text-2xl font-bold mb-3 uppercase tracking-tighter">
//                   Check Status
//                 </h4>
//                 <p className="text-white/40 text-[10px] mb-8 font-black uppercase tracking-widest leading-relaxed">
//                   Track your application.
//                 </p>
//                 <div className="space-y-4">
//                   <input
//                     type="text"
//                     value={inputId}
//                     onChange={(e) => setInputId(e.target.value)}
//                     placeholder="e.g. APP-12345"
//                     className="w-full bg-black/40 border border-white/10 rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:border-[#FFB347] transition-colors"
//                   />
//                   <button
//                     type="submit"
//                     disabled={isTrackingLoading || !inputId.trim()}
//                     className="w-full bg-[#FFB347] hover:bg-[#e6a136] disabled:opacity-50 text-black font-bold py-2.5 px-6 rounded-lg text-sm transition-all flex items-center justify-center gap-2"
//                   >
//                     {isTrackingLoading ? (
//                       <Loader2 className="w-4 h-4 animate-spin" />
//                     ) : (
//                       "Track"
//                     )}
//                   </button>
//                 </div>
//               </form>

//               {/* Department/Status Filters */}
//               <div>
//                 <h3 className="font-black uppercase tracking-widest text-[10px] mb-6 text-white/30">
//                   Status Categories
//                 </h3>
//                 <div className="flex flex-col gap-2">
//                   {dynamicDepts.map((d) => (
//                     <button
//                       key={d}
//                       onClick={() => setActiveDept(d)}
//                       className={`text-left px-6 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all ${
//                         activeDept === d
//                           ? "bg-[#FFB347] text-[#021a11] translate-x-2"
//                           : "bg-white/5 text-white/40 hover:bg-white/10"
//                       }`}
//                     >
//                       {d}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Listings (Dynamic Database Fetch replacing static code) */}
//             <div className="lg:col-span-3 space-y-12">
//               <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-md">
//                 <Search className="text-white/20" size={24} />
//                 <input
//                   type="text"
//                   placeholder="SEARCH FOR A ROLE..."
//                   className="bg-transparent outline-none w-full text-xs font-black uppercase tracking-[0.3em] placeholder:text-white/10"
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                 />
//               </div>

//               <AnimatePresence mode="wait">
//                 <motion.div
//                   key={activeDept + searchQuery}
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   className="space-y-24"
//                 >
//                   {isPositionsLoading ? (
//                     <div className="flex flex-col items-center justify-center py-20 gap-4">
//                       <Loader2 className="w-8 h-8 animate-spin text-[#FFB347]" />
//                       <p className="text-xs uppercase tracking-widest text-white/30 font-black">
//                         Fetching live opportunities...
//                       </p>
//                     </div>
//                   ) : filteredPositions.length > 0 ? (
//                     <div>
//                       <div className="flex items-center gap-6 mb-12">
//                         <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-[#FFB347] whitespace-nowrap">
//                           {activeDept === "All"
//                             ? "Current Openings"
//                             : `${activeDept} Roles`}
//                         </h2>
//                         <div className="h-px flex-1 bg-white/5" />
//                       </div>
//                       <div className="grid md:grid-cols-2 gap-8">
//                         {filteredPositions.map((position) => (
//                           <div
//                             key={position.id}
//                             onClick={() => navigate(`/apply`)}
//                             className="cursor-pointer"
//                           >
//                             {/* Formatting positional data to map smoothly to JobCard UI components */}
//                             <JobCard
//                               role={{
//                                 title: position.title,
//                                 desc: position.desc,
//                                 type: position.status, // Uses status (e.g. Active/Closed/Full-Time)
//                                 location: "Global · Remote / Hybrid", // Placeholder fallback
//                               }}
//                             />
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   ) : (
//                     <div className="text-center py-20 border border-dashed border-white/10 rounded-[2.5rem]">
//                       <p className="text-xs uppercase tracking-[0.2em] font-black text-white/30">
//                         No active matching positions found
//                       </p>
//                     </div>
//                   )}
//                 </motion.div>
//               </AnimatePresence>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* 3. VALUES */}
//       <section className="relative z-10 bg-black/20 py-32 px-8 md:px-16">
//         <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-px bg-white/5 rounded-[2.5rem] overflow-hidden border border-white/10">
//           {VALUES.map((v) => (
//             <div
//               key={v.tag}
//               className="bg-[#021a11]/50 backdrop-blur-md p-12 hover:bg-[#417256]/20 transition-all group text-left"
//             >
//               <p className="text-[#FFB347] text-[10px] font-black uppercase tracking-widest mb-6">
//                 {v.tag}
//               </p>
//               <h3 className="text-xl font-bold text-white uppercase tracking-tight mb-4 group-hover:text-[#FFB347]">
//                 {v.title}
//               </h3>
//               <p className="text-white/30 text-sm leading-relaxed">{v.desc}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* 4. DIALOG MODAL */}
// <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//   <DialogContent className="bg-[#021a11] border-white/10 text-white max-w-lg rounded-[2.5rem] p-0 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] outline-none">
//     {/* Animated Header Section */}
//     <div className="relative p-10 overflow-hidden">
//       <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#417256]/30 to-transparent z-0" />
//       <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#FFB347]/10 blur-[80px] rounded-full" />

//       <div className="relative z-10 flex justify-between items-start">
//         <div>
//           <DialogTitle className="text-[#FFB347] font-black uppercase tracking-[0.4em] text-[10px] mb-4 flex items-center gap-2">
//             <span className="h-1 w-8 bg-[#FFB347] rounded-full" />
//             Live Tracker
//           </DialogTitle>
//           <h2 className="text-4xl font-black tracking-tighter uppercase leading-none">
//             {searchResult?.applicant.fname}
//             <br />
//             <span className="text-white/40">
//               {searchResult?.applicant.lname}
//             </span>
//           </h2>
//         </div>

//         {/* Status Badge */}
//         <div className="flex flex-col items-end gap-2">
//           <div className="bg-[#FFB347] text-[#021a11] px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-[0_0_20px_rgba(255,179,71,0.3)]">
//             {searchResult?.current_status}
//           </div>
//           <span className="text-[9px] font-bold text-white/20 uppercase tracking-tighter">
//             Last Sync:{" "}
//             {new Date().toLocaleTimeString([], {
//               hour: "2-digit",
//               minute: "2-digit",
//             })}
//           </span>
//         </div>
//       </div>
//     </div>

//     {searchResult && (
//       <div className="px-10 pb-7 pt-4 space-y-10 relative z-10">
//         {/* Main Info Card */}
//         <div className="grid grid-cols-1">
//           <div className="bg-white/5 border border-white/10 p-5 rounded-3xl backdrop-blur-md">
//             <label className="text-[13px] font-black uppercase text-[#FFB347] block mb-1">
//               Position Applied
//             </label>
//             <p className="text-[100%] font-bold uppercase truncate">
//               {searchResult.position.title}
//             </p>
//           </div>
//         </div>

//         {/* Timeline Logs Section */}
//         <div className="space-y-6">
//           <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 flex items-center gap-4">
//             Application Journey <div className="h-px flex-1 bg-white/5" />
//           </h4>

//           <div className="space-y-4">
//             {/* Timeline Line */}
//             <div className="relative pl-8 space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-[#FFB347] before:to-white/5">
//               {/* Latest Log (Special Styling) */}
//               <div className="relative group">
//                 <div className="absolute -left-[21px] top-1.5 h-[10px] w-[10px] rounded-full bg-[#FFB347] shadow-[0_0_15px_#FFB347] z-20 transition-transform group-hover:scale-125" />

//                 <div className="relative overflow-hidden bg-gradient-to-br from-[#FFB347]/10 via-[#FFB347]/5 to-transparent border border-[#FFB347]/30 p-5 rounded-[1rem] backdrop-blur-xl shadow-2xl transition-all hover:border-[#FFB347]/50">
//                   <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_left,rgba(255,179,71,0.05),transparent)] pointer-events-none" />

//                   <div className="flex justify-between items-start relative z-10">
//                     <div className="space-y-1">
//                       <div className="flex items-center gap-2">
//                         <span className="relative flex h-2 w-2">
//                           <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFB347] opacity-75"></span>
//                           <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FFB347]"></span>
//                         </span>
//                         <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#FFB347]">
//                           {searchResult.logs?.[0]?.status}
//                         </span>
//                       </div>

//                       <p className="text-[10px] text-white/40 font-medium uppercase tracking-tight">
//                         Current Stage reached
//                       </p>
//                     </div>

//                     {/* Date Badge */}
//                     <div className="bg-white/5 border border-white/10 px-3 h-5 flex items-center justify-center rounded-full backdrop-blur-sm">
//                       <span className="text-[9px] text-white/80 font-black tabular-nums tracking-widest leading-none">
//                         {new Date(
//                           searchResult.logs?.[0]?.datetime || "",
//                         ).toLocaleDateString(undefined, {
//                           month: "short",
//                           day: "numeric",
//                           year: "numeric",
//                         })}
//                       </span>
//                     </div>
//                   </div>

//                   <div className="absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-[#FFB347]/20 to-transparent" />
//                 </div>
//               </div>

//               {/* Previous Logs */}
//               {searchResult.previous_logs?.map((log) => (
//                 <div
//                   key={log.id}
//                   className="relative opacity-50 hover:opacity-100 transition-opacity"
//                 >
//                   <div className="absolute -left-[21px] top-1.5 h-[8px] w-[8px] rounded-full bg-white/20 border border-[#021a11]" />
//                   <div className="flex justify-between items-center group">
//                     <span className="text-[11px] font-bold uppercase tracking-tight group-hover:text-white transition-colors">
//                       {log.status}
//                     </span>
//                     <span className="text-[10px] text-white tabular-nums">
//                       {new Date(log.datetime).toLocaleDateString()}
//                     </span>
//                   </div>
//                 </div>
//               ))}

//               {!searchResult.previous_logs && (
//                 <p className="text-[10px] font-bold text-white/10 uppercase tracking-widest italic pl-2">
//                   No prior history
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Footer Action */}
//         <button
//           onClick={() => setIsDialogOpen(false)}
//           className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] text-white/40 transition-all hover:text-white"
//         >
//           Close Tracker
//         </button>
//       </div>
//     )}
//   </DialogContent>
// </Dialog>
//     </div>
//   );
// }

import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Loader2,
  ShieldCheck,
  ArrowRight,
  Zap,
  Sparkles,
  Globe,
  Cpu,
  Users,
} from "lucide-react";

// UI Components
import JobCard from "../components/JobCard";
import { Dialog, DialogContent, DialogTitle } from "../components/ui/dialog";
import { toast } from "sonner";

// API Hooks
import {
  useTrackApplication,
  type ApplicationTrackingDataType,
} from "./api/applicant/applicantFetchAPI";
import { useFetchPositions } from "./api/application/ApplicationFetchAPI";

// --- TYPES ---
type ApplicationWithLogs = ApplicationTrackingDataType & {
  current_status?: string;
  previous_logs?: ApplicationTrackingDataType["logs"] | null;
};

export default function Careers() {
  const navigate = useNavigate();

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
    <div className="min-h-screen bg-[#021a11] text-white selection:bg-[#FFB347] selection:text-black overflow-x-hidden">
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
      <section className="relative z-10 pt-40 pb-24 px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <span className="text-[#FFB347] text-[11px] font-black tracking-[0.8em] mb-6 block">
            LIFEWOOD GLOBAL OPERATIONS SYNC
          </span>
          <h1 className="text-7xl md:text-[10rem] font-black tracking-tighter leading-none mb-8 italic">
            THE{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20">
              FRONTIER.
            </span>
          </h1>
          <div className="flex items-center justify-center gap-4 text-white/40 text-[10px] font-bold tracking-[0.4em]">
            <span className="h-[1px] w-12 bg-white/10" />
            LIVE NODE STATUS: ACTIVE
            <span className="h-[1px] w-12 bg-white/10" />
          </div>
        </motion.div>
      </section>

      {/* 2. MAIN APPLICATION HUB */}
      <main className="relative z-10 max-w-7xl mx-auto px-8 pb-32">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* SIDEBAR: Registry Tracker */}
          <aside className="lg:col-span-3">
            <div className="sticky top-8 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="relative group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-b from-[#FFB347]/40 to-transparent rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition duration-500" />
                <form
                  onSubmit={handleSearch}
                  className="relative bg-black/40 backdrop-blur-3xl border border-white/5 p-8 rounded-[2rem]"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-[#FFB347]/10 rounded-lg">
                      <ShieldCheck className="text-[#FFB347]" size={20} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/60">
                      Secure Registry
                    </span>
                  </div>
                  <input
                    value={inputId}
                    onChange={(e) => setInputId(e.target.value)}
                    placeholder="ENTER APPLICATION ID"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[11px] font-bold uppercase tracking-widest outline-none focus:border-[#FFB347]/50 transition-all mb-4"
                  />
                  <button
                    disabled={isTrackingLoading}
                    className="w-full py-4 bg-[#FFB347] text-black font-black text-[10px] uppercase tracking-[0.3em] rounded-xl hover:scale-[1.02] active:scale-95 transition-all flex justify-center items-center gap-2"
                  >
                    {isTrackingLoading ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      "Track Status"
                    )}
                  </button>
                </form>
              </motion.div>

              <div className="bg-[#417256]/10 border border-white/5 p-6 rounded-[2rem]">
                <Sparkles className="text-[#FFB347]/40 mb-4" size={18} />
                <p className="text-[10px] text-white/30 font-bold uppercase leading-relaxed tracking-wider">
                  Our system operates on real-time synchronization. Your status
                  updates as soon as our teams finalize the review.
                </p>
              </div>
            </div>
          </aside>

          {/* LISTINGS: The Explorer */}
          <div className="lg:col-span-9 space-y-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white/5 border border-white/10 p-4 rounded-3xl backdrop-blur-lg">
              <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                {dynamicDepts.map((d) => (
                  <button
                    key={d}
                    onClick={() => {
                      setActiveDept(d);
                      setVisibleItems(6);
                    }}
                    className={`whitespace-nowrap px-6 py-2 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${
                      activeDept === d
                        ? "bg-[#FFB347] text-black"
                        : "text-white/40 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-3 bg-black/20 px-4 py-2 rounded-full border border-white/5 min-w-[280px]">
                <Search size={14} className="text-[#FFB347]" />
                <input
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setVisibleItems(6);
                  }}
                  placeholder="QUERY DATABASE..."
                  className="bg-transparent outline-none text-[9px] font-bold uppercase tracking-[0.2em] w-full placeholder:text-white/10"
                />
              </div>
            </div>

            <div className="min-h-[600px]">
              {isPositionsLoading ? (
                <div className="flex flex-col items-center justify-center py-40 gap-4">
                  <Loader2 className="animate-spin text-[#FFB347]" size={32} />
                  <p className="text-[10px] uppercase font-black tracking-widest text-white/20">
                    Accessing Node...
                  </p>
                </div>
              ) : (
                <motion.div
                  layout
                  className="grid md:grid-cols-2 xl:grid-cols-3 gap-6"
                >
                  <AnimatePresence mode="popLayout">
                    {filteredPositions
                      .slice(0, visibleItems)
                      .map((pos, idx) => (
                        <motion.div
                          key={pos.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ delay: idx * 0.05 }}
                          whileHover={{ y: -8 }}
                          className="group relative cursor-pointer"
                          onClick={() => navigate("/apply")}
                        >
                          <div className="absolute inset-0 bg-[#FFB347] rounded-[2.5rem] opacity-0 group-hover:opacity-5 blur-3xl transition-opacity" />
                          <div className="relative h-full bg-white/[0.02] border border-white/10 p-8 rounded-[2.5rem] flex flex-col justify-between group-hover:border-[#FFB347]/40 transition-all">
                            <div>
                              <div className="flex items-center gap-2 mb-6">
                                <div className="h-1 w-6 bg-[#FFB347] rounded-full" />
                                <span className="text-[9px] font-black uppercase text-[#FFB347] tracking-widest">
                                  {pos.status}
                                </span>
                              </div>
                              <h3 className="text-xl font-black uppercase tracking-tight leading-tight group-hover:text-[#FFB347] transition-colors">
                                {pos.title}
                              </h3>
                              <p className="mt-4 text-white/30 text-[11px] font-medium line-clamp-3 leading-relaxed tracking-tighter">
                                {pos.desc}
                              </p>
                            </div>
                            <div className="mt-10 flex items-center justify-between">
                              <span className="text-[9px] font-black text-white/20 uppercase tracking-widest">
                                Global / Remote
                              </span>
                              <div className="p-3 rounded-full bg-white/5 text-[#FFB347] group-hover:bg-[#FFB347] group-hover:text-black transition-all">
                                <ArrowRight size={16} />
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                  </AnimatePresence>
                </motion.div>
              )}

              {/* Expansion Action */}
              {!isPositionsLoading &&
                visibleItems < filteredPositions.length && (
                  <div className="flex justify-center mt-20">
                    <button
                      onClick={() => setVisibleItems((v) => v + 6)}
                      className="group flex flex-col items-center gap-4"
                    >
                      <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 group-hover:text-[#FFB347] transition-colors">
                        Expand Data Stream
                      </span>
                      <div className="h-16 w-[1px] bg-gradient-to-b from-[#FFB347] to-transparent animate-bounce" />
                    </button>
                  </div>
                )}
            </div>
          </div>
        </div>
      </main>

      {/* 3. SYSTEM BENEFITS: THE CORE DIRECTIVES */}
      <section className="relative z-10 py-32 overflow-hidden border-y border-white/5 bg-black/10">
        {/* --- BACKGROUND EFFECTS --- */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[400px] bg-[#417256]/5 blur-[120px] rounded-full pointer-events-none z-0" />

        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none z-0"
          style={{
            backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="flex flex-col items-center mb-24 text-center">
            <span className="text-[#FFB347] text-xs font-bold tracking-[0.4em] mb-4 uppercase">
              Our Culture
            </span>
            <h2 className="text-5xl md:text-6xl font-black italic tracking-tighter uppercase leading-tight">
              Why Sync with <span className="text-white/20">Lifewood?</span>
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
                <div className="relative h-full bg-white/[0.03] border border-white/10 p-10 rounded-[2.5rem] backdrop-blur-xl transition-all group-hover:border-[#FFB347]/40 group-hover:bg-[#FFB347]/5">
                  {/* Larger Icon Container */}
                  <div className="mb-10 p-5 w-fit rounded-2xl bg-black/60 border border-white/10 text-[#FFB347] shadow-xl">
                    {perk.icon}
                  </div>

                  {/* Increased tag size and weight */}
                  <span className="text-xs font-bold text-[#417256] tracking-[0.2em] block mb-4 uppercase">
                    {perk.tag}
                  </span>

                  {/* Larger Header */}
                  <h3 className="text-2xl font-black tracking-tight mb-5 group-hover:text-white transition-colors">
                    {perk.title}
                  </h3>

                  {/* High Contrast Description - Removed italic for better readability */}
                  <p className="text-white/60 text-sm md:text-base font-medium leading-relaxed">
                    {perk.desc}
                  </p>

                  <div className="absolute bottom-0 left-0 w-full h-1.5 bg-transparent overflow-hidden">
                    <div className="w-0 h-full bg-[#FFB347] group-hover:w-full transition-all duration-700 ease-in-out" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Larger, clearer footer text */}
          <div className="mt-24 flex justify-center">
            <div className="inline-flex items-center gap-4 px-8 py-3 rounded-full border border-white/10 bg-black/40 backdrop-blur-md">
              <div className="h-2 w-2 rounded-full bg-[#417256] animate-pulse" />
              <span className="text-[11px] font-bold text-white/40 tracking-[0.2em] uppercase">
                All perks are subject to regional availability
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. MISSION SECTION: The Philosophy */}
      <section className="relative z-10 py-48 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-32 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="space-y-12">
                <h2 className="text-8xl font-black tracking-tighter leading-[0.8] mb-12">
                  HUMAN <br />
                  <span className="text-white/10 italic">INTELLIGENCE.</span>
                </h2>
                <div className="h-1 w-24 bg-[#FFB347]" />
                <p className="text-white/40 text-[13px] font-medium leading-[2] max-w-lg tracking-[0.1em]">
                  Lifewood is the architect of the ethical AI revolution. We
                  transform raw data into refined wisdom through our global
                  network. Joining us means steering the future of machine
                  learning with human-centric values.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8">
                  <div className="space-y-4">
                    <p className="text-white font-black text-[12px] tracking-[0.4em] flex items-center gap-3">
                      <span className="h-1.5 w-1.5 bg-[#417256] rounded-full" />{" "}
                      SECURITY
                    </p>
                    <p className="text-white/20 text-[10px] font-bold tracking-widest leading-relaxed">
                      ENTERPRISE-GRADE ISO COMPLIANCE RIGIDLY APPLIED AT EVERY
                      GLOBAL NODE.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <p className="text-white font-black text-[12px] tracking-[0.4em] flex items-center gap-3">
                      <span className="h-1.5 w-1.5 bg-[#FFB347] rounded-full" />{" "}
                      DIVERSITY
                    </p>
                    <p className="text-white/20 text-[10px] font-bold tracking-widest leading-relaxed">
                      SUPPORTING 100+ LINGUISTIC DIALECTS TO ELIMINATE
                      ALGORITHMIC BIAS.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="aspect-square bg-gradient-to-tr from-[#021a11] via-white/[0.02] to-white/[0.05] rounded-[5rem] border border-white/10 flex items-center justify-center relative overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(65,114,86,0.1)_0%,transparent_70%)]" />
                <div className="relative z-10 flex flex-col items-center">
                  <div className="h-32 w-32 rounded-full border border-white/10 flex items-center justify-center mb-8 relative">
                    <div className="absolute inset-0 rounded-full border-2 border-[#FFB347] border-dashed animate-[spin_10s_linear_infinite]" />
                    <Zap size={48} className="text-[#FFB347]" fill="#FFB347" />
                  </div>
                  <p className="text-[12px] font-black tracking-[1em] text-white/40">
                    CORE_OS_ACTIVE
                  </p>
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



// import { useState, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Search,
//   Loader2,
//   ShieldCheck,
//   ArrowRight,
//   Zap,
//   Sparkles,
//   Globe,
//   Cpu,
//   Users,
// } from "lucide-react";

// // UI Components
// import JobCard from "../components/JobCard";
// import { Dialog, DialogContent, DialogTitle } from "../components/ui/dialog";
// import { toast } from "sonner";

// // API Hooks
// import {
//   useTrackApplication,
//   type ApplicationTrackingDataType,
// } from "./api/applicant/applicantFetchAPI";
// import { useFetchPositions } from "./api/application/ApplicationFetchAPI";

// // --- TYPES ---
// type ApplicationWithLogs = ApplicationTrackingDataType & {
//   current_status?: string;
//   previous_logs?: ApplicationTrackingDataType["logs"] | null;
// };

// export default function Careers() {
//   const navigate = useNavigate();

//   const { positions, isLoading: isPositionsLoading } = useFetchPositions();
//   const { getApplicationById, isLoading: isTrackingLoading } =
//     useTrackApplication();

//   const [activeDept, setActiveDept] = useState("All");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [visibleItems, setVisibleItems] = useState(6);
//   const [inputId, setInputId] = useState("");
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [searchResult, setSearchResult] = useState<ApplicationWithLogs | null>(
//     null,
//   );

//   const handleSearch = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!inputId.trim()) return;
//     const result = await getApplicationById(inputId);
//     if (result) {
//       setSearchResult({
//         ...result,
//         current_status: result.logs?.[0]?.status || "Pending",
//         previous_logs: result.logs?.slice(1) || null,
//       });
//       setIsDialogOpen(true);
//     } else {
//       toast.error("REGISTRY ACCESS DENIED: ID NOT FOUND.");
//     }
//   };

//   const filteredPositions = useMemo(() => {
//     return positions.filter((pos) => {
//       const matchesSearch = pos.title
//         .toLowerCase()
//         .includes(searchQuery.toLowerCase());
//       if (activeDept === "All") return matchesSearch;
//       return (
//         matchesSearch && pos.status.toLowerCase() === activeDept.toLowerCase()
//       );
//     });
//   }, [positions, activeDept, searchQuery]);

//   const dynamicDepts = [
//     "All",
//     ...Array.from(new Set(positions.map((p) => p.status))),
//   ];

//   return (
//     <div className="min-h-screen bg-[#021a11] text-white selection:bg-[#FFB347] selection:text-black overflow-x-hidden uppercase">
//       {/* 0. DYNAMIC LIGHTING LAYER */}
//       <div className="fixed inset-0 z-0 pointer-events-none">
//         <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#417256]/10 blur-[140px] rounded-full" />
//         <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#FFB347]/5 blur-[120px] rounded-full" />
//         <div
//           className="absolute inset-0 opacity-[0.05]"
//           style={{
//             backgroundImage: `radial-gradient(#fff 1px, transparent 1px)`,
//             backgroundSize: "30px 30px",
//           }}
//         />
//       </div>

//       {/* 1. HERO SECTION */}
//       <section className="relative z-10 pt-40 pb-24 px-8 text-center">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1 }}
//         >
//           <span className="text-[#FFB347] text-[11px] font-black tracking-[0.8em] mb-6 block">
//             LIFEWOOD GLOBAL OPERATIONS SYNC
//           </span>
//           <h1 className="text-7xl md:text-[10rem] font-black tracking-tighter leading-none mb-8 italic">
//             THE{" "}
//             <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20">
//               FRONTIER.
//             </span>
//           </h1>
//           <div className="flex items-center justify-center gap-4 text-white/40 text-[10px] font-bold tracking-[0.4em]">
//             <span className="h-[1px] w-12 bg-white/10" />
//             LIVE NODE STATUS: ACTIVE
//             <span className="h-[1px] w-12 bg-white/10" />
//           </div>
//         </motion.div>
//       </section>

//       {/* 2. MAIN APPLICATION HUB */}
//       <main className="relative z-10 max-w-7xl mx-auto px-8 pb-32">
//         <div className="grid lg:grid-cols-12 gap-16">
//           <aside className="lg:col-span-3">
//             <div className="sticky top-12 space-y-8">
//               <motion.div
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 className="relative group"
//               >
//                 <div className="absolute -inset-1 bg-gradient-to-b from-[#FFB347]/20 to-transparent rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition duration-700" />
//                 <form
//                   onSubmit={handleSearch}
//                   className="relative bg-white/[0.03] backdrop-blur-3xl border border-white/10 p-10 rounded-[2.5rem] shadow-2xl"
//                 >
//                   <div className="flex items-center gap-4 mb-8">
//                     <div className="p-3 bg-[#FFB347] rounded-xl shadow-[0_0_20px_rgba(255,179,71,0.4)] text-black">
//                       <ShieldCheck size={20} />
//                     </div>
//                     <span className="text-[10px] font-black tracking-widest text-white">
//                       SECURE REGISTRY
//                     </span>
//                   </div>
//                   <input
//                     value={inputId}
//                     onChange={(e) => setInputId(e.target.value)}
//                     placeholder="APPLICATION ID..."
//                     className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-[11px] font-black tracking-[0.2em] outline-none focus:border-[#FFB347]/50 transition-all mb-4 placeholder:text-white/10"
//                   />
//                   <button className="w-full py-5 bg-[#FFB347] text-black font-black text-[10px] tracking-[0.4em] rounded-2xl hover:brightness-110 active:scale-95 transition-all">
//                     {isTrackingLoading ? "SYNCING..." : "TRACK STATUS"}
//                   </button>
//                 </form>
//               </motion.div>

//               <div className="p-8 border-l-2 border-[#417256] bg-white/[0.01]">
//                 <p className="text-[10px] text-white/30 font-black leading-relaxed tracking-[0.2em]">
//                   REAL-TIME DATABASE REFRESH ENABLED. ALL ENTRIES ARE SUBJECT TO
//                   ISO-CERTIFIED PROTOCOLS.
//                 </p>
//               </div>
//             </div>
//           </aside>

//           <div className="lg:col-span-9 space-y-12">
//             <div className="flex flex-col md:flex-row gap-6 items-center justify-between bg-white/[0.03] border border-white/10 p-5 rounded-[2rem] backdrop-blur-xl">
//               <div className="flex items-center gap-3 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
//                 {dynamicDepts.map((d) => (
//                   <button
//                     key={d}
//                     onClick={() => {
//                       setActiveDept(d);
//                       setVisibleItems(6);
//                     }}
//                     className={`px-6 py-2.5 rounded-full text-[10px] font-black tracking-widest transition-all ${
//                       activeDept === d
//                         ? "bg-white text-black shadow-lg"
//                         : "text-white/40 hover:text-white"
//                     }`}
//                   >
//                     {d}
//                   </button>
//                 ))}
//               </div>
//               <div className="flex items-center gap-4 bg-black/40 px-6 py-3 rounded-full border border-white/5 w-full md:w-auto">
//                 <Search size={16} className="text-[#FFB347]" />
//                 <input
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   placeholder="SEARCH DATABASE..."
//                   className="bg-transparent outline-none text-[10px] font-black tracking-[0.2em] w-full md:w-48 placeholder:text-white/10"
//                 />
//               </div>
//             </div>

//             <div className="min-h-[600px]">
//               {isPositionsLoading ? (
//                 <div className="flex flex-col items-center justify-center py-40 gap-6">
//                   <div className="relative">
//                     <Loader2
//                       className="animate-spin text-[#FFB347]"
//                       size={40}
//                     />
//                     <div className="absolute inset-0 blur-xl bg-[#FFB347]/20 animate-pulse" />
//                   </div>
//                   <p className="text-[10px] tracking-[0.5em] text-white/20 font-black">
//                     ACCESSING SYSTEM NODES...
//                   </p>
//                 </div>
//               ) : (
//                 <motion.div
//                   layout
//                   className="grid md:grid-cols-2 xl:grid-cols-3 gap-8"
//                 >
//                   <AnimatePresence mode="popLayout">
//                     {filteredPositions
//                       .slice(0, visibleItems)
//                       .map((pos, idx) => (
//                         <motion.div
//                           key={pos.id}
//                           initial={{ opacity: 0, y: 30 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           transition={{ delay: idx * 0.05 }}
//                           whileHover={{ y: -10 }}
//                           className="group relative cursor-pointer"
//                           onClick={() => navigate("/apply")}
//                         >
//                           <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-[0.03] rounded-[3rem] transition-opacity" />
//                           <div className="relative h-full bg-white/[0.02] border border-white/10 p-10 rounded-[3rem] flex flex-col justify-between group-hover:border-[#FFB347]/50 transition-all duration-500 shadow-xl">
//                             <div>
//                               <div className="flex items-center justify-between mb-8">
//                                 <span className="text-[10px] font-black text-[#FFB347] tracking-[0.3em]">
//                                   {pos.status}
//                                 </span>
//                                 <div className="h-2 w-2 rounded-full bg-white/20 group-hover:bg-[#FFB347] transition-colors shadow-[0_0_10px_rgba(255,179,71,0)] group-hover:shadow-[0_0_10px_rgba(255,179,71,0.5)]" />
//                               </div>
//                               <h3 className="text-2xl font-black tracking-tighter leading-tight group-hover:text-white transition-colors mb-4">
//                                 {pos.title}
//                               </h3>
//                               <p className="text-white/30 text-[11px] font-bold leading-relaxed tracking-widest line-clamp-4 italic">
//                                 {pos.desc}
//                               </p>
//                             </div>
//                             <div className="mt-12 flex items-center justify-between border-t border-white/5 pt-6">
//                               <span className="text-[9px] font-black text-white/20 tracking-[0.4em]">
//                                 REMOTE_SYNC
//                               </span>
//                               <div className="p-3 rounded-full bg-white/5 text-[#FFB347] group-hover:bg-[#FFB347] group-hover:text-black transition-all">
//                                 <ArrowRight size={18} />
//                               </div>
//                             </div>
//                           </div>
//                         </motion.div>
//                       ))}
//                   </AnimatePresence>
//                 </motion.div>
//               )}
//             </div>
//           </div>
//         </div>
//       </main>

//       {/* 3. REDESIGNED IMPACT SECTION */}
//       <section className="relative z-10 py-32 bg-white/[0.02] border-y border-white/10 overflow-hidden">
//         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none" />
//         <div className="max-w-7xl mx-auto px-8 relative z-10">
//           <div className="grid grid-cols-2 lg:grid-cols-4 gap-1">
//             {[
//               {
//                 label: "NETWORK DENSITY",
//                 value: "20+",
//                 sub: "GLOBAL TERRITORIES",
//                 icon: <Globe size={20} />,
//               },
//               {
//                 label: "ANNUAL LOAD",
//                 value: "500M+",
//                 sub: "TRAINING DATA PAIRS",
//                 icon: <Cpu size={20} />,
//               },
//               {
//                 label: "ACTIVE FORCE",
//                 value: "2.5K",
//                 sub: "HUMAN SPECIALISTS",
//                 icon: <Users size={20} />,
//               },
//               {
//                 label: "INTEGRITY",
//                 value: "99.9%",
//                 sub: "CORE SYSTEM UPTIME",
//                 icon: <Zap size={20} />,
//               },
//             ].map((stat, i) => (
//               <div
//                 key={stat.label}
//                 className="p-12 border border-white/5 hover:bg-white/[0.02] transition-colors group"
//               >
//                 <div className="text-white/20 group-hover:text-[#FFB347] transition-colors mb-6">
//                   {stat.icon}
//                 </div>
//                 <h3 className="text-6xl font-black tracking-tighter mb-4 italic italic">
//                   {stat.value}
//                 </h3>
//                 <p className="text-[#FFB347] text-[10px] font-black tracking-[0.5em] mb-1">
//                   {stat.label}
//                 </p>
//                 <p className="text-white/10 text-[9px] font-bold tracking-widest">
//                   {stat.sub}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* 4. REDESIGNED PHILOSOPHY SECTION */}
//       <section className="relative z-10 py-48 px-8">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid lg:grid-cols-2 gap-32 items-center">
//             <motion.div
//               initial={{ opacity: 0, x: -30 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//             >
//               <div className="space-y-12">
//                 <h2 className="text-8xl font-black tracking-tighter leading-[0.8] mb-12">
//                   HUMAN <br />
//                   <span className="text-white/10 italic">INTELLIGENCE.</span>
//                 </h2>
//                 <div className="h-1 w-24 bg-[#FFB347]" />
//                 <p className="text-white/40 text-[13px] font-bold leading-[2] max-w-lg tracking-[0.1em]">
//                   LIFEWOOD IS THE ARCHITECT OF THE ETHICAL AI REVOLUTION. WE
//                   TRANSFORM RAW DATA INTO REFINED WISDOM THROUGH OUR GLOBAL
//                   NETWORK. JOINING US MEANS STEERING THE FUTURE OF MACHINE
//                   LEARNING WITH HUMAN-CENTRIC VALUES.
//                 </p>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8">
//                   <div className="space-y-4">
//                     <p className="text-white font-black text-[12px] tracking-[0.4em] flex items-center gap-3">
//                       <span className="h-1.5 w-1.5 bg-[#417256] rounded-full" />{" "}
//                       SECURITY
//                     </p>
//                     <p className="text-white/20 text-[10px] font-bold tracking-widest leading-relaxed">
//                       ENTERPRISE-GRADE ISO COMPLIANCE RIGIDLY APPLIED AT EVERY
//                       GLOBAL NODE.
//                     </p>
//                   </div>
//                   <div className="space-y-4">
//                     <p className="text-white font-black text-[12px] tracking-[0.4em] flex items-center gap-3">
//                       <span className="h-1.5 w-1.5 bg-[#FFB347] rounded-full" />{" "}
//                       DIVERSITY
//                     </p>
//                     <p className="text-white/20 text-[10px] font-bold tracking-widest leading-relaxed">
//                       SUPPORTING 100+ LINGUISTIC DIALECTS TO ELIMINATE
//                       ALGORITHMIC BIAS.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, scale: 0.8 }}
//               whileInView={{ opacity: 1, scale: 1 }}
//               viewport={{ once: true }}
//               className="relative group"
//             >
//               <div className="aspect-square bg-gradient-to-tr from-[#021a11] via-white/[0.02] to-white/[0.05] rounded-[5rem] border border-white/10 flex items-center justify-center relative overflow-hidden shadow-2xl">
//                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(65,114,86,0.1)_0%,transparent_70%)]" />
//                 <div className="relative z-10 flex flex-col items-center">
//                   <div className="h-32 w-32 rounded-full border border-white/10 flex items-center justify-center mb-8 relative">
//                     <div className="absolute inset-0 rounded-full border-2 border-[#FFB347] border-dashed animate-[spin_10s_linear_infinite]" />
//                     <Zap size={48} className="text-[#FFB347]" fill="#FFB347" />
//                   </div>
//                   <p className="text-[12px] font-black tracking-[1em] text-white/40">
//                     CORE_OS_ACTIVE
//                   </p>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* 5. FOOTER */}
//       <footer className="relative z-10 py-32 text-center border-t border-white/10 bg-black/40">
//         <div className="max-w-2xl mx-auto space-y-12">
//           <h2 className="text-5xl font-black tracking-tighter italic italic italic italic">
//             READY FOR DEPLOYMENT?
//           </h2>
//           <button
//             onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
//             className="group relative px-16 py-6 overflow-hidden rounded-full border border-white/20 transition-all hover:border-white"
//           >
//             <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
//             <span className="relative text-[11px] font-black tracking-[0.6em] text-white group-hover:text-black transition-colors">
//               RETURN TO SYSTEM TOP
//             </span>
//           </button>
//         </div>
//       </footer>

//       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//         <DialogContent className="bg-[#021a11] border-white/10 text-white max-w-lg rounded-[2.5rem] p-0 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] outline-none">
//           {/* Animated Header Section */}
//           <div className="relative p-10 overflow-hidden">
//             <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#417256]/30 to-transparent z-0" />
//             <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#FFB347]/10 blur-[80px] rounded-full" />

//             <div className="relative z-10 flex justify-between items-start">
//               <div>
//                 <DialogTitle className="text-[#FFB347] font-black uppercase tracking-[0.4em] text-[10px] mb-4 flex items-center gap-2">
//                   <span className="h-1 w-8 bg-[#FFB347] rounded-full" />
//                   Live Tracker
//                 </DialogTitle>
//                 <h2 className="text-4xl font-black tracking-tighter uppercase leading-none">
//                   {searchResult?.applicant.fname}
//                   <br />
//                   <span className="text-white/40">
//                     {searchResult?.applicant.lname}
//                   </span>
//                 </h2>
//               </div>
//               {/* Status Badge */}/{" "}
//               <div className="flex flex-col items-end gap-2">
//                 <div className="bg-[#FFB347] text-[#021a11] px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-[0_0_20px_rgba(255,179,71,0.3)]">
//                   {searchResult?.current_status}
//                 </div>
//                 <span className="text-[9px] font-bold text-white/20 uppercase tracking-tighter">
//                   Last Sync:{" "}
//                   {new Date().toLocaleTimeString([], {
//                     hour: "2-digit",
//                     minute: "2-digit",
//                   })}
//                 </span>
//               </div>
//             </div>
//           </div>

//           {searchResult && (
//             <div className="px-10 pb-7 pt-4 space-y-10 relative z-10">
//               {/* Main Info Card */}
//               <div className="grid grid-cols-1">
//                 <div className="bg-white/5 border border-white/10 p-5 rounded-3xl backdrop-blur-md">
//                   <label className="text-[13px] font-black uppercase text-[#FFB347] block mb-1">
//                     Position Applied
//                   </label>
//                   <p className="text-[100%] font-bold uppercase truncate">
//                     {searchResult.position.title}
//                   </p>
//                 </div>
//               </div>

//               {/* Timeline Logs Section */}
//               <div className="space-y-6">
//                 <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 flex items-center gap-4">
//                   Application Journey <div className="h-px flex-1 bg-white/5" />
//                 </h4>

//                 <div className="space-y-4">
//                   {/* Timeline Line */}
//                   <div className="relative pl-8 space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-[#FFB347] before:to-white/5">
//                     {/* Latest Log (Special Styling) */}
//                     <div className="relative group">
//                       <div className="absolute -left-[21px] top-1.5 h-[10px] w-[10px] rounded-full bg-[#FFB347] shadow-[0_0_15px_#FFB347] z-20 transition-transform group-hover:scale-125" />

//                       <div className="relative overflow-hidden bg-gradient-to-br from-[#FFB347]/10 via-[#FFB347]/5 to-transparent border border-[#FFB347]/30 p-5 rounded-[1rem] backdrop-blur-xl shadow-2xl transition-all hover:border-[#FFB347]/50">
//                         <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_left,rgba(255,179,71,0.05),transparent)] pointer-events-none" />

//                         <div className="flex justify-between items-start relative z-10">
//                           <div className="space-y-1">
//                             <div className="flex items-center gap-2">
//                               <span className="relative flex h-2 w-2">
//                                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFB347] opacity-75"></span>
//                                 <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FFB347]"></span>
//                               </span>
//                               <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#FFB347]">
//                                 {searchResult.logs?.[0]?.status}
//                               </span>
//                             </div>

//                             <p className="text-[10px] text-white/40 font-medium uppercase tracking-tight">
//                               Current Stage reached
//                             </p>
//                           </div>

//                           {/* Date Badge */}
//                           <div className="bg-white/5 border border-white/10 px-3 h-5 flex items-center justify-center rounded-full backdrop-blur-sm">
//                             <span className="text-[9px] text-white/80 font-black tabular-nums tracking-widest leading-none">
//                               {new Date(
//                                 searchResult.logs?.[0]?.datetime || "",
//                               ).toLocaleDateString(undefined, {
//                                 month: "short",
//                                 day: "numeric",
//                                 year: "numeric",
//                               })}
//                             </span>
//                           </div>
//                         </div>

//                         <div className="absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-[#FFB347]/20 to-transparent" />
//                       </div>
//                     </div>

//                     {/* Previous Logs */}
//                     {searchResult.previous_logs?.map((log) => (
//                       <div
//                         key={log.id}
//                         className="relative opacity-50 hover:opacity-100 transition-opacity"
//                       >
//                         <div className="absolute -left-[21px] top-1.5 h-[8px] w-[8px] rounded-full bg-white/20 border border-[#021a11]" />
//                         <div className="flex justify-between items-center group">
//                           <span className="text-[11px] font-bold uppercase tracking-tight group-hover:text-white transition-colors">
//                             {log.status}
//                           </span>
//                           <span className="text-[10px] text-white tabular-nums">
//                             {new Date(log.datetime).toLocaleDateString()}
//                           </span>
//                         </div>
//                       </div>
//                     ))}

//                     {!searchResult.previous_logs && (
//                       <p className="text-[10px] font-bold text-white/10 uppercase tracking-widest italic pl-2">
//                         No prior history
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               {/* Footer Action */}
//               <button
//                 onClick={() => setIsDialogOpen(false)}
//                 className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] text-white/40 transition-all hover:text-white"
//               >
//                 Close Tracker
//               </button>
//             </div>
//           )}
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }