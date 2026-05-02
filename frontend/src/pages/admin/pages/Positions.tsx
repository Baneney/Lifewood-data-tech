// import { type ColumnDef } from "@tanstack/react-table";
// import { useState } from "react";
// import { useFetchPositions, type PositionDataType } from "../api/application/ApplicationFetchAPI";
// import { DataTable } from "@/components/ui/table/data-table";
// import { Badge } from "@/components/ui/badge";
// import { cn } from "@/lib/utils";
// import {
//   Pagination,
//   PaginationContent,
//   PaginationEllipsis,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination";

// const ITEMS_PER_PAGE = 10;

// const statusConfig: Record<string, { label: string; className: string }> = {
//   open: { label: "Open", className: "border-emerald-200 bg-emerald-50 text-emerald-700" },
//   closed: { label: "Closed", className: "border-red-100 bg-red-50 text-red-600" },
//   draft: { label: "Draft", className: "border-slate-200 bg-slate-50 text-slate-500" },
// };

// const columns: ColumnDef<PositionDataType>[] = [
//   {
//     accessorKey: "title",
//     header: "Position Title",
//     cell: ({ row }) => <span className="font-semibold">{row.getValue("title")}</span>,
//     size: 250,
//   },
//   {
//     accessorKey: "desc",
//     header: "Description",
//     size: 400,
//   },
//   {
//     accessorKey: "status",
//     header: "Status",
//     size: 120,
//     cell: ({ row }) => {
//       const status = (row.getValue("status") as string)?.toLowerCase();
//       const config = statusConfig[status] ?? { label: status, className: "border-gray-100 bg-gray-50 text-gray-600" };
//       return (
//         <Badge variant="outline" className={cn("capitalize font-normal px-2.5 py-0.5 rounded-full", config.className)}>
//           {config.label}
//         </Badge>
//       );
//     },
//   },
// ];

// export default function Positions() {
//   const { positions, isLoading } = useFetchPositions();
//   const [currentPage, setCurrentPage] = useState(1);

//   const totalPages = Math.ceil(positions.length / ITEMS_PER_PAGE);
//   const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
//   const endIndex = startIndex + ITEMS_PER_PAGE;
//   const currentTableData = positions.slice(startIndex, endIndex);

//   return (
//     <div className="space-y-4">
//       <div className="mb-13">
//         <h1 className="text-2xl font-bold text-[#046241] tracking-tight">
//           Positions Management
//         </h1>
//         <p className="text-slate-500 text-xs mt-1">
//           Review and manage the current available positions.
//         </p>
//       </div>

//       <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
//         <DataTable
//           columns={columns}
//           data={currentTableData}
//           isLoading={isLoading}
//         />

//         {/* Pagination Footer */}
//         <div className="flex items-center justify-between px-4 py-4 border-t border-slate-100">
//           <div className="text-sm text-slate-500">
//             Showing {startIndex + 1} to {Math.min(endIndex, positions.length)}{" "}
//             of {positions.length} entries
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
//     </div>
//   );
// }


























// import { type ColumnDef } from "@tanstack/react-table";
// import { useState } from "react";
// import { cn } from "@/lib/utils";

// import { useFetchPositions, type PositionDataType } from "../api/application/ApplicationFetchAPI";

// import { Badge } from "@/components/ui/badge";
// import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, } from "@/components/ui/pagination";
// import {  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
// import { DataTable } from "@/components/ui/table/data-table";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";

// import { Edit } from "lucide-react";



// const ITEMS_PER_PAGE = 10;

// const statusConfig: Record<string, { label: string; className: string }> = {
//   open: {
//     label: "Open",
//     className: "border-emerald-200 bg-emerald-50 text-emerald-700",
//   },
//   closed: {
//     label: "Closed",
//     className: "border-red-100 bg-red-50 text-red-600",
//   },
//   draft: {
//     label: "Draft",
//     className: "border-slate-200 bg-slate-50 text-slate-500",
//   },
// };

// const columns = ( onEdit: (position: PositionDataType) => void ): ColumnDef<PositionDataType>[] => [
//   {
//     accessorKey: "title",
//     header: "Position Title",
//     cell: ({ row }) => (
//       <span className="font-semibold">{row.getValue("title")}</span>
//     ),
//     size: 250,
//   },
//   {
//     accessorKey: "desc",
//     header: "Description",
//     size: 400,
//   },
//   {
//     accessorKey: "status",
//     header: "Status",
//     size: 120,
//     cell: ({ row }) => {
//       const status = (row.getValue("status") as string)?.toLowerCase();
//       const config = statusConfig[status] ?? {
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
//     id: "actions",
//     header: "Actions",
//     cell: ({ row }) => (
//       <Button
//         variant="ghost"
//         size="sm"
//         onClick={() => onEdit(row.original)}
//         className="text-[#046241] hover:text-[#046241] hover:bg-emerald-50"
//       >
//         <Edit className="h-4 w-4 mr-2" />
//         Edit
//       </Button>
//     ),
//   },
// ];

// export default function Positions() {
//   const { positions, isLoading } = useFetchPositions();
//   const [currentPage, setCurrentPage] = useState(1);

//   // State for the Modal
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedPosition, setSelectedPosition] = useState<PositionDataType | null>(null);

//   const handleEditClick = (position: PositionDataType) => {
//     setSelectedPosition(position);
//     setIsModalOpen(true);
//   };

//   const handleSave = () => {
//     // Logic to update Supabase goes here
//     console.log("Saving changes for:", selectedPosition);
//     setIsModalOpen(false);
//   };

//   const totalPages = Math.ceil(positions.length / ITEMS_PER_PAGE);
//   const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
//   const endIndex = startIndex + ITEMS_PER_PAGE;
//   const currentTableData = positions.slice(startIndex, endIndex);

//   return (
//     <div className="space-y-4">
//       <div className="mb-13">
//         <h1 className="text-2xl font-bold text-[#046241] tracking-tight">
//           Positions Management
//         </h1>
//         <p className="text-slate-500 text-xs mt-1">
//           Review and manage the current available positions.
//         </p>
//       </div>

//       <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
//         <DataTable
//           columns={columns(handleEditClick)}
//           data={currentTableData}
//           isLoading={isLoading}
//         />

//         {/* Pagination Footer */}
//         <div className="flex items-center justify-between px-4 py-4 border-t border-slate-100">
//           <div className="text-sm text-slate-500">
//             Showing {startIndex + 1} to {Math.min(endIndex, positions.length)}{" "}
//             of {positions.length} entries
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

//         <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
//           <DialogContent className="sm:max-w-[500px] p-10">
//             <DialogHeader>
//               <DialogTitle className="text-[#046241] font-bold text-2xl">
//                 Edit Position
//               </DialogTitle>
//             </DialogHeader>

//             {selectedPosition && (
//               <div className="grid gap-4 py-4">
//                 <div className="grid gap-2">
//                   <Label htmlFor="title">Position Title</Label>
//                   <Input
//                     id="title"
//                     value={selectedPosition.title}
//                     className="h-auto py-3 px-3 bg-white border border-[#133020]/10 rounded-md focus:border-[#FFB347] focus:ring-4 focus:ring-[#FFB347]/10 text-[#133020] text-sm font-bold placeholder:text-[#133020]/20 hover:border-[#133020]/30"
//                     onChange={(e) =>
//                       setSelectedPosition({
//                         ...selectedPosition,
//                         title: e.target.value,
//                       })
//                     }
//                   />
//                 </div>
//                 <div className="grid gap-2">
//                   <Label htmlFor="desc">Description</Label>
//                   <Textarea
//                     id="desc"
//                     rows={6} // Increased rows for better visibility
//                     value={selectedPosition.desc}
//                     onChange={(e) =>
//                       setSelectedPosition({
//                         ...selectedPosition,
//                         desc: e.target.value,
//                       })
//                     }
//                     className="resize-none overflow-y-auto min-h-[120px] max-h-[200px]"
//                   />
//                   <p className="text-[10px] text-slate-400">
//                     Character count: {selectedPosition.desc?.length || 0}
//                   </p>
//                 </div>
//                 {/* You can add a Status Select dropdown here as well */}
//               </div>
//             )}

//             <DialogFooter>
//               <Button variant="outline" onClick={() => setIsModalOpen(false)}>
//                 Cancel
//               </Button>
//               <Button
//                 className="bg-[#046241] hover:bg-[#034d33]"
//                 onClick={handleSave}
//               >
//                 Save Changes
//               </Button>
//             </DialogFooter>
//           </DialogContent>
//         </Dialog>
//       </div>
//     </div>
//   );
// }

















// import { type ColumnDef } from "@tanstack/react-table";
// import { useState } from "react";
// import { cn } from "@/lib/utils";

// //components
// import { useFetchPositions, type PositionDataType } from "../api/application/ApplicationFetchAPI";
// import { Badge } from "@/components/ui/badge";
// import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
// import { Dialog, DialogContent, DialogHeader,DialogTitle, DialogFooter } from "@/components/ui/dialog";
// import { DataTable } from "@/components/ui/table/data-table";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
// import { toast } from "sonner";


// //icons
// import { Edit, Loader2, Plus } from "lucide-react";

// //helper/hooks
// import { useForm } from "@/hooks/useForm";

// //request
// import { useUpdatePosition } from "../api/position/positionUpdateAPI";

// const ITEMS_PER_PAGE = 10;

// const statusConfig: Record<string, { label: string; className: string }> = {
//   open: {
//     label: "Open",
//     className: "border-emerald-200 bg-emerald-50 text-emerald-700",
//   },
//   closed: {
//     label: "Closed",
//     className: "border-red-100 bg-red-50 text-red-600",
//   },
//   draft: {
//     label: "Draft",
//     className: "border-slate-200 bg-slate-50 text-slate-500",
//   },
// };

// const columns = (
//   onEdit: (position: PositionDataType) => void,
// ): ColumnDef<PositionDataType>[] => [
//   {
//     accessorKey: "title",
//     header: "Position Title",
//     cell: ({ row }) => (
//       <span
//         className="font-semibold block truncate"
//         title={row.getValue("title")} // This shows the full text on hover
//       >
//         {row.getValue("title")}
//       </span>
//     ),
//     size: 250,
//   },
//   {
//     accessorKey: "desc",
//     header: "Description",
//     size: 400,
//   },
//   {
//     accessorKey: "status",
//     header: "Status",
//     size: 120,
//     cell: ({ row }) => {
//       const status = (row.getValue("status") as string)?.toLowerCase();
//       const config = statusConfig[status] ?? {
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
//     id: "actions",
//     header: "Actions",
//     cell: ({ row }) => (
//       <Button
//         variant="ghost"
//         size="sm"
//         onClick={() => onEdit(row.original)}
//         className="bg-gray-100 hover:bg-[#f3f2f2] shadow-sm text-gray-400 px-2 py-1 rounded cursor-pointer flex items-center justify-center h-8"
//       >
//         <Edit className="h-4 w-4 mr-2" color="#046241" />
//       </Button>
//     ),
//   },
// ];

// export default function Positions() {
//   const { positions, isLoading } = useFetchPositions();
//   const [currentPage, setCurrentPage] = useState(1);

//   // Modal States
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [isConfirmOpen, setIsConfirmOpen] = useState(false);

//   // Loading state
//   const [isUpdating, setIsUpdating] = useState(false);

//   // tate to track if creating or editing
//   const [isEditMode, setIsEditMode] = useState(true);

//   // 1. Initialize useForm with the same structure as data type
//   const { formData, handleInputChange, setFormData } = useForm({
//     id: "",
//     title: "",
//     desc: "",
//     status: "",
//   });

//   // Handle opening for CREATE
//   const handleCreateClick = () => {
//     setIsEditMode(false);
//     setFormData({ id: "", title: "", desc: "", status: "draft" });
//     setIsEditModalOpen(true);
//   };

//   // Handle opening for EDIT
//   const handleEditClick = (position: PositionDataType) => {
//     setIsEditMode(true);
//     setFormData({
//       id: position.id,
//       title: position.title,
//       desc: position.desc,
//       status: position.status,
//     });
//     setIsEditModalOpen(true);
//   };

//   // Step 1: User clicks "Save Changes" in the Edit Modal
//   const handleInitiateSave = () => {
//     setIsConfirmOpen(true);
//   };

//   // Step 2: User clicks "Confirm" in the Alert Dialog
//   const handleFinalUpdate = async (e: React.MouseEvent) => {
//     e.preventDefault();
//     setIsUpdating(true);
//     try {
//       if (isEditMode) {
//         await useUpdatePosition(formData);
//         toast.success("Position updated successfully");
//       } else {
//         // await useCreatePosition(formData);
//         toast.success("Position created successfully");
//       }

//       await new Promise((resolve) => setTimeout(resolve, 1000));
//       setIsConfirmOpen(false);
//       setIsEditModalOpen(false);
//       setTimeout(() => window.location.reload(), 500);
//     } catch (error) {
//       console.error("Operation failed", error);
//       toast.error("An error occurred. Please try again.");
//     } finally {
//       setIsUpdating(false);
//     }
//   };

//   const totalPages = Math.ceil(positions.length / ITEMS_PER_PAGE);
//   const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
//   const endIndex = startIndex + ITEMS_PER_PAGE;
//   const currentTableData = positions.slice(startIndex, endIndex);

//   return (
//     <div className="space-y-4">
//       <div className="flex justify-between items-end mb-8">
//         <div>
//           <h1 className="text-2xl font-bold text-[#046241] tracking-tight">
//             Positions Management
//           </h1>
//           <p className="text-slate-500 text-xs mt-1">
//             Review and manage the current available positions.
//           </p>
//         </div>

//         <Button
//           onClick={handleCreateClick}
//           className="bg-[#046241] hover:bg-[#034d33] text-white shadow-sm gap-2"
//         >
//           <Plus className="h-4 w-4" />
//           Create Position
//         </Button>
//       </div>

//       <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
//         <DataTable
//           columns={columns(handleEditClick)}
//           data={currentTableData}
//           isLoading={isLoading}
//         />

//         {/* Pagination Footer */}
//         <div className="flex items-center justify-between px-4 py-4 border-t border-slate-100">
//           <div className="text-sm text-slate-500">
//             Showing {startIndex + 1} to {Math.min(endIndex, positions.length)}{" "}
//             of {positions.length} entries
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

//         <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
//           <DialogContent className="sm:max-w-125 p-10">
//             <DialogHeader>
//               <DialogTitle className="text-[#046241] font-bold text-2xl">
//                 {isEditMode ? "Edit Position" : "Create New Position"}
//               </DialogTitle>
//             </DialogHeader>

//             <div className="grid gap-4 py-4">
//               <div className="flex flex-row gap-4 items-start">
//                 {/* Position Title - using flex-1 to take remaining space */}
//                 <div className="grid gap-2 flex-1">
//                   <Label htmlFor="title">Position Title</Label>
//                   <Input
//                     id="title"
//                     value={formData.title}
//                     className="h-10 py-3 px-3 bg-white border border-[#133020]/10 rounded-md focus:border-[#046241] focus:ring-2 focus:ring-[#046241]/10 text-[#133020] text-sm font-medium shadow-sm"
//                     onChange={(e) => handleInputChange("title", e.target.value)}
//                   />
//                 </div>

//                 {/* Status - fixed width (e.g., w-40) */}
//                 <div className="grid gap-2 w-30">
//                   <Label htmlFor="status">Status</Label>
//                   <Select
//                     value={formData.status}
//                     onValueChange={(value) =>
//                       handleInputChange("status", value)
//                     }
//                   >
//                     <SelectTrigger className="h-10! w-full bg-white border border-[#133020]/10 focus:ring-[#046241]/10 px-3 shadow-sm">
//                       <SelectValue placeholder="Select status" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="open">Open</SelectItem>
//                       <SelectItem value="closed">Closed</SelectItem>
//                       <SelectItem value="draft">Draft</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </div>

//               <div className="grid gap-2">
//                 <Label htmlFor="desc">Description</Label>
//                 <Textarea
//                   id="desc"
//                   placeholder="Enter Description"
//                   rows={4}
//                   value={formData.desc}
//                   className="resize-none overflow-y-auto min-h-30 max-h-50 bg-white border border-[#133020]/10 rounded-md py-3 px-3 text-[#133020] text-sm font-medium shadow-sm transition-all focus-visible:outline-none focus-visible:border-[#046241] focus-visible:ring-2 focus-visible:ring-[#046241]/10 focus-visible:ring-offset-0"
//                   onChange={(e) => handleInputChange("desc", e.target.value)}
//                 />
//                 <p className="text-[10px] text-slate-400">
//                   Character count: {formData.desc?.length || 0}
//                 </p>
//               </div>
//             </div>

//             <DialogFooter>
//               <Button
//                 variant="outline"
//                 onClick={() => setIsEditModalOpen(false)}
//               >
//                 Cancel
//               </Button>
//               <Button
//                 className="bg-[#046241] hover:bg-[#034d33] px-5"
//                 onClick={handleInitiateSave}
//               >
//                 {isEditMode ? "Update" : "Create"}
//               </Button>
//             </DialogFooter>
//           </DialogContent>
//         </Dialog>

//         {/* Confirmation Alert Dialog */}
//         <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
//           <AlertDialogContent className="rounded-xl border-[#133020]/10 p-8">
//             <AlertDialogHeader>
//               <AlertDialogTitle className="text-[#046241] font-bold text-2xl">
//                 Confirm Update
//               </AlertDialogTitle>
//               <AlertDialogDescription className="py-4 text-md">
//                 Are you sure you want to update the{" "}
//                 <span className="font-semibold text-[#046241]">
//                   "{formData.title}"
//                 </span>{" "}
//                 position?
//                 <br />
//                 <span className="text-red-500 italic text-xs">
//                   * This action will modify the live listing details
//                   immediately.
//                 </span>
//               </AlertDialogDescription>
//             </AlertDialogHeader>
//             <AlertDialogFooter>
//               <AlertDialogCancel
//                 disabled={isUpdating} // Disable cancel while updating
//                 className="border-slate-200 text-slate-500"
//               >
//                 Cancel
//               </AlertDialogCancel>

//               {/* 4. Updated Action Button with Loading State */}
//               <Button
//                 onClick={handleFinalUpdate}
//                 disabled={isUpdating}
//                 className="bg-[#046241] hover:bg-[#034d33] text-white min-w-23"
//               >
//                 {isUpdating ? (
//                   <>
//                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                     Updating...
//                   </>
//                 ) : (
//                   "Confirm"
//                 )}
//               </Button>
//             </AlertDialogFooter>
//           </AlertDialogContent>
//         </AlertDialog>
//       </div>
//     </div>
//   );
// }


import { type ColumnDef } from "@tanstack/react-table";
import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";

//components
import {
  useFetchPositions,
  type PositionDataType,
} from "../api/application/ApplicationFetchAPI";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { DataTable } from "@/components/ui/table/data-table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

//icons
import { Edit, Loader2, Plus, Search } from "lucide-react";

//helper/hooks
import { useForm } from "@/hooks/useForm";

//REQUESTTTTT
// fetch
import { useUpdatePosition } from "../api/position/positionUpdateAPI";
//post
import { usePostPosition } from "../api/position/positionPostAPI";


const ITEMS_PER_PAGE = 10;


const statusConfig: Record<string, { label: string; className: string }> = {
  open: {
    label: "Open",
    className: "border-emerald-200 bg-emerald-50 text-emerald-700",
  },
  closed: {
    label: "Closed",
    className: "border-red-100 bg-red-50 text-red-600",
  },
};

const columns = (
  onEdit: (position: PositionDataType) => void,
): ColumnDef<PositionDataType>[] => [
  {
    accessorKey: "title",
    header: "Position Title",
    cell: ({ row }) => (
      <span
        className="font-semibold block truncate"
        title={row.getValue("title")}
      >
        {row.getValue("title")}
      </span>
    ),
    size: 250,
  },
  {
    accessorKey: "desc",
    header: "Description",
    cell: ({ row }) => (
      <span
        className="font-normal block truncate text-slate-500"
        title={row.getValue("desc")}
      >
        {row.getValue("desc")}
      </span>
    ),
    size: 350,
  },
  {
    accessorKey: "status",
    header: "Status",
    size: 120,
    cell: ({ row }) => {
      const status = (row.getValue("status") as string)?.toLowerCase();
      const config = statusConfig[status] ?? {
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
    id: "actions",
    header: () => (
      <div className="text-center font-bold text-[#046241]">Actions</div>
    ),
    size: 100,
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onEdit(row.original)}
          className={cn(
            // Transparent base with no border to keep it "invisible" until needed
            "group relative h-9 w-9 bg-transparent transition-all duration-300 ease-out",
            // Soft rounded shape with a subtle background glow on hover
            "hover:bg-emerald-600/20 hover:rounded-full",
            // A subtle "pop" animation
            "active:scale-90",
          )}
        >
          {/* The Icon: Deep green to match your theme, with a slight rotate effect on hover */}
          <Edit className="h-4.5 w-4.5 text-[#046241] transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />

          {/* Optional: A very faint ping animation to draw attention when hovered */}
          <span className="absolute inset-0 rounded-full bg-[#046241]/20 scale-0 group-hover:scale-100 transition-transform duration-300 opacity-0 group-hover:opacity-100" />
        </Button>
      </div>
    ),
  },
];

export default function Positions() {
  const { positions, isLoading } = useFetchPositions();
  const [currentPage, setCurrentPage] = useState(1);

  //search state
  const [searchTerm, setSearchTerm] = useState("");

  // filter/dropdown state
  const [statusFilter, setStatusFilter] = useState("all");

  // Modal States
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  // Loading state
  const [isUpdating, setIsUpdating] = useState(false);

  // tate to track if creating or editing
  const [isEditMode, setIsEditMode] = useState(true);

  // 1. Initialize useForm with the same structure as data type
  const { formData, handleInputChange, setFormData } = useForm({
    id: "",
    title: "",
    desc: "",
    status: "",
  });


  //error state for required fields
  const [errors, setErrors] = useState({
    title: false,
    desc: false,
    status: false,
  });



  // --- Search & Filtering Logic ---
  const filteredPositions = useMemo(() => {
    return positions.filter((pos) => {
      const title = pos.title || "";
      const description = pos.desc || "";
      const status = pos.status || "";

      // Search matches?
      const matchesSearch =
        title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        description.toLowerCase().includes(searchTerm.toLowerCase());

      // Status matches?
      const matchesStatus =
        statusFilter === "all" ||
        status.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter, positions]);




  // Handle opening for CREATE
  const handleCreateClick = () => {
    setIsEditMode(false);
    setErrors({ title: false, desc: false, status: false }); // Reset errors
    setFormData({ id: "", title: "", desc: "", status: "open" });
    setIsEditModalOpen(true);
  };

  // Handle opening for EDIT
  const handleEditClick = (position: PositionDataType) => {
    setIsEditMode(true);
    setErrors({ title: false, desc: false, status: false }); // Reset errors
    setFormData({
      id: position.id,
      title: position.title,
      desc: position.desc,
      status: position.status,
    });
    setIsEditModalOpen(true);
  };



  // Step 1: User clicks "Save Changes" in the Edit Modal
  const handleInitiateSave = () => {
    // If editing, skip validation and go straight to confirmation
    if (isEditMode) {
      setIsConfirmOpen(true);
      return;
    }

    // Validation Logic for CREATE mode only
    const newErrors = {
      title: !formData.title?.trim(),
      desc: !formData.desc?.trim(),
      status: !formData.status?.trim(),
    };

    setErrors(newErrors);

    // If any field in newErrors is true, stop here
    if (Object.values(newErrors).some((hasError) => hasError)) {
      toast.error("Required Fields Missing", {
        description: "Please fill in all fields before creating a new position.",
      });
      return;
    }

    setIsConfirmOpen(true);
  };




  // Step 2: User clicks "Confirm" in the Alert Dialog
  const handleFinalUpdate = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      if (isEditMode) {
        await useUpdatePosition(formData);
        toast.success("Position updated successfully");
      } else {
        await usePostPosition(formData);
        toast.success("Position created successfully");
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsConfirmOpen(false);
      setIsEditModalOpen(false);
      setTimeout(() => window.location.reload(), 500);
    } catch (error) {
      console.error("Operation failed", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  const totalPages = Math.ceil(filteredPositions.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentTableData = filteredPositions.slice(startIndex, endIndex);

  return (
    <div className="space-y-4">
      {/* 1. TOP HEADER SECTION */}
      <div className="pb-13">
        <h1 className="text-4xl font-bold text-[#046241] tracking-tight">
          Positions Management
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Review and manage the current available positions.
        </p>
      </div>

      {/* 2. ACTION ROW (Search Left, Button Right) */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 pb-3">
        {/* Left Side: Search and Filter */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto flex-1">
          {/* Search Bar */}
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search positions..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10 py-5 bg-white shadow-sm border border-slate-100 focus-visible:ring-1 focus-visible:ring-[#417256]"
            />
          </div>

          {/* Status Select Filter */}
          <Select
            value={statusFilter}
            onValueChange={(value) => {
              setStatusFilter(value);
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-full sm:w-40 h-10.5! bg-white border border-slate-100 shadow-sm focus:ring-[#417256]">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Right Side: Create Button */}
        <Button
          onClick={handleCreateClick}
          className="w-full md:w-auto bg-[#046241] hover:bg-[#046241]/90 text-white shadow-sm gap-2 py-5! px-4"
        >
          <Plus className="h-4 w-4" />
          Add Position
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <DataTable
          columns={columns(handleEditClick)}
          data={currentTableData}
          isLoading={isLoading}
        />

        {/* Pagination Footer */}
        <div className="flex items-center justify-between px-4 py-4 border-t border-slate-100">
          <div className="text-sm text-slate-500">
            Showing {startIndex + 1} to{" "}
            {Math.min(endIndex, filteredPositions.length)} of{" "}
            {filteredPositions.length} entries
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

        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="sm:max-w-125 p-10">
            <DialogHeader>
              <DialogTitle className="text-[#046241] font-bold text-2xl">
                {isEditMode ? "Edit Position" : "Create New Position"}
              </DialogTitle>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="flex flex-row gap-4 items-start">
                {/* Position Title - using flex-1 to take remaining space */}
                <div className="grid gap-2 flex-1">
                  <Label
                    htmlFor="title"
                    className={cn(errors.title && "text-red-500")}
                  >
                    Position Title{" "}
                    {isEditMode ? "" : <span className="text-red-500">*</span>}
                  </Label>
                  <Input
                    id="title"
                    value={formData.title}
                    className={cn(
                      "h-10 py-3 px-3 bg-white border rounded-md shadow-sm",
                      errors.title
                        ? "border-red-500 focus:ring-red-200"
                        : "border-[#133020]/10 focus:border-[#046241]",
                    )}
                    onChange={(e) => {
                      handleInputChange("title", e.target.value);
                      if (errors.title) setErrors({ ...errors, title: false }); // Clear error on type
                    }}
                  />
                  {errors.title && (
                    <span className="text-[10px] text-red-500 font-medium">
                      This field is required
                    </span>
                  )}
                </div>

                {/* Status - fixed width (e.g., w-40) */}
                <div className="grid gap-2 w-30">
                  <Label htmlFor="status">
                    Status{" "}
                    {isEditMode ? "" : <span className="text-red-500">*</span>}
                  </Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) =>
                      handleInputChange("status", value)
                    }
                  >
                    <SelectTrigger className="h-10! w-full bg-white border border-[#133020]/10 focus:ring-[#046241]/10 px-3 shadow-sm">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Description Textarea */}
              <div className="grid gap-2">
                <Label
                  htmlFor="desc"
                  className={cn(errors.desc && "text-red-500")}
                >
                  Description{" "}
                  {isEditMode ? "" : <span className="text-red-500">*</span>}
                </Label>
                <Textarea
                  id="desc"
                  value={formData.desc}
                  className={cn(
                    "resize-none min-h-30 bg-white border rounded-md shadow-sm",
                    errors.desc
                      ? "border-red-500 focus-visible:ring-red-200"
                      : "border-[#133020]/10 focus-visible:border-[#046241]",
                  )}
                  onChange={(e) => {
                    handleInputChange("desc", e.target.value);
                    if (errors.desc) setErrors({ ...errors, desc: false });
                  }}
                />
                <div className="flex justify-between items-center">
                  {errors.desc ? (
                    <span className="text-[10px] text-red-500 font-medium">
                      Please provide a description
                    </span>
                  ) : (
                    <p className="text-[10px] text-slate-400">
                      Character count: {formData.desc?.length || 0}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                className="py-5 px-4"
                onClick={() => setIsEditModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-[#046241] hover:bg-[#034d33] px-6 py-5"
                onClick={handleInitiateSave}
              >
                {isEditMode ? "Update" : "Create"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Confirmation Alert Dialog */}
        <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
          <AlertDialogContent className="rounded-xl border-[#133020]/10 p-8">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-[#046241] font-bold text-2xl">
                {isEditMode ? "Confirm Update" : "Create Position"}
              </AlertDialogTitle>
              <AlertDialogDescription className="py-4 text-md">
                {isUpdating ? (
                  <>
                    Are you sure you want to update the{" "}
                    <span className="font-semibold text-[#046241]">
                      "{formData.title}"
                    </span>{" "}
                    position?
                    <br />
                    <span className="text-red-500 italic text-xs">
                      * This action will modify the live listing details
                      immediately.
                    </span>
                  </>
                ) : (
                  <>
                    Are you sure you want to create the{" "}
                    <span className="font-semibold text-[#046241]">
                      "{formData.title}"
                    </span>{" "}
                    position?
                    <br />
                    <span className="text-red-500 italic text-xs">
                      * This action will modify the live listing details
                      immediately.
                    </span>
                  </>
                )}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                disabled={isUpdating} // Disable cancel while updating
                className="border-slate-200 text-slate-500"
              >
                Cancel
              </AlertDialogCancel>

              {/* 4. Updated Action Button with Loading State */}
              <Button
                onClick={handleFinalUpdate}
                disabled={isUpdating}
                className="bg-[#046241] hover:bg-[#034d33] text-white min-w-23"
              >
                {isUpdating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Confirm"
                )}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
