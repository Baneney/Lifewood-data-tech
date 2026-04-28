import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Upload } from 'lucide-react';

//components
import { DatePicker } from "@/components/ui/datepicker";



interface FormFieldProps {
  label: string;
  placeholder: string;
  type?: string; 
}

export default function ApplicationForm() {
  const { jobTitle } = useParams();
  const decodedTitle = jobTitle ? decodeURIComponent(jobTitle) : "Platform Engineer";
  
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const stepLabels = ["Identity", "Contact", "Finalize"];

  return (
    <div className="min-h-screen bg-[#021a11] text-[#133020] selection:bg-[#FFB347] selection:text-[#021a11] overflow-hidden relative font-sans">
      
      {/* ── BACKGROUND VISUALS ── */}
      <div className="absolute top-24 left-1/4 w-96 h-96 bg-[#417256]/20 blur-[150px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-24 right-1/4 w-[500px] h-[500px] bg-[#FFB347]/10 blur-[180px] rounded-full pointer-events-none z-0" />

      {/* Top Nav */}
      <nav className="fixed top-0 w-full z-50 px-8 py-6 bg-[#021a11]/40 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/careers" className="flex items-center gap-2 text-white/40 hover:text-white transition-colors group">
            <ArrowLeft size={16} />
            <span className="text-[9px] font-black uppercase tracking-[0.2em]">Exit Portal</span>
          </Link>
          <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.5em]">Lifewood Data Technology</span>
        </div>
      </nav>

      <div className="pt-32 pb-20 px-6 relative z-10">
        <div className="max-w-3xl mx-auto">
          
          {/* Main Glass Card - Using a cleaner Gray with better contrast */}
          <div className="bg-[#D1D5DB] backdrop-blur-3xl rounded-[3rem] shadow-[0_50px_100px_-30px_rgba(0,0,0,0.5)] border border-white/30 overflow-hidden">
            
            {/* ── REFINED FLOATING PROGRESSOR ── */}
            <div className="px-12 pt-12 pb-4">
              <div className="flex justify-between items-end mb-6">
                <div className="space-y-1">
                   <p className="text-[#133020]/60 text-[10px] font-black uppercase tracking-[0.3em]">Step 0{currentStep}</p>
                   <h3 className="text-xl font-black uppercase tracking-tighter text-[#133020]">
                    {stepLabels[currentStep - 1]}
                   </h3>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-[#133020]/40 tabular-nums">0{currentStep} / 0{totalSteps}</span>
                </div>
              </div>

              {/* Minimalist Progress Track */}
              <div className="relative h-[2px] w-full bg-[#133020]/10 rounded-full overflow-hidden">
                <motion.div 
                  className="absolute top-0 left-0 h-full bg-[#133020]"
                  initial={false}
                  animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>

            {/* Form Content Area */}
            <div className="p-12 md:p-16 pt-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4, ease: "circOut" }}
                >
                  {currentStep === 1 && (
                    <section className="space-y-10">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                         <div className="md:col-span-2 pb-4 border-b border-[#133020]/10">
                           <p className="text-[10px] font-bold text-[#133020]/50 uppercase tracking-widest mb-1">Applying for</p>
                           <p className="text-lg font-black text-[#133020]">{decodedTitle}</p>
                         </div>
                        <LightFormField label="First Name" placeholder="e.g. Sem Luiz"/>
                        <LightFormField label="Last Name" placeholder="e.g. Warain" />
                        <div className="flex flex-col gap-3 group">
                          <label className="text-[10px] uppercase tracking-widest font-black text-[#133020]/50 italic group-focus-within:text-[#133020] transition-colors">Gender</label>
                          <div className="relative">
                            <select className="w-full bg-white border border-[#133020]/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-[#FFB347] focus:ring-4 focus:ring-[#FFB347]/10 appearance-none text-[#133020] text-sm font-bold transition-all cursor-pointer">
                              <option>Select Gender</option>
                              <option>Male</option>
                              <option>Female</option>
                            </select>
                            <div className="absolute top-1/2 right-6 -translate-y-1/2 text-[#133020]/30 pointer-events-none text-[10px]">▼</div>
                          </div>
                        </div>

                        <div className="flex flex-col gap-3 group">
                          <label className="text-[10px] uppercase tracking-widest font-black text-[#133020]/50 italic group-focus-within:text-[#133020] transition-colors">
                            Birth Date
                          </label>
                          
                          <DatePicker 
                            className="py-6 px-6 bg-white border border-[#133020]/10 rounded-xl focus:border-[#FFB347] focus:ring-4 focus:ring-[#FFB347]/10 text-[#133020] text-sm font-bold transition-all duration-300 hover:border-[#133020]/30" 
                          />
                        </div>
                      </div>
                    </section>
                  )}

                  {currentStep === 2 && (
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                      <LightFormField label="Email Address" type="email" placeholder="email@example.com" />
                      <LightFormField label="Phone Number" placeholder="+63 9XX XXX XXXX" />
                      <div className="md:col-span-2">
                        <LightFormField label="Current Address" placeholder="Street, City, Province" />
                      </div>
                    </section>
                  )}

                  {currentStep === 3 && (
                    <section className="space-y-8">
                       <div className="group relative border-2 border-dashed border-[#133020]/20 rounded-[2rem] p-16 text-center hover:bg-white/50 hover:border-[#133020] transition-all cursor-pointer overflow-hidden">
                          <Upload className="mx-auto mb-4 text-[#133020]/30 group-hover:text-[#133020] group-hover:scale-110 transition-all duration-500" size={40} />
                          <p className="text-sm font-black uppercase tracking-tighter text-[#133020]">Drop Resume Here</p>
                          <p className="text-[9px] font-bold text-[#133020]/40 mt-2 uppercase tracking-widest">PDF / DOCX • MAX 10MB</p>
                          <input type="file" className="hidden" />
                       </div>
                    </section>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="mt-20 flex justify-between items-center">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center gap-2 ${
                    currentStep === 1 ? "opacity-0" : "text-[#133020]/40 hover:text-[#133020]"
                  }`}
                >
                  <ArrowLeft size={14} /> Previous
                </button>

                {currentStep < totalSteps ? (
                  <button
                    onClick={nextStep}
                    className="group bg-[#133020] text-white px-10 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-4 hover:bg-[#046241] transition-all hover:shadow-2xl hover:shadow-[#021a11]/20 active:scale-95"
                  >
                    Continue <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                ) : (
                  <button
                    className="bg-[#FFB347] text-[#021a11] px-12 py-5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:shadow-[0_20px_40px_rgba(255,179,71,0.3)] transition-all active:scale-95 shadow-xl"
                  >
                    Submit Application
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


function LightFormField({ label, placeholder, type = "text" }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-3 group">
      <label className="text-[10px] uppercase tracking-widest font-black text-[#133020]/50 italic group-focus-within:text-[#133020] transition-colors">
        {label}
      </label>
      <input 
        type={type} 
        placeholder={placeholder} 
        className="bg-white border border-[#133020]/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-[#FFB347] focus:ring-4 focus:ring-[#FFB347]/10 text-[#133020] text-sm font-bold placeholder:text-[#133020]/20 transition-all duration-300 hover:border-[#133020]/30"
      />
    </div>
  );
}
