import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Upload } from 'lucide-react';

//components
import { DatePicker } from "@/components/ui/datepicker";
import { Input } from '@/components/ui/input';
import { uploadFile } from '@/helpers/fileUpload';
import { FormLoader } from '@/components/FormLoader';
import { toast } from "sonner";

// hook / helper
import { useForm } from '@/hooks/useForm';
import { formatToDBDate } from '@/helpers/dateFormatter';


//database
import { supabase } from "@/supabaseClient";

export default function ApplicationForm() {
  const navigate = useNavigate();

  //database
  const [positions, setPositions] = useState<{ id: string; title: string }[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);



  //FETCH
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


  //POST
  const handleSubmit = async () => {
    if (!selectedFile) {
      toast.warning("Please upload your resume first.", {
        description: "A PDF or DOCX file is required to proceed.",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // 1. Use the helper to upload and get the URL
      // We pass the applicant's name to the folder to keep things organized
      const folderPath = `${formData.lname}_${formData.fname}`;
      const resumeUrl = await uploadFile(selectedFile, 'resumes', folderPath);

      // 2. Insert into Database
      const { data: newApplicant, error: applicantError } = await supabase
        .from('applicant')
        .insert([
          { 
            fname: formData.fname,
            lname: formData.lname,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            gender: formData.gender,
            dob: formatToDBDate(formData.dob),
            country: formData.country,
            resume: resumeUrl 
          }
        ])
        .select() // This tells Supabase to return the inserted row
        .single(); // We only inserted one, so we want a single object

      if (applicantError) throw applicantError;

      //3. Insert into Application
      const { error: applicationError } = await supabase
      .from('application')
      .insert([
        {
          act_id: newApplicant.id, // Linking to the first table
          pos_id: formData.position, // The ID from your dynamic dropdown
        }
      ]);

      if (applicationError) throw applicationError;

      toast.success("Application submitted successfully!", {
        description: "We've received your credentials and will be in touch.",
      });

      navigate('/careers')
    } catch (error) {
      console.error("Error:", error);
      toast.warning("Failed to upload file");
    } finally {
      setIsSubmitting(false);
    }
  };
    
  
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const stepLabels = ["Identity", "Contact", "Finalize"];


  const { formData, handleInputChange } = useForm({
    fname: '',
    lname: '',
    gender: '',
    dob: null as Date | null,
    email: '',
    phone: '',
    address: '',
    country: '',
    position: '',
  });


  return (
    <div className="min-h-screen bg-[#021a11] text-[#133020] selection:bg-[#FFB347] selection:text-[#021a11] overflow-hidden relative font-sans">
      
      {/* ── BACKGROUND VISUALS ── */}
      <div className="absolute top-24 left-1/4 w-96 h-96 bg-[#417256]/20 blur-[150px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-24 right-1/4 w-125 h-125 bg-[#FFB347]/10 blur-[180px] rounded-full pointer-events-none z-0" />

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
          <div className="bg-[#D1D5DB] relative backdrop-blur-3xl rounded-[3rem] shadow-[0_50px_100px_-30px_rgba(0,0,0,0.5)] border border-white/30 overflow-hidden">
            

            {/* ── INTERNAL LOADER ── */}
            <AnimatePresence>
              {isSubmitting && (
                <FormLoader message="Syncing Credentials" />
              )}
            </AnimatePresence>

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
              <div className="relative h-0.5 w-full bg-[#133020]/10 rounded-full overflow-hidden">
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

                        <div className="md:col-span-2 flex flex-col gap-3 group">
                          <label className="text-[10px] uppercase tracking-widest font-black text-[#133020]/50 italic group-focus-within:text-[#133020] transition-colors">
                            Desired Position
                          </label>
                          <div className="relative">
                            <select 
                              // Important: Ensure formData.position is initialized to an empty string or the default ID
                              value={formData.position} 
                              onChange={(e) => handleInputChange('position', e.target.value)}
                              className="w-full bg-white border border-[#133020]/10 rounded-2xl px-6 py-3.5 focus:outline-none focus:border-[#FFB347] focus:ring-4 focus:ring-[#FFB347]/10 appearance-none text-[#133020] text-sm font-bold transition-all cursor-pointer"
                            >
                              <option value="" disabled>Select a Position</option>
                              {positions.map((pos) => (
                                <option key={pos.id} value={pos.id}>
                                  {pos.title}
                                </option>
                              ))}
                            </select>
                            <div className="absolute top-1/2 right-6 -translate-y-1/2 text-[#133020]/30 pointer-events-none text-[10px]">▼</div>
                          </div>
                        </div>                      


                        {/*INPUT FIELDS*/}
                        <div className="flex flex-col gap-3 group">
                          <label className="text-[10px] uppercase tracking-widest font-black text-[#133020]/50 italic group-focus-within:text-[#133020] transition-colors">
                            First Name
                          </label>
                          <Input 
                            value={formData.fname}
                            onChange={(e) => handleInputChange('fname', e.target.value)}
                            placeholder="Enter First Name"
                            className="h-auto py-3.5 px-6 bg-white border border-[#133020]/10 rounded-2xl focus:border-[#FFB347] focus:ring-4 focus:ring-[#FFB347]/10 text-[#133020] text-sm font-bold placeholder:text-[#133020]/20 hover:border-[#133020]/30"
                          />
                        </div>

                        <div className="flex flex-col gap-3 group">
                          <label className="text-[10px] uppercase tracking-widest font-black text-[#133020]/50 italic group-focus-within:text-[#133020] transition-colors">
                            Last Name
                          </label>
                          <Input 
                            value={formData.lname}
                            onChange={(e) => handleInputChange('lname', e.target.value)}                
                            placeholder="Enter LastNname"
                            className="h-auto py-3.5 px-6 bg-white border border-[#133020]/10 rounded-2xl focus:border-[#FFB347] focus:ring-4 focus:ring-[#FFB347]/10 text-[#133020] text-sm font-bold placeholder:text-[#133020]/20 hover:border-[#133020]/30"
                          />
                        </div>
                        
                        <div className="flex flex-col gap-3 group">
                          <label className="text-[10px] uppercase tracking-widest font-black text-[#133020]/50 italic group-focus-within:text-[#133020] transition-colors">Gender</label>
                          <div className="relative">
                            <select 
                              value={formData.gender} 
                              onChange={(e) => handleInputChange('gender', e.target.value)}
                              className="w-full bg-white border border-[#133020]/10 rounded-2xl px-6 py-3.5 focus:outline-none focus:border-[#FFB347] focus:ring-4 focus:ring-[#FFB347]/10 appearance-none text-[#133020] text-sm font-bold transition-all cursor-pointer"
                            >
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
                            date={formData.dob}                            
                            onDateChange={(selectedDate) => handleInputChange('dob', selectedDate)}
                            className="py-6 px-6 bg-white border border-[#133020]/10 rounded-xl focus:border-[#FFB347] focus:ring-4 focus:ring-[#FFB347]/10 text-[#133020] text-sm font-bold transition-all duration-300 hover:border-[#133020]/30" 
                          />
                        </div>

                        <div className="flex flex-col gap-3 group">
                          <label className="text-[10px] uppercase tracking-widest font-black text-[#133020]/50 italic group-focus-within:text-[#133020] transition-colors">Country</label>
                          <div className="relative">
                            <select 
                              value={formData.country} 
                              onChange={(e) => handleInputChange('country', e.target.value)}
                              className="w-full bg-white border border-[#133020]/10 rounded-2xl px-6 py-3.5 focus:outline-none focus:border-[#FFB347] focus:ring-4 focus:ring-[#FFB347]/10 appearance-none text-[#133020] text-sm font-bold transition-all cursor-pointer"
                            >
                              <option>Select Country</option>
                              <option>Philippines</option>
                              <option>United States</option>
                              <option>United Kingdon</option>
                              <option>Canada</option>
                              <option>Australia</option>
                              <option>China</option>    
                              <option>India</option> 
                              <option>Japan</option>  
                              <option>Germany</option>       
                              <option>France</option>    
                              <option>Singapore</option>    
                              <option>Malaysia</option>    
                              <option>Indonesia</option>    
                              <option>Thailand</option>    
                              <option>Vietnam</option>         
                              <option>South Korea</option>                                                                                                                                                                                                                                       
                            </select>
                            <div className="absolute top-1/2 right-6 -translate-y-1/2 text-[#133020]/30 pointer-events-none text-[10px]">▼</div>
                          </div>
                        </div>                        
                      </div>
                    </section>
                  )}

                  {currentStep === 2 && (
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                      <div className="flex flex-col gap-3 group">
                        <label className="text-[10px] uppercase tracking-widest font-black text-[#133020]/50 italic group-focus-within:text-[#133020] transition-colors">
                          Email
                        </label>
                        <Input 
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}    
                          placeholder="Enter Email"
                          type="email"
                          className="h-auto py-3.5 px-6 bg-white border border-[#133020]/10 rounded-2xl focus:border-[#FFB347] focus:ring-4 focus:ring-[#FFB347]/10 text-[#133020] text-sm font-bold placeholder:text-[#133020]/20 hover:border-[#133020]/30"
                        />
                      </div>

                      <div className="flex flex-col gap-3 group">
                        <label className="text-[10px] uppercase tracking-widest font-black text-[#133020]/50 italic group-focus-within:text-[#133020] transition-colors">
                          Phone Number
                        </label>
                        <Input 
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}    
                          placeholder="Enter Phone Number"
                          className="h-auto py-3.5 px-6 bg-white border border-[#133020]/10 rounded-2xl focus:border-[#FFB347] focus:ring-4 focus:ring-[#FFB347]/10 text-[#133020] text-sm font-bold placeholder:text-[#133020]/20 hover:border-[#133020]/30"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <div className="flex flex-col gap-3 group">
                          <label className="text-[10px] uppercase tracking-widest font-black text-[#133020]/50 italic group-focus-within:text-[#133020] transition-colors">
                            Address
                          </label>
                          <Input 
                            value={formData.address}
                            onChange={(e) => handleInputChange('address', e.target.value)}    
                            placeholder="Enter Current Address"
                            className="h-auto py-3.5 px-6 bg-white border border-[#133020]/10 rounded-2xl focus:border-[#FFB347] focus:ring-4 focus:ring-[#FFB347]/10 text-[#133020] text-sm font-bold placeholder:text-[#133020]/20 hover:border-[#133020]/30"
                          />
                        </div>
                      </div>
                    </section>
                  )}

                  {currentStep === 3 && (
                    <section className="space-y-8">
                      <div 
                        onClick={() => fileInputRef.current?.click()} // Triggers the hidden input
                        className={`group relative border-2 border-dashed rounded-[2rem] p-16 text-center transition-all cursor-pointer overflow-hidden ${
                          selectedFile ? "border-[#417256] bg-[#417256]/5" : "border-[#133020]/20 hover:bg-white/50 hover:border-[#133020]"
                        }`}
                      >
                        <Upload className={`mx-auto mb-4 transition-all duration-500 ${selectedFile ? "text-[#417256]" : "text-[#133020]/30 group-hover:text-[#133020]"}`} size={40} />
                        
                        <p className="text-sm font-black uppercase tracking-tighter text-[#133020]">
                          {selectedFile ? selectedFile.name : "Drop Resume Here"}
                        </p>
                        
                        <p className="text-[9px] font-bold text-[#133020]/40 mt-2 uppercase tracking-widest">
                          {selectedFile ? `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB` : "PDF / DOCX • MAX 10MB"}
                        </p>

                        <input 
                          type="file" 
                          ref={fileInputRef}
                          className="hidden" 
                          accept=".pdf,.docx"
                          onChange={(e) => {
                            if (e.target.files?.[0]) setSelectedFile(e.target.files[0]);
                          }}
                        />
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
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className={`${
                      isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-[#FFB347] hover:shadow-[0_20px_40px_rgba(255,179,71,0.3)]"
                    } text-[#021a11] px-10 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all active:scale-95 shadow-xl`}
                  >
                    {isSubmitting ? "Uploading..." : "Submit"}
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


