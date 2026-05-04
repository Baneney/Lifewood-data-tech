
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import logo from "@/assets/Lifewood-LogoV2.png";
import { signInWithEmail } from "../../api/login/AdminLoginFetchAPI";
import { useForm } from "@/hooks/useForm";


export default function Login() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);



  const { formData, handleInputChange } = useForm({
    email: "", 
    password: "" 
  });


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmail(formData);

      toast.success("Logged in successfully");

      navigate("/admin");
    } catch (error) {
      toast.error("Login failed");
    } finally {
      setLoading(false);
    }
  };

  
  return (
    // Updated Background Color to Deep Green
    <div className="min-h-screen bg-[#021a11] flex items-center justify-center overflow-hidden relative px-4">
      {/* ── Grid texture (Kept white opacity for tech feel) ── */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* ── Updated Creative Glows (Matching your reference) ── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-250 h-100 bg-[#417256]/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-[#FFB347]/10 blur-[100px] rounded-full animate-pulse pointer-events-none" />

      {/* ── Card ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-md z-10"
      >
        <div className="absolute -inset-px rounded-2xl bg-linear-to-b from-white/10 to-white/0 pointer-events-none" />

        <div className="relative bg-white/4 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.6)] overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#FFB347]/40 to-transparent" />

          <div className="px-8 pt-10 pb-8">
            {/* ── INTEGRATED ANIMATED LOGO ── */}
            <div className="text-center mb-8">
              <div className="group relative inline-block p-px mb-6 rounded-2xl overflow-hidden shadow-2xl">
                {/* 1. Smoothing Layer */}
                <div
                  className="absolute inset-[-50%] bg-[conic-gradient(from_0deg,transparent_45%,#FFB347_50%,transparent_55%)] animate-[spin_6s_linear_infinite] blur-xs opacity-40"
                  style={{ willChange: "transform" }}
                />

                {/* 2. Main Beam */}
                <div
                  className="absolute -inset-full bg-[conic-gradient(from_0deg,transparent_35%,#FFB347_50%,transparent_65%)] animate-[spin_6s_linear_infinite] opacity-60"
                  style={{ willChange: "transform" }}
                />

                {/* 3. The Container */}
                <div className="relative p-3 rounded-2xl bg-[#043523] backdrop-blur-3xl border border-white/10 transition-all duration-500 group-hover:scale-105 group-hover:border-[#FFB347]/30">
                  <img
                    src={logo}
                    alt="Lifewood"
                    className="h-7 transition-all duration-500 group-hover:brightness-110 group-hover:drop-shadow-[0_0_10px_rgba(255,179,71,0.2)]"
                  />
                </div>

                {/* 4. Static Inner Glow */}
                <div className="absolute inset-0 bg-[#FFB347]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
              </div>

              <h1 className="text-2xl font-black text-white tracking-tight">
                Welcome back
              </h1>
              <p className="text-sm text-white/30 mt-2">
                Sign in to the admin portal
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-white uppercase tracking-widest">
                  Email Address
                </label>
                <Input
                  name="email"
                  type="email"
                  placeholder="admin@lifewood.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                  className="h-11 bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-[#FFB347]/50 focus:ring-2 focus:ring-[#FFB347]/10 rounded-xl text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-black text-white uppercase tracking-widest">
                    Password
                  </label>
                  <Link
                    to="/admin/forgot-password"
                    className="text-[10px] text-[#FFB347]/60 hover:text-[#FFB347] transition-colors font-semibold"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    name="password" // Added name attribute to match formData key
                    type={showPass ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password} // Changed from form.password to formData.password
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    } // Updated to match ApplicationForm style
                    required
                    className="h-11 bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-[#FFB347]/50 focus:ring-2 focus:ring-[#FFB347]/10 rounded-xl text-sm pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/60 transition-colors"
                  >
                    {/* This toggles the icon visually while the 'type' above toggles the dots/text */}
                    {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="group w-full mt-2 h-11 bg-[#FFB347] text-[#021a11] rounded-xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,179,71,0.3)] disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
              >
                {loading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <>
                    Sign In
                    <ArrowRight
                      size={15}
                      className="group-hover:translate-x-0.5 transition-transform"
                    />
                  </>
                )}
              </button>
            </form>

            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-white/5" />
              <span className="text-[10px] text-white/20 uppercase tracking-widest">
                or
              </span>
              <div className="flex-1 h-px bg-white/5" />
            </div>

            <p className="text-center text-sm text-white/30">
              Don't have an account?{" "}
              <Link
                to="/admin/signup"
                className="text-[#FFB347] font-bold hover:text-white transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-[10px] text-white/15 mt-6 uppercase tracking-widest">
          Lifewood Data Technology · Admin Portal
        </p>
      </motion.div>
    </div>
  );
}