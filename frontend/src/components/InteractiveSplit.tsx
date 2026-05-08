
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
    <section className="relative min-h-screen md:h-[85vh] flex flex-col md:flex-row overflow-hidden bg-[#046241]/10 dark:bg-[#021a11] border-y border-[#034E34]/10 dark:border-white/5">
      {/* ── 1. GLOBAL BLUEPRINT BACKGROUND ── */}
      <div
        className="absolute inset-0 opacity-[0.15] dark:opacity-[0.05] pointer-events-none z-0"
        style={{
          backgroundImage: `radial-gradient(circle at 1.5px 1.5px, #034E34 1.5px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      {items.map((item, index) => {
        const isHovered = hoveredIndex === index;
        const isAnythingHovered = hoveredIndex !== null;

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
            className="relative flex flex-col justify-center transition-all duration-700 ease-in-out cursor-pointer min-h-30 md:min-h-0"
            animate={{ flex: flexValue }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          >
            {/* ── 2. IMAGE LAYER ── */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <motion.img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover"
                animate={{
                  filter: isHovered
                    ? "grayscale(0%) brightness(0.4)"
                    : "grayscale(100%) brightness(0.15)",
                  scale: isHovered ? 1.05 : 1,
                }}
                transition={{ duration: 0.8 }}
              />
              {/* Structured Overlay instead of generic white wash */}
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#034E34]/20 to-[#034E34]/60 dark:to-black/80" />
            </div>

            {/* ── 3. CONTENT LAYER ── */}
            <div className="relative z-10 px-6 md:px-12 h-full flex flex-col justify-center overflow-hidden">
              <motion.div
                initial={false}
                animate={{
                  rotate:
                    !isHovered && isAnythingHovered
                      ? window.innerWidth < 768
                        ? 0
                        : -90
                      : 0,
                  y:
                    !isHovered && isAnythingHovered
                      ? window.innerWidth < 768
                        ? 0
                        : 40
                      : 0,
                  scale: !isHovered && isAnythingHovered ? 1 : 1.1,
                }}
                className="origin-left whitespace-nowrap"
              >
                <p
                  className={`
                  text-[#FFB347] uppercase tracking-[0.4em] transition-all duration-500
                  ${
                    !isHovered && isAnythingHovered
                      ? "text-[10px] font-mono opacity-60"
                      : "text-xl md:text-3xl font-black font-sans tracking-tighter"
                  }
                `}
                >
                  {item.title}
                </p>
              </motion.div>

              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="mt-4 md:mt-6"
                  >
                    {/* High contrast Headline for Light Mode */}
                    <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-[0.85] text-white drop-shadow-lg">
                      {item.headline.split(" ").map((word, i) => (
                        <span key={i} className="block">
                          {word}
                        </span>
                      ))}
                    </h2>

                    {/* Description with colored accent line */}
                    <div className="mt-6 flex gap-4 items-start">
                      <div className="w-1 h-12 bg-[#FFB347] mt-1 shrink-0" />
                      <p className="text-white/90 text-sm md:text-base max-w-sm leading-relaxed font-medium">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ── 4. VERTICAL DIVIDER ── */}
            {index !== items.length - 1 && (
              <div className="absolute bottom-0 left-0 right-0 h-px md:h-auto md:right-0 md:top-0 md:bottom-0 md:w-px bg-white/20 z-20" />
            )}
          </motion.div>
        );
      })}
    </section>
  );
}