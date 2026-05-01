import { useEffect, useRef } from "react";
import { ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";

// Import your asset
import restrict from "@/assets/restricted/restricted-loop.mp4";

export default function RestrictedPage() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleInteraction = () => {
      if (videoRef.current) {
        // Unmute and ensure it's playing when the user clicks
        videoRef.current.muted = false;
        videoRef.current
          .play()
          .catch((err) => console.log("Playback interaction failed:", err));
      }
    };

    // Listen for the first click to "unlock" the audio from the video
    window.addEventListener("click", handleInteraction, { once: true });

    return () => window.removeEventListener("click", handleInteraction);
  }, []);

  return (
    <div className="min-h-screen bg-[#021a11] flex items-center justify-center overflow-hidden relative px-4">
      {/* THE VIDEO LAYER (Handles both Visuals and Audio) */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted // Must start muted to guarantee autoplay
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none"
      >
        <source src={restrict} type="video/mp4" />
      </video>

      {/* THE GRADIENT OVERLAY */}
      {/* <div className="absolute inset-0 bg-linear-to-b from-[#021a11]/80 via-[#021a11]/40 to-[#021a11] pointer-events-none" /> */}

      {/* CONTENT CARD */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 text-center"
      >
        <div className="inline-flex p-4 rounded-full bg-red-500/10 border border-red-500/20 mb-6 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
          <ShieldAlert className="h-12 w-12 text-red-500" />
        </div>
        <h1 className="text-4xl font-black text-white uppercase tracking-tighter mb-2">
          Access Restricted
        </h1>
        <p className="text-white/40 text-sm max-w-xs mx-auto">
          You do not have the required permissions.
        </p>
      </motion.div>
    </div>
  );
}
