import { type ColumnDef } from "@tanstack/react-table";
import { useState, useMemo } from "react"; 
import { useNavigate } from "react-router-dom";
import { toast } from "sonner"

// UI Components
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DataTable } from "@/components/ui/table/data-table";
import { Badge } from "@/components/ui/badge";
import { DetailsDrawer } from "@/components/ui/drawer";

//helper
import { capitalize } from "@/helpers/capitalize";
import { useAdmin } from "@/hooks/use-admin";


//POST
import { usePostLogs, type LogsDataType } from "../api/logs/logPostAPI";
//FETCH
import { useApplications, type ApplicationDataType } from "../api/application/ApplicationFetchAPI";


//icons
import {
  FileText,
  ExternalLink,
  Mail,
  Phone,
  Briefcase,
  Calendar,
  UserRound,
} from "lucide-react";



const getColumns = (onStatusChange: (appId: string, status: string) => void): ColumnDef<ApplicationDataType>[] => [
  {
    accessorKey: "applicant.fname",
    header: "Applicant Name",
    cell: ({ row }) => {
      const { fname, lname } = row.original.applicant;
      return <span className="font-semibold">{`${fname} ${lname}`}</span>;
    },
  },
  {
    accessorKey: "position.title",
    header: "Role",
  },
  {
    accessorKey: "date_submitted",
    header: "Date Applied",
    cell: ({ row }) => new Date(row.getValue("date_submitted")).toLocaleDateString(),
  },
  {
    accessorKey: "current_status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant="secondary" className="capitalize font-normal border-green-100 bg-green-50 text-green-700">
        {row.original.current_status}
      </Badge>
    ),
  },
  {
    id: "action",
    header: "Action",
    cell: ({ row }) => {
      const app = row.original;

      return (
        <DetailsDrawer
          title="Application Review"
          description="Detailed profile and application history."
        >
          {/* Appealing UI Content inside the Drawer */}
          <div className="space-y-8">
            {/* Status Section */}
            <section className="bg-green-50 p-4 rounded-xl border border-green-100/50">
              <h4 className=" font-bold capitalize text-green-600/80 mb-3">
                Current Status
              </h4>
              <div className="flex items-center justify-between">
                <Select
                  defaultValue={app.current_status}
                  onValueChange={(value) => onStatusChange(app.id, value)}
                >
                  <SelectTrigger className="h-9 w-auto gap-3 px-3 border-green-200 bg-white hover:bg-green-100/50 hover:border-green-300 transition-all rounded-lg shadow-sm">
                    <div className="flex items-center gap-2">
                      <SelectValue className="text-sm font-bold text-slate-700 capitalize" />
                    </div>
                  </SelectTrigger>

                  <SelectContent className="rounded-xl border-slate-200 shadow-xl">
                    {/* You can also add the dots inside the dropdown items for extra polish */}
                    <SelectItem
                      value="pending"
                      className="py-2.5 focus:bg-yellow-50 focus:text-yellow-700 cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-yellow-500 animate-pulse" />{" "}
                        Pending
                      </div>
                    </SelectItem>
                    <SelectItem
                      value="shortlisted"
                      className="py-2.5 focus:bg-blue-50 focus:text-blue-700 cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />{" "}
                        Shortlisted
                      </div>
                    </SelectItem>
                    <SelectItem
                      value="hired"
                      className="py-2.5 focus:bg-green-50 focus:text-green-700 cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />{" "}
                        Hired
                      </div>
                    </SelectItem>
                    <SelectItem
                      value="not selected"
                      className="py-2.5 focus:bg-rose-50 focus:text-rose-700 cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-rose-700 animate-pulse" />
                        Not Selected
                      </div>
                    </SelectItem>
                    <SelectItem
                      value="declined"
                      className="py-2.5 focus:bg-red-50 focus:text-red-700 cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                        Declined
                      </div>
                    </SelectItem>
                    <SelectItem
                      value="withdraw"
                      className="py-2.5 focus:bg-slate-50 focus:text-slate-700 cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-slate-500 animate-pulse" />{" "}
                        Withdraw
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>

                <Badge className="bg-[#417256] hover:bg-[#417256] px-3 py-1 text-[10px] uppercase tracking-tighter">
                  Active
                </Badge>
              </div>
            </section>

            {/* Applicant Details */}
            <section className="space-y-4 pb-3">
              <h4 className="text-[12px] font-bold uppercase tracking-widest text-slate-800">
                Personal Information
              </h4>
              <div className="grid gap-3">
                <div className="flex items-center gap-3 text-sm">
                  <UserRound className="h-4 w-4 text-slate-400" />
                  <span className="text-slate-600">{`${capitalize(app.applicant.lname)},  ${capitalize(app.applicant.fname)}`}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-slate-400" />
                  <span className="text-slate-600">{app.applicant.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 text-slate-400" />
                  <span className="text-slate-600">{app.applicant.phone}</span>
                </div>
              </div>
            </section>

            {/* Application Details */}
            <section className="space-y-4 pb-3">
              <h4 className="text-[12px] font-bold uppercase tracking-widest text-slate-800">
                Job Details
              </h4>
              <div className="grid gap-3">
                <div className="flex items-center gap-3 text-sm">
                  <Briefcase className="h-4 w-4 text-slate-400" />
                  <span className="text-slate-600">
                    Position:{" "}
                    <b className="text-slate-800">{app.position.title}</b>
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="h-4 w-4 text-slate-400" />
                  <span className="text-slate-600">
                    Applied on:{" "}
                    {new Date(app.date_submitted).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </section>

            {/* Documents Section */}
            <section className="space-y-4">
              <h4 className="text-[12px] font-bold uppercase tracking-widest text-slate-800">
                Attached Documents
              </h4>

              <a
                href={row.original.applicant.resume} // Or whatever your link property is
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-[#417256]/30 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg border border-slate-100 group-hover:bg-[#417256]/10 group-hover:border-[#417256]/20 transition-colors">
                    <FileText className="h-5 w-5 text-[#417256]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-slate-700 group-hover:text-[#417256]">
                      Resume_v1.pdf
                    </span>
                    <span className="text-[10px] text-slate-400 uppercase font-medium">
                      PDF Document
                    </span>
                  </div>
                </div>

                <div className="p-2 text-slate-300 group-hover:text-[#417256]">
                  <ExternalLink className="h-4 w-4" />
                </div>
              </a>
            </section>
          </div>
        </DetailsDrawer>
      );
    },
  }
];

export default function Applications() {
  const navigate = useNavigate(); 
  const { applications, isLoading } = useApplications();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { adminId } = useAdmin();

  //POST
  const handleStatusChange = async (appId: string, newStatus: string) => {
    if (!adminId) {
      toast.error("You must be logged in as an admin");
      return;
    }

    try {
      setIsSubmitting(true);
      // 4. Construct the formData matching your LogsDataType interface
      const logData: LogsDataType = {
        status: newStatus,
        app_id: appId,
        adm_id: adminId,
      };

      await usePostLogs(logData);
      toast.success(`Application updated `);

      // Optional: Refresh data here if needed
      navigate("/admin/applications");
    } catch (error) {
      console.error("Error updating log:", error);
      toast.error("Failed to update application status");
    } finally {
      setIsSubmitting(false);
    }
  };

  const columns = getColumns(handleStatusChange);                

  return (
    <div className=" bg-white rounded-lg shadow-sm">
      <DataTable columns={columns} data={applications} isLoading={isLoading || isSubmitting} />
    </div>
  );
}