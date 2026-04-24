import { useState, useRef } from "react";
import { motion } from "framer-motion";

export default function InteractiveVision({ videoSrc }: { videoSrc: string }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative h-[80vh] overflow-hidden border-y border-white/10 bg-[#010c08] cursor-none"
    >
      {/* 1. The Background Layer (Dimmed/Blurred Video) */}
      <video 
        autoPlay muted loop playsInline 
        src={videoSrc} 
        className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale scale-105" 
      />

        {/* 2. The Interactive Reveal Layer (The "Spotlight") */}
        <motion.div 
            className="absolute inset-0 pointer-events-none"
            style={{
                // We cast this to 'any' or define the variable here to satisfy TS
                maskImage: 'var(--mask)',
                WebkitMaskImage: 'var(--mask)'
            } as any}
            animate={{
                // Animate the CSS variable instead of the property directly
                "--mask": isHovered 
                ? `radial-gradient(circle 250px at ${mousePos.x}px ${mousePos.y}px, black 100%, transparent 100%)`
                : `radial-gradient(circle 0px at ${mousePos.x}px ${mousePos.y}px, black 100%, transparent 100%)`
            } as any}
            transition={{ type: "tween", ease: "backOut", duration: 0 }}
            >
            <video 
                autoPlay muted loop playsInline 
                src={videoSrc} 
                className="absolute inset-0 w-full h-full object-cover grayscale-0 scale-100" 
            />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
        </motion.div>

      {/* 3. The Custom Cursor / Reticle */}
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 border border-[#FFB347] rounded-full pointer-events-none z-50 flex items-center justify-center"
        animate={{ 
          x: mousePos.x - 24 + (containerRef.current?.getBoundingClientRect().left || 0), 
          y: mousePos.y - 24 + (containerRef.current?.getBoundingClientRect().top || 0),
          scale: isHovered ? 1 : 0,
          rotate: isHovered ? 90 : 0
        }}
      >
        <div className="w-1 h-1 bg-[#FFB347] rounded-full" />
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-px h-2 bg-[#FFB347]" />
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-px h-2 bg-[#FFB347]" />
      </motion.div>

      {/* 4. The Typography Content */}
      <div className="relative h-full flex flex-col justify-center px-8 md:px-16 pointer-events-none select-none">
        <div className="overflow-hidden">
            <motion.p 
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                className="text-[#FFB347] text-xs font-bold uppercase tracking-[0.6em] mb-4"
            >
                Proprietary Pipeline
            </motion.p>
        </div>
        <h2 className="text-6xl md:text-[10rem] font-black leading-[0.75] tracking-tighter uppercase mix-blend-difference">
          Fueling<br />
          <span className="text-transparent border-text">the next</span><br />
          Wave
        </h2>
        
        {/* Floating Data Labels (Optional for more "Tech" feel) */}
        <div className="absolute bottom-10 right-10 text-right font-mono text-[10px] text-white/20 uppercase tracking-widest hidden md:block">
          <p>Coord: {Math.round(mousePos.x)} / {Math.round(mousePos.y)}</p>
          <p>Status: Scanning Core...</p>
          <p>Precision: 99.98%</p>
        </div>
      </div>
    </section>
  );
}