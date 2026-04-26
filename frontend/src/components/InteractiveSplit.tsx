// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// interface Props {
//   imgMission: string;
//   imgVision: string;
// }

// export default function MissionVision({ imgMission, imgVision }: Props) {
//   const [hovered, setHovered] = useState<"mission" | "vision" | null>(null);

//   const data = {
//     mission: {
//       title: "Our Mission",
//       headline: "Delivering Data That Performs",
//       desc: "To develop and deploy cutting edge AI technologies that solve real-world problems, empower communities, and advance sustainable practices. We are committed to fostering a culture of innovation and making a meaningful impact.",
//       img: imgMission,
//     },
//     vision: {
//       title: "Our Vision",
//       headline: "A World Powered By Trust",
//       desc: "To be the global champion in AI data solutions, igniting a culture of innovation and sustainability that enriches lives and transforms communities worldwide.",
//       img: imgVision,
//     },
//   };

//   return (
//     <section className="relative h-[80vh] flex overflow-hidden bg-[#021a11] border-y border-white/5">
//       {(["mission", "vision"] as const).map((key) => (
//         <motion.div
//           key={key}
//           onMouseEnter={() => setHovered(key)}
//           onMouseLeave={() => setHovered(null)}
//           className="relative flex-1 flex flex-col justify-center px-12 md:px-24 transition-all duration-700 ease-in-out"
//           animate={{
//             flex: hovered === key ? 2 : hovered === null ? 1 : 0.5,
//           }}
//         >
//           {/* Background Image Logic */}
//           <div className="absolute inset-0 z-0">
//             <motion.img
//               src={data[key].img}
//               alt=""
//               className="w-full h-full object-cover"
//               animate={{
//                 filter: hovered === key ? "grayscale(0%) brightness(0.4)" : "grayscale(100%) brightness(0.2)",
//                 scale: hovered === key ? 1.05 : 1,
//               }}
//               transition={{ duration: 0.8 }}
//             />
//             {/* Gradient Overlay for Text Readability */}
//             <div className={`absolute inset-0 bg-linear-to-r ${key === 'mission' ? 'from-[#021a11] via-transparent' : 'to-[#021a11] via-transparent'}`} />
//           </div>

//           {/* Content */}
//           <div className="relative z-10">
//             <motion.p 
//               className="text-[#FFB347] font-mono text-[10px] uppercase tracking-[0.4em] mb-4"
//               animate={{ x: hovered === key ? 10 : 0 }}
//             >
//               {data[key].title}
//             </motion.p>
            
//             <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9] mb-6 text-white">
//               {data[key].headline.split(' ').map((word, i) => (
//                 <span key={i} className="block">{word}</span>
//               ))}
//             </h2>

//             <AnimatePresence>
//               {hovered === key && (
//                 <motion.p
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: 10 }}
//                   className="text-gray-300 text-sm md:text-base leading-relaxed max-w-md"
//                 >
//                   {data[key].desc}
//                 </motion.p>
//               )}
//             </AnimatePresence>
//           </div>

//           {/* Vertical Separator Line */}
//           {key === "mission" && (
//             <div className="absolute right-0 top-1/4 bottom-1/4 w-px bg-white/10 z-20" />
//           )}
//         </motion.div>
//       ))}
//     </section>
//   );
// }













// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// // Define the structure for each side of the split
// interface SplitItem {
//   id: string;
//   title: string;
//   headline: string;
//   desc: string;
//   img: string;
// }

// interface InteractiveSplitProps {
//   items: SplitItem[]; 
// }

// export default function InteractiveSplit({ items }: InteractiveSplitProps) {
//   const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

//   return (
//     <section className="relative h-[80vh] flex overflow-hidden bg-[#021a11] border-y border-white/5">
//       {items.map((item, index) => (
//         <motion.div
//           key={item.id}
//           onMouseEnter={() => setHoveredIndex(index)}
//           onMouseLeave={() => setHoveredIndex(null)}
//           className="relative flex-1 flex flex-col justify-center px-12 md:px-24 transition-all duration-700 ease-in-out"
//           animate={{
//             // Grows the hovered side, shrinks the other
//             flex: hoveredIndex === index ? 2 : hoveredIndex === null ? 1 : 0.5,
//           }}
//         >
//           {/* Background Image Layer */}
//           <div className="absolute inset-0 z-0">
//             <motion.img
//               src={item.img}
//               alt={item.title}
//               className="w-full h-full object-cover"
//               animate={{
//                 filter: hoveredIndex === index ? "grayscale(0%) brightness(0.4)" : "grayscale(100%) brightness(0.2)",
//                 scale: hoveredIndex === index ? 1.05 : 1,
//               }}
//               transition={{ duration: 0.8 }}
//             />
//             {/* Dynamic Gradient: Fades from the edges inward */}
//             <div className={`absolute inset-0 bg-linear-to-r ${index === 0 ? 'from-[#021a11] via-transparent' : 'to-[#021a11] via-transparent'}`} />
//           </div>

//           {/* Text Content Layer */}
//           <div className="relative z-10">
//             <motion.p 
//               className="text-[#FFB347] font-mono text-[10px] uppercase tracking-[0.4em] mb-4"
//               animate={{ x: hoveredIndex === index ? 10 : 0 }}
//             >
//               {item.title}
//             </motion.p>
            
//             <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9] mb-6 text-white">
//               {/* Splits headline by space to create the vertical stacked effect */}
//               {item.headline.split(' ').map((word, i) => (
//                 <span key={i} className="block">{word}</span>
//               ))}
//             </h2>

//             <AnimatePresence>
//               {hoveredIndex === index && (
//                 <motion.p
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: 10 }}
//                   className="text-gray-300 text-sm md:text-base leading-relaxed max-w-md"
//                 >
//                   {item.desc}
//                 </motion.p>
//               )}
//             </AnimatePresence>
//           </div>

//           {/* Center Divider Line: Only shows on the first item */}
//           {index === 0 && (
//             <div className="absolute right-0 top-1/4 bottom-1/4 w-px bg-white/10 z-20" />
//           )}
//         </motion.div>
//       ))}
//     </section>
//   );
// }












// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// interface SplitItem {
//   id: string;
//   title: string;
//   headline: string;
//   desc: string;
//   img: string;
// }

// interface InteractiveSplitProps {
//   items: SplitItem[];
// }

// export default function InteractiveSplit({ items }: InteractiveSplitProps) {
//   const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

//   return (
//     <section className="relative h-[85vh] flex overflow-hidden bg-[#021a11] border-y border-white/5">
//       {items.map((item, index) => {
//         const isHovered = hoveredIndex === index;
//         const isAnythingHovered = hoveredIndex !== null;

//         const flexValue = isHovered 
//           ? Math.max(items.length, 4) 
//           : isAnythingHovered 
//             ? 0.4 
//             : 1;

//         return (
//           <motion.div
//             key={item.id}
//             onMouseEnter={() => setHoveredIndex(index)}
//             onMouseLeave={() => setHoveredIndex(null)}
//             className="relative flex flex-col justify-center transition-all duration-700 ease-in-out cursor-pointer"
//             animate={{ flex: flexValue }}
//             transition={{ type: "spring", stiffness: 120, damping: 20 }}
//           >
//             {/* Background Image Layer */}
//             <div className="absolute inset-0 z-0">
//               <motion.img
//                 src={item.img}
//                 alt={item.title}
//                 className="w-full h-full object-cover"
//                 animate={{
//                   filter: isHovered 
//                     ? "grayscale(0%) brightness(0.5)" 
//                     : "grayscale(100%) brightness(0.2)",
//                   scale: isHovered ? 1.05 : 1,
//                 }}
//                 transition={{ duration: 0.8 }}
//               />
//               <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-[#021a11]/80" />
//             </div>

//             {/* Content Layer */}
//             <div className="relative z-10 px-6 md:px-12 h-full flex flex-col justify-center overflow-hidden">
//               <motion.div
//                 initial={false}
//                 animate={{ 
//                   // 1. ROTATION: Rotate only when someone ELSE is hovered
//                   rotate: !isHovered && isAnythingHovered ? -90 : 0,
//                   // 2. POSITION: Move down when rotated to stay centered in the sliver
//                   y: !isHovered && isAnythingHovered ? 40 : 0,
//                   // 3. SCALE/SIZE: Make it big when nothing is hovered, small when it's just a tab
//                   scale: !isHovered && isAnythingHovered ? 1 : 1.2
//                 }}
//                 className="origin-left whitespace-nowrap"
//               >
//                 {/* DYNAMIC TEXT: 
//                    We change the classes based on whether the component is in 
//                    "Idle" mode (nothing hovered) or "Tab" mode (someone else hovered).
//                 */}
//                 <p className={`
//                   text-[#FFB347] uppercase tracking-[0.4em] transition-all duration-500
//                   ${!isHovered && isAnythingHovered 
//                     ? "text-[10px] font-mono" // The small "Tab" look
//                     : "text-2xl md:text-4xl font-black font-sans tracking-tighter" // The "Big Title" look
//                   }
//                 `}>
//                   {item.title}
//                 </p>
//               </motion.div>
              
//               <AnimatePresence>
//                 {isHovered && (
//                   <motion.div
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: -10 }}
//                     transition={{ delay: 0.2 }}
//                     className="mt-6"
//                   >
//                     <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9] text-white">
//                       {item.headline.split(' ').map((word, i) => (
//                         <span key={i} className="block">{word}</span>
//                       ))}
//                     </h2>
//                     <p className="text-gray-300 text-sm md:text-base mt-6 max-w-md leading-relaxed">
//                       {item.desc}
//                     </p>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>

//             {/* Vertical Divider Line */}
//             {index !== items.length - 1 && (
//               <div className="absolute right-0 top-0 bottom-0 w-px bg-white/10 z-20 hidden md:block" />
//             )}
//           </motion.div>
//         );
//       })}
//     </section>
//   );
// }








import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SplitItem {
  id: string;
  title: string;
  headline: string;
  desc: string;
  img: string;
}

interface InteractiveSplitProps {
  items: SplitItem[];
}

export default function InteractiveSplit({ items }: InteractiveSplitProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative min-h-screen md:h-[85vh] flex flex-col md:flex-row overflow-hidden bg-[#021a11] border-y border-white/5">
      {items.map((item, index) => {
        const isHovered = hoveredIndex === index;
        const isAnythingHovered = hoveredIndex !== null;

        // On mobile, we use a fixed height or min-height logic
        // On desktop, we keep your dynamic flex-grow logic
        const flexValue = isHovered 
          ? Math.max(items.length, 4) 
          : isAnythingHovered 
            ? 0.4 
            : 1;

        return (
          <motion.div
            key={item.id}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            // We set a min-height on mobile so the "sliver" is still visible/tappable
            className="relative flex flex-col justify-center transition-all duration-700 ease-in-out cursor-pointer min-h-30 md:min-h-0"
            animate={{ flex: flexValue }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          >
            {/* Background Image Layer */}
            <div className="absolute inset-0 z-0">
              <motion.img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover"
                animate={{
                  filter: isHovered 
                    ? "grayscale(0%) brightness(0.5)" 
                    : "grayscale(100%) brightness(0.2)",
                  scale: isHovered ? 1.05 : 1,
                }}
                transition={{ duration: 0.8 }}
              />
              <div className="absolute inset-0 bg-linear-to-b md:bg-linear-to-r from-transparent via-transparent to-[#021a11]/80" />
            </div>

            {/* Content Layer */}
            <div className="relative z-10 px-6 md:px-12 h-full flex flex-col justify-center overflow-hidden">
              <motion.div
                initial={false}
                animate={{ 
                  // Disable rotation on mobile; keep it only for desktop "tabs"
                  rotate: !isHovered && isAnythingHovered ? (window.innerWidth < 768 ? 0 : -90) : 0,
                  y: !isHovered && isAnythingHovered ? (window.innerWidth < 768 ? 0 : 40) : 0,
                  scale: !isHovered && isAnythingHovered ? 1 : 1.1
                }}
                className="origin-left whitespace-nowrap"
              >
                <p className={`
                  text-[#FFB347] uppercase tracking-[0.4em] transition-all duration-500
                  ${!isHovered && isAnythingHovered 
                    ? "text-[10px] font-mono" 
                    : "text-xl md:text-4xl font-black font-sans tracking-tighter" 
                  }
                `}>
                  {item.title}
                </p>
              </motion.div>
              
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, x: -10 }}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ delay: 0.2 }}
                    className="mt-4 md:mt-6"
                  >
                    <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9] text-white">
                      {item.headline.split(' ').map((word, i) => (
                        <span key={i} className="block">{word}</span>
                      ))}
                    </h2>
                    <p className="text-gray-300 text-xs md:text-base mt-4 md:mt-6 max-w-md leading-relaxed">
                      {item.desc}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Divider Line: Horizontal on mobile, Vertical on desktop */}
            {index !== items.length - 1 && (
              <div className="absolute bottom-0 left-0 right-0 h-px md:h-auto md:right-0 md:top-0 md:bottom-0 md:w-px bg-white/10 z-20" />
            )}
          </motion.div>
        );
      })}
    </section>
  );
}