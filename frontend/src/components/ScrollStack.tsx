// import { useRef } from "react";
// import { motion, useScroll, useTransform, useSpring } from "framer-motion";

// // 1. Define the shape of your data
// interface StackItem {
//   tag: string;
//   label: string;
//   desc: string;
// }

// interface ScrollStackProps {
//   bgText?: string;
//   eyebrow?: string;
//   headline?: string;
//   headlineAccent?: string;
//   items: StackItem[];
// }

// export default function ScrollStack({
//   bgText = "STRUCTURE",
//   eyebrow = "[ Architecture ]",
//   headline = "Precision at",
//   headlineAccent = "Every Layer.",
//   items
// }: ScrollStackProps) {
//   const targetRef = useRef(null);

//   const { scrollYProgress } = useScroll({
//     target: targetRef,
//     offset: ["start end", "end start"],
//   });

//   const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

//   const textBgY = useTransform(smoothProgress, [0, 1], ["-300px", "300px"]);
//   const gridY = useTransform(smoothProgress, [0, 1], ["-150px", "150px"]);
//   const contentY = useTransform(smoothProgress, [0, 1], ["100px", "-100px"]);
//   const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

//   return (
//     <section
//       ref={targetRef}
//       className="relative h-[150vh] bg-[#E6E6E6] dark:bg-[#021a11] overflow-hidden flex items-center justify-center border-y border-[#034E34]/10 dark:border-white/5"
//     >
//       {/* BACKGROUND Layer */}
//       <motion.div
//         style={{ y: textBgY }}
//         className="absolute inset-0 flex items-center justify-center opacity-[0.05] select-none pointer-events-none"
//       >
//         <h2 className="text-[30vw] font-black uppercase whitespace-nowrap leading-none text-[#034E34] dark:text-white">
//           {bgText}
//         </h2>
//       </motion.div>

//       {/* MIDDLE Layer */}
//       <motion.div
//         style={{ y: gridY }}
//         className="absolute inset-0 opacity-30 pointer-events-none"
//       >
//         <div className="absolute inset-0 bg-[radial-gradient(#FFB347_2px,transparent_2px)] bg-size-[80px_80px]" />
//       </motion.div>

//       {/* FOREGROUND Layer */}
//       <motion.div
//         style={{ y: contentY, opacity }}
//         className="relative z-10 w-full max-w-7xl p-8"
//       >
//         <div className="mb-20">
//           <p className="text-[#FFB347] font-mono text-[10px] uppercase tracking-[0.8em] mb-4">
//             {eyebrow}
//           </p>
//           <h2 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-[0.8] text-[#034E34] dark:text-white">
//             {headline}
//             <br />
//             <span className="text-transparent border-text">
//               {headlineAccent}
//             </span>
//           </h2>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//           {items.map((item, i) => (
//             <motion.div
//               key={item.tag}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ delay: i * 0.2 }}
//               className="p-8 border border-[#034E34]/15 dark:border-white/10 bg-[#034E34]/5 dark:bg-[#032418]/80 backdrop-blur-xl rounded-sm group hover:border-[#FFB347] transition-all duration-500"
//             >
//               <div className="flex justify-between items-start mb-8">
//                 <span className="text-[#FFB347] font-mono text-xs border border-[#FFB347]/30 px-2 py-1">
//                   {item.tag}
//                 </span>
//                 <div className="w-2 h-2 rounded-full bg-[#FFB347] shadow-[0_0_10px_#FFB347]" />
//               </div>
//               <h3 className="text-2xl font-bold uppercase mb-3 text-[#034E34] dark:text-white">
//                 {item.label}
//               </h3>
//               <p className="text-[#034E34]/60 dark:text-gray-400 text-sm leading-relaxed">
//                 {item.desc}
//               </p>
//             </motion.div>
//           ))}
//         </div>
//       </motion.div>
//     </section>
//   );
// }

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

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
  items,
}: ScrollStackProps) {
  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  const textBgY = useTransform(smoothProgress, [0, 1], ["-20%", "20%"]);
  const rotateBlobs = useTransform(smoothProgress, [0, 1], [0, 45]);
  const opacity = useTransform(smoothProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={targetRef}
      className="relative h-[180vh] bg-[#046241]/10 dark:bg-[#021a11] overflow-hidden flex items-center justify-center transition-colors duration-700"
    >
      <style>{`
        @keyframes gradient-move {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-headline-gradient {
          background-size: 200% auto;
          animation: gradient-move 5s ease infinite;
        }
      `}</style>

      {/* ── 1. BACKGROUND LAYER ── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Animated Mesh Blobs */}
        <motion.div
          style={{ rotate: rotateBlobs }}
          className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-[#034E34]/10 blur-[120px] rounded-full dark:opacity-0 transition-opacity"
        />
        <motion.div
          style={{ rotate: rotateBlobs }}
          className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#FFB347]/15 blur-[100px] rounded-full dark:opacity-0 transition-opacity"
        />

        {/* CRISP GRID DOTS */}
        <div
          className="absolute inset-0 opacity-[0.25] pointer-events-none 
          [background-image:radial-gradient(circle_at_1.5px_1.5px,#034E34_1.5px,transparent_0)] 
          dark:[background-image:radial-gradient(circle_at_1.5px_1.5px,#FFB347_1.5px,transparent_1)] 
          [background-size:32px_32px]"
        />
      </div>

      {/* ── 2. MOVING BACKGROUND TEXT ── */}
      <motion.div
        style={{ y: textBgY }}
        className="absolute inset-0 flex items-center justify-center opacity-[0.06] dark:opacity-[0.03] select-none pointer-events-none"
      >
        <h2 className="text-[35vw] font-black uppercase whitespace-nowrap text-[#133020] dark:text-white leading-none">
          {bgText}
        </h2>
      </motion.div>

      {/* ── 3. CONTENT LAYER ── */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 w-full max-w-7xl p-8"
      >
        <div className="mb-24">
          <p className="text-[#034E34] dark:text-[#FFB347] font-mono text-[11px] uppercase tracking-[0.8em] mb-6 drop-shadow-sm">
            {eyebrow}
          </p>

          <h2 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-[0.85]">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#034E34] via-[#FFB347] to-[#034E34] dark:from-white dark:via-[#FFB347] dark:to-white animate-headline-gradient">
              {headline}
            </span>
            <br />
            <span className="text-transparent border-text dark:opacity-80">
              {headlineAccent}
            </span>
          </h2>
        </div>

        {/* ── 4. INTERACTIVE CARDS ── */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <motion.div
              key={item.tag}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="relative group h-full cursor-pointer"
            >
              <div
                className="relative h-full p-8 overflow-hidden rounded-2xl transition-all duration-500 
                bg-[#034E34] text-white shadow-2xl shadow-[#034E34]/20
                dark:bg-[#032418]/90 dark:border dark:border-white/10
                group-hover:-translate-y-4 group-hover:shadow-[#FFB347]/30"
              >
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#FFB347]/20 blur-[40px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="flex justify-between items-center mb-12">
                  <span className="text-[#FFB347] font-mono text-[10px] font-bold px-3 py-1 border border-[#FFB347]/40 rounded-full bg-[#FFB347]/5">
                    {item.tag}
                  </span>
                  <div className="w-2 h-2 rounded-full bg-[#FFB347] shadow-[0_0_10px_#FFB347] animate-pulse" />
                </div>

                <h3 className="text-2xl font-black uppercase mb-4 tracking-tight group-hover:text-[#FFB347] transition-colors duration-300">
                  {item.label}
                </h3>

                <p className="text-white/70 text-sm leading-relaxed font-medium group-hover:text-white transition-colors duration-300">
                  {item.desc}
                </p>

                <div className="absolute bottom-0 left-0 w-full h-1 bg-[#FFB347] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}