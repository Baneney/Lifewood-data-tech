// import { useState, useEffect, useRef } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { ArrowLeft, ArrowRight, Upload } from 'lucide-react';

// //components
// import { DatePicker } from "@/components/ui/datepicker";
// import { Input } from '@/components/ui/input';
// import { uploadFile } from '@/helpers/fileUpload';
// import { FormLoader } from '@/components/FormLoader';
// import { toast } from "sonner";
// import { FormComboCheckbox } from '@/components/ui/form-combox-checkbox';
// import { FormSelect } from '@/components/ui/form-select';

// // hook / helper
// import { useForm } from '@/hooks/useForm';

// //Post
// import { usePostApplications } from './admin/api/application/ApplicationPostAPI';
// //Fetch
// import { useFetchPositions } from './admin/api/application/ApplicationFetchAPI';

// export default function ApplicationForm() {
//   const navigate = useNavigate();

//   //database
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   //initialize for the position
//   const { positions } = useFetchPositions();

//   //POST
//   const handleSubmit = async () => {
//     if (!selectedFile) {
//       toast.warning("Please upload your resume first.", {
//         description: "A PDF or DOCX file is required to proceed.",
//       });
//       return;
//     }

//     setIsSubmitting(true);
//     try {
//       // 1. Use the helper to upload and get the URL
//       // We pass the applicant's name to the folder to keep things organized
//       const folderPath = `${formData.lname.trim()}_${formData.fname.trim()}`.replace(
//         /\s+/g,
//         "_",
//       );
//       console.log("Attempting upload to path:", folderPath);
//       const resumeUrl = await uploadFile(selectedFile, 'resumes', folderPath);

//       // 2. Insert into Database
//       await usePostApplications(formData, resumeUrl);
//       // console.log("DATAAAAA: ", formData)

//       toast.success("Application submitted successfully!");

//       navigate('/careers')
//     } catch (error) {
//       console.error("Error:", error);
//       toast.warning("Failed to upload file");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const [currentStep, setCurrentStep] = useState(1);
//   const totalSteps = 3;

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [currentStep]);

//   const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
//   const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

//   const stepLabels = ["Identity", "Contact", "Finalize"];

//   const { formData, handleInputChange } = useForm({
//     fname: '',
//     lname: '',
//     gender: '',
//     dob: new Date(),
//     email: '',
//     phone: '',
//     address: '',
//     country: '',
//     position: [],
//   });

//   //Gender Options
//   const genderOptions = [
//     { id: "male", name: "Male" },
//     { id: "female", name: "Female" }
//   ];

//   //Country Options
//   const countryOptions = [
//     { id: "Philippines", name: "Philippines" },
//     { id: "United States", name: "United States" },
//     { id: "United Kingdom", name: "United Kingdom" },
//     { id: "Canada", name: "Canada" },
//     { id: "Australia", name: "Australia" },
//     { id: "China", name: "China" },
//     { id: "India", name: "India" },
//     { id: "Japan", name: "Japan" },
//     { id: "Germany", name: "Germany" },
//     { id: "France", name: "France" },
//     { id: "Singapore", name: "Singapore" },
//     { id: "Malaysia", name: "Malaysia" },
//     { id: "Indonesia", name: "Indonesia" },
//     { id: "Thailand", name: "Thailand" },
//     { id: "Vietnam", name: "Vietnam" },
//     { id: "South Korea", name: "South Korea" },
//   ];

//   return (
//     <div className="min-h-screen bg-[#021a11] text-[#133020] selection:bg-[#FFB347] selection:text-[#021a11] overflow-hidden relative font-sans">

//       {/* ── BACKGROUND VISUALS ── */}
//       <div className="absolute top-24 left-1/4 w-96 h-96 bg-[#417256]/20 blur-[150px] rounded-full pointer-events-none z-0" />
//       <div className="absolute bottom-24 right-1/4 w-125 h-125 bg-[#FFB347]/10 blur-[180px] rounded-full pointer-events-none z-0" />

//       {/* Top Nav */}
//       <nav className="fixed top-0 w-full z-50 px-8 py-6 bg-[#021a11]/40 backdrop-blur-xl border-b border-white/5">
//         <div className="max-w-7xl mx-auto flex justify-between items-center">
//           <Link to="/careers" className="flex items-center gap-2 text-white/40 hover:text-white transition-colors group">
//             <ArrowLeft size={16} />
//             <span className="text-[9px] font-black uppercase tracking-[0.2em]">Exit Portal</span>
//           </Link>
//           <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.5em]">Lifewood Data Technology</span>
//         </div>
//       </nav>

//       <div className="pt-32 pb-20 px-6 relative z-10">
//         <div className="max-w-3xl mx-auto">

//           {/* Main Glass Card - Using a cleaner Gray with better contrast */}
//           <div className="bg-[#D1D5DB] relative backdrop-blur-3xl rounded-xl shadow-[0_50px_100px_-30px_rgba(0,0,0,0.5)] border border-white/30 overflow-hidden">

//             {/* ── INTERNAL LOADER ── */}
//             <AnimatePresence>
//               {isSubmitting && (
//                 <FormLoader message="Submitting..." />
//               )}
//             </AnimatePresence>

//             {/* ── REFINED FLOATING PROGRESSOR ── */}
//             <div className="px-12 pt-12 pb-4">
//               <div className="flex justify-between items-end mb-6">
//                 <div className="space-y-1">
//                    <p className="text-[#133020]/60 text-[10px] font-black uppercase tracking-[0.3em]">Step 0{currentStep}</p>
//                    <h3 className="text-xl font-black uppercase tracking-tighter text-[#133020]">
//                     {stepLabels[currentStep - 1]}
//                    </h3>
//                 </div>
//                 <div className="text-right">
//                   <span className="text-[10px] font-bold text-[#133020]/40 tabular-nums">0{currentStep} / 0{totalSteps}</span>
//                 </div>
//               </div>

//               {/* Minimalist Progress Track */}
//               <div className="relative h-0.5 w-full bg-[#133020]/10 rounded-full overflow-hidden">
//                 <motion.div
//                   className="absolute top-0 left-0 h-full bg-[#133020]"
//                   initial={false}
//                   animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
//                   transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
//                 />
//               </div>
//             </div>

//             {/* Form Content Area */}
//             <div className="p-12 md:p-16 pt-8">
//               <AnimatePresence mode="wait">
//                 <motion.div
//                   key={currentStep}
//                   initial={{ opacity: 0, y: 15 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -15 }}
//                   transition={{ duration: 0.4, ease: "circOut" }}
//                 >
//                   {currentStep === 1 && (
//                     <section className="space-y-10">
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">

//                         <div className="flex flex-col gap-3 group">
//                           <label className="text-[10px] uppercase tracking-widest font-bold text-[#133020]/50 italic group-focus-within:text-[#133020] transition-colors">
//                             Desired Position(s)
//                           </label>

//                           <FormComboCheckbox
//                             // Ensure 'position' in your useForm state is an array: []
//                             value={formData.position}
//                             // This passes the array directly to your existing handleInputChange
//                             onValueChange={(selectedArray) => handleInputChange('position', selectedArray)}
//                             options={positions.map(p => ({ id: p.id, name: p.title }))}
//                             placeholder="Select positions..."
//                             showBadges={true}
//                           />
//                         </div>

//                         {/*INPUT FIELDS*/}
//                         <div className="flex flex-col gap-3 group">
//                           <label className="text-[10px] uppercase tracking-widest font-bold text-[#133020]/50 italic group-focus-within:text-[#133020] transition-colors">
//                             First Name
//                           </label>
//                           <Input
//                             value={formData.fname}
//                             onChange={(e) => handleInputChange('fname', e.target.value)}
//                             placeholder="Enter First Name"
//                             className="h-auto py-3 px-3 bg-white border border-[#133020]/10 rounded-md focus:border-[#FFB347] focus:ring-4 focus:ring-[#FFB347]/10 text-[#133020] text-xs font-bold placeholder:text-[#133020]/20 hover:border-[#133020]/30 shadow-sm"
//                           />
//                         </div>

//                         <div className="flex flex-col gap-3 group">
//                           <label className="text-[10px] uppercase tracking-widest font-bold text-[#133020]/50 italic group-focus-within:text-[#133020] transition-colors">
//                             Last Name
//                           </label>
//                           <Input
//                             value={formData.lname}
//                             onChange={(e) => handleInputChange('lname', e.target.value)}
//                             placeholder="Enter Last Name"
//                             className="h-auto py-3 px-3 bg-white border border-[#133020]/10 rounded-md focus:border-[#FFB347] focus:ring-4 focus:ring-[#FFB347]/10 text-[#133020] text-xs font-bold placeholder:text-[#133020]/20 hover:border-[#133020]/30"
//                           />
//                         </div>

//                         <div className="flex flex-col gap-3 group">
//                           <label className="text-[10px] uppercase tracking-widest font-bold text-[#133020]/50 italic group-focus-within:text-[#133020] transition-colors">Gender</label>
//                           <div className="relative">
//                             {/* <select
//                               value={formData.gender}
//                               onChange={(e) => handleInputChange('gender', e.target.value)}
//                               className="w-full bg-white border border-[#133020]/10 rounded-md px-6 py-2.5 focus:outline-none focus:border-[#FFB347] focus:ring-4 focus:ring-[#FFB347]/10 appearance-none text-[#133020] text-sm font-bold transition-all cursor-pointer"
//                             >
//                               <option>Select Gender</option>
//                               <option>Male</option>
//                               <option>Female</option>
//                             </select>
//                             <div className="absolute top-1/2 right-6 -translate-y-1/2 text-[#133020]/30 pointer-events-none text-xs">▼</div> */}
//                             <FormSelect
//                               label=""
//                               placeholder="Select Gender"
//                               value={formData.gender} // Your local state
//                               onValueChange={(val) => handleInputChange('gender', val)} // Your state handler
//                               options={genderOptions}
//                             />
//                           </div>
//                         </div>

//                         <div className="flex flex-col gap-3 group">
//                           <label className="text-[10px] uppercase tracking-widest font-bold text-[#133020]/50 italic group-focus-within:text-[#133020] transition-colors">
//                             Birth Date
//                           </label>

//                           <DatePicker
//                             date={formData.dob}
//                             onDateChange={(selectedDate) => handleInputChange('dob', selectedDate)}
//                             className="py-5 px-6 bg-white border border-[#133020]/10 rounded-md focus:border-[#FFB347] focus:ring-4 focus:ring-[#FFB347]/10 text-[#133020] text-xs font-bold transition-all duration-300 hover:border-[#133020]/30"
//                           />
//                         </div>

//                         <div className="flex flex-col gap-3 group">
//                           <label className="text-[10px] uppercase tracking-widest font-bold text-[#133020]/50 italic group-focus-within:text-[#133020] transition-colors">Country</label>
//                           <div className="relative">
//                             <FormSelect
//                               placeholder="Select Country"
//                               value={formData.country}
//                               onValueChange={(val) => handleInputChange('country', val)}
//                               options={countryOptions}
//                             />
//                           </div>
//                         </div>
//                       </div>
//                     </section>
//                   )}

//                   {currentStep === 2 && (
//                     <section className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
//                       <div className="flex flex-col gap-3 group">
//                         <label className="text-[10px] uppercase tracking-widest font-black text-[#133020]/50 italic group-focus-within:text-[#133020] transition-colors">
//                           Email
//                         </label>
//                         <Input
//                           value={formData.email}
//                           onChange={(e) => handleInputChange('email', e.target.value)}
//                           placeholder="Enter Email"
//                           type="email"
//                           className="h-auto py-3 px-6 bg-white border border-[#133020]/10 rounded-md focus:border-[#FFB347] focus:ring-4 focus:ring-[#FFB347]/10 text-[#133020] text-xs font-bold placeholder:text-[#133020]/20 hover:border-[#133020]/30"
//                         />
//                       </div>

//                       <div className="flex flex-col gap-3 group">
//                         <label className="text-[10px] uppercase tracking-widest font-black text-[#133020]/50 italic group-focus-within:text-[#133020] transition-colors">
//                           Phone Number
//                         </label>
//                         <Input
//                           value={formData.phone}
//                           onChange={(e) => handleInputChange('phone', e.target.value)}
//                           placeholder="Enter Phone Number"
//                           className="h-auto py-3 px-6 bg-white border border-[#133020]/10 rounded-md focus:border-[#FFB347] focus:ring-4 focus:ring-[#FFB347]/10 text-[#133020] text-xs font-bold placeholder:text-[#133020]/20 hover:border-[#133020]/30"
//                         />
//                       </div>

//                       <div className="md:col-span-2">
//                         <div className="flex flex-col gap-3 group">
//                           <label className="text-[10px] uppercase tracking-widest font-black text-[#133020]/50 italic group-focus-within:text-[#133020] transition-colors">
//                             Address
//                           </label>
//                           <Input
//                             value={formData.address}
//                             onChange={(e) => handleInputChange('address', e.target.value)}
//                             placeholder="Enter Current Address"
//                             className="h-auto py-3 px-3 bg-white border border-[#133020]/10 rounded-md focus:border-[#FFB347] focus:ring-4 focus:ring-[#FFB347]/10 text-[#133020] text-xs font-bold placeholder:text-[#133020]/20 hover:border-[#133020]/30"
//                           />
//                         </div>
//                       </div>
//                     </section>
//                   )}

//                   {currentStep === 3 && (
//                     <section className="space-y-8">
//                       <div
//                         onClick={() => fileInputRef.current?.click()} // Triggers the hidden input
//                         className={`group relative border-2 border-dashed rounded-[2rem] p-16 text-center transition-all cursor-pointer overflow-hidden ${
//                           selectedFile ? "border-[#417256] bg-[#417256]/5" : "border-[#133020]/20 hover:bg-white/50 hover:border-[#133020]"
//                         }`}
//                       >
//                         <Upload className={`mx-auto mb-4 transition-all duration-500 ${selectedFile ? "text-[#417256]" : "text-[#133020]/30 group-hover:text-[#133020]"}`} size={40} />

//                         <p className="text-sm font-black uppercase tracking-tighter text-[#133020]">
//                           {selectedFile ? selectedFile.name : "Drop Resume Here"}
//                         </p>

//                         <p className="text-[9px] font-bold text-[#133020]/40 mt-2 uppercase tracking-widest">
//                           {selectedFile ? `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB` : "PDF / DOCX • MAX 10MB"}
//                         </p>

//                         <input
//                           type="file"
//                           ref={fileInputRef}
//                           className="hidden"
//                           accept=".pdf,.docx"
//                           onChange={(e) => {
//                             if (e.target.files?.[0]) setSelectedFile(e.target.files[0]);
//                           }}
//                         />
//                       </div>
//                     </section>
//                   )}
//                 </motion.div>
//               </AnimatePresence>

//               {/* Navigation Buttons */}
//               <div className="mt-20 flex justify-between items-center">
//                 <button
//                   onClick={prevStep}
//                   disabled={currentStep === 1}
//                   className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center gap-2 ${
//                     currentStep === 1 ? "opacity-0" : "text-[#133020]/40 hover:text-[#133020]"
//                   }`}
//                 >
//                   <ArrowLeft size={14} /> Previous
//                 </button>

//                 {currentStep < totalSteps ? (
//                   <button
//                     onClick={nextStep}
//                     className="group bg-[#133020] text-white px-10 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-4 hover:bg-[#046241] transition-all hover:shadow-2xl hover:shadow-[#021a11]/20 active:scale-95"
//                   >
//                     Continue <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
//                   </button>
//                 ) : (
//                   <button
//                     onClick={handleSubmit}
//                     disabled={isSubmitting}
//                     className={`${
//                       isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-[#FFB347] hover:shadow-[0_20px_40px_rgba(255,179,71,0.3)]"
//                     } text-[#021a11] px-10 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all active:scale-95 shadow-xl`}
//                   >
//                     {isSubmitting ? "Uploading..." : "Submit"}
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }










import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Upload  } from "lucide-react";
import { cn } from "@/lib/utils";

// components
import { DatePicker } from "@/components/ui/datepicker";
import { Input } from "@/components/ui/input";
import { uploadFile } from "@/helpers/fileUpload";
import { FormLoader } from "@/components/FormLoader";
import { toast } from "sonner";
import { FormComboCheckbox } from "@/components/ui/form-combox-checkbox";
import { FormSelect } from "@/components/ui/form-select";


// hook / helper
import { useForm } from "@/hooks/useForm";
import { formatToDBDate } from "@/helpers/dateFormatter";

// API
import { usePostApplications } from "./api/application/ApplicationPostAPI";
import { checkexistingApplication, checkExistingEmailPhone } from "@/pages/api/applicant/applicantFetchAPI";
import { useFetchPositions } from "./api/application/ApplicationFetchAPI";


export default function ApplicationForm() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  const stepLabels = ["Identity", "Contact", "Finalize"];

  // Hooks
  const { positions } = useFetchPositions();
  const { formData, handleInputChange } = useForm({
    fname: "",
    lname: "",
    gender: "",
    dob: new Date(),
    email: "",
    phone: "",
    address: "",
    country: "",
    position: [],
  });

  // Options
  const genderOptions = [
    { id: "male", name: "Male" },
    { id: "female", name: "Female" },
  ];

  const countryOptions = [
    { id: "Philippines", name: "Philippines" },
    { id: "United States", name: "United States" },
    { id: "United Kingdom", name: "United Kingdom" },
    { id: "Canada", name: "Canada" },
    { id: "Australia", name: "Australia" },
    { id: "China", name: "China" },
    { id: "India", name: "India" },
    { id: "Japan", name: "Japan" },
    { id: "Germany", name: "Germany" },
    { id: "France", name: "France" },
    { id: "Singapore", name: "Singapore" },
    { id: "Malaysia", name: "Malaysia" },
    { id: "Indonesia", name: "Indonesia" },
    { id: "Thailand", name: "Thailand" },
    { id: "Vietnam", name: "Vietnam" },
    { id: "South Korea", name: "South Korea" },
  ];

  const [errors, setErrors] = useState({
    position: false,
    fname: false,
    lname: false,
    gender: false,
    dob: false,
    country: false,
    email: false,
    phone: false,
    address: false,
    resume: false,
  });

  const clearError = (field: keyof typeof errors) =>
    setErrors((prev) => ({ ...prev, [field]: false }));

  // Handlers
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);

  const nextStep = () => {
    const newErrors = { ...errors };
    let hasError = false;

    if (currentStep === 1) {
      if (formData.position.length === 0) { newErrors.position = true; hasError = true; }
      if (!formData.fname.trim()) { newErrors.fname = true; hasError = true; }
      if (!formData.lname.trim()) { newErrors.lname = true; hasError = true; }
      if (!formData.gender.trim()) { newErrors.gender = true; hasError = true; }
      if (!formData.dob) { newErrors.dob = true; hasError = true; }
      if (!formData.country.trim()) { newErrors.country = true; hasError = true; }
    }

    if (currentStep === 2) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formData.email.trim() || !emailRegex.test(formData.email)) { newErrors.email = true; hasError = true; }
      if (!formData.phone.trim()) { newErrors.phone = true; hasError = true; }
      if (!formData.address.trim()) { newErrors.address = true; hasError = true; }
    }

    setErrors(newErrors);
    if (!hasError) setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const prevStep = () => {
    setErrors({ position: false, fname: false, lname: false, gender: false, dob: false, country: false, email: false, phone: false, address: false, resume: false });
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    
    //1. check for existing email/phone
    const check = await checkExistingEmailPhone(
      formData.email,
      formData.phone,
      formData.fname,
      formData.lname,
      String(formatToDBDate(formData.dob)),
    );
    if (check.conflictField) {
      toast.error(`${check.conflictField} is already registered to another user.`);
      setIsSubmitting(false);
      return;
    }

    //2. Check for any active application 
    const { hasConflict, conflictingTitles } = await checkexistingApplication(
      formData.fname,
      formData.lname,
      formData.email,
      formData.position, // The array of IDs from your form
    );
    if (hasConflict) {
      toast.error(`Already applied for: ${conflictingTitles.join(", ")}`);
      return;
    }


    if (!selectedFile) {
      toast.error("Please upload your resume first.");
      return;
    }

    setIsSubmitting(true);
    try {
      const folderPath =
        `${formData.lname.trim()}_${formData.fname.trim()}`.replace(
          /\s+/g,
          "_",
        );
      const resumeUrl = await uploadFile(selectedFile, "resumes", folderPath);
      await usePostApplications(formData, resumeUrl, check.applicantId);

      //triggers sending email to the user
      await fetch(import.meta.env.VITE_SEND_EMAIL_FUNCTION_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          name: `${formData.fname} ${formData.lname}`,
          email: formData.email,
        }),
      });

      toast.success("Application submitted successfully!");
      navigate("/careers");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to submit application.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#021a11] text-white selection:bg-[#FFB347] selection:text-[#021a11] overflow-hidden relative font-sans">
      {/* ── BACKGROUND VISUALS ── */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#417256]/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#FFB347]/5 blur-[150px] rounded-full pointer-events-none" />

      {/* Top Nav */}
      <nav className="fixed top-0 w-full z-50 px-12 py-8 bg-transparent">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link
            to="/careers"
            className="flex items-center gap-3 text-white/30 hover:text-[#FFB347] transition-all group"
          >
            <div className="p-2 rounded-full border border-white/10 group-hover:border-[#FFB347]/50 transition-colors">
              <ArrowLeft size={14} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">
              Back to Careers
            </span>
          </Link>
          <div className="flex flex-col items-end gap-1">
            <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.5em]">
              Lifewood Data Technology
            </span>
            <div className="h-[1px] w-12 bg-[#FFB347]" />
          </div>
        </div>
      </nav>

      <div className="pt-40 pb-20 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Main Glass Card */}
          <div className="bg-white/[0.03] backdrop-blur-3xl rounded-[2.5rem] border border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] overflow-hidden">
            <AnimatePresence>
              {isSubmitting && (
                <FormLoader message="Processing Application..." />
              )}
            </AnimatePresence>

            {/* ── STEP PROGRESSOR ── */}
            <div className="grid grid-cols-3 border-b border-white/5">
              {stepLabels.map((label, idx) => {
                const stepNum = idx + 1;
                const isActive = currentStep === stepNum;
                const isPast = currentStep > stepNum;
                return (
                  <div
                    key={label}
                    className={`relative py-10 px-6 flex flex-col items-center gap-3 transition-all duration-500 ${
                      isActive ? "bg-white/[0.02]" : "opacity-30"
                    }`}
                  >
                    <span
                      className={`text-[9px] font-black tracking-[0.3em] uppercase ${isActive ? "text-[#FFB347]" : "text-white"}`}
                    >
                      Step 0{stepNum}
                    </span>
                    <span className="text-xs font-bold tracking-tight text-white">
                      {label}
                    </span>

                    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/5">
                      <motion.div
                        className="h-full bg-[#FFB347]"
                        initial={false}
                        animate={{ width: isActive || isPast ? "100%" : "0%" }}
                        transition={{ duration: 0.8, ease: "circOut" }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-12 md:p-20">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  {currentStep === 1 && (
                    <section className="space-y-12">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="space-y-2">
                          <label className={cn("text-[10px] uppercase tracking-[0.2em] font-black ml-1", errors.position ? "text-red-400" : "text-white/40")}>
                            Desired Position(s)
                          </label>
                          <FormComboCheckbox
                            value={formData.position}
                            onValueChange={(val) => { handleInputChange("position", val); clearError("position"); }}
                            options={positions.map((p) => ({ id: p.id, name: p.title }))}
                            placeholder="Select positions..."
                            className={cn("bg-white/5 h-12 rounded-2xl text-white placeholder:text-white/10 font-normal", errors.position ? "border-red-500" : "border-white/10 hover:border-white/30")}
                          />
                          {errors.position && <p className="text-[10px] text-red-400 italic ml-1">Please select at least one position</p>}
                        </div>

                        <div className="space-y-2">
                          <label className={cn("text-[10px] uppercase tracking-[0.2em] font-black ml-1", errors.fname ? "text-red-400" : "text-white/40")}>
                            First Name
                          </label>
                          <Input
                            value={formData.fname}
                            onChange={(e) => { handleInputChange("fname", e.target.value); clearError("fname"); }}
                            placeholder="e.g. John"
                            className={cn("bg-white/5 h-12 pl-4 rounded-2xl text-white placeholder:text-white/10", errors.fname ? "border-red-500 focus:border-red-500" : "border-white/10 focus:border-[#FFB347]")}
                          />
                          {errors.fname && <p className="text-[10px] text-red-400 italic ml-1">This field is required</p>}
                        </div>

                        <div className="space-y-2">
                          <label className={cn("text-[10px] uppercase tracking-[0.2em] font-black ml-1", errors.lname ? "text-red-400" : "text-white/40")}>
                            Last Name
                          </label>
                          <Input
                            value={formData.lname}
                            onChange={(e) => { handleInputChange("lname", e.target.value); clearError("lname"); }}
                            placeholder="e.g. Doe"
                            className={cn("bg-white/5 h-12 pl-4 rounded-2xl text-white placeholder:text-white/10", errors.lname ? "border-red-500 focus:border-red-500" : "border-white/10 focus:border-[#FFB347]")}
                          />
                          {errors.lname && <p className="text-[10px] text-red-400 italic ml-1">This field is required</p>}
                        </div>

                        <div className="space-y-2">
                          <label className={cn("text-[10px] uppercase tracking-[0.2em] font-black ml-1", errors.gender ? "text-red-400" : "text-white/40")}>
                            Gender
                          </label>
                          <FormSelect
                            placeholder="Select Gender"
                            value={formData.gender}
                            onValueChange={(val) => { handleInputChange("gender", val); clearError("gender"); }}
                            options={genderOptions}
                            className={cn("bg-white/5 py-6 pl-4 rounded-2xl text-white placeholder:text-white/10", errors.gender ? "border-red-500 focus:border-red-500" : "border-white/10 focus:border-[#FFB347]")}
                          />
                          {errors.gender && <p className="text-[10px] text-red-400 italic ml-1">Please select your gender</p>}
                        </div>

                        <div className="space-y-2">
                          <label className={cn("text-[10px] uppercase tracking-[0.2em] font-black ml-1", errors.dob ? "text-red-400" : "text-white/40")}>
                            Birth Date
                          </label>
                          <DatePicker
                            date={formData.dob}
                            onDateChange={(val) => { handleInputChange("dob", val); clearError("dob"); }}
                            className={cn("bg-white/5 h-12 px-4 rounded-2xl text-white border hover:bg-white/5 hover:text-white", errors.dob ? "border-red-500" : "border-white/10 hover:border-white/30")}
                          />
                          {errors.dob && <p className="text-[10px] text-red-400 italic ml-1">Please select your date of birth</p>}
                        </div>

                        <div className="space-y-2">
                          <label className={cn("text-[10px] uppercase tracking-[0.2em] font-black ml-1", errors.country ? "text-red-400" : "text-white/40")}>
                            Country
                          </label>
                          <FormSelect
                            placeholder="Select Country"
                            value={formData.country}
                            onValueChange={(val) => { handleInputChange("country", val); clearError("country"); }}
                            options={countryOptions}
                            className={cn("bg-white/5 py-6 pl-4 rounded-2xl text-white placeholder:text-white/10", errors.country ? "border-red-500 focus:border-red-500" : "border-white/10 focus:border-[#FFB347]")}
                          />
                          {errors.country && <p className="text-[10px] text-red-400 italic ml-1">Please select your country</p>}
                        </div>
                      </div>
                    </section>
                  )}

                  {currentStep === 2 && (
                    <section className="space-y-12">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="space-y-2">
                          <label className={cn("text-[10px] uppercase tracking-[0.2em] font-black ml-1", errors.email ? "text-red-400" : "text-white/40")}>
                            Email Address
                          </label>
                          <Input
                            type="email"
                            value={formData.email}
                            onChange={(e) => { handleInputChange("email", e.target.value); clearError("email"); }}
                            placeholder="email@example.com"
                            className={cn("bg-white/5 h-12 pl-4 rounded-2xl text-white", errors.email ? "border-red-500 focus:border-red-500" : "border-white/10 focus:border-[#FFB347]")}
                          />
                          {errors.email && <p className="text-[10px] text-red-400 italic ml-1">Please enter a valid email address</p>}
                        </div>

                        <div className="space-y-2">
                          <label className={cn("text-[10px] uppercase tracking-[0.2em] font-black ml-1", errors.phone ? "text-red-400" : "text-white/40")}>
                            Phone Number
                          </label>
                          <Input
                            value={formData.phone}
                            onChange={(e) => { handleInputChange("phone", e.target.value); clearError("phone"); }}
                            placeholder="+63 --- --- ----"
                            className={cn("bg-white/5 h-12 pl-4 rounded-2xl text-white", errors.phone ? "border-red-500 focus:border-red-500" : "border-white/10 focus:border-[#FFB347]")}
                          />
                          {errors.phone && <p className="text-[10px] text-red-400 italic ml-1">This field is required</p>}
                        </div>

                        <div className="md:col-span-2 space-y-2">
                          <label className={cn("text-[10px] uppercase tracking-[0.2em] font-black ml-1", errors.address ? "text-red-400" : "text-white/40")}>
                            Current Address
                          </label>
                          <Input
                            value={formData.address}
                            onChange={(e) => { handleInputChange("address", e.target.value); clearError("address"); }}
                            placeholder="Street, City, Province"
                            className={cn("bg-white/5 h-12 pl-4 rounded-2xl text-white", errors.address ? "border-red-500 focus:border-red-500" : "border-white/10 focus:border-[#FFB347]")}
                          />
                          {errors.address && <p className="text-[10px] text-red-400 italic ml-1">This field is required</p>}
                        </div>
                      </div>
                    </section>
                  )}

                  {currentStep === 3 && (
                    <section className="flex flex-col items-center py-6">
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className={`w-full max-w-md group border-2 border-dashed rounded-[3rem] p-16 text-center transition-all cursor-pointer ${
                          selectedFile
                            ? "border-[#FFB347] bg-[#FFB347]/5"
                            : "border-white/10 hover:border-white/30 hover:bg-white/5"
                        }`}
                      >
                        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                          <Upload
                            className={
                              selectedFile ? "text-[#FFB347]" : "text-white/20"
                            }
                            size={32}
                          />
                        </div>
                        <h4 className="text-white font-bold mb-2">
                          {selectedFile ? selectedFile.name : "Upload Resume"}
                        </h4>
                        <p className="text-white/30 text-[10px] uppercase tracking-widest">
                          {selectedFile
                            ? `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB`
                            : "PDF / DOCX • MAX 10MB"}
                        </p>
                        <input
                          type="file"
                          ref={fileInputRef}
                          className="hidden"
                          accept=".pdf,.docx"
                          onChange={(e) => {
                            if (e.target.files?.[0])
                              setSelectedFile(e.target.files[0]);
                          }}
                        />
                      </div>
                    </section>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* ── NAVIGATION ── */}
              <div className="mt-24 flex justify-between items-center">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className={`text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-3 transition-all ${
                    currentStep === 1
                      ? "opacity-0 pointer-events-none"
                      : "text-white/40 hover:text-white"
                  }`}
                >
                  <ArrowLeft size={14} /> Previous
                </button>

                <button
                  onClick={currentStep < totalSteps ? nextStep : handleSubmit}
                  disabled={isSubmitting}
                  className={`group relative overflow-hidden px-14 py-5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] transition-all active:scale-95 ${
                    currentStep === totalSteps
                      ? "bg-[#FFB347] text-[#021a11] shadow-[0_20px_40px_rgba(255,179,71,0.2)]"
                      : "bg-white text-[#021a11] hover:shadow-[0_15px_30px_rgba(255,255,255,0.1)]"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    {currentStep === totalSteps
                      ? isSubmitting
                        ? "Uploading..."
                        : "Finish & Submit"
                      : "Continue"}
                    {currentStep < totalSteps && (
                      <ArrowRight
                        size={14}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    )}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
















