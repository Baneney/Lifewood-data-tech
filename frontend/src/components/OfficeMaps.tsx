
import { useEffect, useRef, useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { geoMercator, geoPath } from "d3-geo";
import { json } from "d3-fetch";
import { feature } from "topojson-client";
import type { FeatureCollection, Geometry } from "geojson";

interface Office {
  country: string;
  label: string;
  coords: [number, number];
}

const OFFICES: Office[] = [
  { country: "Philippines", label: "PH Operations", coords: [121.0, 12.0] },
  { country: "Malaysia", label: "MY Regional Hub", coords: [101.9758, 4.2105] },
  { country: "China", label: "CN Tech Centers", coords: [104.1954, 35.8617] },
  { country: "Japan", label: "JP Sales Office", coords: [138.2529, 36.2048] },
  {
    country: "Singapore",
    label: "SG Regional Office",
    coords: [103.8198, 1.3521],
  },
  {
    country: "Australia",
    label: "AU Regional Office",
    coords: [133.7751, -25.2744],
  },
  {
    country: "Bangladesh",
    label: "BD Delivery Center",
    coords: [90.3563, 23.685],
  },
  {
    country: "South Africa",
    label: "ZA Operations",
    coords: [22.9375, -30.5595],
  },
  { country: "Kenya", label: "KE Delivery Center", coords: [37.9062, -0.0236] },
  { country: "Nigeria", label: "NG Regional Node", coords: [8.6753, 9.082] },
  {
    country: "United States",
    label: "US Global HQ",
    coords: [-95.7129, 37.0902],
  },
  {
    country: "United Kingdom",
    label: "UK Regional Hub",
    coords: [-3.436, 55.3781],
  },
  {
    country: "Turkey",
    label: "TR Regional Office",
    coords: [35.2433, 38.9637],
  },
  { country: "UAE", label: "AE Regional Office", coords: [53.8478, 23.4241] },
  {
    country: "Morocco",
    label: "MA Delivery Center",
    coords: [-7.0926, 31.7917],
  },
];

const GEO_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export default function OfficeMaps() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [worldData, setWorldData] =
    useState<FeatureCollection<Geometry> | null>(null);
  const [active, setActive] = useState<Office | null>(null);
  const [zoom, setZoom] = useState(1.2);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const dragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });

  const W = 960;
  const H = 500;

  const projection = useMemo(() => {
    return geoMercator()
      .scale((W / 2 / Math.PI) * zoom)
      .translate([W / 2 + pan.x, H / 2 + pan.y + 40]);
  }, [zoom, pan]);

  const pathGenerator = geoPath().projection(projection);

  useEffect(() => {
    json(GEO_URL).then((world: any) => {
      const fc = feature(world, world.objects.countries) as any;
      setWorldData(fc);
    });
  }, []);

  useEffect(() => {
    const mapArea = containerRef.current;
    if (!mapArea) return;
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY < 0 ? 1.1 : 0.9;
      setZoom((z) => Math.min(10, Math.max(1, z * delta)));
    };
    mapArea.addEventListener("wheel", handleWheel, { passive: false });
    return () => mapArea.removeEventListener("wheel", handleWheel);
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    dragging.current = true;
    lastPos.current = { x: e.clientX, y: e.clientY };
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging.current) return;
    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;
    lastPos.current = { x: e.clientX, y: e.clientY };
    setPan((p) => ({ x: p.x + dx, y: p.y + dy }));
  };

  const flyTo = (office: Office) => {
    setActive(office);
    const [lng, lat] = office.coords;
    const baseProj = geoMercator()
      .scale(W / 2 / Math.PI)
      .translate([W / 2, H / 2 + 40]);
    const [x, y] = baseProj([lng, lat])!;
    const targetZoom = 2.5;
    setZoom(targetZoom);
    setPan({ x: (W / 2 - x) * targetZoom, y: (H / 2 - y) * targetZoom });
  };

  return (
    <section className="py-24 md:py-32 px-8 md:px-16 bg-[#F5F5F2] dark:bg-[#021a11] transition-colors duration-700">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <p className="text-[#FFB347] text-xs font-bold uppercase tracking-[0.4em] mb-4">
              [ Global Presence ]
            </p>
            <h2 className="text-[#034E34] dark:text-white text-4xl md:text-6xl font-black uppercase tracking-tighter">
              Global Operations
            </h2>
          </div>
        </div>

        <div
          ref={containerRef}
          className="relative w-full aspect-video border border-[#034E34]/10 dark:border-white/5 overflow-hidden bg-white dark:bg-[#032418]/30 backdrop-blur-sm shadow-inner"
        >
          {/* Blueprint Grid Background */}
          <div
            className="absolute inset-0 opacity-[0.12] dark:opacity-[0.05] pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle at 1.5px 1.5px, #046241 1.5px, transparent 0)`,
              backgroundSize: "32px 32px",
            }}
          />

          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="relative z-10 w-full h-full cursor-grab active:cursor-grabbing select-none"
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={() => (dragging.current = false)}
            onMouseLeave={() => (dragging.current = false)}
          >
            {worldData?.features.map((feature: any, i: number) => (
              <path
                key={i}
                d={pathGenerator(feature) || ""}
                strokeWidth={0.5 / zoom}
                className="transition-colors duration-700 fill-[#046241]/20 stroke-[#046241]/40 dark:fill-[#052e1f] dark:stroke-[#0a4d36]"
              />
            ))}

            {OFFICES.map((office) => {
              const pos = projection(office.coords);
              if (!pos) return null;
              const [x, y] = pos;
              const isActive = active?.country === office.country;

              return (
                <g
                  key={office.country}
                  className="cursor-pointer"
                  onClick={() => flyTo(office)}
                >
                  {/* Outer pulse: Orange in dark mode, Green in light mode */}
                  <circle
                    cx={x}
                    cy={y}
                    r={10}
                    className="fill-[#046241] dark:fill-[#FFB347]"
                    fillOpacity={0.15}
                  >
                    <animate
                      attributeName="r"
                      values="8;14;8"
                      dur="4s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  {/* Center pin: High contrast Deep Green in light mode */}
                  <circle
                    cx={x}
                    cy={y}
                    r={3}
                    className={`transition-all duration-300 stroke-[#FFB347] ${
                      isActive
                        ? "fill-[#FFB347]"
                        : "fill-[#034E34] dark:fill-[#0a4d36]"
                    }`}
                    strokeWidth={1.5}
                  />
                </g>
              );
            })}
          </svg>

          {/* Info Card Overlay */}
          <AnimatePresence mode="wait">
            {active && (
              <motion.div
                key={active.country}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-6 left-6 z-20"
              >
                <div className="relative inline-block p-6 pr-12 bg-white dark:bg-[#021a11]/95 border border-[#046241]/20 dark:border-[#FFB347]/30 backdrop-blur-2xl shadow-2xl min-w-50 w-auto">
                  <button
                    onClick={() => setActive(null)}
                    className="absolute top-1.5 right-3 text-[#034E34]/20 dark:text-white/20 hover:text-[#046241] dark:hover:text-white transition-colors p-1"
                  >
                    ✕
                  </button>
                  <div>
                    <h3 className="text-2xl font-black uppercase tracking-tight leading-none whitespace-nowrap text-[#034E34] dark:text-white pr-4">
                      {active.country}
                    </h3>
                    <p className="text-[#FFB347] font-mono text-[9px] uppercase tracking-[0.2em] mt-2 whitespace-nowrap">
                      {active.label}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Zoom Controls */}
          <div className="absolute bottom-6 right-6 flex flex-col gap-2 z-20">
            {[
              {
                label: "+",
                action: () => setZoom((z) => Math.min(10, z * 1.5)),
              },
              {
                label: "⌂",
                action: () => {
                  setZoom(1.2);
                  setPan({ x: 0, y: 0 });
                  setActive(null);
                },
              },
              {
                label: "−",
                action: () => setZoom((z) => Math.max(1, z / 1.5)),
              },
            ].map((btn, idx) => (
              <button
                key={idx}
                onClick={btn.action}
                className="w-10 h-10 bg-white dark:bg-black/60 border border-[#046241]/10 dark:border-white/10 text-[#046241] dark:text-white hover:border-[#034E34] hover:bg-[#034E34]/5 dark:hover:border-[#FFB347] transition-all flex items-center justify-center font-bold shadow-md"
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Navigation Grid: Improved visibility for light mode */}
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-1 bg-[#046241]/5 dark:bg-white/5 p-1">
          {OFFICES.map((o) => (
            <button
              key={o.country}
              onClick={() => flyTo(o)}
              className={`p-5 text-left transition-all duration-300 group ${
                active?.country === o.country
                  ? "bg-[#034E34] dark:bg-[#FFB347]/15"
                  : "bg-white/60 dark:bg-black/20 hover:bg-[#034E34]/10 dark:hover:bg-[#FFB347]/5"
              }`}
            >
              <p
                className={`text-[10px] font-black uppercase tracking-widest transition-colors ${
                  active?.country === o.country
                    ? "text-[#F5F5F2] dark:text-[#FFB347]"
                    : "text-[#034E34]/60 dark:text-gray-400 group-hover:text-[#034E34] dark:group-hover:text-white"
                }`}
              >
                {o.country}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}