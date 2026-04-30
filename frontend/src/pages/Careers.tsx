import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Search, ArrowRight, ShieldCheck, Globe, Zap, Heart, Lightbulb, TrendingUp, Home } from "lucide-react"

import JobCard from "../components/JobCard"



// ── Data ──────────────────────────────────────────────────────────────────────

const PERKS = [
  { icon: <Globe size={24} />, title: "Global Team", desc: "Work alongside talented people from 30+ countries across every continent." },
  { icon: <TrendingUp size={24} />, title: "Growth First", desc: "Clear career paths, mentorship programs, and learning budgets for every employee." },
  { icon: <Heart size={24} />, title: "Inclusive Culture", desc: "A workplace built on diversity, respect, and the belief that everyone belongs." },
  { icon: <Zap size={24} />, title: "Meaningful Work", desc: "Your work directly powers AI systems that shape industries and improve lives." },
  { icon: <Home size={24} />, title: "Flexible Setup", desc: "Hybrid and remote-friendly roles with flexible hours that respect your life." },
  { icon: <Lightbulb size={24} />, title: "Innovation Driven", desc: "We encourage bold ideas, fast experimentation, and learning from failure." },
]

const JOBS = [
  {
    dept: "Data Operations",
    roles: [
      { title: "Data Annotation Specialist", type: "Full-time", location: "Philippines · On-site", desc: "Label and annotate image, video, text, and audio datasets with high precision for AI training pipelines." },
      { title: "Data Collection Analyst", type: "Full-time", location: "Philippines · Hybrid", desc: "Source, gather, and organize raw data from diverse channels to meet project specifications." },
      { title: "Quality Assurance Reviewer", type: "Full-time", location: "Philippines · On-site", desc: "Audit annotated datasets for accuracy, consistency, and compliance with client quality standards." },
      { title: "Data Curation Lead", type: "Full-time", location: "Malaysia · Hybrid", desc: "Oversee dataset cleaning, deduplication, and metadata tagging across multiple concurrent projects." },
    ],
  },
  {
    dept: "Technology",
    roles: [
      { title: "Machine Learning Engineer", type: "Full-time", location: "Remote · Global", desc: "Design and deploy ML pipelines that automate data processing and quality validation at scale." },
      { title: "Computer Vision Engineer", type: "Full-time", location: "Remote · Global", desc: "Build and fine-tune vision models for object detection, segmentation, and classification tasks." },
      { title: "NLP Engineer", type: "Full-time", location: "Remote · Global", desc: "Develop natural language processing solutions for multilingual annotation and text classification." },
      { title: "Platform Engineer", type: "Full-time", location: "Philippines · Hybrid", desc: "Build and maintain the internal tooling and infrastructure that powers our data operations." },
    ],
  },
  {
    dept: "Project Management",
    roles: [
      { title: "Project Manager – AI Data", type: "Full-time", location: "Philippines · Hybrid", desc: "Lead end-to-end delivery of data annotation and collection projects for global AI clients." },
      { title: "Client Success Manager", type: "Full-time", location: "Singapore · On-site", desc: "Own client relationships, ensure project satisfaction, and identify expansion opportunities." },
      { title: "Operations Coordinator", type: "Full-time", location: "Philippines · On-site", desc: "Coordinate cross-functional teams, track milestones, and ensure smooth day-to-day operations." },
    ],
  },
  {
    dept: "Business Development",
    roles: [
      { title: "Sales Executive – AI Solutions", type: "Full-time", location: "Remote · Global", desc: "Identify and close new business opportunities with AI companies and enterprise clients worldwide." },
      { title: "Partnerships Manager", type: "Full-time", location: "Singapore · Hybrid", desc: "Build and manage strategic partnerships with technology platforms, research institutions, and data providers." },
    ],
  },
]

const DEPTS = ["All", ...JOBS.map(j => j.dept)]

const VALUES = [
  { tag: "01", title: "People First", desc: "We invest in our people because we know that great teams build great products." },
  { tag: "02", title: "Radical Transparency", desc: "Open communication at every level — no hidden agendas, no closed doors." },
  { tag: "03", title: "Continuous Learning", desc: "We never stop growing. Curiosity is a core competency here." },
  { tag: "04", title: "Impact at Scale", desc: "Every role contributes to AI systems that reach millions of people globally." },
]

export default function Careers() {
  const navigate = useNavigate();
  const [activeDept, setActiveDept] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const filtered = (activeDept === "All" ? JOBS : JOBS.filter(j => j.dept === activeDept))
    .map(dept => ({
      ...dept,
      roles: dept.roles.filter(r => 
        r.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })).filter(dept => dept.roles.length > 0)

  
  return (
    <div className="min-h-screen bg-[#021a11] text-white selection:bg-[#FFB347] selection:text-[#021a11]">
      
      {/* ── Background Grid ── */}
      <div className="fixed inset-0 opacity-[0.05] pointer-events-none z-0"
           style={{ 
             backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, 
             backgroundSize: "50px 50px" 
           }} />

      <section className="relative z-10 py-32 px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl">
            <span className="text-[10px] font-black text-[#FFB347] uppercase tracking-[0.5em] border-l-4 border-[#FFB347] pl-4 mb-6 block">Why Lifewood</span>
            <h2 className="text-5xl font-black text-white leading-tight uppercase tracking-tighter">More than a job.<br />A global mission.</h2>
          </div>
        </div>
      </section>

      {/* ── 2. JOB BOARD ── */}
      <section id="open-positions" className="relative z-10 py-32 px-8 md:px-16 bg-[#021a11]/80 backdrop-blur-3xl">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-16">
            
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-12">
              <div className="bg-[#417256]/20 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#FFB347]/10 blur-3xl rounded-full" />
                <ShieldCheck className="text-[#FFB347] mb-6" size={40} />
                <h4 className="text-2xl font-bold mb-3 uppercase tracking-tighter">Check Status</h4>
                <p className="text-white/40 text-xs mb-8 font-black uppercase tracking-widest leading-relaxed">
                  Track your application status.
                </p>
                <div className="space-y-4">
                  <input 
                    type="text" 
                    placeholder="REFERENCE ID" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-xs font-black uppercase tracking-widest outline-none focus:border-[#FFB347] transition-all placeholder:text-white/20"
                  />
                  <button className="w-full bg-[#FFB347] text-[#021a11] py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] hover:bg-white transition-all">
                    Check Now
                  </button>
                </div>
              </div>

              <div>
                <h3 className="font-black uppercase tracking-widest text-[10px] mb-6 text-white/30">Departments</h3>
                <div className="flex flex-col gap-2">
                  {DEPTS.map(d => (
                    <button
                      key={d}
                      onClick={() => setActiveDept(d)}
                      className={`text-left px-6 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all ${
                        activeDept === d 
                        ? "bg-[#FFB347] text-[#021a11] translate-x-2" 
                        : "bg-white/5 text-white/40 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-12">
              <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-md">
                <Search className="text-white/20" size={24} />
                <input 
                  type="text" 
                  placeholder="SEARCH FOR A ROLE..." 
                  className="bg-transparent outline-none w-full text-xs font-black uppercase tracking-[0.3em] placeholder:text-white/10"
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeDept + searchQuery}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-24"
                >
                  {filtered.length > 0 ? (
                    filtered.map(dept => (
                      <div key={dept.dept}>
                        <div className="flex items-center gap-6 mb-12">
                          <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-[#FFB347] whitespace-nowrap">
                            {dept.dept}
                          </h2>
                          <div className="h-px flex-1 bg-white/5" />
                        </div>
                        <div className="grid md:grid-cols-2 gap-8">
                          {dept.roles.map((role) => (
                            <div key={role.title} onClick={() => navigate(`/apply`)} className="cursor-pointer">
                                <JobCard role={role} />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
                      <p className="text-white/20 font-black text-xs uppercase tracking-widest">No positions found.</p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. VALUES ── */}
      <section className="relative z-10 bg-black/20 py-32 px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-px bg-white/5 rounded-[2.5rem] overflow-hidden border border-white/10">
            {VALUES.map(v => (
              <div key={v.tag} className="bg-[#021a11]/50 backdrop-blur-md p-12 hover:bg-[#417256]/20 transition-all duration-500 group">
                <p className="text-[#FFB347] text-[10px] font-black uppercase tracking-widest mb-6">{v.tag}</p>
                <h3 className="text-xl font-bold text-white uppercase tracking-tight mb-4 group-hover:text-[#FFB347] transition-colors">{v.title}</h3>
                <p className="text-white/30 text-sm leading-relaxed group-hover:text-white/60 transition-colors">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. OPEN APPLICATION ── */}
      <section className="relative z-10 py-40 px-8 md:px-16 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block text-[10px] font-black text-[#FFB347] uppercase tracking-[0.5em] border-l-4 border-[#FFB347] pl-4 mb-10">Spontaneous</span>
          <h2 className="text-6xl font-black text-white leading-tight mb-8 uppercase tracking-tighter">Don't see your role?</h2>
          <p className="text-white/40 text-lg leading-relaxed mb-12 font-medium">
            We're always looking for exceptional talent. Send us your CV and tell us how you'd contribute to the mission.
          </p>
          <Link
            to="/apply/Open%20Application"
            className="group relative overflow-hidden inline-flex items-center gap-6 bg-[#FFB347] text-[#021a11] px-14 py-7 rounded-full font-black text-[11px] uppercase tracking-[0.2em] transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,179,71,0.2)] hover:-translate-y-1"
          >
            <span className="relative z-10">Send Open Application</span>
            <ArrowRight size={20} className="relative z-10 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  )
}
