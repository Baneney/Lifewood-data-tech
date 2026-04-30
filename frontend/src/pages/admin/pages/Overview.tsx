import { Link } from "react-router-dom"
import { Users, Briefcase, TrendingUp, Clock, ArrowUpRight, CheckCircle, XCircle, Eye } from "lucide-react"
import { APPLICATIONS, POSITIONS, STATUS_COLORS } from "../data"

// Derived analytics
const total       = APPLICATIONS.length
const newCount    = APPLICATIONS.filter(a => a.status === "New").length
const shortlisted = APPLICATIONS.filter(a => a.status === "Shortlisted").length
const interviewed = APPLICATIONS.filter(a => a.status === "Interviewed").length
const rejected    = APPLICATIONS.filter(a => a.status === "Rejected").length
const openPos     = POSITIONS.filter(p => p.status === "Open").length

const deptBreakdown = ["Data Operations", "Technology", "Project Management", "Business Development"].map(d => ({
  dept: d.replace(" ", "\n"),
  count: APPLICATIONS.filter(a => a.dept === d).length,
}))

const statusBreakdown = [
  { label: "New",         count: newCount,    color: "bg-blue-400" },
  { label: "Reviewing",   count: APPLICATIONS.filter(a => a.status === "Reviewing").length, color: "bg-yellow-400" },
  { label: "Shortlisted", count: shortlisted, color: "bg-emerald-400" },
  { label: "Interviewed", count: interviewed, color: "bg-purple-400" },
  { label: "Rejected",    count: rejected,    color: "bg-red-400" },
]

function StatCard({ label, value, sub, icon: Icon, accent }: { label: string; value: string | number; sub: string; icon: React.ElementType; accent: string }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 ${accent} rounded-xl flex items-center justify-center`}>
          <Icon size={18} className="text-white" />
        </div>
        <TrendingUp size={13} className="text-emerald-400 mt-1" />
      </div>
      <div className="text-3xl font-black text-gray-900">{value}</div>
      <div className="text-sm text-gray-500 mt-0.5">{label}</div>
      <div className="text-xs text-emerald-500 font-semibold mt-2">{sub}</div>
    </div>
  )
}

export default function Overview() {
  const maxDept = Math.max(...deptBreakdown.map(d => d.count))

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-5">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-gray-900">Dashboard Overview</h1>
          <p className="text-sm text-gray-400 mt-0.5">Welcome back — here's what's happening today.</p>
        </div>
        <span className="text-xs text-gray-400 bg-white border border-gray-100 px-3 py-1.5 rounded-full shadow-sm">
          {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
        </span>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Total Applications" value={total}     sub={`${newCount} new today`}       icon={Users}     accent="bg-[#034E34]" />
        <StatCard label="Shortlisted"         value={shortlisted} sub="Ready for interview"         icon={CheckCircle} accent="bg-emerald-500" />
        <StatCard label="Open Positions"      value={openPos}  sub={`${POSITIONS.length} total`}   icon={Briefcase} accent="bg-[#FFB347]" />
        <StatCard label="Interviewed"         value={interviewed} sub={`${rejected} rejected`}     icon={Clock}     accent="bg-purple-500" />
      </div>

      <div className="grid lg:grid-cols-3 gap-5">

        {/* Application status breakdown */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h2 className="font-black text-gray-900 mb-5 text-sm">Application Pipeline</h2>
          <div className="space-y-3">
            {statusBreakdown.map(s => (
              <div key={s.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-500 font-medium">{s.label}</span>
                  <span className="font-black text-gray-900">{s.count}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${s.color} transition-all`}
                    style={{ width: `${(s.count / total) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 pt-4 border-t border-gray-50 flex justify-between text-xs text-gray-400">
            <span>{total} total</span>
            <span>{Math.round((shortlisted / total) * 100)}% shortlist rate</span>
          </div>
        </div>

        {/* Applications by dept */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h2 className="font-black text-gray-900 mb-5 text-sm">By Department</h2>
          <div className="space-y-3">
            {deptBreakdown.map(d => (
              <div key={d.dept} className="flex items-center gap-3">
                <span className="text-xs text-gray-500 w-32 shrink-0 leading-tight">{d.dept.replace("\n", " ")}</span>
                <div className="flex-1 bg-gray-100 rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-[#034E34] transition-all"
                    style={{ width: `${(d.count / maxDept) * 100}%` }}
                  />
                </div>
                <span className="text-xs font-black text-gray-900 w-4 text-right">{d.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Open positions summary */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-black text-gray-900 text-sm">Open Positions</h2>
            <Link to="/admin/positions" className="text-xs text-[#034E34] font-bold flex items-center gap-1 hover:gap-2 transition-all">
              Manage <ArrowUpRight size={11} />
            </Link>
          </div>
          <div className="space-y-2">
            {POSITIONS.filter(p => p.status === "Open").slice(0, 5).map(p => (
              <div key={p.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div>
                  <p className="text-sm font-semibold text-gray-900 leading-tight">{p.title}</p>
                  <p className="text-xs text-gray-400">{p.dept}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-[#034E34]">{p.applicants}</p>
                  <p className="text-[10px] text-gray-300">applicants</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent applications */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
          <h2 className="font-black text-gray-900 text-sm">Recent Applications</h2>
          <Link to="/admin/applications" className="text-xs text-[#034E34] font-bold flex items-center gap-1 hover:gap-2 transition-all">
            View all <ArrowUpRight size={11} />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-50 text-left bg-gray-50/50">
                <th className="px-5 py-3 text-[10px] font-black text-gray-400 uppercase tracking-widest">Applicant</th>
                <th className="px-5 py-3 text-[10px] font-black text-gray-400 uppercase tracking-widest hidden md:table-cell">Role</th>
                <th className="px-5 py-3 text-[10px] font-black text-gray-400 uppercase tracking-widest hidden lg:table-cell">Date</th>
                <th className="px-5 py-3 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-5 py-3 text-[10px] font-black text-gray-400 uppercase tracking-widest"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {APPLICATIONS.slice(0, 6).map(a => (
                <tr key={a.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#034E34]/10 flex items-center justify-center text-[#034E34] text-[10px] font-black shrink-0">
                        {a.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 leading-tight">{a.name}</p>
                        <p className="text-xs text-gray-400">{a.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-gray-500 hidden md:table-cell">{a.role}</td>
                  <td className="px-5 py-3.5 text-gray-400 text-xs hidden lg:table-cell">{a.date}</td>
                  <td className="px-5 py-3.5">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${STATUS_COLORS[a.status]}`}>
                      {a.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <Link to="/admin/applications" className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-300 hover:text-gray-600 transition-colors inline-flex">
                      <Eye size={14} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}
