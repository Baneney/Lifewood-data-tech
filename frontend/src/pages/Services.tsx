const services = [
  {
    icon: "📊",
    title: "Data Analytics",
    desc: "Transform raw data into actionable insights with our advanced analytics platform.",
  },
  {
    icon: "🤖",
    title: "AI & Machine Learning",
    desc: "Leverage cutting-edge AI models to automate processes and predict outcomes.",
  },
  {
    icon: "☁️",
    title: "Cloud Data Solutions",
    desc: "Scalable, secure cloud infrastructure tailored for your data workloads.",
  },
  {
    icon: "🔒",
    title: "Data Governance",
    desc: "Ensure compliance, quality, and security across your entire data ecosystem.",
  },
]

export default function Services() {
  return (
    <section className="min-h-screen pt-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="text-sm font-semibold text-[#1a3c5e] uppercase tracking-widest">What We Offer</span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">Our Services</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map(s => (
            <div key={s.title} className="p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">{s.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{s.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
