// import { useRef } from "react";
// import { motion, useScroll, useTransform } from "framer-motion";

// export default function ScrollStack() {
//   const targetRef = useRef(null);
  
//   // Tracks scroll progress of THIS section only
//   const { scrollYProgress } = useScroll({
//     target: targetRef,
//     offset: ["start end", "end start"],
//   });

//   // Parallax Math: Adjust these numbers to change speed/depth
//   const textBgY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
//   const gridY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
//   const contentY = useTransform(scrollYProgress, [0, 1], ["40px", "-40px"]);
//   const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

//   return (
//     <section 
//       ref={targetRef} 
//       className="relative h-[120vh] bg-[#021a11] overflow-hidden flex items-center justify-center border-y border-white/5"
//     >
//       {/* BACKGROUND LAYER: Ghost Text */}
//       <motion.div 
//         style={{ y: textBgY }} 
//         className="absolute inset-0 flex items-center justify-center opacity-[0.03] select-none pointer-events-none"
//       >
//         <h2 className="text-[25vw] font-black uppercase whitespace-nowrap leading-none">
//           STRUCTURE
//         </h2>
//       </motion.div>

//       {/* MIDDLE LAYER: Animated Tech Grid */}
//       <motion.div 
//         style={{ y: gridY }}
//         className="absolute inset-0 opacity-20 pointer-events-none"
//       >
//         <div className="absolute inset-0 bg-[radial-gradient(#FFB347_1px,transparent_1px)] [background-size:60px_60px]" />
//       </motion.div>

//       {/* FOREGROUND: Interactive Cards */}
//       <motion.div 
//         style={{ y: contentY, opacity }}
//         className="relative z-10 w-full max-w-6xl px-8"
//       >
//         <div className="mb-20">
//           <p className="text-[#FFB347] font-mono text-[10px] uppercase tracking-[0.8em] mb-4">
//             [ Core Architecture ]
//           </p>
//           <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.8]">
//             Precision at<br />
//             <span className="text-transparent border-text">Every Layer.</span>
//           </h2>
//         </div>
        
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {[
//             { tag: "01", label: "Harvest", desc: "Raw data extraction from complex sources." },
//             { tag: "02", label: "Refine", desc: "AI-driven curation with human oversight." },
//             { tag: "03", label: "Deploy", desc: "Production-ready datasets for global models." },
//           ].map((item) => (
//             <div 
//               key={item.tag} 
//               className="p-10 border border-white/10 bg-[#032418]/50 backdrop-blur-md rounded-sm group hover:border-[#FFB347]/50 transition-all duration-500"
//             >
//               <div className="flex justify-between items-start mb-8">
//                 <span className="text-[#FFB347] font-mono text-xs border border-[#FFB347]/30 px-2 py-1">
//                   {item.tag}
//                 </span>
//                 <div className="w-2 h-2 rounded-full bg-[#FFB347] animate-pulse" />
//               </div>
//               <h3 className="text-2xl font-bold uppercase mb-3">{item.label}</h3>
//               <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
//             </div>
//           ))}
//         </div>
//       </motion.div>

//       {/* SCANNERS: Visual side-borders */}
//       <div className="absolute left-10 top-0 bottom-0 w-px bg-white/5" />
//       <div className="absolute right-10 top-0 bottom-0 w-px bg-white/5" />
//     </section>
//   );
// }







// import { useRef } from "react";
// import { motion, useScroll, useTransform, useSpring } from "framer-motion";

// export default function ScrollStack() {
//   const targetRef = useRef(null);
  
//   const { scrollYProgress } = useScroll({
//     target: targetRef,
//     // "start end" = animation starts when the top of the section hits the bottom of the screen
//     // "end start" = animation ends when the bottom of the section leaves the top of the screen
//     offset: ["start end", "end start"],
//   });

//   // Adding "Spring" makes the movement feel "heavy" and smooth rather than robotic
//   const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

//   // I increased these values so the movement is VERY noticeable
//   const textBgY = useTransform(smoothProgress, [0, 1], ["-300px", "300px"]);
//   const gridY = useTransform(smoothProgress, [0, 1], ["-150px", "150px"]);
//   const contentY = useTransform(smoothProgress, [0, 1], ["100px", "-100px"]);
  
//   // This makes the section fade in when you arrive and fade out when you leave
//   const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

//   return (
//     <section 
//       ref={targetRef} 
//       className="relative h-[150vh] bg-[#021a11] overflow-hidden flex items-center justify-center border-y border-white/5"
//     >
//       {/* 1. BACKGROUND: Ghost Text */}
//       <motion.div 
//         style={{ y: textBgY }} 
//         className="absolute inset-0 flex items-center justify-center opacity-[0.05] select-none pointer-events-none"
//       >
//         <h2 className="text-[30vw] font-black uppercase whitespace-nowrap leading-none text-white">
//           STRUCTURE
//         </h2>
//       </motion.div>

//       {/* 2. MIDDLE: Tech Grid */}
//       <motion.div 
//         style={{ y: gridY }}
//         className="absolute inset-0 opacity-30 pointer-events-none"
//       >
//         <div className="absolute inset-0 bg-[radial-gradient(#FFB347_2px,transparent_2px)] bg-size-[80px_80px]" />
//       </motion.div>

//       {/* 3. FOREGROUND: Content */}
//       <motion.div 
//         style={{ y: contentY, opacity }}
//         className="relative z-10 w-full max-w-6xl px-8"
//       >
//         <div className="mb-20">
//           <p className="text-[#FFB347] font-mono text-[10px] uppercase tracking-[0.8em] mb-4">
//             [ Architecture ]
//           </p>
//           <h2 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-[0.8] text-white">
//             Precision at<br />
//             <span className="text-transparent border-text">Every Layer.</span>
//           </h2>
//         </div>
        
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {[
//             { tag: "01", label: "Harvest", desc: "Raw data extraction from complex sources." },
//             { tag: "02", label: "Refine", desc: "AI-driven curation with human oversight." },
//             { tag: "03", label: "Deploy", desc: "Production-ready datasets for global models." },
//           ].map((item, i) => (
//             <motion.div 
//               key={item.tag}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ delay: i * 0.2 }}
//               className="p-10 border border-white/10 bg-[#032418]/80 backdrop-blur-xl rounded-sm group hover:border-[#FFB347] transition-all duration-500"
//             >
//               <div className="flex justify-between items-start mb-8">
//                 <span className="text-[#FFB347] font-mono text-xs border border-[#FFB347]/30 px-2 py-1">
//                   {item.tag}
//                 </span>
//                 <div className="w-2 h-2 rounded-full bg-[#FFB347] shadow-[0_0_10px_#FFB347]" />
//               </div>
//               <h3 className="text-2xl font-bold uppercase mb-3 text-white">{item.label}</h3>
//               <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
//             </motion.div>
//           ))}
//         </div>
//       </motion.div>
//     </section>
//   );
// }



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