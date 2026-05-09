import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Upload } from "lucide-react";
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
import { usePostApplications } from "../api/application/ApplicationPostAPI";
import {
  checkexistingApplication,
  checkExistingEmailPhone,
} from "@/api/applicant/applicantFetchAPI";
import { useFetchCareerPositions } from "../api/position/positionFetchAPI";





const BackgroundVisuals = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* --- Existing Orbs --- */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-[#417256]/20 blur-[120px] rounded-full"
      />

      <motion.div
        animate={{
          x: [0, -80, 0],
          y: [0, 120, 0],
          scale: [1, 1.5, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[10%] right-[-5%] w-[50%] h-[50%] bg-[#FFB347]/10 blur-[120px] rounded-full"
      />

      {/* --- Pulsing Decorative Circles --- */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: i * 2, // Staggered entry
            ease: "easeInOut",
          }}
          className={cn(
            "absolute rounded-full border border-white/10",
            i === 0 && "top-1/4 left-1/4 w-64 h-64",
            i === 1 && "bottom-1/3 right-1/4 w-96 h-96 border-[#FFB347]/20",
            i === 2 && "top-1/2 left-2/3 w-48 h-48",
          )}
        />
      ))}

      {/* --- Small Glowing Points (The "Stars") --- */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`point-${i}`}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute w-1 h-1 bg-[#FFB347] rounded-full shadow-[0_0_8px_#FFB347]"
            style={{
              top: `${15 + i * 12}%`,
              left: `${10 + ((i * 17) % 80)}%`,
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 opacity-[0.03] brightness-100 contrast-150 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
};








export default function ApplicationForm() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // State
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [countryCode, setCountryCode] = useState("(+63)");
  const totalSteps = 3;

  // Hooks
  const { positions } = useFetchCareerPositions();
  const { formData, handleInputChange } = useForm({
    fname: "",
    lname: "",
    gender: "",
    dob: null,
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

  // Define some common country code options
  const countryCodeOptions = [
    { id: "(+63)", name: "🇵🇭 +63" },
    { id: "(+1)", name: "🇺🇸 +1" },
    { id: "(+44)", name: "🇬🇧 +44" },
    { id: "(+65)", name: "🇸🇬 +65" },
    // ... add more as needed
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      if (formData.position.length === 0) {
        newErrors.position = true;
        hasError = true;
      }
      if (!formData.fname.trim()) {
        newErrors.fname = true;
        hasError = true;
      }
      if (!formData.lname.trim()) {
        newErrors.lname = true;
        hasError = true;
      }
      if (!formData.gender.trim()) {
        newErrors.gender = true;
        hasError = true;
      }
      if (!formData.dob) {
        newErrors.dob = true;
        hasError = true;
      } else {
        const today = new Date();
        const birth = new Date(formData.dob!);
        const birthdayThisYear = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
        const age = today.getFullYear() - birth.getFullYear() - (today < birthdayThisYear ? 1 : 0);
        if (age < 18) {
          newErrors.dob = true;
          hasError = true;
        }
      }
      if (!formData.country.trim()) {
        newErrors.country = true;
        hasError = true;
      }
    }

    if (currentStep === 2) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formData.email.trim() || !emailRegex.test(formData.email)) {
        newErrors.email = true;
        hasError = true;
      }
      if (!formData.phone.trim()) {
        newErrors.phone = true;
        hasError = true;
      }
      if (!formData.address.trim()) {
        newErrors.address = true;
        hasError = true;
      }
    }

    setErrors(newErrors);
    if (!hasError) setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const prevStep = () => {
    setErrors({
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
      toast.error(
        `${check.conflictField} is already registered to another user.`,
      );
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
      // Combine the prefix and local number
      const fullPhoneNumber = `${countryCode}${formData.phone.trim()}`;
      // Create a version of formData that includes the concatenated number
      const submissionData = {
        ...formData,
        phone: fullPhoneNumber,
      };
      
      const folderPath =
        `${formData.lname.trim()}_${formData.fname.trim()}`.replace(
          /\s+/g,
          "_",
        );
      const resumeUrl = await uploadFile(selectedFile, "resumes", folderPath);
      
      //insert on the database yoho!
      const result = await usePostApplications(submissionData, resumeUrl, check.applicantId);


      //use to track positions the user picked (for the email)
      const applicationDetails = result.applications.map((app) => {
        const title =
          positions.find((p) => p.id === app.pos_id)?.title || "Specialist";
        return { title, id: app.id };
      });

      const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

      //triggers sending email to the user
      await fetch(`${API_BASE_URL}/api/send-confirmation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          name: `${formData.fname} ${formData.lname}`,
          applications: applicationDetails,
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
    <div className="miin-h-screen bg-[#021a11] text-white selection:bg-[#FFB347] selection:text-[#021a11] overflow-x-hidden relative font-sans">
      {/* ── BACKGROUND VISUALS ── */}
      <BackgroundVisuals />

      {/* Top Nav */}
      <nav
        className={cn(
          "fixed top-0 w-full z-50 px-12 transition-all duration-300",
          isScrolled
            ? "py-4 bg-[#021a11]/40 backdrop-blur-xl"
            : "py-8 bg-transparent",
        )}
      >
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
            <div className="h-px w-12 bg-[#FFB347]" />
          </div>
        </div>
      </nav>

      <div className="pt-40 pb-20 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Main Glass Card */}
          <div className="bg-white/[0.03] backdrop-blur-2xl rounded-[3rem] border border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.7)] overflow-hidden">
            <AnimatePresence>
              {isSubmitting && (
                <FormLoader message="Processing Application..." />
              )}
            </AnimatePresence>

            {/* ── STEP PROGRESSOR ── */}
            <div className="pt-12 md:pt-16">
              <div className="relative w-full max-w-md mx-auto mb-12 px-4">
                {/* The Background Track */}
                <div className="absolute top-2 -left-[5%] w-[110%] h-[1px] bg-white/10 z-0" />

                {/* The Glowing Aura */}
                <motion.div
                  className="absolute top-2 h-[2px] bg-[#FFB347] z-10 shadow-[0_0_15px_#FFB347]"
                  initial={false}
                  animate={{
                    // Shift the start point to the left to create a tail
                    left: "-5%",
                    // Add 10% to the total width (5% for left tail, 5% for right tail)
                    width: `${((currentStep - 1) / (totalSteps - 1)) * 100 + 10}%`,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />

                {/* Step Circles */}
                <div className="relative flex justify-between w-full z-20">
                  {[1, 2, 3].map((step) => (
                    <div
                      key={step}
                      className="relative flex flex-col items-center"
                    >
                      {/* Step Node */}
                      <motion.div
                        animate={{
                          backgroundColor:
                            currentStep >= step
                              ? "#FFB347"
                              : "rgba(255, 255, 255, 0.1)",
                          scale: currentStep === step ? 1.2 : 1,
                          boxShadow:
                            currentStep === step
                              ? "0 0 25px rgba(255, 179, 71, 0.6)"
                              : "0 0 0px rgba(255, 179, 71, 0)",
                        }}
                        className="w-4 h-4 rounded-full border border-white/20 transition-all duration-500"
                      />

                      {/* Step Label (Optional) */}
                      <motion.span
                        animate={{
                          opacity: currentStep === step ? 1 : 0.4,
                          y: currentStep === step ? 8 : 12,
                        }}
                        className="absolute top-6 text-[10px] font-black uppercase tracking-widest text-white whitespace-nowrap"
                      >
                        {step === 1 && "Identity"}
                        {step === 2 && "Contact"}
                        {step === 3 && "Finalize"}
                      </motion.span>
                    </div>
                  ))}
                </div>

                {/* Ambient Background Glow (The "Aura") */}
                <motion.div
                  className="absolute -top-8 left-0 w-32 h-32 bg-[#FFB347]/10 blur-[50px] rounded-full pointer-events-none z-0"
                  animate={{
                    // Calculation: (currentStep - 1) / (totalSteps - 1) * 100
                    left: `${((currentStep - 1) / 2) * 100}%`,
                    x: "-50%", // This ensures the glow is centered on the point
                  }}
                  transition={{ type: "spring", stiffness: 100, damping: 20 }}
                />
              </div>
            </div>

            <div className="p-12 md:p-20">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.98 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  {currentStep === 1 && (
                    <section className="space-y-12">
                      <div className="space-y-2 mb-10">
                        <h2 className="text-3xl font-bold tracking-tight">
                          Personal Details
                        </h2>
                        <p className="text-white/40 text-sm">
                          Please provide your identity information as it appears
                          on your official documents.
                        </p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="space-y-2">
                          <label
                            className={cn(
                              "text-[10px] uppercase tracking-[0.2em] font-black ml-1",
                              errors.position
                                ? "text-red-400"
                                : "text-white/40",
                            )}
                          >
                            Desired Position(s)
                          </label>
                          <FormComboCheckbox
                            value={formData.position}
                            onValueChange={(val) => {
                              handleInputChange("position", val);
                              clearError("position");
                            }}
                            options={positions.map((p) => ({
                              id: p.id,
                              name: p.title,
                            }))}
                            placeholder="Select positions..."
                            className={cn(
                              "bg-white/5 h-12 rounded-2xl text-white placeholder:text-white/10 font-normal",
                              errors.position
                                ? "border-red-500"
                                : "border-white/10 hover:border-white/30",
                            )}

                          />
                          {errors.position && (
                            <p className="text-[10px] text-red-400 italic ml-1">
                              Please select at least one position
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <label
                            className={cn(
                              "text-[10px] uppercase tracking-[0.2em] font-black ml-1",
                              errors.fname ? "text-red-400" : "text-white/40",
                            )}
                          >
                            First Name
                          </label>
                          <Input
                            value={formData.fname}
                            onChange={(e) => {
                              handleInputChange("fname", e.target.value);
                              clearError("fname");
                            }}
                            placeholder="e.g. John"
                            className={cn(
                              "bg-white/5 h-12 pl-4 rounded-2xl text-white placeholder:text-white/10",
                              errors.fname
                                ? "border-red-500 focus:border-red-500"
                                : "border-white/10 focus:border-[#FFB347]",
                            )}
                          />
                          {errors.fname && (
                            <p className="text-[10px] text-red-400 italic ml-1">
                              This field is required
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <label
                            className={cn(
                              "text-[10px] uppercase tracking-[0.2em] font-black ml-1",
                              errors.lname ? "text-red-400" : "text-white/40",
                            )}
                          >
                            Last Name
                          </label>
                          <Input
                            value={formData.lname}
                            onChange={(e) => {
                              handleInputChange("lname", e.target.value);
                              clearError("lname");
                            }}
                            placeholder="e.g. Doe"
                            className={cn(
                              "bg-white/5 h-12 pl-4 rounded-2xl text-white placeholder:text-white/10",
                              errors.lname
                                ? "border-red-500 focus:border-red-500"
                                : "border-white/10 focus:border-[#FFB347]",
                            )}
                          />
                          {errors.lname && (
                            <p className="text-[10px] text-red-400 italic ml-1">
                              This field is required
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <label
                            className={cn(
                              "text-[10px] uppercase tracking-[0.2em] font-black ml-1",
                              errors.gender ? "text-red-400" : "text-white/40",
                            )}
                          >
                            Gender
                          </label>
                          <FormSelect
                            placeholder="Select Gender"
                            value={formData.gender}
                            onValueChange={(val) => {
                              handleInputChange("gender", val);
                              clearError("gender");
                            }}
                            options={genderOptions}
                            className={cn(
                              "bg-white/5 py-6 pl-4 rounded-2xl text-white placeholder:text-white/10",
                              errors.gender
                                ? "border-red-500 focus:border-red-500"
                                : "border-white/10 focus:border-[#FFB347]",
                            )}
                          />
                          {errors.gender && (
                            <p className="text-[10px] text-red-400 italic ml-1">
                              Please select your gender
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <label
                            className={cn(
                              "text-[10px] uppercase tracking-[0.2em] font-black ml-1",
                              errors.dob ? "text-red-400" : "text-white/40",
                            )}
                          >
                            Birth Date
                          </label>
                          <DatePicker
                            date={formData.dob}
                            onDateChange={(val) => {
                              handleInputChange("dob", val);
                              clearError("dob");
                            }}
                            className={cn(
                              "bg-white/5 h-12 px-4 rounded-2xl text-white border hover:bg-white/5 hover:text-white",
                              errors.dob
                                ? "border-red-500"
                                : "border-white/10 hover:border-white/30",
                            )}
                          />
                          {errors.dob && (
                            <p className="text-[10px] text-red-400 italic ml-1">
                              You must be at least 18 years old to apply
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <label
                            className={cn(
                              "text-[10px] uppercase tracking-[0.2em] font-black ml-1",
                              errors.country ? "text-red-400" : "text-white/40",
                            )}
                          >
                            Country
                          </label>
                          <FormSelect
                            placeholder="Select Country"
                            value={formData.country}
                            onValueChange={(val) => {
                              handleInputChange("country", val);
                              clearError("country");
                            }}
                            options={countryOptions}
                            className={cn(
                              "bg-white/5 py-6 pl-4 rounded-2xl text-white placeholder:text-white/10",
                              errors.country
                                ? "border-red-500 focus:border-red-500"
                                : "border-white/10 focus:border-[#FFB347]",
                            )}
                          />
                          {errors.country && (
                            <p className="text-[10px] text-red-400 italic ml-1">
                              Please select your country
                            </p>
                          )}
                        </div>
                      </div>
                    </section>
                  )}

                  {currentStep === 2 && (
                    <section className="space-y-12">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="space-y-2">
                          <label
                            className={cn(
                              "text-[10px] uppercase tracking-[0.2em] font-black ml-1",
                              errors.email ? "text-red-400" : "text-white/40",
                            )}
                          >
                            Email Address
                          </label>
                          <Input
                            type="email"
                            value={formData.email}
                            onChange={(e) => {
                              handleInputChange("email", e.target.value);
                              clearError("email");
                            }}
                            placeholder="email@example.com"
                            className={cn(
                              "bg-white/5 h-12 pl-4 rounded-2xl text-white",
                              errors.email
                                ? "border-red-500 focus:border-red-500"
                                : "border-white/10 focus:border-[#FFB347]",
                            )}
                          />
                          {errors.email && (
                            <p className="text-[10px] text-red-400 italic ml-1">
                              Please enter a valid email address
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <label
                            className={cn(
                              "text-[10px] uppercase tracking-[0.2em] font-black ml-1",
                              errors.phone ? "text-red-400" : "text-white/40",
                            )}
                          >
                            Phone Number
                          </label>

                          <div className="flex gap-0 group">
                            {/* Country Code Dropdown */}
                            <div className="w-1/3 min-w-[100px]">
                              <FormSelect
                                placeholder="+63"
                                value={countryCode}
                                onValueChange={(val) => setCountryCode(val)}
                                options={countryCodeOptions}
                                className={cn(
                                  "bg-white/5 py-6 pl-4 rounded-l-2xl rounded-r-none text-white border-r-0",
                                  errors.phone
                                    ? "border-red-500"
                                    : "border-white/10",
                                )}
                              />
                            </div>

                            {/* Local Number Input */}
                            <div className="flex-1">
                              <Input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => {
                                  // Optional: allow only numbers
                                  const value = e.target.value.replace(
                                    /\D/g,
                                    "",
                                  );
                                  handleInputChange("phone", value);
                                  clearError("phone");
                                }}
                                placeholder="912 345 6789"
                                className={cn(
                                  "bg-white/5 h-12 pl-4 py-6 rounded-r-2xl rounded-l-none text-white",
                                  errors.phone
                                    ? "border-red-500 focus:border-red-500"
                                    : "border-white/10 border-l-white/5 focus:border-[#FFB347]",
                                )}
                              />
                            </div>
                          </div>

                          {errors.phone && (
                            <p className="text-[10px] text-red-400 italic ml-1">
                              Please enter your phone number
                            </p>
                          )}
                        </div>

                        <div className="md:col-span-2 space-y-2">
                          <label
                            className={cn(
                              "text-[10px] uppercase tracking-[0.2em] font-black ml-1",
                              errors.address ? "text-red-400" : "text-white/40",
                            )}
                          >
                            Current Address
                          </label>
                          <Input
                            value={formData.address}
                            onChange={(e) => {
                              handleInputChange("address", e.target.value);
                              clearError("address");
                            }}
                            placeholder="Street, City, Province"
                            className={cn(
                              "bg-white/5 h-12 pl-4 rounded-2xl text-white",
                              errors.address
                                ? "border-red-500 focus:border-red-500"
                                : "border-white/10 focus:border-[#FFB347]",
                            )}
                          />
                          {errors.address && (
                            <p className="text-[10px] text-red-400 italic ml-1">
                              This field is required
                            </p>
                          )}
                        </div>
                      </div>
                    </section>
                  )}

                  {currentStep === 3 && (
                    <section className="flex flex-col items-center py-6">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => fileInputRef.current?.click()}
                        className={`w-full max-w-md group border-2 border-dashed rounded-[3rem] p-16 text-center transition-all cursor-pointer relative overflow-hidden ${
                          selectedFile
                            ? "border-[#FFB347] bg-[#FFB347]/10"
                            : "border-white/10 hover:border-[#FFB347]/50 bg-white/5"
                        }`}
                      >
                        {/* Dynamic Scanning Laser Effect */}
                        {selectedFile && (
                          <motion.div
                            animate={{ top: ["0%", "100%", "0%"] }}
                            transition={{
                              duration: 4,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="absolute left-0 w-full h-[2px] bg-[#FFB347]/40 shadow-[0_0_15px_#FFB347] z-0"
                          />
                        )}

                        {/* Upload Icon Container */}
                        <div className="relative z-10">
                          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500">
                            <Upload
                              className={
                                selectedFile
                                  ? "text-[#FFB347]"
                                  : "text-white/20"
                              }
                              size={32}
                            />
                          </div>

                          <h4 className="text-xl font-bold">
                            {selectedFile
                              ? "Resume Uploaded"
                              : "Drop your CV here"}
                          </h4>

                          <p className="text-white/40 text-xs mt-2 uppercase tracking-[0.2em]">
                            {selectedFile
                              ? selectedFile.name
                              : "We prefer PDF, but we're flexible"}
                          </p>
                        </div>

                        {/* Hidden File Input */}
                        <input
                          type="file"
                          ref={fileInputRef}
                          className="hidden"
                          accept=".pdf,.docx"
                          onChange={(e) => {
                            if (e.target.files?.[0]) {
                              setSelectedFile(e.target.files[0]);
                            }
                          }}
                        />
                      </motion.div>

                      {/* Optional: Small text below the box */}
                      <p className="mt-4 text-white/20 text-[10px] uppercase tracking-widest">
                        Max file size: 10MB
                      </p>
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














