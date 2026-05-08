
import { useState } from "react";
import { Mail, MapPin, Send, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import RotatingText from "../components/RotatingText";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(
        "http://localhost:5000/api/contact-inquiry",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        },
      );

      if (response.ok) {
        toast.success("Message sent successfully!");
        (e.target as HTMLFormElement).reset();
      } else {
        throw new Error();
      }
    } catch (error) {
      toast.error("Failed to submit message!");
    } finally {
      setTimeout(() => setIsSubmitting(false), 1000);
    }
  };

  return (
    <section className="min-h-screen pt-28 pb-20 transition-colors duration-300 text-[#034E34] dark:text-white selection:bg-[#FFB347] selection:text-[#034E34 bg-[#E6E6E6] dark:bg-[#021a11]">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes custom-shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        @keyframes custom-progress { 0% { width: 0%; left: 0; } 50% { width: 70%; left: 15%; } 100% { width: 0%; left: 100%; } }
        .animate-shimmer { animation: custom-shimmer 2s infinite; }
        .animate-progress { animation: custom-progress 2s ease-in-out infinite; }
      `,
        }}
      />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          {/* Eyebrow */}
          <div className="overflow-hidden mb-4">
            <motion.p
              className="text-xs font-bold text-[#FFB347] uppercase tracking-[0.5em]"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              Contact Us
            </motion.p>
          </div>

          {/* Headline */}
          <h1 className="text-6xl md:text-8xl font-black leading-[0.85] tracking-tighter uppercase overflow-visible">
            <div className="overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                Let's Talk
              </motion.span>
            </div>
            <motion.span
              className="block overflow-visible"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <RotatingText
                texts={["About You.", "About Work.", "About Growth.", "About Life."]}
                mainClassName="inline-flex overflow-visible"
                splitLevelClassName="overflow-visible"
                elementLevelClassName="contact-outline-text"
                staggerDuration={0.03}
                staggerFrom="first"
                rotationInterval={3000}
              />
            </motion.span>
          </h1>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-start border-t border-[#034E34]/10 dark:border-white/5 pt-16">
          {/* Left Column */}
          <div className="space-y-10">
            <div className="overflow-hidden">
              <motion.p
                className="text-slate-600 dark:text-gray-400 text-lg max-w-md leading-relaxed font-medium"
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                Whether you're an applicant or an employee, our team is here to
                support you. Reach out and we'll respond within 24 hours.
              </motion.p>
            </div>

            <div className="grid gap-4">
              {[
                {
                  icon: <Mail size={22} />,
                  label: "Email Us",
                  val: "support@lifewood.com",
                },
                {
                  icon: <MapPin size={22} />,
                  label: "Our Office",
                  val: "IT Park, Cebu City, PH",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-5 bg-white dark:bg-white/5 border border-[#034E34]/10 dark:border-white/10 rounded-3xl shadow-xl shadow-[#034E34]/5 dark:shadow-none hover:border-[#FFB347]/40 transition-colors group/card"
                >
                  <div className="p-3 bg-[#FFB347]/10 rounded-2xl text-[#FFB347] group-hover/card:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                      {item.label}
                    </p>
                    <p className="text-[#034E34] dark:text-white font-bold">
                      {item.val}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-[8rem] font-black leading-none tracking-tighter uppercase text-[#034E34]/5 dark:text-white/[0.03] select-none pointer-events-none">
              HELLO
            </p>
          </div>

          {/* Right Column: Form */}
          <div className="relative bg-white dark:bg-white/5 border border-[#034E34]/10 dark:border-white/10 rounded-[2.5rem] p-8 md:p-10 overflow-hidden shadow-2xl shadow-[#034E34]/10 dark:shadow-none">
            {isSubmitting && (
              <div className="absolute top-0 left-0 h-[2.5px] bg-[#FFB347] animate-progress z-30" />
            )}

            <form
              onSubmit={handleSubmit}
              className={`space-y-5 transition-all duration-500 ${isSubmitting ? "opacity-40 grayscale-[0.5] pointer-events-none" : "opacity-100"}`}
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-[#034E34]/40 dark:text-gray-400 uppercase tracking-widest pl-1">
                    Full Name
                  </label>
                  <input
                    required
                    name="name"
                    type="text"
                    placeholder="Jane Doe"
                    className="w-full bg-[#F8F9F8] dark:bg-white/5 border border-[#034E34]/10 dark:border-white/10 rounded-2xl px-5 py-4 text-sm text-[#034E34] dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#FFB347]/50 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-[#034E34]/40 dark:text-gray-400 uppercase tracking-widest pl-1">
                    Email
                  </label>
                  <input
                    required
                    name="email"
                    type="email"
                    placeholder="youremail@example.com"
                    className="w-full bg-[#F8F9F8] dark:bg-white/5 border border-[#034E34]/10 dark:border-white/10 rounded-2xl px-5 py-4 text-sm text-[#034E34] dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#FFB347]/50 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black text-[#034E34]/40 dark:text-gray-400 uppercase tracking-widest pl-1">
                  Subject
                </label>
                <input
                  required
                  name="subject"
                  type="text"
                  placeholder="How can we help?"
                  className="w-full bg-[#F8F9F8] dark:bg-white/5 border border-[#034E34]/10 dark:border-white/10 rounded-2xl px-5 py-4 text-sm text-[#034E34] dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#FFB347]/50 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black text-[#034E34]/40 dark:text-gray-400 uppercase tracking-widest pl-1">
                  Message
                </label>
                <textarea
                  required
                  name="message"
                  rows={4}
                  placeholder="Tell us more about your inquiry..."
                  className="w-full bg-[#F8F9F8] dark:bg-white/5 border border-[#034E34]/10 dark:border-white/10 rounded-[1.5rem] px-5 py-4 text-sm text-[#034E34] dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#FFB347]/50 resize-none transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative overflow-hidden w-full bg-[#FFB347] text-[#021a11] py-5 rounded-2xl font-bold text-sm uppercase tracking-widest hover:shadow-[0_20px_40px_rgba(255,179,71,0.3)] hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-wait"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-3 relative z-10">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Processing...
                  </span>
                ) : (
                  <>
                    <span className="relative z-10 flex items-center gap-2">
                      Send Message
                      <Send
                        size={16}
                        className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                      />
                    </span>
                    <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-shimmer transition-transform" />
                    <div className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 origin-right transition-transform duration-500" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Footer Strip */}
        <div className="mt-20 pt-10 border-t border-[#034E34]/10 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-slate-500 font-medium italic">
            "Your data, our priority." — Lifewood Team
          </p>
          <button className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-white/5 border border-[#034E34]/10 dark:border-white/10 rounded-full text-xs font-bold text-slate-400 hover:border-[#FFB347]/40 hover:text-[#FFB347] transition-colors shadow-sm">
            <MessageSquare size={14} />
            Visit FAQs
          </button>
        </div>
      </div>
    </section>
  );
}
