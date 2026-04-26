import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

// 1. Define the shape of your data
interface StackItem {
  tag: string;
  label: string;
  desc: string;
}

interface ScrollStackProps {
  bgText?: string;
  eyebrow?: string;
  headline?: string;
  headlineAccent?: string;
  items: StackItem[];
}

export default function ScrollStack({ 
  bgText = "STRUCTURE", 
  eyebrow = "[ Architecture ]", 
  headline = "Precision at", 
  headlineAccent = "Every Layer.",
  items 
}: ScrollStackProps) {
  const targetRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const textBgY = useTransform(smoothProgress, [0, 1], ["-300px", "300px"]);
  const gridY = useTransform(smoothProgress, [0, 1], ["-150px", "150px"]);
  const contentY = useTransform(smoothProgress, [0, 1], ["100px", "-100px"]);
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={targetRef} className="relative h-[150vh] bg-[#021a11] overflow-hidden flex items-center justify-center border-y border-white/5">
      
      {/* BACKGROUND Layer */}
      <motion.div style={{ y: textBgY }} className="absolute inset-0 flex items-center justify-center opacity-[0.05] select-none pointer-events-none">
        <h2 className="text-[30vw] font-black uppercase whitespace-nowrap leading-none text-white">
          {bgText}
        </h2>
      </motion.div>

      {/* MIDDLE Layer */}
      <motion.div style={{ y: gridY }} className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#FFB347_2px,transparent_2px)] bg-size-[80px_80px]" />
      </motion.div>

      {/* FOREGROUND Layer */}
      <motion.div style={{ y: contentY, opacity }} className="relative z-10 w-full max-w-7xl p-8">
        <div className="mb-20">
          <p className="text-[#FFB347] font-mono text-[10px] uppercase tracking-[0.8em] mb-4">{eyebrow}</p>
          <h2 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-[0.8] text-white">
            {headline}<br />
            <span className="text-transparent border-text">{headlineAccent}</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <motion.div 
              key={item.tag}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="p-8 border border-white/10 bg-[#032418]/80 backdrop-blur-xl rounded-sm group hover:border-[#FFB347] transition-all duration-500"
            >
              <div className="flex justify-between items-start mb-8">
                <span className="text-[#FFB347] font-mono text-xs border border-[#FFB347]/30 px-2 py-1">{item.tag}</span>
                <div className="w-2 h-2 rounded-full bg-[#FFB347] shadow-[0_0_10px_#FFB347]" />
              </div>
              <h3 className="text-2xl font-bold uppercase mb-3 text-white">{item.label}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}