



import { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";

interface Project {
  id: number;
  tag: string;
  index: string;
  title: string;
  subtitle: string;
  img: string;
  color: string;
  desc?: string;
  stats?: { value: string; label: string }[];
}

interface FilterGridProps {
  projects: Project[];
  tags: string[];
  onCardClick: (id: number) => void;
}

function ProjectCard({
  p,
  index,
  onClick,
}: {
  p: Project;
  index: number;
  onClick: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cursorX = useMotionValue(-999);
  const cursorY = useMotionValue(-999);
  const cursorOpacity = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });
  // const springCursorX = useSpring(cursorX, { stiffness: 500, damping: 40 });
  // const springCursorY = useSpring(cursorY, { stiffness: 500, damping: 40 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    cursorX.set(e.clientX - rect.left - 12);
    cursorY.set(e.clientY - rect.top - 12);
    cursorOpacity.set(1);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    cursorOpacity.set(0);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 800 }}
      className="cursor-pointer"
      onClick={onClick}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="group relative overflow-hidden bg-black aspect-square"
      >
        {/* Image */}
        <img
          src={p.img}
          alt={p.title}
          className="absolute inset-0 w-full h-full object-cover opacity-50 transition-all duration-700 group-hover:opacity-75 group-hover:scale-105"
        />

        {/* Gradient */}
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/30 to-transparent" />

        {/* Color accent bar */}
        <div
          className="absolute bottom-0 left-0 h-0.75 w-0 group-hover:w-full transition-all duration-500"
          style={{ backgroundColor: p.color }}
        />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-8">
          <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: p.color }}>
            {p.tag}
          </p>
          <h3 className="text-xl font-black uppercase tracking-tight leading-tight text-white">
            {p.title}
          </h3>
          <p className="mt-2 text-gray-400 text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-transform duration-300 translate-y-1 group-hover:translate-y-0 transition-transform">
            {p.subtitle}
          </p>
        </div>

        {/* Index */}
        <div className="absolute top-6 right-6 text-white/10 text-xs font-black uppercase tracking-widest">
          {p.index}
        </div>

        {/* View badge */}
        <div
          className="absolute top-6 left-6 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full border opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          style={{ color: p.color, borderColor: p.color }}
        >
          View →
        </div>
      </motion.div>
    </motion.div>
  );
}

export function FilterGrid({ projects, tags, onCardClick }: FilterGridProps) {
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? projects : projects.filter((p) => p.tag === active);

  const handleCardClick = (id: number) => {
    onCardClick(id)
  };

  return (
    <section className="py-24 md:py-32 px-8 md:px-16 bg-[#021a11]">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <p className="text-xs font-bold text-[#FFB347] uppercase tracking-[0.3em] mb-4">
              Browse by Category
            </p>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none text-white">
              All Projects
            </h2>
          </div>

          {/* Filter tabs */}
          <div className="flex gap-2 flex-wrap">
            {tags.map((t) => {
              const count = t === "All" ? projects.length : projects.filter((p) => p.tag === t).length;
              return (
                <button
                  key={t}
                  onClick={() => setActive(t)}
                  className="relative px-4 py-2 text-xs font-black uppercase tracking-widest border transition-colors duration-200 overflow-hidden"
                  style={{
                    borderColor: active === t ? "#FFB347" : "rgba(255,255,255,0.2)",
                    color: active === t ? "#021a11" : "rgba(255,255,255,0.5)",
                  }}
                >
                  {active === t && (
                    <motion.div
                      layoutId="activeFilter"
                      className="absolute inset-0 bg-[#FFB347]"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    {t}
                    <span
                      className="text-[9px] px-1.5 py-0.5 rounded-full font-black"
                      style={{
                        backgroundColor: active === t ? "rgba(2,26,17,0.2)" : "rgba(255,255,255,0.1)",
                        color: active === t ? "#021a11" : "rgba(255,255,255,0.4)",
                      }}
                    >
                      {count}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <ProjectCard
                key={p.id}
                p={p}
                index={i}
                onClick={() => handleCardClick(p.id)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}