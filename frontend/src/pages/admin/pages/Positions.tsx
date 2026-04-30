import { useState } from "react"
import { Plus, Pencil, Trash2, X, Search } from "lucide-react"
import { POSITIONS, STATUS_COLORS, DEPTS, type Position } from "../data"

const EMPTY: Omit<Position, "id"> = {
  title: "", dept: "Data Operations", type: "Full-time",
  location: "", applicants: 0, status: "Open", posted: "",
}

export default function Positions() {
  const [positions, setPositions] = useState(POSITIONS)
  const [search, setSearch]       = useState("")
  const [modal, setModal]         = useState<"create" | "edit" | "delete" | null>(null)
  const [form, setForm]           = useState<Omit<Position, "id">>(EMPTY)
  const [editId, setEditId]       = useState<number | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Position | null>(null)

  const filtered = positions.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.dept.toLowerCase().includes(search.toLowerCase())
  )

  const openCreate = () => {
    setForm({ ...EMPTY, posted: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) })
    setModal("create")
  }

  const openEdit = (p: Position) => {
    setEditId(p.id)
    setForm({ title: p.title, dept: p.dept, type: p.type, location: p.location, applicants: p.applicants, status: p.status, posted: p.posted })
    setModal("edit")
  }

  const openDelete = (p: Position) => {
    setDeleteTarget(p)
    setModal("delete")
  }

  const handleSave = () => {
    if (!form.title || !form.location) return
    if (modal === "create") {
      setPositions(prev => [...prev, { ...form, id: Date.now() }])
    } else if (modal === "edit" && editId !== null) {
      setPositions(prev => prev.map(p => p.id === editId ? { ...form, id: editId } : p))
    }
    setModal(null)
  }

  const handleDelete = () => {
    if (!deleteTarget) return
    setPositions(prev => prev.filter(p => p.id !== deleteTarget.id))
    setModal(null)
  }

  return (
    <div className="space-y-5 max-w-7xl mx-auto">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-gray-900">Positions</h1>
          <p className="text-sm text-gray-400 mt-0.5">
            {positions.filter(p => p.status === "Open").length} open · {positions.filter(p => p.status === "Draft").length} draft
          </p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-[#034E34] text-white text-sm font-bold px-4 py-2.5 rounded-xl hover:bg-[#FFB347] hover:text-[#021a11] transition-all"
        >
          <Plus size={15} /> Add Position
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 bg-white border border-gray-100 rounded-xl px-4 py-2.5 shadow-sm max-w-sm">
        <Search size={15} className="text-gray-300 shrink-0" />
        <input
          type="text"
          placeholder="Search positions..."
          className="bg-transparent outline-none text-sm w-full placeholder:text-gray-300"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-50 bg-gray-50/50 text-left">
                {["Position", "Department", "Type", "Location", "Applicants", "Status", "Posted", ""].map(h => (
                  <th key={h} className="px-5 py-3 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(p => (
                <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-3.5 font-semibold text-gray-900">{p.title}</td>
                  <td className="px-5 py-3.5 text-gray-400 text-xs">{p.dept}</td>
                  <td className="px-5 py-3.5 text-gray-400 text-xs">{p.type}</td>
                  <td className="px-5 py-3.5 text-gray-400 text-xs">{p.location}</td>
                  <td className="px-5 py-3.5 font-black text-[#034E34]">{p.applicants}</td>
                  <td className="px-5 py-3.5">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${STATUS_COLORS[p.status]}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-gray-400 text-xs whitespace-nowrap">{p.posted}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => openEdit(p)}
                        className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-300 hover:text-[#034E34] transition-colors"
                      >
                        <Pencil size={13} />
                      </button>
                      <button
                        onClick={() => openDelete(p)}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-gray-300 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-16 text-gray-300 text-sm">No positions found.</div>
          )}
        </div>
      </div>

      {/* Create / Edit Modal */}
      {(modal === "create" || modal === "edit") && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setModal(null)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <h2 className="font-black text-gray-900">{modal === "create" ? "Add New Position" : "Edit Position"}</h2>
              <button onClick={() => setModal(null)} className="p-2 rounded-lg hover:bg-gray-100 text-gray-400">
                <X size={16} />
              </button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1.5">Job Title *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                  placeholder="e.g. Data Annotation Specialist"
                  className="w-full border border-gray-100 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#034E34] transition-colors"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1.5">Department</label>
                  <select
                    value={form.dept}
                    onChange={e => setForm(f => ({ ...f, dept: e.target.value }))}
                    className="w-full border border-gray-100 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#034E34] bg-white"
                  >
                    {DEPTS.filter(d => d !== "All").map(d => <option key={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1.5">Type</label>
                  <select
                    value={form.type}
                    onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
                    className="w-full border border-gray-100 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#034E34] bg-white"
                  >
                    {["Full-time", "Part-time", "Contract", "Internship"].map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1.5">Location *</label>
                <input
                  type="text"
                  value={form.location}
                  onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
                  placeholder="e.g. Philippines · On-site"
                  className="w-full border border-gray-100 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#034E34] transition-colors"
                />
              </div>
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1.5">Status</label>
                <div className="flex gap-2">
                  {(["Open", "Draft", "Closed"] as const).map(s => (
                    <button
                      key={s}
                      onClick={() => setForm(f => ({ ...f, status: s }))}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                        form.status === s
                          ? STATUS_COLORS[s] + " ring-2 ring-offset-1 ring-current"
                          : "bg-gray-50 text-gray-400 border-gray-100"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex gap-3">
              <button onClick={() => setModal(null)} className="flex-1 py-2.5 rounded-xl border border-gray-100 text-sm font-semibold text-gray-500 hover:bg-gray-50">
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={!form.title || !form.location}
                className="flex-1 py-2.5 rounded-xl bg-[#034E34] text-white text-sm font-bold hover:bg-[#FFB347] hover:text-[#021a11] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {modal === "create" ? "Create Position" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {modal === "delete" && deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setModal(null)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
            <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 size={20} className="text-red-500" />
            </div>
            <h2 className="font-black text-gray-900 mb-2">Delete Position?</h2>
            <p className="text-sm text-gray-400 mb-6">
              "<span className="font-semibold text-gray-700">{deleteTarget.title}</span>" will be permanently removed.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setModal(null)} className="flex-1 py-2.5 rounded-xl border border-gray-100 text-sm font-semibold text-gray-500 hover:bg-gray-50">
                Cancel
              </button>
              <button onClick={handleDelete} className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-bold hover:bg-red-600 transition-colors">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
