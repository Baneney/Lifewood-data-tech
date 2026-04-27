
  import { useEffect, useRef, useState } from "react";
  import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

  interface ProjectStat {
    value: string;
    label: string;
  }

  interface Project {
    id: number;
    index: string;
    tag: string;
    title: string;
    subtitle: string;
    desc: string;
    color: string;
    img: string;
    stats?: ProjectStat[];
  }

  interface StickyProjectsProps {
    projects: Project[];
    itemRefs: React.RefObject<(HTMLDivElement | null)[]>;
  }

  export function StickyProjects({ projects, itemRefs }: StickyProjectsProps) {
    const [activeIdx, setActiveIdx] = useState(0);

    useEffect(() => {
      itemRefs.current = itemRefs.current.slice(0, projects.length);
      const observers = itemRefs.current.map((el, i) => {
        if (!el) return null;
        const obs = new IntersectionObserver(
          ([entry]) => { if (entry.isIntersecting) setActiveIdx(i); },
          { threshold: 0.5, rootMargin: "-10% 0px -10% 0px" }
        );
        obs.observe(el);
        return obs;
      });
      return () => observers.forEach((o) => o?.disconnect());
    }, [projects]);

    if (!projects || projects.length === 0) return null;

    return (
      <div className="grid lg:grid-cols-2 relative bg-[#021a11]">
        {/* Left: Scrolling Content */}
        <div className="z-10">
          {projects.map((p, i) => (
            <ProjectSection 
              key={p.id || i} 
              project={p} 
              index={i} 
              setRef={(el) => { itemRefs.current[i] = el; }} 
            />
          ))}
        </div>

        {/* Right: Sticky Image Container with a "Fun" Glass Frame */}
        {/* Right: Sticky Image Container with "Dynamic Lens" Effect */}
        <div className="hidden lg:block sticky top-0 h-screen overflow-hidden bg-[#021a11]">
          <div className="relative w-full h-full p-8">
            {/* Decorative Tech Frame */}
            <div className="absolute inset-4 border border-white/5 rounded-[2rem] pointer-events-none z-20" />
            
            <div className="relative w-full h-full overflow-hidden rounded-[1.5rem] shadow-[0_0_50px_rgba(0,0,0,0.5)]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIdx}
                  initial={{ clipPath: "inset(100% 0% 0% 0%)", filter: "brightness(2) saturate(0)" }}
                  animate={{ clipPath: "inset(0% 0% 0% 0%)", filter: "brightness(1) saturate(1)" }}
                  exit={{ clipPath: "inset(0% 0% 100% 0%)", opacity: 0 }}
                  transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                  className="absolute inset-0"
                >
                  {/* Subtle Parallax Image Layer */}
                  <motion.img
                    src={projects[activeIdx].img}
                    alt={projects[activeIdx].title}
                    className="w-full h-full object-cover scale-110"
                    animate={{ 
                      scale: [1.1, 1.15, 1.1],
                      rotate: [0, 1, 0] 
                    }}
                    transition={{ 
                      duration: 20, 
                      repeat: Infinity, 
                      ease: "linear" 
                    }}
                  />

                  {/* Dynamic Gradient Overlay that reacts to the project color */}
                  <div 
                    className="absolute inset-0 opacity-40 mix-blend-overlay"
                    style={{ 
                      background: `radial-gradient(circle at center, ${projects[activeIdx].color} 0%, transparent 70%)` 
                    }}
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />

                  
                  {/* Bottom Interactive Label */}
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="absolute bottom-10 left-10 right-10 flex justify-between items-end"
                  >
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em]">Project Module</span>
                      <span className="text-2xl font-black text-white uppercase tracking-tighter">{projects[activeIdx].tag}</span>
                    </div>
                    
                    {/* Animated "Processing" Bar */}
                    <div className="w-24 h-1 bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-white"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 2, repeat: Infinity }}
                        style={{ backgroundColor: projects[activeIdx].color }}
                      />
                    </div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      
    );
  }

  // Sub-component for individual sections to handle section-specific logic
  function ProjectSection({ project, setRef }: { project: Project; index: number; setRef: (el: HTMLDivElement | null) => void }) {
    const localRef = useRef(null);
    const { scrollYProgress } = useScroll({
      target: localRef,
      offset: ["start end", "end start"]
    });

    // Fun Parallax: The title moves faster than the container
    const titleY = useTransform(scrollYProgress, [0, 1], [50, -50]);

    return (
      <div
        ref={(el) => {
          setRef(el);
          // @ts-ignore
          localRef.current = el;
        }}
        className="min-h-screen flex flex-col justify-center px-8 md:px-16 py-24 border-b border-white/5"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <motion.span 
              className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-current"
              style={{ color: project.color }}
              whileHover={{ scale: 1.1, rotate: -2 }}
            >
              {project.tag}
            </motion.span>
          </div>

          <motion.h2 
            style={{ y: titleY }}
            className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-6 text-white"
          >
            {project.title}
          </motion.h2>

          <p className="text-gray-400 leading-relaxed max-w-md mb-10 text-lg">
            {project.desc}
          </p>

          {/* Interactive Stats Grid */}
          <div className="grid grid-cols-3 gap-4">
            {project.stats?.map((s, idx) => (
              <motion.div 
                key={s.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group"
              >
                <div 
                  className="text-xl md:text-2xl font-black group-hover:scale-110 transition-transform origin-left" 
                  style={{ color: project.color }}
                >
                  {s.value}
                </div>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    );
  }












