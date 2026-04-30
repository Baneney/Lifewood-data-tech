export type AppStatus = "New" | "Reviewing" | "Shortlisted" | "Interviewed" | "Rejected"

export interface Application {
  id: number
  name: string
  email: string
  phone: string
  role: string
  dept: string
  location: string
  date: string
  status: AppStatus
  note: string
}

export interface Position {
  id: number
  title: string
  dept: string
  type: string
  location: string
  applicants: number
  status: "Open" | "Closed" | "Draft"
  posted: string
}

export const APPLICATIONS: Application[] = [
  { id: 1, name: "Juan dela Cruz",   email: "juan@email.com",   phone: "+63 912 345 6789", role: "Data Annotation Specialist",  dept: "Data Operations",      location: "Philippines", date: "Apr 28, 2026", status: "New",         note: "" },
  { id: 2, name: "Maria Santos",     email: "maria@email.com",  phone: "+63 917 234 5678", role: "Machine Learning Engineer",   dept: "Technology",           location: "Remote",      date: "Apr 28, 2026", status: "Reviewing",   note: "Strong ML background" },
  { id: 3, name: "Ahmed Al-Rashid",  email: "ahmed@email.com",  phone: "+971 50 123 4567", role: "NLP Engineer",                dept: "Technology",           location: "Remote",      date: "Apr 27, 2026", status: "Shortlisted", note: "Excellent NLP portfolio" },
  { id: 4, name: "Priya Sharma",     email: "priya@email.com",  phone: "+91 98765 43210",  role: "Data Collection Analyst",     dept: "Data Operations",      location: "Philippines", date: "Apr 27, 2026", status: "New",         note: "" },
  { id: 5, name: "James Okonkwo",    email: "james@email.com",  phone: "+234 801 234 5678",role: "Platform Engineer",           dept: "Technology",           location: "Philippines", date: "Apr 26, 2026", status: "Rejected",    note: "Not enough experience" },
  { id: 6, name: "Sofia Reyes",      email: "sofia@email.com",  phone: "+63 918 765 4321", role: "Project Manager – AI Data",   dept: "Project Management",   location: "Philippines", date: "Apr 26, 2026", status: "Interviewed", note: "Final round scheduled" },
  { id: 7, name: "Liam Chen",        email: "liam@email.com",   phone: "+65 9123 4567",    role: "Sales Executive",             dept: "Business Development", location: "Remote",      date: "Apr 25, 2026", status: "Reviewing",   note: "" },
  { id: 8, name: "Aisha Kamara",     email: "aisha@email.com",  phone: "+254 712 345 678", role: "QA Reviewer",                 dept: "Data Operations",      location: "Philippines", date: "Apr 25, 2026", status: "New",         note: "" },
  { id: 9, name: "Carlos Mendoza",   email: "carlos@email.com", phone: "+63 920 111 2222", role: "Data Curation Lead",          dept: "Data Operations",      location: "Malaysia",    date: "Apr 24, 2026", status: "Shortlisted", note: "Good curation experience" },
  { id: 10, name: "Yuki Tanaka",     email: "yuki@email.com",   phone: "+81 90 1234 5678", role: "Computer Vision Engineer",    dept: "Technology",           location: "Remote",      date: "Apr 24, 2026", status: "Interviewed", note: "Strong CV skills" },
]

export const POSITIONS: Position[] = [
  { id: 1, title: "Data Annotation Specialist",  dept: "Data Operations",      type: "Full-time", location: "Philippines · On-site", applicants: 14, status: "Open",   posted: "Apr 20, 2026" },
  { id: 2, title: "Machine Learning Engineer",   dept: "Technology",           type: "Full-time", location: "Remote · Global",       applicants: 9,  status: "Open",   posted: "Apr 18, 2026" },
  { id: 3, title: "NLP Engineer",                dept: "Technology",           type: "Full-time", location: "Remote · Global",       applicants: 11, status: "Open",   posted: "Apr 18, 2026" },
  { id: 4, title: "Project Manager – AI Data",   dept: "Project Management",   type: "Full-time", location: "Philippines · Hybrid",  applicants: 7,  status: "Open",   posted: "Apr 15, 2026" },
  { id: 5, title: "Sales Executive",             dept: "Business Development", type: "Full-time", location: "Remote · Global",       applicants: 5,  status: "Open",   posted: "Apr 15, 2026" },
  { id: 6, title: "Data Curation Lead",          dept: "Data Operations",      type: "Full-time", location: "Malaysia · Hybrid",     applicants: 3,  status: "Open",   posted: "Apr 10, 2026" },
  { id: 7, title: "Client Success Manager",      dept: "Project Management",   type: "Full-time", location: "Singapore · On-site",   applicants: 6,  status: "Closed", posted: "Mar 30, 2026" },
  { id: 8, title: "Computer Vision Engineer",    dept: "Technology",           type: "Full-time", location: "Remote · Global",       applicants: 0,  status: "Draft",  posted: "—" },
]

export const STATUS_COLORS: Record<string, string> = {
  New:         "bg-blue-50 text-blue-600 border-blue-100",
  Reviewing:   "bg-yellow-50 text-yellow-700 border-yellow-100",
  Shortlisted: "bg-emerald-50 text-emerald-700 border-emerald-100",
  Interviewed: "bg-purple-50 text-purple-700 border-purple-100",
  Rejected:    "bg-red-50 text-red-600 border-red-100",
  Open:        "bg-emerald-50 text-emerald-700 border-emerald-100",
  Closed:      "bg-gray-100 text-gray-500 border-gray-200",
  Draft:       "bg-orange-50 text-orange-600 border-orange-100",
}

export const DEPTS = ["All", "Data Operations", "Technology", "Project Management", "Business Development"]
export const STATUSES: AppStatus[] = ["New", "Reviewing", "Shortlisted", "Interviewed", "Rejected"]
