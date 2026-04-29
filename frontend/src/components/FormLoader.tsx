import { motion, AnimatePresence, type Variants } from 'framer-motion';

const loaderVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const packetVariants: Variants = {
  animate: {
    y: [-20, 0],
    scale: [1, 1.2],
    opacity: [0, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      // Change "circOut" to "easeOut" or use a bezier curve for broader compatibility
      ease: [0, 0.55, 0.45, 1], 
      delay: 0.2 
    },
  },
};

const coreVariants: Variants = {
  animate: {
    scale: [1, 1.3, 1],
    boxShadow: [
      "0 0 10px rgba(255,179,71,0.2)",
      "0 0 30px rgba(255,179,71,0.5)",
      "0 0 10px rgba(255,179,71,0.2)",
    ],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const FormLoader = ({ message = "Processing" }: { message?: string }) => {
  return (
    <motion.div 
      variants={loaderVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      // "absolute inset-0" ensures it covers only the parent container
      className="absolute inset-0 z-50 flex items-center justify-center bg-[#D1D5DB]/90 backdrop-blur-md rounded-[3rem]"
    >
      <div className="text-center space-y-12">
        
        {/* ── THE MERGE ANIMATION ── */}
        <div className="relative flex justify-center items-center h-24">
          
          {/* Packet A (Green) - coming from top-left */}
          <motion.div 
            variants={packetVariants}
            animate="animate"
            className="absolute top-0 left-1/4 w-3 h-3 bg-[#133020] rounded-full border border-white/30"
          />
          
          {/* Packet B (Orange) - coming from top-right */}
          <motion.div 
            variants={packetVariants}
            animate="animate"
            className="absolute top-0 right-1/4 w-3 h-3 bg-[#FFB347] rounded-full border border-white/30"
          />

          {/* Core (Where they merge) */}
          <motion.div 
            variants={coreVariants}
            animate="animate"
            // Start with a small green core that gets orange energy
            className="w-10 h-10 rounded-full bg-gradient-to-br from-[#133020] to-[#FFB347] border-2 border-white/50"
          />

          {/* Subtly moving background circuit pattern in the blur */}
          <div className="absolute inset-0 flex justify-center items-center">
             <div className="w-1/2 h-1/2 rounded-full border border-white/5 animate-pulse-slow" />
          </div>
        </div>

        {/* ── MESSAGE ── */}
        <div className="space-y-3">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#133020] animate-pulse">
            {message}
          </p>
          <p className="text-[9px] font-bold text-[#133020]/40 uppercase tracking-[0.2em] italic">
            Lifewood Sync Engine
          </p>
        </div>
      </div>
    </motion.div>
  );
};