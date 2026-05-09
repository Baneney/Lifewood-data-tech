import { type ColumnDef } from "@tanstack/react-table";
import { useState, useMemo, useEffect } from "react";
import { cn } from "@/lib/utils";

//components
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
import { Edit, Loader2, Plus, Search, Briefcase, CheckCircle, XCircle, AlertCircle } from "lucide-react";

//helper/hooks
import { useForm } from "@/hooks/useForm";
import { useLoadingBar } from "@/components/LoadingBarContext";

//REQUESTTTTT
//fetch
import {
  useFetchPositions,
  type PositionDataType,
} from "../../../api/application/ApplicationFetchAPI";
// update
import { useUpdatePosition } from "../../../api/position/positionUpdateAPI";
//post
import { usePostPosition } from "../../../api/position/positionPostAPI";


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
  urgent: {
    label: "Urgent",
    className:
      "border-amber-200 bg-amber-50 text-amber-700 animate-pulse-subtle",
  },
  onhold: {
    label: "OnHold",
    // Blue indicates a process that is temporarily paused but not terminated
    className: "border-blue-200 bg-blue-50 text-blue-700",
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
    size: 400,
  },
  {
    accessorKey: "status",
    header: "Status",
    size: 50,
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
      <div className="text-center">Actions</div>
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
  const { positions, isLoading, refetch } = useFetchPositions();
  const [currentPage, setCurrentPage] = useState(1);
  const { setLoading } = useLoadingBar();

  //search state
  const [searchTerm, setSearchTerm] = useState("");

  // filter/dropdown state
  const [statusFilter, setStatusFilter] = useState("all");

  // Modal States
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  // Loading state
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => { setLoading(isLoading || isUpdating); }, [isLoading, isUpdating]);


  // tate to track if creating or editing
  const [isEditMode, setIsEditMode] = useState(true);

  // 1. Initialize useForm with the same structure as data type
  const { formData, handleInputChange, setFormData } = useForm({
    id: "",
    title: "",
    desc: "",
    status: "",
    deployment: "",
    type: "",
  });


  //error state for required fields
  const [errors, setErrors] = useState({
    title: false,
    desc: false,
    status: false,
    deployment: false,
    type: false,
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
    setErrors({ title: false, desc: false, status: false, deployment: false, type: false }); // Reset errors
    setFormData({ id: "", title: "", desc: "", status: "open", deployment: "", type: "" });
    setIsEditModalOpen(true);
  };

  // Handle opening for EDIT
  const handleEditClick = (position: PositionDataType) => {
    setIsEditMode(true);
    setErrors({ title: false, desc: false, status: false, deployment: false, type: false }); // Reset errors
    setFormData({
      id: position.id,
      title: position.title,
      desc: position.desc,
      status: position.status,
      deployment: position.deployment,
      type: position.type,
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
      deployment: !formData.deployment?.trim(),
      type: !formData.type?.trim(),
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
        const duplicate = positions.some(
          (p) => p.id !== formData.id &&
            p.title.trim().toLowerCase() === formData.title.trim().toLowerCase()
        );
        if (duplicate) {
          toast.error("Position already exists");
          setIsUpdating(false);
          return;
        }
        await useUpdatePosition(formData);
        console.log("DATA", formData)
        toast.success("Position updated successfully");
      } else {
        const duplicate = positions.some(
          (p) => p.title.trim().toLowerCase() === formData.title.trim().toLowerCase()
        );
        if (duplicate) {
          toast.error("Position already exists");
          setIsUpdating(false);
          return;
        }
        await usePostPosition(formData);
        console.log("DATA", formData);
        toast.success("Position created successfully");
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsConfirmOpen(false);
      setIsEditModalOpen(false);
      await refetch();
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

  const totalPositions = positions.length;
  const openCount = positions.filter((p) => p.status?.toLowerCase() === "open").length;
  const closedCount = positions.filter((p) => p.status?.toLowerCase() === "closed").length;
  const urgentCount = positions.filter((p) => p.status?.toLowerCase() === "urgent").length;


  const cardData = [
    {
      label: "Total Positions",
      value: totalPositions,
      sub: "All positions listed",
      icon: Briefcase,
      type: "total",
    },
    {
      label: "Urgent",
      value: urgentCount,
      sub: "Requires immediate attention",
      icon: AlertCircle,
      type: "urgent",
    }, // Replacing Draft
    {
      label: "Open",
      value: openCount,
      sub: "Actively accepting",
      icon: CheckCircle,
      type: "open",
    },
    {
      label: "Closed",
      value: closedCount,
      sub: "No longer accepting",
      icon: XCircle,
      type: "closed",
    },
  ];
  return (
    <div className="space-y-4">
      {/* 1. TOP HEADER SECTION */}
      <div className="pb-6">
        <h1 className="text-4xl font-bold text-[#046241] tracking-tight">
          Positions Management
        </h1>
        <p
          className="text-sm mt-1"
          style={{ color: "var(--admin-text-muted)" }}
        >
          Review and manage the current available positions.
        </p>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 pb-10">
        {cardData.map(({ label, value, sub, icon: Icon, type }) => {
          const isUrgent = type === "urgent";

          return (
            <div
              key={label}
              className={cn(
                "group relative rounded-2xl border p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-default",
                isUrgent &&
                  value > 0 &&
                  "border-amber-200 shadow-md shadow-amber-500/10",
              )}
              style={{
                backgroundColor: "var(--admin-surface)",
                borderColor:
                  isUrgent && value > 0
                    ? undefined
                    : "var(--admin-border-soft)",
              }}
            >
              <div
                className={cn(
                  "absolute -right-4 -bottom-4 w-20 h-20 rounded-full group-hover:scale-[3] transition-all duration-700 opacity-50",
                  isUrgent && "group-hover:bg-amber-50",
                )}
                style={{ backgroundColor: "var(--admin-surface-2)" }}
              />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div className="relative">
                    {/* Icon Box: Green by default, Amber if Urgent with value */}
                    <div
                      className={cn(
                        "w-12 h-12 bg-[#034E34] rounded-xl flex items-center justify-center shadow-md shadow-[#034E34]/20 group-hover:rotate-6 transition-transform duration-300",
                        isUrgent &&
                          value > 0 &&
                          "bg-amber-500 shadow-amber-500/20",
                      )}
                    >
                      <Icon
                        size={20}
                        className={cn(
                          "text-[#FFB347]",
                          isUrgent && value > 0 && "text-white",
                        )}
                      />
                    </div>
                    <div
                      className={cn(
                        "absolute inset-0 bg-[#FFB347] blur-xl opacity-0 group-hover:opacity-20 transition-opacity",
                        isUrgent && "bg-amber-400",
                      )}
                    />
                  </div>

                  {/* Top Right Badge: Shows "Priority" for Urgent or "Live" for others */}
                  <div
                    className={cn(
                      "flex items-center gap-1.5 bg-[#034E34]/5 px-2.5 py-1 rounded-full border border-[#034E34]/10",
                      isUrgent && value > 0 && "bg-amber-50 border-amber-200",
                    )}
                  >
                    <span className="relative flex h-1.5 w-1.5">
                      <span
                        className={cn(
                          "animate-ping absolute inline-flex h-full w-full rounded-full bg-[#034E34] opacity-75",
                          isUrgent && "bg-amber-500",
                        )}
                      />
                      <span
                        className={cn(
                          "relative inline-flex rounded-full h-1.5 w-1.5 bg-[#034E34]",
                          isUrgent && "bg-amber-500",
                        )}
                      />
                    </span>
                    <span
                      className={cn(
                        "text-[9px] font-black text-[#034E34] uppercase tracking-widest",
                        isUrgent && value > 0 && "text-amber-600",
                      )}
                    >
                      {isUrgent ? "Priority" : "Live"}
                    </span>
                  </div>
                </div>

                {/* Value and Label */}
                <div className="flex items-baseline gap-1 mb-1">
                  <span
                    className={cn(
                      "text-4xl font-black tracking-tighter italic group-hover:text-[#034E34] transition-colors",
                      isUrgent && value > 0 && "group-hover:text-amber-600",
                    )}
                    style={{ color: "var(--admin-text)" }}
                  >
                    {value}
                  </span>
                  <span
                    className={cn(
                      "w-1.5 h-1.5 rounded-full bg-[#FFB347] mb-1",
                      isUrgent && value > 0 && "bg-amber-500",
                    )}
                  />
                </div>

                <p
                  className="text-[10px] font-black uppercase tracking-widest mb-3"
                  style={{ color: "var(--admin-text-muted)" }}
                >
                  {label}
                </p>

                {/* Footer Decoration and Subtext */}
                <div className="flex flex-col gap-1.5">
                  <div
                    className={cn(
                      "h-0.5 w-6 bg-[#FFB347] group-hover:w-full transition-all duration-500 rounded-full",
                      isUrgent && value > 0 && "bg-amber-500",
                    )}
                  />
                  <p className="text-[10px] text-[#034E34]/60 font-bold uppercase tracking-tight italic">
                    {sub}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
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
              className="pl-10 py-5 bg-white dark:bg-[#15291e] shadow-sm border border-slate-100 focus-visible:ring-1 focus-visible:ring-[#417256]"
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
              <SelectItem value="urgent">Urgent</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="onhold">OnHold</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
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

      <div
        className="rounded-xl shadow-sm overflow-hidden"
        style={{
          backgroundColor: "var(--admin-surface)",
          border: "1px solid var(--admin-border-soft)",
        }}
      >
        <DataTable
          columns={columns(handleEditClick)}
          data={currentTableData}
          isLoading={isLoading}
        />

        {/* Pagination Footer */}
        <div
          className="flex items-center justify-between px-4 py-3"
          style={{ borderTop: "1px solid var(--admin-border-soft)" }}
        >
          <div className="text-xs" style={{ color: "var(--admin-text-muted)" }}>
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
                        className={cn(
                          currentPage === page &&
                            "bg-[#046241] text-white border-[#046241] hover:bg-[#046241]/90 hover:text-white",
                        )}
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
              <DialogTitle className="text-[#046241] dark:text-[#06ba72] font-bold text-2xl">
                {isEditMode ? "Edit Position" : "Create New Position"}
              </DialogTitle>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              {/* Row 1: Title + Status */}
              <div className="flex flex-row gap-4 items-start">
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
                      "h-10 py-3 px-3 bg-white dark:bg-[#141414] border rounded-md shadow-sm",
                      errors.title
                        ? "border-red-500 focus:ring-red-200"
                        : "border-[#133020]/10 focus:border-[#046241]",
                    )}
                    onChange={(e) => {
                      handleInputChange("title", e.target.value);
                      if (errors.title) setErrors({ ...errors, title: false });
                    }}
                  />
                  {errors.title && (
                    <span className="text-[10px] text-red-500 font-medium">
                      This field is required
                    </span>
                  )}
                </div>

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
                      <SelectItem value="urgent">Urgent</SelectItem>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="onhold">OnHold</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Row 2: Deployment + Type */}
              <div className="flex flex-row gap-4 items-start">
                <div className="grid gap-2 flex-1">
                  <Label
                    htmlFor="deployment"
                    className={cn(errors.deployment && "text-red-500")}
                  >
                    Deployment{" "}
                    {isEditMode ? "" : <span className="text-red-500">*</span>}
                  </Label>
                  <Select
                    value={formData.deployment}
                    onValueChange={(value) => {
                      handleInputChange("deployment", value);
                      if (errors.deployment)
                        setErrors({ ...errors, deployment: false });
                    }}
                  >
                    <SelectTrigger
                      className={cn(
                        "h-10! w-full bg-white border px-3 shadow-sm",
                        errors.deployment
                          ? "border-red-500"
                          : "border-[#133020]/10 focus:ring-[#046241]/10",
                      )}
                    >
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="onsite">On-Site</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                      <SelectItem value="remote">Remote</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.deployment && (
                    <span className="text-[10px] text-red-500 font-medium">
                      This field is required
                    </span>
                  )}
                </div>

                <div className="grid gap-2 flex-1">
                  <Label
                    htmlFor="type"
                    className={cn(errors.type && "text-red-500")}
                  >
                    Type{" "}
                    {isEditMode ? "" : <span className="text-red-500">*</span>}
                  </Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => {
                      handleInputChange("type", value);
                      if (errors.type) setErrors({ ...errors, type: false });
                    }}
                  >
                    <SelectTrigger
                      className={cn(
                        "h-10! w-full bg-white border px-3 shadow-sm",
                        errors.type
                          ? "border-red-500"
                          : "border-[#133020]/10 focus:ring-[#046241]/10",
                      )}
                    >
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fulltime">Full-time</SelectItem>
                      <SelectItem value="parttime">Part-time</SelectItem>
                      <SelectItem value="internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.type && (
                    <span className="text-[10px] text-red-500 font-medium">
                      This field is required
                    </span>
                  )}
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
                className="py-5 px-4 cursor-pointer"
                onClick={() => setIsEditModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-[#046241] dark:bg-[#288660]  hover:bg-[#62c29f] dark:text-white px-6 py-5 cursor-pointer"
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
              <AlertDialogTitle className="text-[#046241] dark:text-[#06ba72] font-bold text-2xl">
                {isEditMode ? "Confirm Update" : "Create Position"}
              </AlertDialogTitle>
              <AlertDialogDescription className="py-4 text-md dark:text-white/70">
                {isEditMode ? (
                  <>
                    Are you sure you want to update the{" "}
                    <span className="font-semibold text-[#046241] dark:text-white">
                      "{formData.title}"
                    </span>{" "}
                    position?
                    <br />
                    <span className="text-red-500 dark:text-red-400 italic text-xs">
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
                className="border-slate-200 dark:border-[#1c332a] text-slate-500 dark:text-[#1b845a]"
              >
                Cancel
              </AlertDialogCancel>

              {/* 4. Updated Action Button with Loading State */}
              <Button
                onClick={handleFinalUpdate}
                disabled={isUpdating}
                className="bg-[#046241] dark:bg-[#288660] hover:bg-[#62c29f] text-white min-w-23 cursor-pointer"
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
