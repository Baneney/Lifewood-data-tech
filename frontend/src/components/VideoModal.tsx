// import { useState, useEffect, useRef } from "react";

// interface VideoHeroProps {
//   thumbnailVideo: string;
//   modalVideo: string;
//   label?: string;
//   timestamp?: string;
// }

// export default function VideoHero({ 
//   thumbnailVideo, 
//   modalVideo, 
//   label = "Watch Our Story", 
//   timestamp = "02:14" 
// }: VideoHeroProps) {
//   const [modalOpen, setModalOpen] = useState(false);
//   const modalVideoRef = useRef<HTMLVideoElement>(null);

//   useEffect(() => {
//     if (modalOpen) {
//       document.body.style.overflow = "hidden";
//       modalVideoRef.current?.play();
//     } else {
//       document.body.style.overflow = "auto";
//       if (modalVideoRef.current) {
//         modalVideoRef.current.pause();
//         modalVideoRef.current.currentTime = 0;
//       }
//     }
//     return () => { document.body.style.overflow = "auto"; };
//   }, [modalOpen]);

//   return (
//     <>
//       <button
//         onClick={() => setModalOpen(true)}
//         className="w-full max-w-65 group relative"
//       >
//         <div className="relative overflow-hidden aspect-4/5 rounded-sm border border-white/10 group-hover:border-[#FFB347]/50 transition-all duration-500 shadow-2xl">
//           <video
//             muted loop playsInline autoPlay
//             src={thumbnailVideo}
//             className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000"
//           />
//           <div className="absolute inset-0 bg-[#034E34]/40 group-hover:bg-transparent transition-colors duration-500" />
//           <div className="absolute inset-0 flex items-center justify-center">
//             <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#FFB347] transition-all">
//               <svg className="w-6 h-6 text-white group-hover:text-[#034E34] transition-colors" fill="currentColor" viewBox="0 0 24 24">
//                 <path d="M8 5v14l11-7z" />
//               </svg>
//             </div>
//           </div>
//         </div>
//         <div className="mt-4 lg:text-right">
//           <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 group-hover:text-[#FFB347] transition-colors">
//             {label} — {timestamp}
//           </span>
//         </div>
//       </button>

//       {/* MODAL */}
//       {/* {modalOpen && (
//         <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12">
//           <button
//             onClick={() => setModalOpen(false)}
//             className="absolute top-8 right-8 text-white hover:text-[#FFB347] transition-colors z-[110]"
//           >
//             <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
//               <path d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </button>
//           <video
//             ref={modalVideoRef}
//             controls
//             className="w-full max-w-6xl aspect-video shadow-2xl border border-white/10"
//             src={modalVideo}
//           />
//         </div>
//       )} */}

//         {modalOpen && (
//         <div className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12">
//             {/* CLOSE BUTTON - Increased z-index and added more padding for click area */}
//             <button
//             onClick={(e) => {
//                 e.stopPropagation(); // Prevents click from bubbling
//                 setModalOpen(false);
//             }}
//             className="absolute top-6 right-6 md:top-10 md:right-10 text-white hover:text-[#FFB347] transition-all duration-300 z-[10000] p-2 cursor-pointer"
//             aria-label="Close modal"
//             >
//             <svg className="w-10 h-10 md:w-12 md:h-12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//                 <path d="M6 18L18 6M6 6l12 12" />
//             </svg>
//             </button>

//             {/* VIDEO PLAYER */}
//             <div className="relative w-full max-w-6xl aspect-video shadow-2xl border border-white/10 z-[9999]">
//             <video
//                 ref={modalVideoRef}
//                 controls
//                 playsInline
//                 className="w-full h-full object-contain"
//                 src={modalVideo}
//             />
//             </div>
//         </div>
//         )}      
//     </>
//   );
// }








// import { useState, useEffect, useRef } from "react";

// interface VideoHeroProps {
//   thumbnailVideo: string;
//   modalVideo: string;
//   label?: string;
//   timestamp?: string;
// }

// export default function VideoHero({ 
//   thumbnailVideo, 
//   modalVideo, 
//   label = "Watch Our Story", 
//   timestamp = "02:14" 
// }: VideoHeroProps) {
//   const [modalOpen, setModalOpen] = useState(false);
//   const modalVideoRef = useRef<HTMLVideoElement>(null);

//   useEffect(() => {
//     if (modalOpen) {
//       document.body.style.overflow = "hidden";
//       modalVideoRef.current?.play();
//     } else {
//       document.body.style.overflow = "auto";
//       if (modalVideoRef.current) {
//         modalVideoRef.current.pause();
//         modalVideoRef.current.currentTime = 0;
//       }
//     }
//     return () => { document.body.style.overflow = "auto"; };
//   }, [modalOpen]);

//   return (
//     <>
//       <button
//         onClick={() => setModalOpen(true)}
//         className="w-full max-w-65 group relative"
//       >
//         <div className="relative overflow-hidden aspect-4/5 rounded-sm border border-white/10 group-hover:border-[#FFB347]/50 transition-all duration-500 shadow-2xl">
//           <video
//             muted loop playsInline autoPlay
//             src={thumbnailVideo}
//             className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000"
//           />
//           <div className="absolute inset-0 bg-[#034E34]/40 group-hover:bg-transparent transition-colors duration-500" />
//           <div className="absolute inset-0 flex items-center justify-center">
//             <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#FFB347] transition-all">
//               <svg className="w-6 h-6 text-white group-hover:text-[#034E34] transition-colors" fill="currentColor" viewBox="0 0 24 24">
//                 <path d="M8 5v14l11-7z" />
//               </svg>
//             </div>
//           </div>
//         </div>
//         <div className="mt-4 lg:text-right">
//           <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 group-hover:text-[#FFB347] transition-colors">
//             {label} — {timestamp}
//           </span>
//         </div>
//       </button>

//       {/* MODAL */}
//       {modalOpen && (
//         <div 
//           className="fixed inset-0 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"
//           style={{ zIndex: 99999, isolation: 'isolate' }} // Extremely high Z and isolation
//           onClick={() => setModalOpen(false)} // Click background to close
//         >
//           {/* CLOSE BUTTON */}
//           <button
//             onClick={(e) => {
//               e.stopPropagation(); // Stop background click from firing
//               setModalOpen(false);
//             }}
//             className="absolute top-6 right-6 md:top-10 md:right-10 text-white hover:text-[#FFB347] transition-all duration-300 p-4 cursor-pointer"
//             style={{ zIndex: 100000 }} // Higher than the background
//             aria-label="Close modal"
//           >
//             <svg className="w-10 h-10 md:w-12 md:h-12 pointer-events-none" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//               <path d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </button>

//           {/* VIDEO PLAYER */}
//           <div 
//             className="relative w-full max-w-6xl aspect-video shadow-2xl border border-white/10 bg-black"
//             onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the video itself
//           >
//             <video
//               ref={modalVideoRef}
//               controls
//               playsInline
//               className="w-full h-full object-contain"
//               src={modalVideo}
//             />
//           </div>
//         </div>
//       )}
//     </>
//   );
// }





import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom"; // 1. Import createPortal

interface VideoHeroProps {
  thumbnailVideo: string;
  modalVideo: string;
  label?: string;
  timestamp?: string;
}

export default function VideoHero({ 
  thumbnailVideo, 
  modalVideo, 
  label = "Watch Our Story", 
  timestamp = "02:14" 
}: VideoHeroProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
      modalVideoRef.current?.play();
    } else {
      document.body.style.overflow = "auto";
      if (modalVideoRef.current) {
        modalVideoRef.current.pause();
        modalVideoRef.current.currentTime = 0;
      }
    }
    return () => { document.body.style.overflow = "auto"; };
  }, [modalOpen]);

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className="w-full max-w-65 group relative"
      >
        {/* ... (Keep your existing thumbnail button code exactly the same) ... */}
        <div className="relative overflow-hidden aspect-4/5 rounded-sm border border-white/10 group-hover:border-[#FFB347]/50 transition-all duration-500 shadow-2xl">
          <video
            muted loop playsInline autoPlay
            src={thumbnailVideo}
            className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-[#034E34]/40 group-hover:bg-transparent transition-colors duration-500" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#FFB347] transition-all">
              <svg className="w-6 h-6 text-white group-hover:text-[#034E34] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="mt-4 lg:text-right">
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 group-hover:text-[#FFB347] transition-colors">
            {label} — {timestamp}
          </span>
        </div>
      </button>

      {/* 2. Wrap the Modal in createPortal */}
      {modalOpen && createPortal(
        <div 
          className="fixed inset-0 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"
          style={{ zIndex: 999999 }} // 3. Set a massive Z-index
          onClick={() => setModalOpen(false)}
        >
          {/* CLOSE BUTTON */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setModalOpen(false);
            }}
            className="absolute top-6 right-6 md:top-0 md:right-0 text-white hover:text-[#FFB347] transition-all duration-300 p-4 cursor-pointer z-1000000"
            aria-label="Close modal"
          >
            <svg className="w-10 h-10 md:w-12 md:h-12 pointer-events-none" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* VIDEO PLAYER */}
          <div 
            className="relative w-full max-w-6xl aspect-video shadow-2xl border border-white/10 bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              ref={modalVideoRef}
              controls
              playsInline
              className="w-full h-full object-contain"
              src={modalVideo}
            />
          </div>
        </div>,
        document.body // 4. Teleport this to the end of the <body>
      )}
    </>
  );
}