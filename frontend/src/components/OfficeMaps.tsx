// import { useEffect, useRef, useState } from "react"
// import { AnimatePresence, motion } from "framer-motion"
// import { geoMercator, geoPath } from "d3-geo"
// import { json } from "d3-fetch"
// import { feature } from "topojson-client"
// import type { FeatureCollection, Geometry } from "geojson"
// import type { Topology, Objects } from "topojson-specification"

// interface Office {
//   city: string
//   country: string
//   address: string
//   type: string
//   coords: [number, number]
// }

// const OFFICES: Office[] = [
//   { city: "Shenzhen",     country: "China",        type: "Global HQ",      address: "12F, Building T3, Hi-Park, Nanshan District",       coords: [114.0579, 22.5431] },
//   { city: "Kuala Lumpur", country: "Malaysia",     type: "Tech Hub",       address: "Level 20, Menara Binjai, No. 2 Jalan Binjai",        coords: [101.6869, 3.1390]  },
//   { city: "Dumaguete",    country: "Philippines",  type: "Production",     address: "LP Prime Building, Jose Romero Rd",                  coords: [123.3068, 9.3068]  },
//   { city: "Tokyo",        country: "Japan",        type: "Sales Office",   address: "2-chōme-11-1 Nagatachō, Chiyoda City",              coords: [139.6917, 35.6895] },
//   { city: "Singapore",    country: "Singapore",    type: "Regional Office",address: "Marina Bay Financial Centre",                        coords: [103.8198, 1.3521]  },
//   { city: "Sydney",       country: "Australia",    type: "Regional Office",address: "CBD, Sydney NSW",                                    coords: [151.2093, -33.8688]},
//   { city: "London",       country: "United Kingdom",type: "Regional Office",address: "Canary Wharf, London",                             coords: [-0.1276, 51.5074]  },
//   { city: "Dubai",        country: "UAE",          type: "Regional Office",address: "Dubai Internet City",                                coords: [55.2708, 25.2048]  },
//   { city: "New York",     country: "United States",type: "Regional Office",address: "Midtown Manhattan, NY",                             coords: [-74.0060, 40.7128] },
// ]

// const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"

// export default function OfficeMaps() {
//   const svgRef = useRef<SVGSVGElement>(null)
//   const [paths, setPaths] = useState<string[]>([])
//   const [active, setActive] = useState<Office | null>(null)
//   const [zoom, setZoom] = useState(1)
//   const [pan, setPan] = useState({ x: 0, y: 0 })
//   const dragging = useRef(false)
//   const lastPos = useRef({ x: 0, y: 0 })

//   const W = 960
//   const H = 500

//   const projection = geoMercator()
//     .scale((W / 2 / Math.PI) * zoom)
//     .translate([W / 2 + pan.x, H / 2 + pan.y + 40])

//   // Load world topojson and convert to SVG paths
//   useEffect(() => {
//     json(GEO_URL).then((world: unknown) => {
//       const topo = world as Topology<Objects<{ countries: never }>>
//       const fc = feature(topo, topo.objects.countries) as unknown as FeatureCollection<Geometry>
//       const gen = geoPath().projection(geoMercator().scale((W / 2 / Math.PI)).translate([W / 2, H / 2 + 40]))
//       setPaths(fc.features.map(f => gen(f) ?? ""))
//     })
//   }, [])

//   // Mouse drag handlers
//   const onMouseDown = (e: React.MouseEvent) => {
//     dragging.current = true
//     lastPos.current = { x: e.clientX, y: e.clientY }
//   }
//   const onMouseMove = (e: React.MouseEvent) => {
//     if (!dragging.current) return
//     const dx = e.clientX - lastPos.current.x
//     const dy = e.clientY - lastPos.current.y
//     lastPos.current = { x: e.clientX, y: e.clientY }
//     setPan(p => ({ x: p.x + dx, y: p.y + dy }))
//   }
//   const onMouseUp = () => { dragging.current = false }

//   const onWheel = (e: React.WheelEvent) => {
//     e.preventDefault()
//     setZoom(z => Math.min(8, Math.max(1, z * (e.deltaY < 0 ? 1.15 : 0.87))))
//   }

//   const flyTo = (office: Office) => {
//     const [lng, lat] = office.coords
//     const [px, py] = geoMercator()
//       .scale((W / 2 / Math.PI) * 4)
//       .translate([0, 0])([lng, lat]) ?? [0, 0]
//     setZoom(4)
//     setPan({ x: W / 2 - px, y: H / 2 - py + 40 })
//     setActive(office)
//   }

//   return (
//     <section className="py-24 md:py-32 px-8 md:px-16 bg-black border-t border-white/10">
//       <div className="max-w-7xl mx-auto">

//         {/* Header */}
//         <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
//           <div>
//             <p className="text-xs font-semibold text-[#FFB347] uppercase tracking-[0.3em] mb-4">[ Global Infrastructure ]</p>
//             <h2 className="text-4xl md:text-6xl font-black leading-none tracking-tighter uppercase">Our Global Network</h2>
//           </div>
//           <p className="text-gray-500 text-sm uppercase tracking-widest">
//             {OFFICES.length} offices · {new Set(OFFICES.map(o => o.country)).size} countries
//           </p>
//         </div>

//         {/* Map */}
//         <div className="relative w-full border border-white/10 overflow-hidden bg-[#0a0a0a]" style={{ height: 500 }}>
//           <svg
//             ref={svgRef}
//             viewBox={`0 0 ${W} ${H}`}
//             className="w-full h-full cursor-grab active:cursor-grabbing select-none"
//             onMouseDown={onMouseDown}
//             onMouseMove={onMouseMove}
//             onMouseUp={onMouseUp}
//             onMouseLeave={onMouseUp}
//             onWheel={onWheel}
//           >
//             {/* Countries */}
//             {paths.length > 0
//               ? paths.map((d, i) => (
//                   <path key={i} d={d} fill="#1a1a1a" stroke="#2d2d2d" strokeWidth={0.5} />
//                 ))
//               : (() => {
//                   // fallback: render from live projection if paths not loaded yet
//                   return null
//                 })()
//             }

//             {/* Office dots */}
//             {OFFICES.map(office => {
//               const pos = projection(office.coords)
//               if (!pos) return null
//               const [x, y] = pos
//               const isActive = active?.city === office.city
//               return (
//                 <g key={office.city} style={{ cursor: "pointer" }} onClick={() => flyTo(office)}>
//                   <circle cx={x} cy={y} r={12} fill="#FFB347" fillOpacity={0.15}>
//                     <animate attributeName="r" values="8;14;8" dur="2s" repeatCount="indefinite" />
//                     <animate attributeName="fill-opacity" values="0.15;0.05;0.15" dur="2s" repeatCount="indefinite" />
//                   </circle>
//                   <circle
//                     cx={x} cy={y} r={5}
//                     fill="#FFB347"
//                     stroke={isActive ? "#fff" : "#000"}
//                     strokeWidth={1.5}
//                     style={{ filter: "drop-shadow(0 0 6px #FFB347)" }}
//                   />
//                   {isActive && (
//                     <text x={x} y={y - 12} textAnchor="middle" fill="#FFB347" fontSize={9} fontWeight="bold" fontFamily="Manrope, sans-serif" letterSpacing={1}>
//                       {office.city.toUpperCase()}
//                     </text>
//                   )}
//                 </g>
//               )
//             })}
//           </svg>

//           {/* Zoom controls */}
//           <div className="absolute bottom-4 right-4 flex flex-col gap-1 z-10">
//             <button onClick={() => setZoom(z => Math.min(8, z * 1.5))} className="w-8 h-8 bg-black/80 border border-white/20 text-white flex items-center justify-center hover:border-[#FFB347] hover:text-[#FFB347] transition-colors text-lg">+</button>
//             <button onClick={() => { setZoom(1); setPan({ x: 0, y: 0 }); setActive(null) }} className="w-8 h-8 bg-black/80 border border-white/20 text-white flex items-center justify-center hover:border-[#FFB347] hover:text-[#FFB347] transition-colors text-xs">⌂</button>
//             <button onClick={() => setZoom(z => Math.max(1, z / 1.5))} className="w-8 h-8 bg-black/80 border border-white/20 text-white flex items-center justify-center hover:border-[#FFB347] hover:text-[#FFB347] transition-colors text-lg">−</button>
//           </div>

//           <p className="absolute bottom-4 left-4 text-white/20 text-xs uppercase tracking-widest">Scroll to zoom · Drag to pan · Click a dot</p>

//           {/* Info card */}
//           <AnimatePresence>
//             {active && (
//               <motion.div
//                 key={active.city}
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: 10 }}
//                 transition={{ duration: 0.2 }}
//                 className="absolute top-4 left-4 bg-black/95 border border-[#FFB347]/40 backdrop-blur-xl p-6 max-w-xs z-30"
//               >
//                 <div className="flex justify-between items-start mb-3">
//                   <p className="text-[#FFB347] text-[9px] font-black uppercase tracking-widest">{active.type}</p>
//                   <button onClick={() => setActive(null)} className="text-white/30 hover:text-white text-xs ml-4">✕</button>
//                 </div>
//                 <h3 className="text-2xl font-black uppercase tracking-tight">{active.city}</h3>
//                 <p className="text-gray-500 text-xs uppercase tracking-widest mt-1 mb-4">{active.country}</p>
//                 <div className="border-t border-white/10 pt-4">
//                   <p className="text-gray-400 text-sm leading-relaxed">{active.address}</p>
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>

//         {/* Office list */}
//         <div className="mt-px grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-px bg-white/10">
//           {OFFICES.map(o => (
//             <button
//               key={o.city}
//               onClick={() => flyTo(o)}
//               className={`bg-black px-5 py-4 text-left transition-colors hover:bg-[#FFB347]/10 group ${active?.city === o.city ? "bg-[#FFB347]/10" : ""}`}
//             >
//               <p className={`text-xs font-black uppercase tracking-tight transition-colors ${active?.city === o.city ? "text-[#FFB347]" : "text-white group-hover:text-[#FFB347]"}`}>{o.city}</p>
//               <p className="text-gray-600 text-[10px] uppercase tracking-widest mt-0.5">{o.country}</p>
//             </button>
//           ))}
//         </div>

//       </div>
//     </section>
//   )
// }














// import { useEffect, useRef, useState, useMemo } from "react";
// import { AnimatePresence, motion } from "framer-motion";
// import { geoMercator, geoPath } from "d3-geo";
// import { json } from "d3-fetch";
// import { feature } from "topojson-client";
// import type { FeatureCollection, Geometry } from "geojson";
// import type { Topology, Objects } from "topojson-specification";

// interface Office {
//   city: string;
//   country: string;
//   address: string;
//   type: string;
//   coords: [number, number]; // [Longitude, Latitude]
// }

// const OFFICES: Office[] = [
//   { city: "Shenzhen", country: "China", type: "Global HQ", address: "12F, Building T3, Hi-Park, Nanshan District", coords: [114.0579, 22.5431] },
//   { city: "Kuala Lumpur", country: "Malaysia", type: "Tech Hub", address: "Level 20, Menara Binjai, No. 2 Jalan Binjai", coords: [101.6869, 3.1390] },
//   { city: "Dumaguete", country: "Philippines", type: "Production", address: "LP Prime Building, Jose Romero Rd", coords: [123.3068, 9.3068] },
//   { city: "Tokyo", country: "Japan", type: "Sales Office", address: "2-chōme-11-1 Nagatachō, Chiyoda City", coords: [139.6917, 35.6895] },
//   { city: "Singapore", country: "Singapore", type: "Regional Office", address: "Marina Bay Financial Centre", coords: [103.8198, 1.3521] },
//   { city: "Sydney", country: "Australia", type: "Regional Office", address: "CBD, Sydney NSW", coords: [151.2093, -33.8688] },
//   { city: "London", country: "United Kingdom", type: "Regional Office", address: "Canary Wharf, London", coords: [-0.1276, 51.5074] },
//   { city: "Dubai", country: "UAE", type: "Regional Office", address: "Dubai Internet City", coords: [55.2708, 25.2048] },
//   { city: "New York", country: "United States", type: "Regional Office", address: "Midtown Manhattan, NY", coords: [-74.0060, 40.7128] },
// ];

// const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// export default function OfficeMaps() {
//   const [worldData, setWorldData] = useState<FeatureCollection<Geometry> | null>(null);
//   const [active, setActive] = useState<Office | null>(null);
//   const [zoom, setZoom] = useState(1.2);
//   const [pan, setPan] = useState({ x: 0, y: 0 });
//   const dragging = useRef(false);
//   const lastPos = useRef({ x: 0, y: 0 });

//   const W = 960;
//   const H = 500;

//   // ── Unified Projection Logic ──
//   // This ensures BOTH the map and the dots use the same coordinate system
//   const projection = useMemo(() => {
//     return geoMercator()
//       .scale((W / 2 / Math.PI) * zoom)
//       .translate([W / 2 + pan.x, H / 2 + pan.y + 40]);
//   }, [zoom, pan, W, H]);

//   const pathGenerator = geoPath().projection(projection);

//   useEffect(() => {
//     json(GEO_URL).then((world: any) => {
//       const fc = feature(world, world.objects.countries) as unknown as FeatureCollection<Geometry>;
//       setWorldData(fc);
//     });
//   }, []);

//   // ── Interaction Handlers ──
//   const onMouseDown = (e: React.MouseEvent) => {
//     dragging.current = true;
//     lastPos.current = { x: e.clientX, y: e.clientY };
//   };

//   const onMouseMove = (e: React.MouseEvent) => {
//     if (!dragging.current) return;
//     const dx = e.clientX - lastPos.current.x;
//     const dy = e.clientY - lastPos.current.y;
//     lastPos.current = { x: e.clientX, y: e.clientY };
//     setPan((p) => ({ x: p.x + dx, y: p.y + dy }));
//   };

//   const onMouseUp = () => (dragging.current = false);

//   const onWheel = (e: React.WheelEvent) => {
//     const delta = e.deltaY < 0 ? 1.1 : 0.9;
//     setZoom((z) => Math.min(10, Math.max(1, z * delta)));
//   };

//   const flyTo = (office: Office) => {
//     setActive(office);
//     const [lng, lat] = office.coords;
    
//     // Calculate where the point would be at zoom 1 with no pan
//     const baseProj = geoMercator().scale(W / 2 / Math.PI).translate([W / 2, H / 2 + 40]);
//     const targetZoom = 4;
//     const [x, y] = baseProj([lng, lat])!;
    
//     // Center the map on that point
//     setZoom(targetZoom);
//     setPan({
//       x: (W / 2 - x) * targetZoom,
//       y: (H / 2 - y) * targetZoom
//     });
//   };

//   return (
//     <section className="py-24 md:py-32 px-8 md:px-16 bg-[#021a11]">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
//           <div>
//             <p className="text-[#FFB347] text-xs font-bold uppercase tracking-[0.4em] mb-4">[ Global Infrastructure ]</p>
//             <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Our Global Network</h2>
//           </div>
//           <p className="text-gray-500 font-mono text-xs uppercase">
//             {OFFICES.length} Nodes // {new Set(OFFICES.map(o => o.country)).size} Regions
//           </p>
//         </div>

//         <div className="relative w-full aspect-video border border-white/5 overflow-hidden bg-[#032418]/30 backdrop-blur-sm">
//           <svg
//             viewBox={`0 0 ${W} ${H}`}
//             className="w-full h-full cursor-grab active:cursor-grabbing"
//             onMouseDown={onMouseDown}
//             onMouseMove={onMouseMove}
//             onMouseUp={onMouseUp}
//             onMouseLeave={onMouseUp}
//             onWheel={onWheel}
//           >
//             {/* ── Landmass ── */}
//             {worldData?.features.map((feature, i) => (
//               <path
//                 key={i}
//                 d={pathGenerator(feature) || ""}
//                 fill="#052e1f"
//                 stroke="#0a4d36"
//                 strokeWidth={0.5 / zoom} // Keep stroke thin when zooming
//               />
//             ))}

//             {/* ── Office Nodes ── */}
//             {OFFICES.map((office) => {
//               const pos = projection(office.coords);
//               if (!pos) return null;
//               const [x, y] = pos;
//               const isActive = active?.city === office.city;

//               return (
//                 <g key={office.city} className="cursor-pointer" onClick={() => flyTo(office)}>
//                   <circle cx={x} cy={y} r={15 / zoom} fill="#FFB347" fillOpacity={0.1}>
//                     <animate attributeName="r" values={`${10/zoom};${20/zoom};${10/zoom}`} dur="3s" repeatCount="indefinite" />
//                   </circle>
//                   <circle
//                     cx={x}
//                     cy={y}
//                     r={4 / zoom}
//                     fill={isActive ? "#FFB347" : "#0a4d36"}
//                     stroke="#FFB347"
//                     strokeWidth={1 / zoom}
//                     className="transition-all duration-300"
//                   />
//                 </g>
//               );
//             })}
//           </svg>

//           {/* Info Card Overlay */}
//           <AnimatePresence mode="wait">
//             {active && (
//               <motion.div
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: -20 }}
//                 className="absolute top-6 left-6 p-6 bg-[#021a11]/90 border border-[#FFB347]/30 backdrop-blur-xl max-w-xs z-20"
//               >
//                 <div className="flex justify-between items-start mb-4">
//                   <span className="text-[#FFB347] font-mono text-[10px] uppercase tracking-widest">{active.type}</span>
//                   <button onClick={() => setActive(null)} className="text-white/20 hover:text-white text-xs">✕</button>
//                 </div>
//                 <h3 className="text-2xl font-black uppercase leading-none mb-1">{active.city}</h3>
//                 <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-4">{active.country}</p>
//                 <p className="text-gray-400 text-xs leading-relaxed border-t border-white/5 pt-4">{active.address}</p>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           {/* Controls */}
//           <div className="absolute bottom-6 right-6 flex flex-col gap-2">
//             <button onClick={() => setZoom(z => Math.min(10, z * 1.4))} className="w-10 h-10 bg-white/5 border border-white/10 hover:bg-[#FFB347] hover:text-black transition-all text-xl font-light">+</button>
//             <button onClick={() => setZoom(z => Math.max(1, z / 1.4))} className="w-10 h-10 bg-white/5 border border-white/10 hover:bg-[#FFB347] hover:text-black transition-all text-xl font-light">−</button>
//           </div>
//         </div>

//         {/* ── Location Selector Grid ── */}
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 border-t border-white/5">
//           {OFFICES.map((o) => (
//             <button
//               key={o.city}
//               onClick={() => flyTo(o)}
//               className={`p-6 text-left border-r border-b border-white/5 transition-all group ${active?.city === o.city ? 'bg-[#FFB347]/10' : 'hover:bg-white/5'}`}
//             >
//               <p className={`text-xs font-bold uppercase tracking-tighter transition-colors ${active?.city === o.city ? 'text-[#FFB347]' : 'text-white'}`}>
//                 {o.city}
//               </p>
//               <p className="text-gray-600 text-[9px] uppercase tracking-[0.2em] mt-1">{o.country}</p>
//             </button>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }













import { useEffect, useRef, useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { geoMercator, geoPath } from "d3-geo";
import { json } from "d3-fetch";
import { feature } from "topojson-client";
import type { FeatureCollection, Geometry } from "geojson";

interface Office {
  city: string;
  country: string;
  address: string;
  type: string;
  coords: [number, number]; // [Longitude, Latitude]
}

const OFFICES: Office[] = [
  { city: "Shenzhen", country: "China", type: "Global HQ", address: "12F, Building T3, Hi-Park, Nanshan District", coords: [114.0579, 22.5431] },
  { city: "Kuala Lumpur", country: "Malaysia", type: "Tech Hub", address: "Level 20, Menara Binjai, No. 2 Jalan Binjai", coords: [101.6869, 3.1390] },
  { city: "Dumaguete", country: "Philippines", type: "Production", address: "LP Prime Building, Jose Romero Rd", coords: [123.3068, 9.3068] },
  { city: "Tokyo", country: "Japan", type: "Sales Office", address: "2-chōme-11-1 Nagatachō, Chiyoda City", coords: [139.6917, 35.6895] },
  { city: "Singapore", country: "Singapore", type: "Regional Office", address: "Marina Bay Financial Centre", coords: [103.8198, 1.3521] },
  { city: "Sydney", country: "Australia", type: "Regional Office", address: "CBD, Sydney NSW", coords: [151.2093, -33.8688] },
  { city: "London", country: "United Kingdom", type: "Regional Office", address: "Canary Wharf, London", coords: [-0.1276, 51.5074] },
  { city: "Dubai", country: "UAE", type: "Regional Office", address: "Dubai Internet City", coords: [55.2708, 25.2048] },
  { city: "New York", country: "United States", type: "Regional Office", address: "Midtown Manhattan, NY", coords: [-74.0060, 40.7128] },
];

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export default function OfficeMaps() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [worldData, setWorldData] = useState<FeatureCollection<Geometry> | null>(null);
  const [active, setActive] = useState<Office | null>(null);
  const [zoom, setZoom] = useState(1.2);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  
  const dragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });

  const W = 960;
  const H = 500;

  // 1. Unified Projection: Controls both the map and the dots
  const projection = useMemo(() => {
    return geoMercator()
      .scale((W / 2 / Math.PI) * zoom)
      .translate([W / 2 + pan.x, H / 2 + pan.y + 40]);
  }, [zoom, pan]);

  const pathGenerator = geoPath().projection(projection);

  // 2. Load TopoJSON data
  useEffect(() => {
    json(GEO_URL).then((world: any) => {
      const fc = feature(world, world.objects.countries) as unknown as FeatureCollection<Geometry>;
      setWorldData(fc);
    });
  }, []);

  // 3. Scroll Prevention Logic: Manual listener to allow preventDefault()
  useEffect(() => {
    const mapArea = containerRef.current;
    if (!mapArea) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault(); // Stop entire page from scrolling
      const delta = e.deltaY < 0 ? 1.15 : 0.85;
      setZoom((z) => Math.min(10, Math.max(1, z * delta)));
    };

    mapArea.addEventListener("wheel", handleWheel, { passive: false });
    return () => mapArea.removeEventListener("wheel", handleWheel);
  }, []);

  // 4. Interaction Handlers
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
    
    // Create a base projection at zoom 1 to find the target coordinates
    const baseProj = geoMercator().scale(W / 2 / Math.PI).translate([W / 2, H / 2 + 40]);
    const [x, y] = baseProj([lng, lat])!;
    
    const targetZoom = 4;
    setZoom(targetZoom);
    setPan({
      x: (W / 2 - x) * targetZoom,
      y: (H / 2 - y) * targetZoom
    });
  };

  return (
    <section className="py-24 md:py-32 px-8 md:px-16 bg-[#021a11]">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <p className="text-[#FFB347] text-xs font-bold uppercase tracking-[0.4em] mb-4">[ Global Infrastructure ]</p>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Our Global Network</h2>
          </div>
          <p className="text-gray-500 font-mono text-[10px] uppercase tracking-widest">
            {OFFICES.length} Active Nodes // Scalable Intelligence
          </p>
        </div>

        {/* Map Container */}
        <div 
          ref={containerRef}
          className="relative w-full aspect-video border border-white/5 overflow-hidden bg-[#032418]/30 backdrop-blur-sm"
        >
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="w-full h-full cursor-grab active:cursor-grabbing select-none"
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={() => (dragging.current = false)}
            onMouseLeave={() => (dragging.current = false)}
          >
            {/* Landmass */}
            {worldData?.features.map((feature, i) => (
              <path
                key={i}
                d={pathGenerator(feature) || ""}
                fill="#052e1f"
                stroke="#0a4d36"
                strokeWidth={0.5 / zoom} 
              />
            ))}

            {/* Office Dots */}
            {OFFICES.map((office) => {
              const pos = projection(office.coords);
              if (!pos) return null;
              const [x, y] = pos;
              const isActive = active?.city === office.city;

              return (
                <g key={office.city} className="cursor-pointer" onClick={() => flyTo(office)}>
                  {/* Pulse Effect */}
                  <circle cx={x} cy={y} r={12} fill="#FFB347" fillOpacity={0.15}>
                    <animate attributeName="r" values="8;15;8" dur="3s" repeatCount="indefinite" />
                    <animate attributeName="fill-opacity" values="0.15;0.05;0.15" dur="3s" repeatCount="indefinite" />
                  </circle>
                  
                  {/* Constant Scale Dot (Doesn't shrink when zooming) */}
                  <circle
                    cx={x} cy={y} r={4.5}
                    fill={isActive ? "#FFB347" : "#0a4d36"}
                    stroke="#FFB347"
                    strokeWidth={1.5}
                    className="transition-all duration-300"
                    style={{ filter: isActive ? "drop-shadow(0 0 8px #FFB347)" : "none" }}
                  />
                </g>
              );
            })}
          </svg>

          {/* Info Card Overlay */}
          <AnimatePresence mode="wait">
            {active && (
              <motion.div
                key={active.city}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="absolute top-6 left-6 p-6 bg-[#021a11]/95 border border-[#FFB347]/30 backdrop-blur-2xl max-w-xs z-20 shadow-2xl"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[#FFB347] font-mono text-[9px] font-bold uppercase tracking-[0.2em]">{active.type}</span>
                  <button onClick={() => setActive(null)} className="text-white/20 hover:text-white transition-colors">✕</button>
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight leading-none mb-1">{active.city}</h3>
                <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-4">{active.country}</p>
                <div className="border-t border-white/10 pt-4">
                  <p className="text-gray-400 text-xs leading-relaxed">{active.address}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Controls */}
          <div className="absolute bottom-6 right-6 flex flex-col gap-2">
            <button onClick={() => setZoom(z => Math.min(10, z * 1.5))} className="w-10 h-10 bg-black/60 border border-white/10 hover:border-[#FFB347] hover:text-[#FFB347] transition-all text-xl font-light">+</button>
            <button onClick={() => { setZoom(1.2); setPan({ x: 0, y: 0 }); setActive(null) }} className="w-10 h-10 bg-black/60 border border-white/10 hover:border-[#FFB347] hover:text-[#FFB347] transition-all text-xs">⌂</button>
            <button onClick={() => setZoom(z => Math.max(1, z / 1.5))} className="w-10 h-10 bg-black/60 border border-white/10 hover:border-[#FFB347] hover:text-[#FFB347] transition-all text-xl font-light">−</button>
          </div>
          
          <p className="absolute bottom-6 left-6 text-white/10 text-[9px] uppercase tracking-[0.3em] pointer-events-none">
            Interative Global Grid // 2026 Lifewood Network
          </p>
        </div>

        {/* Office Grid Selector */}
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-1 bg-white/5">
          {OFFICES.map((o) => (
            <button
              key={o.city}
              onClick={() => flyTo(o)}
              className={`p-6 text-left transition-all duration-500 group ${active?.city === o.city ? 'bg-[#FFB347]/10' : 'bg-black/20 hover:bg-[#FFB347]/5'}`}
            >
              <p className={`text-xs font-black uppercase tracking-tighter transition-colors ${active?.city === o.city ? 'text-[#FFB347]' : 'text-gray-400 group-hover:text-white'}`}>
                {o.city}
              </p>
              <p className="text-gray-600 text-[9px] uppercase tracking-[0.2em] mt-1">{o.country}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}