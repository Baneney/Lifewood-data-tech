export default function Contact() {
  return (
    <section className="min-h-screen pt-24 bg-white">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <span className="text-sm font-semibold text-[#1a3c5e] uppercase tracking-widest">Get In Touch</span>
        <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">Let's Work Together</h2>
        <p className="mt-4 text-gray-500">Have a project in mind? Reach out and our team will get back to you within 24 hours.</p>

        <form className="mt-10 flex flex-col gap-4 text-left">
          <div className="grid sm:grid-cols-2 gap-4">
            <input type="text" placeholder="Your Name" className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3c5e]" />
            <input type="email" placeholder="Email Address" className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3c5e]" />
          </div>
          <input type="text" placeholder="Subject" className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3c5e]" />
          <textarea rows={5} placeholder="Your Message" className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3c5e] resize-none" />
          <button type="submit" className="bg-[#1a3c5e] text-white py-3 rounded-full font-medium hover:bg-[#15304d] transition-colors">
            Send Message
          </button>
        </form>
      </div>
    </section>
  )
}
