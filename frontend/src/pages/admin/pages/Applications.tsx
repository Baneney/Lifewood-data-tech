import { type ColumnDef } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { useState, useMemo, useEffect } from "react";
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


// API Hooks
import { usePostLogs } from "../../api/logs/logPostAPI";
import { useApplications, type ApplicationDataType } from "../../api/application/ApplicationFetchAPI";


// Helpers & Hooks
import { capitalize } from "@/helpers/capitalize";
import { useAdmin } from "@/hooks/use-admin";
import { calculateBday } from "@/helpers/calculateBday";
import { useLoadingBar } from "@/components/LoadingBarContext";




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
  Users,
  Clock,
  Star,
  ListFilter,
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
    data: { status: string; potential: boolean; remarks: string; email: string; name: string; position: string; },
  ) => void,
): ColumnDef<ApplicationDataType>[] => [
  {
    accessorKey: "applicant.fname",
    header: "Applicant Name",
    cell: ({ row }) => {
      const { fname, lname } = row.original.applicant;
      return <span className="font-semibold">{capitalize(`${fname} ${lname}`)}</span>;
    },
    size: 200,
  },
  {
    accessorKey: "position.title",
    header: "Position Applied",
    size: 350,
    cell: ({ row }) => (
      <span
        className="block truncate"
        title={row.original.position.title}
      >
        {row.original.position.title}
      </span>
    ),
  },
  {
    accessorKey: "date_submitted",
    header: ({ column }) => (
      <div
        className="flex w-full gap-2 cursor-pointer"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Date Applied
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
                    <span>{`${app.applicant.dob} (${calculateBday(app.applicant.dob)})`}</span>
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
            <div className="absolute bottom-0 right-0 p-6 bg-linear-to-t from-white via-white to-transparent w-full">
              <button
                onClick={() =>
                  onUpdate(app.id, {
                    status: localStatus,
                    potential: localPotential,
                    remarks: localRemarks,
                    email: app.applicant.email,
                    name: `${app.applicant.fname} ${app.applicant.lname}`,
                    position: app.position.title,
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
  const { applications, isLoading, refetch } = useApplications();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { adminId } = useAdmin();
  const { setLoading } = useLoadingBar();

  useEffect(() => { setLoading(isLoading || isSubmitting); }, [isLoading, isSubmitting]);

  // Search and Filter State
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [cardFilter, setCardFilter] = useState<"all" | "pending" | "shortlisted" | "potential">("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Modal State
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingUpdate, setPendingUpdate] = useState<{
    id: string;
    status: string;
    potential: boolean;
    remarks: string;
    email: string; // Add this
    name: string; // Add this
    position: string;
  } | null>(null);

  // Card counts derived from full applications list
  const totalCount = applications.length;
  const pendingCount = useMemo(() => applications.filter((a) => a.current_status?.toLowerCase() === "pending").length, [applications]);
  const shortlistedCount = useMemo(() => applications.filter((a) => a.current_status?.toLowerCase() === "shortlisted").length, [applications]);
  const potentialCount = useMemo(() => applications.filter((a) => a.logs?.[0]?.potential === true).length, [applications]);

  // Filtered + sorted Data Logic
  const filteredData = useMemo(() => {
    const filtered = applications.filter((app) => {
      const fullName = `${app.applicant.fname} ${app.applicant.lname}`.toLowerCase();
      const role = app.position.title?.toLowerCase() || "";
      const search = searchTerm.toLowerCase();
      const matchesSearch = fullName.includes(search) || role.includes(search);
      const matchesStatus =
        statusFilter === "all" ||
        app.current_status?.toLowerCase() === statusFilter.toLowerCase();
      return matchesSearch && matchesStatus;
    });

    // Sort: card-filtered rows bubble to top
    if (cardFilter === "potential") {
      return [...filtered].sort((a, b) =>
        (b.logs?.[0]?.potential ? 1 : 0) - (a.logs?.[0]?.potential ? 1 : 0)
      );
    }
    if (cardFilter === "pending" || cardFilter === "shortlisted") {
      return [...filtered].sort((a, b) => {
        const aMatch = a.current_status?.toLowerCase() === cardFilter ? 1 : 0;
        const bMatch = b.current_status?.toLowerCase() === cardFilter ? 1 : 0;
        return bMatch - aMatch;
      });
    }
    return filtered;
  }, [applications, searchTerm, statusFilter, cardFilter]);

  // Reset to page 1 when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, cardFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentTableData = filteredData.slice(startIndex, endIndex);

  // Handlers
  const handleInitiateChange = (
    appId: string,
    data: { status: string; potential: boolean;  remarks: string; email: string; name: string; position: string; },
  ) => {
    setPendingUpdate({ id: appId, ...data });
    setConfirmOpen(true);
  };

  const handleConfirmUpdate = async () => {
    if (!pendingUpdate || !adminId) return;
    try {
      setIsSubmitting(true);
      setLoading(true);
      await usePostLogs({
        status: pendingUpdate.status,
        potential: pendingUpdate.potential,
        remarks: pendingUpdate.remarks,
        app_id: pendingUpdate.id,
        adm_id: adminId,
      });
      
      if (
        pendingUpdate.status === "hired" ||
        pendingUpdate.status === "not selected" ||
        pendingUpdate.status === "shortlisted"
      ) {
        const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

        await fetch(`${API_BASE_URL}/api/hired-or-rejected`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: pendingUpdate.email,
            name: pendingUpdate.name,
            status: pendingUpdate.status, // hired or not selected
            position: pendingUpdate.position,
            id: pendingUpdate.id,
          }),
        });
      }
        
      toast.success(`Status updated to ${pendingUpdate.status}`);
      await refetch();

      //refetch
      // useApplications()
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update status");
    } finally {
      setIsSubmitting(false);
      setLoading(false);
      setConfirmOpen(false);
    }
  };

  const columns = getColumns(handleInitiateChange);

  const cards = [
    { key: "all" as const,         label: "Total",       value: totalCount,       sub: "All applications",      icon: Users },
    { key: "pending" as const,     label: "Needs Review", value: pendingCount,     sub: "Awaiting action",       icon: Clock },
    { key: "shortlisted" as const, label: "Shortlisted",  value: shortlistedCount, sub: "Ready for next step",   icon: ListFilter },
    { key: "potential" as const,   label: "High Potential", value: potentialCount, sub: "Flagged best fit",      icon: Star },
  ];

  return (
    <div className="space-y-6">
      <div className="pb-6">
        <h1 className="text-4xl font-bold text-[#046241] tracking-tight">
          Application Tracker
        </h1>
        <p
          className="text-sm mt-1"
          style={{ color: "var(--admin-text-muted)" }}
        >
          Manage and track job applications across positions
        </p>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 pb-10">
        {cards.map(({ key, label, value, sub, icon: Icon }) => {
          const isActive = cardFilter === key;
          return (
            <div
              key={key}
              onClick={() => setCardFilter(isActive ? "all" : key)}
              className={cn(
                "group relative rounded-2xl border p-6 shadow-sm hover:shadow-xl hover:shadow-[#034E34]/10 hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer",
                isActive ? "border-[#034E34]/40 ring-2 ring-[#034E34]/20" : "",
              )}
              style={{
                backgroundColor: "var(--admin-surface)",
                borderColor: isActive ? undefined : "var(--admin-border-soft)",
              }}
            >
              <div
                className="absolute -right-4 -bottom-4 w-20 h-20 rounded-full group-hover:scale-[3] group-hover:bg-[#FFB347]/5 transition-all duration-700 opacity-50"
                style={{ backgroundColor: "var(--admin-surface-2)" }}
              />
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div className="relative">
                    <div
                      className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center shadow-md transition-transform duration-300 group-hover:rotate-6",
                        isActive ? "bg-[#FFB347]" : "bg-[#034E34]",
                      )}
                    >
                      <Icon
                        size={20}
                        className={
                          isActive ? "text-[#034E34]" : "text-[#FFB347]"
                        }
                      />
                    </div>
                    <div className="absolute inset-0 bg-[#FFB347] blur-xl opacity-0 group-hover:opacity-20 transition-opacity" />
                  </div>
                  <div className="flex items-center gap-1.5 bg-[#034E34]/5 px-2.5 py-1 rounded-full border border-[#034E34]/10">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#034E34] opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#034E34]" />
                    </span>
                    <span className="text-[9px] font-black text-[#034E34] uppercase tracking-widest">
                      Live
                    </span>
                  </div>
                </div>
                <div className="flex items-baseline gap-1 mb-1">
                  <span
                    className={cn(
                      "text-4xl font-black tracking-tighter italic transition-colors",
                      isActive
                        ? "text-[#034E34]"
                        : "group-hover:text-[#034E34]",
                    )}
                    style={{
                      color: isActive ? undefined : "var(--admin-text)",
                    }}
                  >
                    {value}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFB347] mb-1" />
                </div>
                <p
                  className="text-[10px] font-black uppercase tracking-widest mb-3"
                  style={{ color: "var(--admin-text-muted)" }}
                >
                  {label}
                </p>
                <div className="flex flex-col gap-1.5">
                  <div
                    className={cn(
                      "h-0.5 bg-[#FFB347] rounded-full transition-all duration-500",
                      isActive ? "w-full" : "w-6 group-hover:w-full",
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

      {/* Search and Filter Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between rounded-xl">
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
      <div
        className="rounded-xl shadow-sm overflow-hidden"
        style={{
          backgroundColor: "var(--admin-surface)",
          border: "1px solid var(--admin-border-soft)",
        }}
      >
        <DataTable
          columns={columns}
          data={currentTableData}
          isLoading={isLoading || isSubmitting}
        />

        {/* Pagination Footer */}
        <div
          className="flex items-center justify-between px-4 py-4"
          style={{ borderTop: "1px solid var(--admin-border-soft)" }}
        >
          <div className="text-sm" style={{ color: "var(--admin-text-muted)" }}>
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
        title="Update Application"
        description={`Are you sure you want to update this application?`}
        confirmClassName="bg-[#046241] hover:bg-[#133020]"
      />
    </div>
  );
}

