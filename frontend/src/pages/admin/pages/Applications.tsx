import { useState, useEffect } from "react"
import { Search, Filter, X, Phone, Mail, MapPin, Calendar, FileText } from "lucide-react"
import { APPLICATIONS, STATUS_COLORS, STATUSES, DEPTS, type Application, type AppStatus } from "../data"
// Import your new table components here
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


//supabase
import { supabase } from "@/supabaseClient";



export default function Applications() {
  const [apps, setApps]         = useState(APPLICATIONS)
  const [search, setSearch]     = useState("")
  const [dept, setDept]         = useState("All")
  const [status, setStatus]     = useState("All")
  const [selected, setSelected] = useState<Application | null>(null)
  const [editNote, setEditNote] = useState("")
  const [editStatus, setEditStatus] = useState<AppStatus>("New")

  const [positions, setPositions] = useState<{ 
    id: string; 
    title: string 
  
  }[]>([]);


  useEffect(() => {
    const fetchPositions = async () => {
      const { data, error } = await supabase
        .from('position') // Replace with your actual table name
        .select('id, title');
      
      if (error) {
        console.error("Error fetching positions:", error);
      } else {
        setPositions(data || []);
      }
    };

    fetchPositions();
  }, []);

  const filtered = apps.filter(a =>
    (dept === "All" || a.dept === dept) &&
    (status === "All" || a.status === status) &&
    (a.name.toLowerCase().includes(search.toLowerCase()) ||
     a.role.toLowerCase().includes(search.toLowerCase()))
  )

  const openDetail = (a: Application) => {
    setSelected(a)
    setEditNote(a.note)
    setEditStatus(a.status)
  }

  const saveUpdate = () => {
    if (!selected) return
    setApps(prev => prev.map(a =>
      a.id === selected.id ? { ...a, status: editStatus, note: editNote } : a
    ))
    setSelected(null)
  }

  return (
    <div className="space-y-5 max-w-7xl mx-auto p-5">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-gray-900">Applications</h1>
          <p className="text-sm text-gray-400 mt-0.5">{apps.length} total · {apps.filter(a => a.status === "New").length} new</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex items-center gap-2 bg-white border border-gray-100 rounded-xl px-4 py-2.5 flex-1 shadow-sm">
          <Search size={15} className="text-gray-300 shrink-0" />
          <input
            type="text"
            placeholder="Search name or role..."
            className="bg-transparent outline-none text-sm w-full placeholder:text-gray-300"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Filter size={13} className="text-gray-400" />
          <select
            value={dept}
            onChange={e => setDept(e.target.value)}
            className="text-xs border border-gray-100 rounded-lg px-3 py-2 bg-white text-gray-600 outline-none shadow-sm"
          >
            {DEPTS.map(d => <option key={d}>{d}</option>)}
          </select>
          <select
            value={status}
            onChange={e => setStatus(e.target.value)}
            className="text-xs border border-gray-100 rounded-lg px-3 py-2 bg-white text-gray-600 outline-none shadow-sm"
          >
            <option>All</option>
            {STATUSES.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {/* NEW TABLE COMPONENTS */}
      <div className="bg-white rounded border border-gray-100 shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50/50">
            <TableRow>
              {["Applicant", "Role", "Department", "Location", "Date", "Status", ""].map(h => (
                <TableHead key={h} className="px-5 py-4 text-md font-black text-white uppercase tracking-widest bg-[#046241]/40 font-light">
                  {h}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map(a => (
              <TableRow
                key={a.id}
                className="cursor-pointer"
                onClick={() => openDetail(a)}
              >
                <TableCell className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#034E34]/10 flex items-center justify-center text-[#034E34] text-[10px] font-black shrink-0">
                      {a.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{a.name}</p>
                      <p className="text-xs text-gray-400">{a.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-5 py-3.5 text-gray-600 max-w-[180px] truncate">
                  {a.role}
                </TableCell>
                <TableCell className="px-5 py-3.5 text-gray-400 text-xs">
                  {a.dept}
                </TableCell>
                <TableCell className="px-5 py-3.5 text-gray-400 text-xs">
                  {a.location}
                </TableCell>
                <TableCell className="px-5 py-3.5 text-gray-400 text-xs">
                  {a.date}
                </TableCell>
                <TableCell className="px-5 py-3.5">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${STATUS_COLORS[a.status]}`}>
                    {a.status}
                  </span>
                </TableCell>
                <TableCell className="px-5 py-3.5">
                  <button
                    onClick={e => { e.stopPropagation(); openDetail(a) }}
                    className="text-xs text-[#034E34] font-bold hover:underline"
                  >
                    View
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-300 text-sm">No applications found.</div>
        )}
      </div>

      {/* Detail drawer remains the same... */}
      {selected && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/30 backdrop-blur-sm" onClick={() => setSelected(null)} />
          <div className="w-full max-w-md bg-white shadow-2xl flex flex-col overflow-y-auto">

            {/* Drawer header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 sticky top-0 bg-white z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#034E34]/10 flex items-center justify-center text-[#034E34] text-sm font-black">
                  {selected.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <p className="font-black text-gray-900">{selected.name}</p>
                  <p className="text-xs text-gray-400">{selected.role}</p>
                </div>
              </div>
              <button onClick={() => setSelected(null)} className="p-2 rounded-lg hover:bg-gray-100 text-gray-400">
                <X size={16} />
              </button>
            </div>

            {/* Contact info */}
            <div className="px-6 py-5 border-b border-gray-50 space-y-3">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Contact</p>
              {[
                { icon: Mail, value: selected.email },
                { icon: Phone, value: selected.phone },
                { icon: MapPin, value: selected.location },
                { icon: Calendar, value: selected.date },
              ].map(({ icon: Icon, value }) => (
                <div key={value} className="flex items-center gap-3 text-sm text-gray-600">
                  <Icon size={14} className="text-gray-300 shrink-0" />
                  {value}
                </div>
              ))}
            </div>

            {/* Department */}
            <div className="px-6 py-5 border-b border-gray-50">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Department</p>
              <p className="text-sm text-gray-700 font-medium">{selected.dept}</p>
            </div>

            {/* Update status */}
            <div className="px-6 py-5 border-b border-gray-50">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Update Status</p>
              <div className="flex flex-wrap gap-2">
                {STATUSES.map(s => (
                  <button
                    key={s}
                    onClick={() => setEditStatus(s)}
                    className={`text-[10px] font-bold px-3 py-1.5 rounded-full border transition-all ${
                      editStatus === s
                        ? STATUS_COLORS[s] + " ring-2 ring-offset-1 ring-current"
                        : "bg-gray-50 text-gray-400 border-gray-100 hover:border-gray-300"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div className="px-6 py-5 flex-1">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                <FileText size={11} /> Notes
              </p>
              <textarea
                value={editNote}
                onChange={e => setEditNote(e.target.value)}
                placeholder="Add internal notes about this applicant..."
                rows={4}
                className="w-full text-sm border border-gray-100 rounded-xl px-4 py-3 outline-none focus:border-[#034E34] transition-colors resize-none placeholder:text-gray-300"
              />
            </div>

            {/* Actions */}
            <div className="px-6 py-4 border-t border-gray-100 flex gap-3 sticky bottom-0 bg-white">
              <button
                onClick={() => setSelected(null)}
                className="flex-1 py-2.5 rounded-xl border border-gray-100 text-sm font-semibold text-gray-500 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={saveUpdate}
                className="flex-1 py-2.5 rounded-xl bg-[#034E34] text-white text-sm font-bold hover:bg-[#FFB347] hover:text-[#021a11] transition-all"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}