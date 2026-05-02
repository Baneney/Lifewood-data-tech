// import { type ColumnDef } from "@tanstack/react-table";
// import { useState  } from "react";
// import { toast } from "sonner"

// // UI Components
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { DataTable } from "@/components/ui/table/data-table";
// import { Badge } from "@/components/ui/badge";
// import { DetailsDrawer } from "@/components/ui/drawer";
// import { ConfirmModal } from "@/components/ui/confirmation-modal";

// //helper
// import { capitalize } from "@/helpers/capitalize";
// import { useAdmin } from "@/hooks/use-admin";

// //POST
// import { usePostLogs } from "../api/logs/logPostAPI";
// //FETCH
// import { useApplications, type ApplicationDataType } from "../api/application/ApplicationFetchAPI";

// //icons
// import {
//   FileText,
//   ExternalLink,
//   Mail,
//   Phone,
//   Briefcase,
//   Calendar,
//   UserRound,
// } from "lucide-react";

// const getColumns = (onStatusChange: (appId: string, status: string) => void): ColumnDef<ApplicationDataType>[] => [
//   {
//     accessorKey: "applicant.fname",
//     header: "Applicant Name",
//     cell: ({ row }) => {
//       const { fname, lname } = row.original.applicant;
//       return <span className="font-semibold">{`${fname} ${lname}`}</span>;
//     },
//   },
//   {
//     accessorKey: "position.title",
//     header: "Role",
//   },
//   {
//     accessorKey: "date_submitted",
//     header: "Date Applied",
//     cell: ({ row }) => new Date(row.getValue("date_submitted")).toLocaleDateString(),
//   },
//   {
//     accessorKey: "current_status",
//     header: "Status",
//     cell: ({ row }) => (
//       <Badge variant="secondary" className="capitalize font-normal border-green-100 bg-green-50 text-green-700">
//         {row.original.current_status}
//       </Badge>
//     ),
//   },
//   {
//     id: "action",
//     header: "Action",
//     cell: ({ row }) => {
//       const app = row.original;

//       return (
//         <DetailsDrawer
//           title="Application Review"
//           description="Detailed profile and application history."
//         >
//           {/* Appealing UI Content inside the Drawer */}
//           <div className="space-y-8">
//             {/* Status Section */}
//             <section className="bg-green-50 p-4 rounded-xl border border-green-100/50">
//               <h4 className=" font-bold capitalize text-green-600/80 mb-3">
//                 Current Status
//               </h4>
//               <div className="flex items-center justify-between">
//                 <Select
//                   defaultValue={app.current_status}
//                   onValueChange={(value) => onStatusChange(app.id, value)}
//                 >
//                   <SelectTrigger className="h-9 w-auto gap-3 px-3 border-green-200 bg-white hover:bg-green-100/50 hover:border-green-300 transition-all rounded-lg shadow-sm">
//                     <div className="flex items-center gap-2">
//                       <SelectValue className="text-sm font-bold text-slate-700 capitalize" />
//                     </div>
//                   </SelectTrigger>

//                   <SelectContent className="rounded-xl border-slate-200 shadow-xl">
//                     {/* You can also add the dots inside the dropdown items for extra polish */}
//                     <SelectItem
//                       value="pending"
//                       className="py-2.5 focus:bg-yellow-50 focus:text-yellow-700 cursor-pointer"
//                     >
//                       <div className="flex items-center gap-2">
//                         <div className="h-2 w-2 rounded-full bg-yellow-500 animate-pulse" />{" "}
//                         Pending
//                       </div>
//                     </SelectItem>
//                     <SelectItem
//                       value="shortlisted"
//                       className="py-2.5 focus:bg-blue-50 focus:text-blue-700 cursor-pointer"
//                     >
//                       <div className="flex items-center gap-2">
//                         <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />{" "}
//                         Shortlisted
//                       </div>
//                     </SelectItem>
//                     <SelectItem
//                       value="hired"
//                       className="py-2.5 focus:bg-green-50 focus:text-green-700 cursor-pointer"
//                     >
//                       <div className="flex items-center gap-2">
//                         <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />{" "}
//                         Hired
//                       </div>
//                     </SelectItem>
//                     <SelectItem
//                       value="not selected"
//                       className="py-2.5 focus:bg-rose-50 focus:text-rose-700 cursor-pointer"
//                     >
//                       <div className="flex items-center gap-2">
//                         <div className="h-2 w-2 rounded-full bg-rose-700 animate-pulse" />
//                         Not Selected
//                       </div>
//                     </SelectItem>
//                     <SelectItem
//                       value="declined"
//                       className="py-2.5 focus:bg-red-50 focus:text-red-700 cursor-pointer"
//                     >
//                       <div className="flex items-center gap-2">
//                         <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
//                         Declined
//                       </div>
//                     </SelectItem>
//                     <SelectItem
//                       value="withdraw"
//                       className="py-2.5 focus:bg-slate-50 focus:text-slate-700 cursor-pointer"
//                     >
//                       <div className="flex items-center gap-2">
//                         <div className="h-2 w-2 rounded-full bg-slate-500 animate-pulse" />{" "}
//                         Withdraw
//                       </div>
//                     </SelectItem>
//                   </SelectContent>
//                 </Select>

//                 <Badge className="bg-[#417256] hover:bg-[#417256] px-3 py-1 text-[10px] uppercase tracking-tighter">
//                   Active
//                 </Badge>
//               </div>
//             </section>

//             {/* Applicant Details */}
//             <section className="space-y-4 pb-3">
//               <h4 className="text-[12px] font-bold uppercase tracking-widest text-slate-800">
//                 Personal Information
//               </h4>
//               <div className="grid gap-3">
//                 <div className="flex items-center gap-3 text-sm">
//                   <UserRound className="h-4 w-4 text-slate-400" />
//                   <span className="text-slate-600">{`${capitalize(app.applicant.lname)},  ${capitalize(app.applicant.fname)}`}</span>
//                 </div>
//                 <div className="flex items-center gap-3 text-sm">
//                   <Mail className="h-4 w-4 text-slate-400" />
//                   <span className="text-slate-600">{app.applicant.email}</span>
//                 </div>
//                 <div className="flex items-center gap-3 text-sm">
//                   <Phone className="h-4 w-4 text-slate-400" />
//                   <span className="text-slate-600">{app.applicant.phone}</span>
//                 </div>
//               </div>
//             </section>

//             {/* Application Details */}
//             <section className="space-y-4 pb-3">
//               <h4 className="text-[12px] font-bold uppercase tracking-widest text-slate-800">
//                 Job Details
//               </h4>
//               <div className="grid gap-3">
//                 <div className="flex items-center gap-3 text-sm">
//                   <Briefcase className="h-4 w-4 text-slate-400" />
//                   <span className="text-slate-600">
//                     Position:{" "}
//                     <b className="text-slate-800">{app.position.title}</b>
//                   </span>
//                 </div>
//                 <div className="flex items-center gap-3 text-sm">
//                   <Calendar className="h-4 w-4 text-slate-400" />
//                   <span className="text-slate-600">
//                     Applied on:{" "}
//                     {new Date(app.date_submitted).toLocaleDateString()}
//                   </span>
//                 </div>
//               </div>
//             </section>

//             {/* Documents Section */}
//             <section className="space-y-4">
//               <h4 className="text-[12px] font-bold uppercase tracking-widest text-slate-800">
//                 Attached Documents
//               </h4>

//               <a
//                 href={row.original.applicant.resume} // Or whatever your link property is
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="group flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-[#417256]/30 hover:shadow-md transition-all duration-200"
//               >
//                 <div className="flex items-center gap-3">
//                   <div className="p-2 bg-white rounded-lg border border-slate-100 group-hover:bg-[#417256]/10 group-hover:border-[#417256]/20 transition-colors">
//                     <FileText className="h-5 w-5 text-[#417256]" />
//                   </div>
//                   <div className="flex flex-col">
//                     <span className="text-sm font-semibold text-slate-700 group-hover:text-[#417256]">
//                       Resume_v1.pdf
//                     </span>
//                     <span className="text-[10px] text-slate-400 uppercase font-medium">
//                       PDF Document
//                     </span>
//                   </div>
//                 </div>

//                 <div className="p-2 text-slate-300 group-hover:text-[#417256]">
//                   <ExternalLink className="h-4 w-4" />
//                 </div>
//               </a>
//             </section>
//           </div>
//         </DetailsDrawer>
//       );
//     },
//   }
// ];

// export default function Applications() {
//   const { applications, isLoading } = useApplications();
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const { adminId } = useAdmin();

//   // --- Modal State ---
//   const [confirmOpen, setConfirmOpen] = useState(false);
//   const [pendingUpdate, setPendingUpdate] = useState<{
//     id: string;
//     status: string;
//   } | null>(null);

//   // 1. This triggers when the Select value changes
//   const handleInitiateChange = (appId: string, newStatus: string) => {
//     setPendingUpdate({ id: appId, status: newStatus });
//     setConfirmOpen(true);
//   };

//   //POST
//   const handleConfirmUpdate = async () => {
//     if (!pendingUpdate || !adminId) return;

//     try {
//       setIsSubmitting(true);
//       await usePostLogs({
//         status: pendingUpdate.status,
//         app_id: pendingUpdate.id,
//         adm_id: adminId,
//       });

//       toast.success(`Status updated to ${pendingUpdate.status}`);

//       setTimeout(() => window.location.reload(), 1000);
//     } catch (error) {
//       toast.error("Failed to update status");
//     } finally {
//       setIsSubmitting(false);
//       setConfirmOpen(false);
//     }
//   };

//   const columns = getColumns(handleInitiateChange);

//   return (
//     <div className=" bg-white rounded-lg shadow-sm">
//       <DataTable
//         columns={columns}
//         data={applications}
//         isLoading={isLoading || isSubmitting}
//       />

//       <ConfirmModal
//         isOpen={confirmOpen}
//         onClose={() => setConfirmOpen(false)}
//         onConfirm={handleConfirmUpdate}
//         title="Update Application Status"
//         description={`Are you sure you want to change this applicant's status to "${pendingUpdate?.status}"?`}
//       />
//     </div>
//   );
// }

// import { type ColumnDef } from "@tanstack/react-table";
// import { useState, useMemo } from "react";
// import { toast } from "sonner";

// // UI Components
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { DataTable } from "@/components/ui/table/data-table";
// import { Badge } from "@/components/ui/badge";
// import { DetailsDrawer } from "@/components/ui/drawer";
// import { ConfirmModal } from "@/components/ui/confirmation-modal";
// import { Input } from "@/components/ui/input";

// // Helpers & Hooks
// import { capitalize } from "@/helpers/capitalize";
// import { useAdmin } from "@/hooks/use-admin";

// // API Hooks
// import { usePostLogs } from "../api/logs/logPostAPI";
// import {
//   useApplications,
//   type ApplicationDataType,
// } from "../api/application/ApplicationFetchAPI";

// // Icons
// import {
//   FileText,
//   ExternalLink,
//   Mail,
//   Phone,
//   Briefcase,
//   Calendar,
//   UserRound,
//   Search,
//   Filter,
//   ArrowUpDown,
// } from "lucide-react";

// /**
//  * Column Definitions
//  * Passing the initiation handler to trigger the confirmation modal
//  */
// const getColumns = (
//   onStatusChange: (appId: string, status: string) => void,
// ): ColumnDef<ApplicationDataType>[] => [
//   {
//     accessorKey: "applicant.fname",
//     header: "Applicant Name",
//     cell: ({ row }) => {
//       const { fname, lname } = row.original.applicant;
//       return <span className="font-semibold">{`${fname} ${lname}`}</span>;
//     },
//   },
//   {
//     accessorKey: "position.title",
//     header: "Role",
//   },
//   {
//     accessorKey: "date_submitted",
//     // header: "Date Applied",
//     header: ({ column }) => (
//       <div
//         className="flex w-full gap-2 cursor-pointer"
//         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//       >
//         Date
//         <ArrowUpDown size={15} />
//       </div>
//     ),
//     cell: ({ row }) =>
//       new Date(row.getValue("date_submitted")).toLocaleDateString(),
//   },
//   {
//     accessorKey: "current_status",
//     header: "Status",
//     cell: ({ row }) => {
//       const status = row.original.current_status;
//       return (
//         <Badge
//           variant="secondary"
//           className="capitalize font-normal border-green-100 bg-green-50 text-green-700"
//         >
//           {status}
//         </Badge>
//       );
//     },
//   },
//   {
//     id: "action",
//     header: "Action",
//     cell: ({ row }) => {
//       const app = row.original;

//       return (
//         <DetailsDrawer
//           title="Application Review"
//           description="Detailed profile and application history."
//         >
//           <div className="space-y-8">
//             {/* Status Update Section */}
//             <section className="bg-green-50 p-4 rounded-xl border border-green-100/50">
//               <h4 className="font-bold capitalize text-green-600/80 mb-3">
//                 Current Status
//               </h4>
//               <div className="flex items-center justify-between">
//                 <Select
//                   defaultValue={app.current_status}
//                   onValueChange={(value) => onStatusChange(app.id, value)}
//                 >
//                   <SelectTrigger className="h-9 w-auto gap-3 px-3 border-green-200 bg-white hover:bg-green-100/50 hover:border-green-300 transition-all rounded-lg shadow-sm">
//                     <SelectValue className="text-sm font-bold text-slate-700 capitalize" />
//                   </SelectTrigger>

//                   <SelectContent className="rounded-xl border-slate-200 shadow-xl">
//                     {[
//                       "pending",
//                       "shortlisted",
//                       "hired",
//                       "not selected",
//                       "declined",
//                       "withdraw",
//                     ].map((status) => (
//                       <SelectItem
//                         key={status}
//                         value={status}
//                         className="py-2.5 cursor-pointer capitalize"
//                       >
//                         <div className="flex items-center gap-2">
//                           <div
//                             className={`h-2 w-2 rounded-full animate-pulse ${
//                               status === "hired"
//                                 ? "bg-green-500"
//                                 : status === "pending"
//                                   ? "bg-yellow-500"
//                                   : status === "shortlisted"
//                                     ? "bg-blue-500"
//                                     : "bg-slate-500"
//                             }`}
//                           />
//                           {status}
//                         </div>
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>

//                 <Badge className="bg-[#417256] hover:bg-[#417256] px-3 py-1 text-[10px] uppercase tracking-tighter">
//                   Active
//                 </Badge>
//               </div>
//             </section>

//             {/* Personal Info */}
//             <section className="space-y-4 pb-3">
//               <h4 className="text-[12px] font-bold uppercase tracking-widest text-[#046241]">
//                 Personal Information
//               </h4>
//               <div className="grid gap-3">
//                 <div className="flex items-center gap-3 text-sm">
//                   <UserRound className="h-4 w-4 text-slate-400" />
//                   <span className="text-slate-600">
//                     {`${capitalize(app.applicant.lname)}, ${capitalize(app.applicant.fname)}`}
//                   </span>
//                 </div>
//                 <div className="flex items-center gap-3 text-sm">
//                   <Mail className="h-4 w-4 text-slate-400" />
//                   <span className="text-slate-600">{app.applicant.email}</span>
//                 </div>
//                 <div className="flex items-center gap-3 text-sm">
//                   <Phone className="h-4 w-4 text-slate-400" />
//                   <span className="text-slate-600">{app.applicant.phone}</span>
//                 </div>
//               </div>
//             </section>

//             {/* Job Details */}
//             <section className="space-y-4 pb-3">
//               <h4 className="text-[12px] font-bold uppercase tracking-widest text-[#046241]">
//                 Job Details
//               </h4>
//               <div className="grid gap-3">
//                 <div className="flex items-center gap-3 text-sm">
//                   <Briefcase className="h-4 w-4 text-slate-400" />
//                   <span className="text-slate-600">
//                     Position:{" "}
//                     <b className="text-slate-800">{app.position.title}</b>
//                   </span>
//                 </div>
//                 <div className="flex items-center gap-3 text-sm">
//                   <Calendar className="h-4 w-4 text-slate-400" />
//                   <span className="text-slate-600">
//                     Applied on:{" "}
//                     {new Date(app.date_submitted).toLocaleDateString()}
//                   </span>
//                 </div>
//               </div>
//             </section>

//             {/* Documents */}
//             <section className="space-y-4">
//               <h4 className="text-[12px] font-bold uppercase tracking-widest text-[#046241]">
//                 Attached Documents
//               </h4>
//               <a
//                 href={app.applicant.resume}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="group flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-[#417256]/30 hover:shadow-md transition-all duration-200"
//               >
//                 <div className="flex items-center gap-3">
//                   <div className="p-2 bg-white rounded-lg border border-slate-100 group-hover:bg-[#417256]/10 group-hover:border-[#417256]/20 transition-colors">
//                     <FileText className="h-5 w-5 text-[#417256]" />
//                   </div>
//                   <div className="flex flex-col">
//                     <span className="text-sm font-semibold text-slate-700 group-hover:text-[#417256]">
//                       Resume_v1.pdf
//                     </span>
//                     <span className="text-[10px] text-slate-400 uppercase font-medium">
//                       PDF Document
//                     </span>
//                   </div>
//                 </div>
//                 <div className="p-2 text-slate-300 group-hover:text-[#417256]">
//                   <ExternalLink className="h-4 w-4" />
//                 </div>
//               </a>
//             </section>
//           </div>
//         </DetailsDrawer>
//       );
//     },
//   },
// ];

// export default function Applications() {
//   const { applications, isLoading } = useApplications();
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const { adminId } = useAdmin();

//   // Search and Filter State
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");

//   // Modal State
//   const [confirmOpen, setConfirmOpen] = useState(false);
//   const [pendingUpdate, setPendingUpdate] = useState<{
//     id: string;
//     status: string;
//   } | null>(null);

//   /**
//    * Filtered Data Logic
//    */
//   const filteredData = useMemo(() => {
//     return applications.filter((app) => {
//       const fullName =
//         `${app.applicant.fname} ${app.applicant.lname}`.toLowerCase();
//       const role = app.position.title?.toLowerCase() || ""; // Safe check for role too
//       const search = searchTerm.toLowerCase();

//       const matchesSearch = fullName.includes(search) || role.includes(search);
//       const matchesStatus =
//         statusFilter === "all" ||
//         app.current_status?.toLowerCase() === statusFilter.toLowerCase();

//       return matchesSearch && matchesStatus;
//     });
//   }, [applications, searchTerm, statusFilter]);

//   /**
//    * Handlers
//    */
//   const handleInitiateChange = (appId: string, newStatus: string) => {
//     setPendingUpdate({ id: appId, status: newStatus });
//     setConfirmOpen(true);
//   };

//   const handleConfirmUpdate = async () => {
//     if (!pendingUpdate || !adminId) return;

//     try {
//       setIsSubmitting(true);
//       await usePostLogs({
//         status: pendingUpdate.status,
//         app_id: pendingUpdate.id,
//         adm_id: adminId,
//       });

//       toast.success(`Status updated to ${pendingUpdate.status}`);

//       // Delay to allow toast visibility
//       setTimeout(() => window.location.reload(), 1000);
//     } catch (error) {
//       console.error("Update error:", error);
//       toast.error("Failed to update status");
//     } finally {
//       setIsSubmitting(false);
//       setConfirmOpen(false);
//     }
//   };

//   const columns = getColumns(handleInitiateChange);

//   return (
//     <div className="space-y-6">
//       <div className="mb-8">
//         <h1 className="text-2xl font-bold text-[#046241] tracking-tight">
//           Application Management
//         </h1>
//         <p className="text-slate-500 text-xs mt-1">
//           Review, filter, and update the status of incoming job applications for
//           all open positions.
//         </p>
//       </div>
//       {/* <Separator className="w-[50%]" /> */}

//       {/* Search and Filter Toolbar */}
//       <div className="flex flex-col md:flex-row gap-4 pt-5 items-center justify-between bg-white rounded-xl">
//         <div className="relative w-full md:w-96">
//           <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
//           <Input
//             placeholder="Search by name or role..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="pl-10 py-5 bg-white shadow-sm border border-slate-100 focus-visible:ring-1 focus-visible:ring-[#417256]"
//           />
//         </div>

//         <div className="flex items-center gap-3 w-full md:w-auto">
//           <div className="flex items-center gap-2 text-slate-500 text-sm font-medium mr-2">
//             <Filter className="h-4 w-4" />
//             <span>Filter</span>
//           </div>
//           <Select value={statusFilter} onValueChange={setStatusFilter}>
//             <SelectTrigger className="w-40 bg-slate-50 shadow-sm border border-slate-100 capitalize">
//               <SelectValue placeholder="Status" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">All Applications</SelectItem>
//               <SelectItem value="pending">Pending</SelectItem>
//               <SelectItem value="shortlisted">Shortlisted</SelectItem>
//               <SelectItem value="hired">Hired</SelectItem>
//               <SelectItem value="not selected">Not Selected</SelectItem>
//               <SelectItem value="declined">Declined</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//       </div>

//       {/* Main Table Container */}
//       <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
//         <DataTable
//           columns={columns}
//           data={filteredData}
//           isLoading={isLoading || isSubmitting}
//         />
//       </div>

//       {/* Confirmation Step */}
//       <ConfirmModal
//         isOpen={confirmOpen}
//         onClose={() => setConfirmOpen(false)}
//         onConfirm={handleConfirmUpdate}
//         title="Change Application Status?"
//         description={`Are you sure you want to move this applicant to "${pendingUpdate?.status}"? This action will be logged in the system.`}
//       />
//     </div>
//   );
// }





























// import { type ColumnDef } from "@tanstack/react-table";
// import { cn } from "@/lib/utils";
// import { useState, useMemo } from "react";
// import { toast } from "sonner";

// // UI Components
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Pagination,
//   PaginationContent,
//   PaginationEllipsis,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination";
// import { DataTable } from "@/components/ui/table/data-table";
// import { Badge } from "@/components/ui/badge";
// import { DetailsDrawer } from "@/components/ui/drawer";
// import { ConfirmModal } from "@/components/ui/confirmation-modal";
// import { Input } from "@/components/ui/input";

// // Helpers & Hooks
// import { capitalize } from "@/helpers/capitalize";
// import { useAdmin } from "@/hooks/use-admin";

// // API Hooks
// import { usePostLogs } from "../api/logs/logPostAPI";
// import {
//   useApplications,
//   type ApplicationDataType,
// } from "../api/application/ApplicationFetchAPI";

// // Icons
// import {
//   FileText,
//   ExternalLink,
//   Mail,
//   Phone,
//   Briefcase,
//   Calendar,
//   UserRound,
//   Search,
//   Filter,
//   ArrowUpDown,
// } from "lucide-react";




// const statusConfig: Record<string, { label: string; className: string }> = {
//   pending: {
//     label: "Pending",
//     className: "border-amber-100 bg-amber-50 text-amber-700",
//   },
//   shortlisted: {
//     label: "Shortlisted",
//     className: "border-blue-100 bg-blue-50 text-blue-700",
//   },
//   hired: {
//     label: "Hired",
//     className: "border-emerald-200 bg-emerald-100 text-emerald-800 font-medium",
//   },
//   "not selected": {
//     label: "Not Selected",
//     className: "border-slate-200 bg-slate-50 text-slate-500",
//   },
//   declined: {
//     label: "Declined",
//     className: "border-red-100 bg-red-50 text-red-600",
//   },
//   withdraw: {
//     label: "Withdrawn",
//     className: "border-gray-200 bg-gray-100 text-gray-500 italic",
//   },
// };


// /**
//  * Column Definitions
//  * Passing the initiation handler to trigger the confirmation modal
//  */
// const getColumns = (
//   onStatusChange: (appId: string, status: string) => void,
// ): ColumnDef<ApplicationDataType>[] => [
//   {
//     accessorKey: "applicant.fname",
//     header: "Applicant Name",
//     cell: ({ row }) => {
//       const { fname, lname } = row.original.applicant;
//       return <span className="font-semibold">{`${fname} ${lname}`}</span>;
//     },
//     size: 200,
//   },
//   {
//     accessorKey: "position.title",
//     header: "Position Applied",
//     size: 350,
//   },
//   {
//     accessorKey: "date_submitted",
//     // header: "Date Applied",
//     header: ({ column }) => (
//       <div
//         className="flex w-full gap-2 cursor-pointer"
//         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//       >
//         Date
//         <ArrowUpDown size={15} />
//       </div>
//     ),
//     cell: ({ row }) =>
//       new Date(row.getValue("date_submitted")).toLocaleDateString(),
//     size: 200,
//   },
//   {
//     accessorKey: "current_status",
//     header: "Status",
//     size: 150,
//     cell: ({ row }) => {
//       const status = (row.original.current_status ?? "").toLowerCase();
//       const config = statusConfig[status] || {
//         label: status,
//         className: "border-gray-100 bg-gray-50 text-gray-600",
//       };

//       return (
//         <Badge
//           variant="outline"
//           className={cn(
//             "capitalize font-normal px-2.5 py-0.5 rounded-full",
//             config.className,
//           )}
//         >
//           {config.label}
//         </Badge>
//       );
//     },
//   },
//   {
//     id: "action",
//     header: "Action",
//     size: 150,
//     cell: ({ row }) => {
//       const app = row.original;

//       return (
//         <DetailsDrawer
//           title="Application Review"
//           description="Detailed profile and application history."
//         >
//           <div className="space-y-8">
//             {/* Status Update Section */}
//             <section className="bg-green-50 p-4 rounded-xl border border-green-100/50">
//               <h4 className="font-bold capitalize text-green-600/80 mb-3">
//                 Current Status
//               </h4>
//               <div className="flex items-center justify-between">
//                 <Select
//                   defaultValue={app.current_status}
//                   onValueChange={(value) => onStatusChange(app.id, value)}
//                 >
//                   <SelectTrigger className="h-9 w-auto gap-3 px-3 border-green-200 bg-white hover:bg-green-100/50 hover:border-green-300 transition-all rounded-lg shadow-sm">
//                     <SelectValue className="text-sm font-bold text-slate-700 capitalize" />
//                   </SelectTrigger>

//                   <SelectContent className="rounded-xl border-slate-200 shadow-xl">
//                     {[
//                       "pending",
//                       "shortlisted",
//                       "hired",
//                       "not selected",
//                       "declined",
//                       "withdraw",
//                     ].map((status) => (
//                       <SelectItem
//                         key={status}
//                         value={status}
//                         className="py-2.5 cursor-pointer capitalize"
//                       >
//                         <div className="flex items-center gap-2">
//                           <div
//                             className={`h-2 w-2 rounded-full animate-pulse ${
//                               status === "hired"
//                                 ? "bg-green-500"
//                                 : status === "pending"
//                                   ? "bg-yellow-500"
//                                   : status === "shortlisted"
//                                     ? "bg-blue-500"
//                                     : "bg-slate-500"
//                             }`}
//                           />
//                           {status}
//                         </div>
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>

//                 <Badge className="bg-[#417256] hover:bg-[#417256] px-3 py-1 text-[10px] uppercase tracking-tighter">
//                   Active
//                 </Badge>
//               </div>
//             </section>

//             {/* Personal Info */}
//             <section className="space-y-4 pb-3">
//               <h4 className="text-[12px] font-bold uppercase tracking-widest text-[#046241]">
//                 Personal Information
//               </h4>
//               <div className="grid gap-3">
//                 <div className="flex items-center gap-3 text-sm">
//                   <UserRound className="h-4 w-4 text-slate-400" />
//                   <span className="text-slate-600">
//                     {`${capitalize(app.applicant.lname)}, ${capitalize(app.applicant.fname)}`}
//                   </span>
//                 </div>
//                 <div className="flex items-center gap-3 text-sm">
//                   <Mail className="h-4 w-4 text-slate-400" />
//                   <span className="text-slate-600">{app.applicant.email}</span>
//                 </div>
//                 <div className="flex items-center gap-3 text-sm">
//                   <Phone className="h-4 w-4 text-slate-400" />
//                   <span className="text-slate-600">{app.applicant.phone}</span>
//                 </div>
//               </div>
//             </section>

//             {/* Job Details */}
//             <section className="space-y-4 pb-3">
//               <h4 className="text-[12px] font-bold uppercase tracking-widest text-[#046241]">
//                 Job Details
//               </h4>
//               <div className="grid gap-3">
//                 <div className="flex items-center gap-3 text-sm">
//                   <Briefcase className="h-4 w-4 text-slate-400" />
//                   <span className="text-slate-600">
//                     Position:{" "}
//                     <b className="text-slate-800">{app.position.title}</b>
//                   </span>
//                 </div>
//                 <div className="flex items-center gap-3 text-sm">
//                   <Calendar className="h-4 w-4 text-slate-400" />
//                   <span className="text-slate-600">
//                     Applied on:{" "}
//                     {new Date(app.date_submitted).toLocaleDateString()}
//                   </span>
//                 </div>
//               </div>
//             </section>

//             {/* Documents */}
//             <section className="space-y-4">
//               <h4 className="text-[12px] font-bold uppercase tracking-widest text-[#046241]">
//                 Attached Documents
//               </h4>
//               <a
//                 href={app.applicant.resume}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="group flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-[#417256]/30 hover:shadow-md transition-all duration-200"
//               >
//                 <div className="flex items-center gap-3">
//                   <div className="p-2 bg-white rounded-lg border border-slate-100 group-hover:bg-[#417256]/10 group-hover:border-[#417256]/20 transition-colors">
//                     <FileText className="h-5 w-5 text-[#417256]" />
//                   </div>
//                   <div className="flex flex-col">
//                     <span className="text-sm font-semibold text-slate-700 group-hover:text-[#417256]">
//                       Resume_v1.pdf
//                     </span>
//                     <span className="text-[10px] text-slate-400 uppercase font-medium">
//                       PDF Document
//                     </span>
//                   </div>
//                 </div>
//                 <div className="p-2 text-slate-300 group-hover:text-[#417256]">
//                   <ExternalLink className="h-4 w-4" />
//                 </div>
//               </a>
//             </section>
//           </div>
//         </DetailsDrawer>
//       );
//     },
//   },
// ];


// const ITEMS_PER_PAGE = 10;

// export default function Applications() {
//   const { applications, isLoading } = useApplications();
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const { adminId } = useAdmin();

//   // Search and Filter State
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [currentPage, setCurrentPage] = useState(1);

//   // Modal State
//   const [confirmOpen, setConfirmOpen] = useState(false);
//   const [pendingUpdate, setPendingUpdate] = useState<{
//     id: string;
//     status: string;
//   } | null>(null);

//   // Filtered Data Logic
//   const filteredData = useMemo(() => {
//     return applications.filter((app) => {
//       const fullName = `${app.applicant.fname} ${app.applicant.lname}`.toLowerCase();
//       const role = app.position.title?.toLowerCase() || "";
//       const search = searchTerm.toLowerCase();
//       const matchesSearch = fullName.includes(search) || role.includes(search);
//       const matchesStatus =
//         statusFilter === "all" ||
//         app.current_status?.toLowerCase() === statusFilter.toLowerCase();
//       return matchesSearch && matchesStatus;
//     });
//   }, [applications, searchTerm, statusFilter]);

//   // Reset to page 1 when filters change
//   useMemo(() => {
//     setCurrentPage(1);
//   }, [searchTerm, statusFilter]);

//   // Pagination
//   const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
//   const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
//   const endIndex = startIndex + ITEMS_PER_PAGE;
//   const currentTableData = filteredData.slice(startIndex, endIndex);
  

//   // Handlers
//   const handleInitiateChange = (appId: string, newStatus: string) => {
//     setPendingUpdate({ id: appId, status: newStatus });
//     setConfirmOpen(true);
//   };

//   const handleConfirmUpdate = async () => {
//     if (!pendingUpdate || !adminId) return;
//     try {
//       setIsSubmitting(true);
//       await usePostLogs({
//         status: pendingUpdate.status,
//         app_id: pendingUpdate.id,
//         adm_id: adminId,
//       });
//       toast.success(`Status updated to ${pendingUpdate.status}`);
//       setTimeout(() => window.location.reload(), 1000);
//     } catch (error) {
//       console.error("Update error:", error);
//       toast.error("Failed to update status");
//     } finally {
//       setIsSubmitting(false);
//       setConfirmOpen(false);
//     }
//   };

//   const columns = getColumns(handleInitiateChange);

//   return (
//     <div className="space-y-6">
//       <div className="pb-13">
//         <h1 className="text-4xl font-bold text-[#046241] tracking-tight">
//           Application Tracker
//         </h1>
//         <p className="text-slate-500 text-sm mt-1">
//           Manage and track job applications across positions
//         </p>
//       </div>

//       {/* Search and Filter Toolbar */}
//       <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white rounded-xl">
//         <div className="relative w-full md:w-96">
//           <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
//           <Input
//             placeholder="Search by name or role..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="pl-10 py-5 bg-white shadow-sm border border-slate-100 focus-visible:ring-1 focus-visible:ring-[#417256]"
//           />
//         </div>
//         <div className="flex items-center gap-3 w-full md:w-auto">
//           <div className="flex items-center gap-2 text-slate-500 text-sm font-medium mr-2">
//             <Filter className="h-4 w-4" />
//             <span>Filter</span>
//           </div>
//           <Select value={statusFilter} onValueChange={setStatusFilter}>
//             <SelectTrigger className="w-40 bg-slate-50 shadow-sm border border-slate-100 capitalize">
//               <SelectValue placeholder="Status" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">All Applications</SelectItem>
//               <SelectItem value="pending">Pending</SelectItem>
//               <SelectItem value="shortlisted">Shortlisted</SelectItem>
//               <SelectItem value="hired">Hired</SelectItem>
//               <SelectItem value="not selected">Not Selected</SelectItem>
//               <SelectItem value="declined">Declined</SelectItem>
//               <SelectItem value="withdraw">Withdrawn</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//       </div>

//       {/* Main Table Container */}
//       <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
//         <DataTable
//           columns={columns}
//           data={currentTableData}
//           isLoading={isLoading || isSubmitting}
//         />

//         {/* Pagination Footer */}
//         <div className="flex items-center justify-between px-4 py-4 border-t border-slate-100">
//           <div className="text-sm text-slate-500">
//             Showing {startIndex + 1} to{" "}
//             {Math.min(endIndex, filteredData.length)} of {filteredData.length}{" "}
//             entries
//           </div>
//           <div className="flex justify-end">
//             <Pagination className="mx-0 w-auto">
//               <PaginationContent>
//                 <PaginationItem>
//                   <PaginationPrevious
//                     href="#"
//                     onClick={(e) => {
//                       e.preventDefault();
//                       if (currentPage > 1) setCurrentPage((p) => p - 1);
//                     }}
//                     className={
//                       currentPage === 1
//                         ? "pointer-events-none opacity-50"
//                         : "cursor-pointer"
//                     }
//                   />
//                 </PaginationItem>
//                 {Array.from({ length: totalPages }, (_, i) => i + 1).map(
//                   (page) => (
//                     <PaginationItem key={page}>
//                       <PaginationLink
//                         href="#"
//                         isActive={currentPage === page}
//                         onClick={(e) => {
//                           e.preventDefault();
//                           setCurrentPage(page);
//                         }}
//                       >
//                         {page}
//                       </PaginationLink>
//                     </PaginationItem>
//                   ),
//                 )}
//                 {totalPages > 5 && (
//                   <PaginationItem>
//                     <PaginationEllipsis />
//                   </PaginationItem>
//                 )}
//                 <PaginationItem>
//                   <PaginationNext
//                     href="#"
//                     onClick={(e) => {
//                       e.preventDefault();
//                       if (currentPage < totalPages)
//                         setCurrentPage((p) => p + 1);
//                     }}
//                     className={
//                       currentPage === totalPages
//                         ? "pointer-events-none opacity-50"
//                         : "cursor-pointer"
//                     }
//                   />
//                 </PaginationItem>
//               </PaginationContent>
//             </Pagination>
//           </div>
//         </div>
//       </div>

//       {/* Confirmation Step */}
//       <ConfirmModal
//         isOpen={confirmOpen}
//         onClose={() => setConfirmOpen(false)}
//         onConfirm={handleConfirmUpdate}
//         title="Change Application Status?"
//         description={`Are you sure you want to move this applicant to "${pendingUpdate?.status}"? This action will be logged in the system.`}
//       />
//     </div>
//   );
// }
















import { type ColumnDef } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { useState, useMemo } from "react";
import { toast } from "sonner";

// UI Components
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { DataTable } from "@/components/ui/table/data-table";
import { Badge } from "@/components/ui/badge";
import { DetailsDrawer } from "@/components/ui/drawer";
import { ConfirmModal } from "@/components/ui/confirmation-modal";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";


// Helpers & Hooks
import { capitalize } from "@/helpers/capitalize";
import { useAdmin } from "@/hooks/use-admin";

// API Hooks
import { usePostLogs } from "../api/logs/logPostAPI";
import {
  useApplications,
  type ApplicationDataType,
} from "../api/application/ApplicationFetchAPI";

// Icons
import {
  FileText,
  ExternalLink,
  Mail,
  Phone,
  Briefcase,
  Calendar,
  UserRound,
  Search,
  Filter,
  ArrowUpDown,
  Cake,
} from "lucide-react";

const statusConfig: Record<string, { label: string; className: string }> = {
  pending: {
    label: "Pending",
    className: "border-amber-100 bg-amber-50 text-amber-700",
  },
  shortlisted: {
    label: "Shortlisted",
    className: "border-blue-100 bg-blue-50 text-blue-700",
  },
  hired: {
    label: "Hired",
    className: "border-emerald-200 bg-emerald-100 text-emerald-800 font-medium",
  },
  "not selected": {
    label: "Not Selected",
    className: "border-slate-200 bg-slate-50 text-slate-500",
  },
  declined: {
    label: "Declined",
    className: "border-red-100 bg-red-50 text-red-600",
  },
  withdraw: {
    label: "Withdrawn",
    className: "border-gray-200 bg-gray-100 text-gray-500 italic",
  },
};

/**
 * Column Definitions
 * Passing the initiation handler to trigger the confirmation modal
 */
const getColumns = (
  onUpdate: (
    appId: string,
    data: { status: string; potential: boolean; remarks: string },
  ) => void,
): ColumnDef<ApplicationDataType>[] => [
  {
    accessorKey: "applicant.fname",
    header: "Applicant Name",
    cell: ({ row }) => {
      const { fname, lname } = row.original.applicant;
      return <span className="font-semibold">{`${fname} ${lname}`}</span>;
    },
    size: 200,
  },
  {
    accessorKey: "position.title",
    header: "Position Applied",
    size: 350,
  },
  {
    accessorKey: "date_submitted",
    // header: "Date Applied",
    header: ({ column }) => (
      <div
        className="flex w-full gap-2 cursor-pointer"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Date
        <ArrowUpDown size={15} />
      </div>
    ),
    cell: ({ row }) =>
      new Date(row.getValue("date_submitted")).toLocaleDateString(),
    size: 200,
  },
  {
    accessorKey: "current_status",
    header: "Status",
    size: 150,
    cell: ({ row }) => {
      const status = (row.original.current_status ?? "").toLowerCase();
      const config = statusConfig[status] || {
        label: status,
        className: "border-gray-100 bg-gray-50 text-gray-600",
      };

      return (
        <Badge
          variant="outline"
          className={cn(
            "capitalize font-normal px-2.5 py-0.5 rounded-full",
            config.className,
          )}
        >
          {config.label}
        </Badge>
      );
    },
  },
  {
    id: "action",
    header: "Action",
    size: 150,
    cell: ({ row }) => {
      const app = row.original;
      // Local state to hold changes within the drawer before saving
      const [localStatus, setLocalStatus] = useState(app.current_status ?? "pending");
      const [localPotential, setLocalPotential] = useState(
        app.logs?.[0]?.potential || false,
      );
      const [localRemarks, setLocalRemarks] = useState(app.logs?.[0]?.remarks || "");

      return (
        <DetailsDrawer
          title="Application Review"
          description="Detailed profile and application history."
        >
          {/* Wrap content in a flex container to allow for a sticky footer */}
          <div className="flex flex-col h-full">
            <div className="flex-1 space-y-8 pb-24">
              {" "}
              {/* Assessment & Status Section */}
              <section className="relative overflow-hidden bg-emerald-600/20 p-6 rounded-[1rem] border border-emerald-600/30 shadow-inner">
                <div className="flex flex-col gap-6">
                  {/* Top Row: Label and the Dynamic Assessment Card */}
                  <div className="flex items-center justify-between">
                    {/* Slightly darkened the text color for better contrast on emerald-600/20 */}
                    <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-emerald-800/60">
                      Assessment
                    </h4>

                    {/* Best Fit Toggle */}
                    <div
                      className={cn(
                        "flex items-center gap-4 pl-4 pr-2 py-2 rounded-2xl transition-all duration-500 border",
                        localPotential
                          ? "bg-white border-[#FFB347]/40 shadow-[0_8px_20px_-6px_rgba(255,179,71,0.25)]"
                          : "bg-white/40 border-emerald-600/10 shadow-sm backdrop-blur-sm",
                      )}
                    >
                      <div className="flex flex-col">
                        <span
                          className={cn(
                            "text-[11px] font-black uppercase tracking-tight transition-colors duration-300",
                            localPotential
                              ? "text-[#FFB347]"
                              : "text-emerald-800/50",
                          )}
                        >
                          Best Fit
                        </span>
                        <span
                          className={cn(
                            "text-[9px] font-bold leading-none transition-colors duration-300",
                            localPotential
                              ? "text-[#FFB347]/70"
                              : "text-emerald-800/40",
                          )}
                        >
                          {localPotential
                            ? "High match score"
                            : "Standard score"}
                        </span>
                      </div>
                      <Switch
                        checked={localPotential}
                        onCheckedChange={setLocalPotential}
                        className="data-[state=checked]:bg-[#FFB347] data-[state=unchecked]:bg-emerald-600/20 scale-90"
                      />
                    </div>
                  </div>

                  {/* Bottom Row: Status Dropdown */}
                  <div className="space-y-2">
                    <p className="text-[10px] font-black text-emerald-800/50 pl-1 tracking-wider uppercase">
                      Application Status
                    </p>
                    <Select value={localStatus} onValueChange={setLocalStatus}>
                      <SelectTrigger className="h-12 w-full px-4 border-emerald-600/20 bg-white/80 hover:bg-white hover:border-emerald-600/40 transition-all rounded-2xl shadow-sm text-sm font-bold capitalize text-slate-700 focus:ring-0 backdrop-blur-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-2xl border-slate-200 shadow-2xl">
                        {[
                          "pending",
                          "shortlisted",
                          "hired",
                          "not selected",
                          "declined",
                          "withdraw",
                        ].map((status) => (
                          <SelectItem
                            key={status}
                            value={status}
                            className="capitalize py-3 font-bold text-slate-600"
                          >
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </section>
              {/* Personal Info */}
              <section className="space-y-4 px-1 py-3">
                <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-emerald-800/70">
                  Personal Information
                </h4>
                <div className="grid gap-4">
                  <div className="flex items-center gap-3 text-sm font-medium text-slate-600">
                    <UserRound className="h-4 w-4 text-slate-400" />
                    <span>{`${capitalize(app.applicant.lname)}, ${capitalize(app.applicant.fname)}`}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm font-medium text-slate-600">
                    <Mail className="h-4 w-4 text-slate-400" />
                    <span>{app.applicant.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm font-medium text-slate-600">
                    <Phone className="h-4 w-4 text-slate-400" />
                    <span>{app.applicant.phone}</span>
                  </div>{" "}
                  <div className="flex items-center gap-3 text-sm font-medium text-slate-600">
                    <Cake className="h-4 w-4 text-slate-400" />
                    <span>{app.applicant.dob}</span>
                  </div>
                </div>
              </section>
              {/* Job Details */}
              <section className="space-y-4 px-1 py-3">
                <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-emerald-800/70">
                  Job Details
                </h4>
                <div className="grid gap-4">
                  <div className="flex items-start gap-3 text-sm font-medium text-slate-600">
                    <Briefcase className="h-4 w-4 text-slate-400 mt-0.5" />
                    <p>
                      Position:{" "}
                      <b className="text-slate-900">{app.position.title}</b>
                    </p>
                  </div>
                  <div className="flex items-center gap-3 text-sm font-medium text-slate-600">
                    <Calendar className="h-4 w-4 text-slate-400" />
                    <p>
                      Applied on:{" "}
                      <span className="text-slate-900 font-semibold">
                        {new Date(app.date_submitted).toLocaleDateString()}
                      </span>
                    </p>
                  </div>
                </div>
              </section>
              {/* Documents */}
              <section className="space-y-4 px-1 py-3">
                <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-emerald-800/70">
                  Attached Documents
                </h4>
                <a
                  href={app.applicant.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-4 rounded-2xl border border-slate-100 bg-slate-50/50 shadow-sm hover:border-emerald-500/30 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-white rounded-xl border border-slate-100 group-hover:bg-emerald-50 group-hover:border-emerald-100 transition-colors">
                      <FileText className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-700 group-hover:text-emerald-700">
                        Resume_v1.pdf
                      </span>
                      <span className="text-[9px] text-slate-400 uppercase font-bold tracking-tighter">
                        PDF Document
                      </span>
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-slate-300 group-hover:text-emerald-500 transition-colors" />
                </a>
              </section>
              {/* Remarks Section */}
              <section className="space-y-3 px-1 py-3">
                <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-emerald-800/70">
                  Admin Remarks
                </h4>
                <Textarea
                  placeholder="Add internal notes about this applicant..."
                  value={localRemarks}
                  onChange={(e) => setLocalRemarks(e.target.value)}
                  className="min-h-35 resize-none bg-slate-50/50 border-slate-200 focus:bg-white focus:ring-emerald-500 rounded-2xl text-sm p-4 leading-relaxed transition-all shadow-sm"
                />
                <p className="text-[10px] text-slate-400 font-medium">
                  * Remarks are private and only visible to the admin team.
                </p>
              </section>
            </div>

            {/* Sticky Footer for Action Button */}
            <div className="absolute bottom-0 right-0 p-6 bg-gradient-to-t from-white via-white to-transparent w-full">
              <button
                onClick={() =>
                  onUpdate(app.id, {
                    status: localStatus,
                    potential: localPotential,
                    remarks: localRemarks,
                  })
                }
                className="w-fit bg-[#046241] hover:bg-[#034E34] text-white text-xs font-bold px-8 py-3 rounded-xl transition-all shadow-lg shadow-emerald-900/10 active:scale-95 flex items-center gap-2"
              >
                SAVE CHANGES
              </button>
            </div>
          </div>
        </DetailsDrawer>
      );
    },
  },
];

const ITEMS_PER_PAGE = 10;

export default function Applications() {
  const { applications, isLoading } = useApplications();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { adminId } = useAdmin();

  // Search and Filter State
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Modal State
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingUpdate, setPendingUpdate] = useState<{
    id: string;
    status: string;
    potential: boolean;
    remarks: string;
  } | null>(null);

  // Filtered Data Logic
  const filteredData = useMemo(() => {
    return applications.filter((app) => {
      const fullName =
        `${app.applicant.fname} ${app.applicant.lname}`.toLowerCase();
      const role = app.position.title?.toLowerCase() || "";
      const search = searchTerm.toLowerCase();
      const matchesSearch = fullName.includes(search) || role.includes(search);
      const matchesStatus =
        statusFilter === "all" ||
        app.current_status?.toLowerCase() === statusFilter.toLowerCase();
      return matchesSearch && matchesStatus;
    });
  }, [applications, searchTerm, statusFilter]);

  // Reset to page 1 when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentTableData = filteredData.slice(startIndex, endIndex);

  // Handlers
  const handleInitiateChange = (
    appId: string,
    data: { status: string; potential: boolean; remarks: string },
  ) => {
    setPendingUpdate({ id: appId, ...data });
    setConfirmOpen(true);
  };

  const handleConfirmUpdate = async () => {
    if (!pendingUpdate || !adminId) return;
    try {
      setIsSubmitting(true);
      await usePostLogs({
        status: pendingUpdate.status,
        potential: pendingUpdate.potential,
        remarks: pendingUpdate.remarks,
        app_id: pendingUpdate.id,
        adm_id: adminId,
      });
      toast.success(`Status updated to ${pendingUpdate.status}`);
      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update status");
    } finally {
      setIsSubmitting(false);
      setConfirmOpen(false);
    }
  };

  const columns = getColumns(handleInitiateChange);

  return (
    <div className="space-y-6">
      <div className="pb-13">
        <h1 className="text-4xl font-bold text-[#046241] tracking-tight">
          Application Tracker
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Manage and track job applications across positions
        </p>
      </div>

      {/* Search and Filter Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white rounded-xl">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search by name or role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 py-5 bg-white shadow-sm border border-slate-100 focus-visible:ring-1 focus-visible:ring-[#417256]"
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2 text-slate-500 text-sm font-medium mr-2">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40 bg-slate-50 shadow-sm border border-slate-100 capitalize">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Applications</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="shortlisted">Shortlisted</SelectItem>
              <SelectItem value="hired">Hired</SelectItem>
              <SelectItem value="not selected">Not Selected</SelectItem>
              <SelectItem value="declined">Declined</SelectItem>
              <SelectItem value="withdraw">Withdrawn</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <DataTable
          columns={columns}
          data={currentTableData}
          isLoading={isLoading || isSubmitting}
        />

        {/* Pagination Footer */}
        <div className="flex items-center justify-between px-4 py-4 border-t border-slate-100">
          <div className="text-sm text-slate-500">
            Showing {startIndex + 1} to{" "}
            {Math.min(endIndex, filteredData.length)} of {filteredData.length}{" "}
            entries
          </div>
          <div className="flex justify-end">
            <Pagination className="mx-0 w-auto">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage > 1) setCurrentPage((p) => p - 1);
                    }}
                    className={
                      currentPage === 1
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        href="#"
                        isActive={currentPage === page}
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage(page);
                        }}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ),
                )}
                {totalPages > 5 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage < totalPages)
                        setCurrentPage((p) => p + 1);
                    }}
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>

      {/* Confirmation Step */}
      <ConfirmModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirmUpdate}
        title="Change Application Status?"
        description={`Are you sure you want to move this applicant to "${pendingUpdate?.status}"? This action will be logged in the system.`}
      />
    </div>
  );
}

