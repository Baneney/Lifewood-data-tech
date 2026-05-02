// import { Link } from "react-router-dom"
// import { Users, Briefcase, TrendingUp, Clock, ArrowUpRight, CheckCircle, XCircle, Eye } from "lucide-react"
// import { APPLICATIONS, POSITIONS, STATUS_COLORS } from "../data"

// // Derived analytics
// const total       = APPLICATIONS.length
// const newCount    = APPLICATIONS.filter(a => a.status === "New").length
// const shortlisted = APPLICATIONS.filter(a => a.status === "Shortlisted").length
// const interviewed = APPLICATIONS.filter(a => a.status === "Interviewed").length
// const rejected    = APPLICATIONS.filter(a => a.status === "Rejected").length
// const openPos     = POSITIONS.filter(p => p.status === "Open").length

// const deptBreakdown = ["Data Operations", "Technology", "Project Management", "Business Development"].map(d => ({
//   dept: d.replace(" ", "\n"),
//   count: APPLICATIONS.filter(a => a.dept === d).length,
// }))

// const statusBreakdown = [
//   { label: "New",         count: newCount,    color: "bg-blue-400" },
//   { label: "Reviewing",   count: APPLICATIONS.filter(a => a.status === "Reviewing").length, color: "bg-yellow-400" },
//   { label: "Shortlisted", count: shortlisted, color: "bg-emerald-400" },
//   { label: "Interviewed", count: interviewed, color: "bg-purple-400" },
//   { label: "Rejected",    count: rejected,    color: "bg-red-400" },
// ]

// function StatCard({ label, value, sub, icon: Icon, accent }: { label: string; value: string | number; sub: string; icon: React.ElementType; accent: string }) {
//   return (
//     <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
//       <div className="flex items-start justify-between mb-4">
//         <div className={`w-10 h-10 ${accent} rounded-xl flex items-center justify-center`}>
//           <Icon size={18} className="text-white" />
//         </div>
//         <TrendingUp size={13} className="text-emerald-400 mt-1" />
//       </div>
//       <div className="text-3xl font-black text-gray-900">{value}</div>
//       <div className="text-sm text-gray-500 mt-0.5">{label}</div>
//       <div className="text-xs text-emerald-500 font-semibold mt-2">{sub}</div>
//     </div>
//   )
// }

// export default function Overview() {
//   const maxDept = Math.max(...deptBreakdown.map(d => d.count))

//   return (
//     <div className="space-y-6 max-w-7xl mx-auto p-5">

//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-xl font-black text-gray-900">Dashboard Overview</h1>
//           <p className="text-sm text-gray-400 mt-0.5">Welcome back — here's what's happening today.</p>
//         </div>
//         <span className="text-xs text-gray-400 bg-white border border-gray-100 px-3 py-1.5 rounded-full shadow-sm">
//           {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
//         </span>
//       </div>

//       {/* Stat cards */}
//       <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
//         <StatCard label="Total Applications" value={total}     sub={`${newCount} new today`}       icon={Users}     accent="bg-[#034E34]" />
//         <StatCard label="Shortlisted"         value={shortlisted} sub="Ready for interview"         icon={CheckCircle} accent="bg-emerald-500" />
//         <StatCard label="Open Positions"      value={openPos}  sub={`${POSITIONS.length} total`}   icon={Briefcase} accent="bg-[#FFB347]" />
//         <StatCard label="Interviewed"         value={interviewed} sub={`${rejected} rejected`}     icon={Clock}     accent="bg-purple-500" />
//       </div>

//       <div className="grid lg:grid-cols-3 gap-5">

//         {/* Application status breakdown */}
//         <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
//           <h2 className="font-black text-gray-900 mb-5 text-sm">Application Pipeline</h2>
//           <div className="space-y-3">
//             {statusBreakdown.map(s => (
//               <div key={s.label}>
//                 <div className="flex justify-between text-xs mb-1">
//                   <span className="text-gray-500 font-medium">{s.label}</span>
//                   <span className="font-black text-gray-900">{s.count}</span>
//                 </div>
//                 <div className="w-full bg-gray-100 rounded-full h-2">
//                   <div
//                     className={`h-2 rounded-full ${s.color} transition-all`}
//                     style={{ width: `${(s.count / total) * 100}%` }}
//                   />
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div className="mt-5 pt-4 border-t border-gray-50 flex justify-between text-xs text-gray-400">
//             <span>{total} total</span>
//             <span>{Math.round((shortlisted / total) * 100)}% shortlist rate</span>
//           </div>
//         </div>

//         {/* Applications by dept */}
//         <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
//           <h2 className="font-black text-gray-900 mb-5 text-sm">By Department</h2>
//           <div className="space-y-3">
//             {deptBreakdown.map(d => (
//               <div key={d.dept} className="flex items-center gap-3">
//                 <span className="text-xs text-gray-500 w-32 shrink-0 leading-tight">{d.dept.replace("\n", " ")}</span>
//                 <div className="flex-1 bg-gray-100 rounded-full h-2">
//                   <div
//                     className="h-2 rounded-full bg-[#034E34] transition-all"
//                     style={{ width: `${(d.count / maxDept) * 100}%` }}
//                   />
//                 </div>
//                 <span className="text-xs font-black text-gray-900 w-4 text-right">{d.count}</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Open positions summary */}
//         <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
//           <div className="flex items-center justify-between mb-5">
//             <h2 className="font-black text-gray-900 text-sm">Open Positions</h2>
//             <Link to="/admin/positions" className="text-xs text-[#034E34] font-bold flex items-center gap-1 hover:gap-2 transition-all">
//               Manage <ArrowUpRight size={11} />
//             </Link>
//           </div>
//           <div className="space-y-2">
//             {POSITIONS.filter(p => p.status === "Open").slice(0, 5).map(p => (
//               <div key={p.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
//                 <div>
//                   <p className="text-sm font-semibold text-gray-900 leading-tight">{p.title}</p>
//                   <p className="text-xs text-gray-400">{p.dept}</p>
//                 </div>
//                 <div className="text-right">
//                   <p className="text-sm font-black text-[#034E34]">{p.applicants}</p>
//                   <p className="text-[10px] text-gray-300">applicants</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Recent applications */}
//       <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
//         <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
//           <h2 className="font-black text-gray-900 text-sm">Recent Applications</h2>
//           <Link to="/admin/applications" className="text-xs text-[#034E34] font-bold flex items-center gap-1 hover:gap-2 transition-all">
//             View all <ArrowUpRight size={11} />
//           </Link>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="w-full text-sm">
//             <thead>
//               <tr className="border-b border-gray-50 text-left bg-gray-50/50">
//                 <th className="px-5 py-3 text-[10px] font-black text-gray-400 uppercase tracking-widest">Applicant</th>
//                 <th className="px-5 py-3 text-[10px] font-black text-gray-400 uppercase tracking-widest hidden md:table-cell">Role</th>
//                 <th className="px-5 py-3 text-[10px] font-black text-gray-400 uppercase tracking-widest hidden lg:table-cell">Date</th>
//                 <th className="px-5 py-3 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
//                 <th className="px-5 py-3 text-[10px] font-black text-gray-400 uppercase tracking-widest"></th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-50">
//               {APPLICATIONS.slice(0, 6).map(a => (
//                 <tr key={a.id} className="hover:bg-gray-50/50 transition-colors">
//                   <td className="px-5 py-3.5">
//                     <div className="flex items-center gap-3">
//                       <div className="w-8 h-8 rounded-full bg-[#034E34]/10 flex items-center justify-center text-[#034E34] text-[10px] font-black shrink-0">
//                         {a.name.split(" ").map(n => n[0]).join("")}
//                       </div>
//                       <div>
//                         <p className="font-semibold text-gray-900 leading-tight">{a.name}</p>
//                         <p className="text-xs text-gray-400">{a.email}</p>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-5 py-3.5 text-gray-500 hidden md:table-cell">{a.role}</td>
//                   <td className="px-5 py-3.5 text-gray-400 text-xs hidden lg:table-cell">{a.date}</td>
//                   <td className="px-5 py-3.5">
//                     <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${STATUS_COLORS[a.status]}`}>
//                       {a.status}
//                     </span>
//                   </td>
//                   <td className="px-5 py-3.5">
//                     <Link to="/admin/applications" className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-300 hover:text-gray-600 transition-colors inline-flex">
//                       <Eye size={14} />
//                     </Link>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//     </div>
//   )
// }

// import { Link } from "react-router-dom";
// import {
//   Users,
//   Briefcase,
//   TrendingUp,
//   Clock,
//   ArrowUpRight,
//   CheckCircle,
//   Calendar,
//   User,
//   ChevronRight,
// } from "lucide-react";
// import { Bar, BarChart, XAxis, YAxis, CartesianGrid } from "recharts";
// import {
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "@/components/ui/chart"; // Adjust path as needed
// import { APPLICATIONS, POSITIONS } from "../data";
// import { type ChartConfig } from "@/components/ui/chart";

// //API IMPORTS
// import { useRecentApplications, type RecentApplicationType } from "../api/overview/overviewFetchAPI";

// // --- Analytics Logic ---
// const total = APPLICATIONS.length;
// const newCount = APPLICATIONS.filter((a) => a.status === "New").length;
// const shortlisted = APPLICATIONS.filter(
//   (a) => a.status === "Shortlisted",
// ).length;
// const interviewed = APPLICATIONS.filter(
//   (a) => a.status === "Interviewed",
// ).length;
// const rejected = APPLICATIONS.filter((a) => a.status === "Rejected").length;
// const openPos = POSITIONS.filter((p) => p.status === "Open").length;

// const deptChartData = [
//   "Data Operations",
//   "Technology",
//   "Project Management",
//   "Business Development",
// ].map((d) => ({
//   dept: d,
//   count: APPLICATIONS.filter((a) => a.dept === d).length,
// }));

// const chartConfig = {
//   count: {
//     label: "Applications",
//     color: "#034E34",
//   },
// } satisfies ChartConfig;

// // --- Sub-Components ---

// function StatCard({
//   label,
//   value,
//   sub,
//   icon: Icon,
//   accent,
// }: {
//   label: string;
//   value: string | number;
//   sub: string;
//   icon: React.ElementType;
//   accent: string;
// }) {
//   return (
//     <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
//       <div className="flex items-start justify-between mb-4">
//         <div
//           className={`w-10 h-10 ${accent} rounded-xl flex items-center justify-center`}
//         >
//           <Icon size={18} className="text-white" />
//         </div>
//         <TrendingUp size={13} className="text-emerald-400 mt-1" />
//       </div>
//       <div className="text-3xl font-black text-gray-900">{value}</div>
//       <div className="text-sm text-gray-500 mt-0.5">{label}</div>
//       <div className="text-xs text-emerald-500 font-semibold mt-2">{sub}</div>
//     </div>
//   );
// }

// export default function Overview() {
//   //Recent Applications
//   const { applications, isLoading } = useRecentApplications();

//   // Basic Loading State
//   if (isLoading)
//     return (
//       <div className="p-10 text-center font-bold text-gray-400">
//         Loading Pipeline...
//       </div>
//     );

//     // --- Updated Dynamic Analytics Logic ---
//     const total = applications.length;

//     // Using lowercase comparison to match your status mapping keys
//     const pendingCount = applications.filter(
//       (a) => a.current_status?.toLowerCase() === "pending",
//     ).length;

//     const shortlistedCount = applications.filter(
//       (a) => a.current_status?.toLowerCase() === "shortlisted",
//     ).length;

//     const hiredCount = applications.filter(
//       (a) => a.current_status?.toLowerCase() === "hired",
//     ).length;

//     const declinedCount = applications.filter((a) =>
//       ["declined", "not selected", "withdraw"].includes(
//         a.current_status?.toLowerCase() || "",
//       ),
//     ).length;

//   return (
//     <div className="space-y-6 max-w-7xl mx-auto p-5 pb-10">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-xl font-black text-gray-900">
//             Dashboard Overview
//           </h1>
//           <p className="text-sm text-gray-400 mt-0.5">
//             Welcome back — here's your talent pipeline at a glance.
//           </p>
//         </div>
//         <div className="hidden md:flex items-center gap-2 text-xs text-gray-400 bg-white border border-gray-100 px-4 py-2 rounded-xl shadow-sm">
//           <Calendar size={14} className="text-[#034E34]" />
//           {new Date().toLocaleDateString("en-US", {
//             weekday: "long",
//             month: "long",
//             day: "numeric",
//           })}
//         </div>
//       </div>

//       {/* Top Stats */}
//       <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
//         <StatCard
//           label="Total Applications"
//           value={total}
//           sub={`${newCount} new today`}
//           icon={Users}
//           accent="bg-[#034E34]"
//         />
//         <StatCard
//           label="Shortlisted"
//           value={shortlistedCount}
//           sub="Ready for interview"
//           icon={CheckCircle}
//           accent="bg-emerald-500"
//         />
//         <StatCard
//           label="Open Positions"
//           value={openPos}
//           sub={`${POSITIONS.length} total`}
//           icon={Briefcase}
//           accent="bg-[#FFB347]"
//         />
//         <StatCard
//           label="Interviewed"
//           value={interviewed}
//           sub={`${rejected} rejected`}
//           icon={Clock}
//           accent="bg-purple-500"
//         />
//       </div>

//       <div className="grid lg:grid-cols-3 gap-6">
//         {/* Department Visualization (Using your Chart Component) */}
//         <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
//           <h2 className="font-black text-gray-900 mb-6 text-sm flex items-center gap-2">
//             Applications by Department
//           </h2>
//           <ChartContainer config={chartConfig} className="min-h-[250px] w-full">
//             <BarChart
//               data={deptChartData}
//               layout="vertical"
//               margin={{ left: 20 }}
//             >
//               <CartesianGrid
//                 horizontal={false}
//                 strokeDasharray="3 3"
//                 stroke="#f0f0f0"
//               />
//               <XAxis type="number" hide />
//               <YAxis
//                 dataKey="dept"
//                 type="category"
//                 tickLine={false}
//                 axisLine={false}
//                 width={120}
//                 className="text-[10px] font-medium"
//               />
//               <ChartTooltip content={<ChartTooltipContent />} />
//               <Bar
//                 dataKey="count"
//                 fill="var(--color-count)"
//                 radius={[0, 4, 4, 0]}
//                 barSize={24}
//               />
//             </BarChart>
//           </ChartContainer>
//         </div>

//         {/* Open Positions Card List */}
//         <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="font-black text-gray-900 text-sm">
//               Active Openings
//             </h2>
//             <Link
//               to="/admin/positions"
//               className="text-xs text-[#034E34] font-bold flex items-center gap-1"
//             >
//               All <ArrowUpRight size={12} />
//             </Link>
//           </div>
//           <div className="space-y-4">
//             {POSITIONS.filter((p) => p.status === "Open")
//               .slice(0, 4)
//               .map((p) => (
//                 <div
//                   key={p.id}
//                   className="group p-3 rounded-xl border border-transparent hover:border-gray-100 hover:bg-gray-50/50 transition-all cursor-pointer"
//                 >
//                   <div className="flex items-center justify-between">
//                     <div className="space-y-1">
//                       <p className="text-sm font-bold text-gray-900">
//                         {p.title}
//                       </p>
//                       <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
//                         {p.dept}
//                       </p>
//                     </div>
//                     <div className="bg-[#034E34]/5 px-3 py-1 rounded-lg">
//                       <span className="text-xs font-black text-[#034E34]">
//                         {p.applicants}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//           </div>
//         </div>
//       </div>

//       {/* Recent Applications (Wider Card List Layout) */}
//       {/* Recent Activity - NOW DYNAMIC */}
//       <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
//         <div className="flex items-center justify-between mb-6">
//           <h2 className="font-black text-gray-900 text-sm">
//             Recent Applications
//           </h2>
//           <Link
//             to="/admin/applications"
//             className="text-xs text-[#034E34] font-bold flex items-center gap-1"
//           >
//             View All <ArrowUpRight size={12} />
//           </Link>
//         </div>

//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {applications.slice(0, 6).map((app) => {
//             // Check potential from the first log entry
//             const isPotential = app.logs?.[0]?.potential;

//             return (
//               <div
//                 key={app.id}
//                 className="flex flex-col justify-between shadow-sm p-5 rounded-2xl border border-gray-100 bg-white hover:border-[#FFB347]/40 hover:shadow-xl hover:shadow-orange-100/20 transition-all group relative"
//               >
//                 {/* Dynamic Strong Match Label */}
//                 {isPotential && (
//                   <div className="absolute top-0 right-0 animate-in fade-in zoom-in duration-300">
//                     <div className="bg-[#FFB347] text-white text-[9px] font-black px-3 py-1 rounded-bl-xl uppercase tracking-widest shadow-sm">
//                       Strong Match
//                     </div>
//                   </div>
//                 )}

//                 <div className="flex items-start gap-4 mb-5">
//                   <div className="relative">
//                     <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-[#034E34] group-hover:bg-[#034E34] group-hover:text-white transition-all duration-300 font-black text-sm border border-gray-100 shadow-inner">
//                       {app.applicant.fname[0]}
//                       {app.applicant.lname[0]}
//                     </div>
//                     {/* Indicator turns Amber if isPotential is true */}
//                     <div
//                       className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
//                         isPotential ? "bg-[#FFB347]" : "bg-emerald-400"
//                       }`}
//                     />
//                   </div>

//                   <div className="space-y-0.5">
//                     <h3 className="text-sm font-black text-gray-900 group-hover:text-[#034E34] transition-colors line-clamp-1">
//                       {app.applicant.fname} {app.applicant.lname}
//                     </h3>
//                     <p className="text-[11px] font-bold text-[#034E34]/60 uppercase tracking-tighter">
//                       {app.position.title}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex items-center justify-between pt-4 border-t border-dashed border-gray-100">
//                   <div className="flex flex-col">
//                     <span className="text-[10px] text-gray-400 font-bold uppercase">
//                       Applied On
//                     </span>
//                     <div className="flex items-center gap-1.5 mt-0.5">
//                       <Calendar size={12} className="text-[#FFB347]" />
//                       <span className="text-xs font-black text-gray-700">
//                         {new Date(app.date_submitted).toLocaleDateString()}
//                       </span>
//                     </div>
//                   </div>

//                   <Link
//                     to={`/admin/applications`}
//                     className={`px-3 py-1.5 rounded-lg text-[10px] font-black transition-all ${
//                       isPotential
//                         ? "bg-[#FFB347] text-white shadow-md shadow-orange-200"
//                         : "bg-gray-100 text-gray-500 hover:bg-[#034E34] hover:text-white"
//                     }`}
//                   >
//                     VIEW PROFILE
//                   </Link>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }



import { Link } from "react-router-dom";
import {
  Users,
  Briefcase,
  TrendingUp,
  Clock,
  ArrowUpRight,
  CheckCircle,
  Calendar,
  Search,
  ChevronRight,
} from "lucide-react";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"; // Adjust path as needed
import { type ChartConfig } from "@/components/ui/chart";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Cell
} from "recharts";

//API IMPORTS
import {
  useRecentApplications,
  type RecentApplicationType,
} from "../api/overview/overviewFetchAPI";



const chartConfig = {
  count: {
    label: "Applications",
    color: "#034E34",
  },
} satisfies ChartConfig;


function StatCard({
  label,
  value,
  sub,
  icon: Icon,
  accent, // We will now use this for the icon color/glow
}: {
  label: string;
  value: string | number;
  sub: string;
  icon: React.ElementType;
  accent: string;
}) {
  return (
    <div className="group relative bg-white rounded-[2.5rem] border border-gray-100 p-7 shadow-sm hover:shadow-2xl hover:shadow-[#034E34]/10 hover:-translate-y-2 transition-all duration-500 overflow-hidden cursor-default">
      {/* 1. Animated Hover Pattern */}
      <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-gray-50 rounded-full group-hover:scale-[3] group-hover:bg-[#FFB347]/5 transition-all duration-700 opacity-50" />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-8">
          {/* 2. Themed Icon Box */}
          <div className="relative">
            <div
              className={`w-14 h-14 bg-[#034E34] rounded-2xl flex items-center justify-center shadow-lg shadow-[#034E34]/20 group-hover:rotate-[10deg] transition-transform duration-300`}
            >
              <Icon size={24} className="text-[#FFB347]" />
            </div>
            {/* Soft Glow behind icon on hover */}
            <div className="absolute inset-0 bg-[#FFB347] blur-xl opacity-0 group-hover:opacity-30 transition-opacity" />
          </div>

          {/* 3. Refined "Live" Badge */}
          <div className="flex items-center gap-1.5 bg-[#034E34]/5 px-3 py-1 rounded-full border border-[#034E34]/10">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#034E34] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#034E34]"></span>
            </span>
            <span className="text-[9px] font-black text-[#034E34] uppercase tracking-widest">
              Live
            </span>
          </div>
        </div>

        <div>
          <div className="flex items-baseline gap-1">
            <span className="text-5xl font-black text-gray-900 tracking-tighter italic group-hover:text-[#034E34] transition-colors">
              {value}
            </span>
            {/* Visual Flair: Little decorative dot */}
            <span className="w-2 h-2 rounded-full bg-[#FFB347]" />
          </div>

          <div className="text-[11px] font-black text-gray-400 uppercase tracking-[0.15em] mt-2 mb-4">
            {label}
          </div>

          {/* 4. Subtext with a progress-style line */}
          <div className="flex flex-col gap-2">
            <div className="h-[2px] w-8 bg-[#FFB347] group-hover:w-full transition-all duration-500 rounded-full" />
            <div className="text-[10px] text-[#034E34]/60 font-bold uppercase tracking-tight italic">
              {sub}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



// Custom Tooltip for the Chart
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/90 backdrop-blur-md border border-gray-100 p-4 rounded-2xl shadow-xl">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Position</p>
        <p className="text-sm font-black text-[#034E34] mb-2">{payload[0].payload.name}</p>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#FFB347]" />
          <p className="text-xs font-bold text-gray-600">
            {payload[0].value} Applications
          </p>
        </div>
      </div>
    );
  }
  return null;
};




export default function Overview() {
  //Recent Applications
  const { applications, isLoading } = useRecentApplications();

  // Basic Loading State
  if (isLoading)
    return (
      <div className="p-10 text-center font-bold text-gray-400">
        Loading Pipeline...
      </div>
    );

  //========================== CARDS ON TOP ==============================
  // 1. High Potential Pipeline
  const highPotentialCount = applications.filter(
    (a) => a.logs?.[0]?.potential === true,
  ).length;

  // 2. Time-Sensitive "Pending" (> 48 Hours)
  const fortyEightHoursAgo = new Date();
  fortyEightHoursAgo.setHours(fortyEightHoursAgo.getHours() - 48);

  const urgentPendingCount = applications.filter((a) => {
    const isPending = a.current_status?.toLowerCase() === "pending";
    const isOld = new Date(a.date_submitted) < fortyEightHoursAgo;
    return isPending && isOld;
  }).length;

  // 3. Recent Activity "Sprints" (Updates in last 24h)
  const twentyFourHoursAgo = new Date();
  twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);

  const recentSprintsCount = applications.filter((a) => {
    const lastUpdate = a.logs?.[0]?.datetime;
    return lastUpdate && new Date(lastUpdate) > twentyFourHoursAgo;
  }).length;

  // 4. Total Active Pipeline (Excluding Hired/Rejected/Withdrawn)
  const activePipelineCount = applications.filter(
    (a) =>
      !["hired", "not selected", "declined", "withdraw"].includes(
        a.current_status?.toLowerCase() || "",
      ),
  ).length;

  // ============================ IDK WHAT TO CALL =========================================
  const getChartData = (apps: RecentApplicationType[]) => {
    const counts: Record<string, number> = {};
    apps.forEach((app) => {
      const title = app.position.title;
      counts[title] = (counts[title] || 0) + 1;
    });
    return Object.entries(counts).map(([name, count]) => ({ name, count }));
  };

  const chartData = getChartData(applications);

  //========================== RECENT APPLICATION =======================================

  // --- Prioritized Applications Logic ---
  const priorityApplications = applications
    .filter((app) => {
      const status = app.current_status?.toLowerCase();
      const isPotential = app.logs?.[0]?.potential === true;

      const isPending = status === "pending";
      const isShortlisted = status === "shortlisted";
      const isShortlistedPotential = status === "shortlisted" && isPotential;

      return isPending || isShortlisted || isShortlistedPotential;
    })
    .sort(
      (a, b) =>
        new Date(b.date_submitted).getTime() -
        new Date(a.date_submitted).getTime(),
    )
    .slice(0, 6);

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12 bg-gray-50/30 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="pb-8">
          <h1 className="text-4xl font-bold text-[#046241] tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage and track job applications across positions
          </p>
        </div>
        <div className="flex items-center gap-3 bg-white px-5 py-2.5 rounded-2xl shadow-sm border border-gray-100">
          <Calendar size={18} className="text-[#FFB347]" />
          <span className="text-sm font-black text-gray-700">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
      </div>

      {/* 1. Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard
          label="Priority Matches"
          value={highPotentialCount}
          sub="High potential flagged"
          icon={CheckCircle}
          accent="#FFB347"
        />
        <StatCard
          label="Active Pipeline"
          value={activePipelineCount}
          sub="Candidates moving"
          icon={Users}
          accent="#FFB347"
        />
        <StatCard
          label="Needs Review"
          value={urgentPendingCount}
          sub="Exceeds 48h limit"
          icon={Clock}
          accent="#FFB347"
        />
        <StatCard
          label="Recent Sprints"
          value={recentSprintsCount}
          sub="Updated last 24h"
          icon={TrendingUp}
          accent="#FFB347"
        />
      </div>

      {/* 2. Middle Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm relative overflow-hidden flex flex-col">
          {/* Header Section */}
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
              <div className="w-1.5 h-10 bg-[#034E34] rounded-full" />
              <div>
                <h3 className="text-xl font-black text-gray-900 tracking-tight">
                  Demand by Role
                </h3>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-1">
                  Position Performance Ranking
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#034E34] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#034E34]"></span>
              </span>
              <span className="text-[9px] font-black text-[#034E34] uppercase tracking-tighter">
                Live Market Data
              </span>
            </div>
          </div>

          {/* Scrollable Horizontal Bar Area */}
          <div
            className="flex-1 overflow-y-auto pr-4 custom-scrollbar"
            style={{ maxHeight: "400px" }}
          >
            <div className="space-y-6">
              {chartData
                .sort((a, b) => b.count - a.count)
                .map((role, index) => (
                  <div key={role.name} className="group cursor-default">
                    <div className="flex justify-between items-end mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-black text-gray-300 group-hover:text-[#FFB347] transition-colors">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <h4 className="text-xs font-black text-gray-700 uppercase tracking-tight group-hover:text-[#034E34] transition-colors">
                          {role.name}
                        </h4>
                      </div>
                      <span className="text-xs font-black text-[#034E34] bg-emerald-50 px-2 py-0.5 rounded-md">
                        {role.count}{" "}
                        <span className="text-[9px] text-[#034E34]/50">
                          APPS
                        </span>
                      </span>
                    </div>

                    {/* Custom Progress Bar */}
                    <div className="h-3 w-full bg-gray-50 rounded-full overflow-hidden border border-gray-100 relative">
                      <div
                        className="h-full bg-gradient-to-r from-[#034E34] to-[#046342] rounded-full transition-all duration-1000 ease-out relative"
                        style={{
                          width: `${(role.count / Math.max(...chartData.map((d) => d.count))) * 100}%`,
                        }}
                      >
                        {/* Shine effect on the bar */}
                        <div className="absolute inset-0 bg-white/10 w-full h-[1px] top-0" />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="bg-[#034E34] p-8 rounded-[2rem] shadow-2xl relative overflow-hidden flex flex-col justify-between group min-h-[400px]">
          {/* Moving Background Glow */}
          <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl group-hover:bg-[#FFB347]/20 transition-all duration-1000 group-hover:scale-150" />

          <div className="relative">
            <div className="flex justify-between items-start mb-8">
              <h3 className="text-white/60 text-xs font-black uppercase tracking-[0.2em]">
                Pipeline Health
              </h3>
              {/* Live "Ping" Indicator */}
              <div className="flex items-center gap-2 bg-black/20 px-3 py-1 rounded-full border border-white/5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFB347] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FFB347]"></span>
                </span>
                <span className="text-[9px] font-black text-[#FFB347] uppercase tracking-widest">
                  Live Pulse
                </span>
              </div>
            </div>

            <div className="space-y-12">
              <div>
                <div className="flex items-baseline gap-1">
                  <p className="text-6xl font-black text-white tracking-tighter italic leading-none">
                    {(
                      (highPotentialCount / (activePipelineCount || 1)) *
                      100
                    ).toFixed(0)}
                  </p>
                  <span className="text-2xl font-black text-[#FFB347] italic">
                    %
                  </span>
                </div>
                <p className="text-emerald-300/80 text-xs font-bold uppercase mt-3 flex items-center gap-2">
                  Conversion Potential
                  <span className="h-px w-8 bg-emerald-500/30" />
                  <span className="text-[10px] italic font-light text-white/40">
                    (Fit Candidates)
                  </span>
                </p>
              </div>

              <div className="pt-8 border-t border-white/5">
                <p className="text-3xl font-black text-white italic leading-none">
                  {activePipelineCount}
                </p>
                <p className="text-emerald-300/80 text-xs font-bold uppercase mt-2">
                  Total Active Candidates
                </p>
              </div>
            </div>
          </div>

          {/* Creative Replacement for Button: The "Intelligence Scanner" */}
          <div className="relative mt-8 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md overflow-hidden group/scanner cursor-pointer">
            <div className="relative z-10 flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-[10px] font-black text-white/90 uppercase tracking-widest">
                  Pipeline Analytics
                </p>
                <p className="text-[9px] text-emerald-300/60 font-medium">
                  Filtering high-potential clusters...
                </p>
              </div>
              <div className="h-8 w-8 rounded-lg bg-[#FFB347] flex items-center justify-center text-[#034E34] shadow-lg shadow-[#FFB347]/20">
                <Search size={16} strokeWidth={3} />
              </div>
            </div>

            {/* Animated Scanning Line */}
            <div className="absolute inset-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#FFB347]/40 to-transparent top-0 animate-scan" />
          </div>
        </div>
      </div>

      {/* 3. Priority List */}
      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            {/* Visual Accent Block */}
            <div className="w-1.5 h-10 bg-[#034E34] rounded-full hidden sm:block" />

            <div>
              <h3 className="text-xl font-black text-gray-900 tracking-tight leading-none">
                Active Talent Distribution
              </h3>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-1.5 flex items-center gap-2">
                <span className="w-1 h-1 bg-[#FFB347] rounded-full" />
                Current Workload per Position
              </p>
            </div>
          </div>

          <Link
            to="/admin/applications"
            className="group flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-[#034E34]/5 text-[#034E34] rounded-xl transition-all duration-300"
          >
            <span className="text-xs font-black uppercase tracking-wider">
              View All
            </span>
            <div className="bg-[#034E34] text-white p-1 rounded-lg group-hover:rotate-45 transition-transform duration-300">
              <ArrowUpRight size={14} />
            </div>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {priorityApplications.map((app) => {
            const isPotential = app.logs?.[0]?.potential;

            const status = app.current_status?.toLowerCase();

            return (
              <div
                key={app.id}
                className={`group relative flex flex-col justify-between p-6 rounded-[2rem] border transition-all duration-500 overflow-hidden
                ${
                  isPotential
                    ? "bg-white border-[#FFB347]/40 shadow-xl shadow-orange-100/20"
                    : "bg-gray-50/30 border-gray-200 hover:bg-white hover:border-[#034E34]/30 hover:shadow-2xl hover:shadow-emerald-900/5"
                }`}
              >
                {/* Refined Banner: Smaller height, tighter text */}
                {isPotential && (
                  <div className="absolute top-0 right-0">
                    <div className="bg-[#FFB347] text-white text-[8px] font-black px-4 py-1.5 rounded-bl-xl uppercase tracking-[0.1em] shadow-sm flex items-center gap-1.5">
                      <span className="w-1 h-1 bg-white rounded-full animate-pulse" />
                      Strong Match
                    </div>
                  </div>
                )}

                {/* Header: pr-14 gives enough space for the smaller banner */}
                <div className="flex items-center gap-4 mb-6 pr-14">
                  <div className="relative shrink-0">
                    <div className="w-12 h-12 rounded-2xl bg-[#034E34] flex items-center justify-center text-[#FFB347] font-black text-sm shadow-md group-hover:scale-110 transition-transform duration-300">
                      {app.applicant.fname[0]}
                      {app.applicant.lname[0]}
                    </div>
                    <div
                      className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-white shadow-sm ${
                        isPotential ? "bg-[#FFB347]" : "bg-emerald-400"
                      }`}
                    />
                  </div>

                  <div className="space-y-0.5 min-w-0">
                    <h3 className="text-sm font-black text-gray-900 group-hover:text-[#034E34] transition-colors leading-tight truncate">
                      {app.applicant.fname} {app.applicant.lname}
                    </h3>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide truncate mb-1">
                      {app.position.title}
                    </p>
                    <div
                      className={`inline-block text-[7px] px-2 py-0.5 rounded-md font-black uppercase tracking-wider ${
                        status === "shortlisted"
                          ? "bg-emerald-100 text-[#034E34]"
                          : "bg-gray-200/50 text-gray-500"
                      }`}
                    >
                      {app.current_status}
                    </div>
                  </div>
                </div>

                {/* Footer: Uses a solid line instead of dashed for a "sturdier" look */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="space-y-0.5">
                    <span className="text-[8px] text-gray-400 font-black uppercase tracking-widest">
                      Applied On
                    </span>
                    <div className="flex items-center gap-1.5">
                      <Calendar size={11} className="text-[#FFB347]" />
                      <span className="text-[11px] font-bold text-gray-700">
                        {new Date(app.date_submitted).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <Link
                    to={`/admin/applications`}
                    className={`px-4 py-2 rounded-xl text-[9px] font-black transition-all duration-300 uppercase tracking-widest ${
                      isPotential
                        ? "bg-[#FFB347] text-white shadow-md shadow-orange-200 hover:brightness-105"
                        : "bg-gray-100 text-gray-500 hover:bg-[#034E34] hover:text-white"
                    }`}
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}