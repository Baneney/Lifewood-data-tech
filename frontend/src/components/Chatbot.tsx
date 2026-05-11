// import { useState, useRef, useEffect, useCallback } from "react"
// import logo from "../assets/Lifewood-Logo.png"

// type Message = { from: "user" | "bot"; text: string }

// const FAQ: { patterns: string[]; answer: string }[] = [
//   {
//     patterns: ["hello", "hi", "hey", "good morning", "good afternoon", "good evening"],
//     answer: "Hi there! 👋 Welcome to Lifewood. How can I help you today?",
//   },
//   {
//     patterns: ["what is lifewood", "about lifewood", "who are you", "tell me about"],
//     answer:
//       "Lifewood is a technology and data solutions company focused on delivering innovative services across AI, data management, and digital transformation.",
//   },
//   {
//     patterns: ["services", "what do you offer", "what you do"],
//     answer:
//       "We offer a range of services including AI & Machine Learning, Data Annotation, Software Development, and Business Process Outsourcing (BPO). Visit our Services page for more details!",
//   },
//   {
//     patterns: ["careers", "job", "hiring", "apply", "open position", "vacancy"],
//     answer:
//       "We're always looking for talented people! Check out our Careers page to see open positions and apply directly.",
//   },
//   {
//     patterns: ["contact", "reach", "email", "phone", "get in touch"],
//     answer:
//       "You can reach us through our Contact page. Fill out the form and our team will get back to you shortly!",
//   },
//   {
//     patterns: ["project", "portfolio", "work", "case study"],
//     answer:
//       "We've worked on exciting projects across various industries. Head over to our Projects page to explore our portfolio!",
//   },
//   {
//     patterns: ["location", "office", "where", "address", "based"],
//     answer:
//       "Lifewood has offices in multiple locations. Visit our Contact or About page for detailed office information.",
//   },
//   {
//     patterns: ["partner", "partnership", "collaborate"],
//     answer:
//       "We're open to partnerships and collaborations! Please reach out via our Contact page and let's talk.",
//   },
//   {
//     patterns: ["thank", "thanks", "appreciate"],
//     answer: "You're welcome! 😊 Is there anything else I can help you with?",
//   },
//   {
//     patterns: ["bye", "goodbye", "see you", "take care"],
//     answer: "Goodbye! Have a great day! Feel free to come back anytime. 👋",
//   },
// ]

// function getReply(input: string): string {
//   const lower = input.toLowerCase()
//   for (const faq of FAQ) {
//     if (faq.patterns.some((p) => lower.includes(p))) return faq.answer
//   }
//   return "I'm not sure about that yet. For more information, please visit our website or reach out via the Contact page!"
// }

// export default function Chatbot() {
//   const [open, setOpen] = useState(false)
//   const [visible, setVisible] = useState(false)
//   const [messages, setMessages] = useState<Message[]>([
//     { from: "bot", text: "Hi! 👋 I'm the Lifewood assistant. Ask me anything!" },
//   ])
//   const [input, setInput] = useState("")
//   const bottomRef = useRef<HTMLDivElement>(null)

//   // Mount before animating in; unmount after animating out
//   useEffect(() => {
//     if (open) {
//       setVisible(true)
//     } else {
//       const t = setTimeout(() => setVisible(false), 300)
//       return () => clearTimeout(t)
//     }
//   }, [open])

//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: "smooth" })
//   }, [messages, open])

//   const toggle = useCallback(() => setOpen((v) => !v), [])

//   function send() {
//     const trimmed = input.trim()
//     if (!trimmed) return
//     const userMsg: Message = { from: "user", text: trimmed }
//     const botMsg: Message = { from: "bot", text: getReply(trimmed) }
//     setMessages((prev) => [...prev, userMsg, botMsg])
//     setInput("")
//   }

//   return (
//     <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
//       {/* Chat window */}
//       {visible && (
//         <div
//           className="w-96 rounded-2xl shadow-2xl border overflow-hidden flex flex-col"
//           style={{
//             backgroundColor: "var(--site-bg)",
//             borderColor: "var(--site-border)",
//             height: "520px",
//             transformOrigin: "bottom right",
//             animation: open
//               ? "chatbot-in 0.3s cubic-bezier(0.34,1.56,0.64,1) forwards"
//               : "chatbot-out 0.25s ease-in forwards",
//           }}
//         >
//           {/* Header */}
//           <div className="flex items-center gap-3 px-5 py-4 bg-[#034E34]">
//             <img src={logo} alt="Lifewood" className="h-7 w-auto" />
//             <span className="text-white text-sm font-semibold flex-1">Lifewood Assistant</span>
//             <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white text-xl leading-none">✕</button>
//           </div>

//           {/* Messages */}
//           <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3" style={{ minHeight: 0 }}>
//             {messages.map((m, i) => (
//               <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
//                 <span
//                   className={`text-sm px-4 py-2.5 rounded-2xl max-w-[85%] leading-relaxed ${
//                     m.from === "user"
//                       ? "bg-[#034E34] text-white rounded-br-sm"
//                       : "bg-[#034E34]/10 text-[#034E34] dark:text-white dark:bg-white/10 rounded-bl-sm"
//                   }`}
//                 >
//                   {m.text}
//                 </span>
//               </div>
//             ))}
//             <div ref={bottomRef} />
//           </div>

//           {/* Input */}
//           <div className="flex gap-2 px-4 py-4 border-t" style={{ borderColor: "var(--site-border)" }}>
//             <input
//               className="flex-1 text-sm rounded-full px-4 py-2.5 border outline-none focus:ring-2 focus:ring-[#034E34] bg-transparent"
//               style={{ borderColor: "var(--site-border)" }}
//               placeholder="Type a message…"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && send()}
//             />
//             <button
//               onClick={send}
//               className="bg-[#034E34] hover:bg-[#417256] text-white text-sm px-5 py-2.5 rounded-full transition-colors"
//             >
//               Send
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Toggle button */}
//       <div className="relative">
//         {!open && (
//           <>
//             <span className="absolute inset-0 rounded-full bg-[#034E34] animate-ping opacity-40" />
//             <span className="absolute inset-0 rounded-full bg-[#034E34] animate-ping opacity-20 [animation-delay:0.4s]" />
//           </>
//         )}
//       <button
//         onClick={toggle}
//         className="relative w-16 h-16 rounded-full bg-[#034E34] hover:bg-[#417256] shadow-xl flex items-center justify-center transition-all duration-200 hover:scale-110"
//         aria-label="Toggle chatbot"
//       >
//         {open ? (
//           <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//             <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//           </svg>
//         ) : (
//           <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//             <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" />
//           </svg>
//         )}
//       </button>
//       </div>
//     </div>
//   )
// }

import { useState, useRef, useEffect, useCallback } from "react";
import logo from "../assets/Lifewood-LogoV2.png";

type Message = { from: "user" | "bot"; text: string };

const FAQ: { patterns: string[]; answer: string }[] = [
  {
    patterns: [
      "hello",
      "hi",
      "hey",
      "good morning",
      "good afternoon",
      "good evening",
    ],
    answer: "Hi there! 👋 Welcome to Lifewood. How can I help you today?",
  },
  {
    patterns: [
      "what is lifewood",
      "about lifewood",
      "who are you",
      "tell me about",
    ],
    answer:
      "Lifewood is a technology and data solutions company focused on delivering innovative services across AI, data management, and digital transformation.",
  },
  {
    patterns: ["services", "what do you offer", "what you do"],
    answer:
      "We offer a range of services including AI & Machine Learning, Data Annotation, Software Development, and Business Process Outsourcing (BPO). Visit our Services page for more details!",
  },
  {
    patterns: ["careers", "job", "hiring", "apply", "open position", "vacancy"],
    answer:
      "We're always looking for talented people! Check out our Careers page to see open positions and apply directly.",
  },
  {
    patterns: ["contact", "reach", "email", "phone", "get in touch"],
    answer:
      "You can reach us through our Contact page. Fill out the form and our team will get back to you shortly!",
  },
  {
    patterns: ["project", "portfolio", "work", "case study"],
    answer:
      "We've worked on exciting projects across various industries. Head over to our Projects page to explore our portfolio!",
  },
  {
    patterns: ["location", "office", "where", "address", "based"],
    answer:
      "Lifewood has offices in multiple locations. Visit our Contact or About page for detailed office information.",
  },
  {
    patterns: ["partner", "partnership", "collaborate"],
    answer:
      "We're open to partnerships and collaborations! Please reach out via our Contact page and let's talk.",
  },
  {
    patterns: ["thank", "thanks", "appreciate"],
    answer: "You're welcome! 😊 Is there anything else I can help you with?",
  },
  {
    patterns: ["bye", "goodbye", "see you", "take care"],
    answer: "Goodbye! Have a great day! Feel free to come back anytime. 👋",
  },
];

function getReply(input: string): string {
  const lower = input.toLowerCase();
  for (const faq of FAQ) {
    if (faq.patterns.some((p) => lower.includes(p))) return faq.answer;
  }
  return "I'm not sure about that yet. For more information, please visit our website or reach out via the Contact page!";
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      from: "bot",
      text: "Hi! 👋 I'm the Lifewood assistant. Ask me anything!",
    },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  // Handle the mounting/unmounting logic to allow the closing animation to play
  useEffect(() => {
    if (open) {
      setVisible(true);
    } else {
      // 300ms matches the 'chatbot-out' animation duration
      const t = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const toggle = useCallback(() => setOpen((v) => !v), []);

  function send() {
    const trimmed = input.trim();
    if (!trimmed) return;
    const userMsg: Message = { from: "user", text: trimmed };
    const botMsg: Message = { from: "bot", text: getReply(trimmed) };
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Dynamic Keyframes Injection */}
      <style>{`
        @keyframes chatbot-in {
          from { 
            opacity: 0; 
            transform: scale(0.8) translateY(20px); 
          }
          to { 
            opacity: 1; 
            transform: scale(1) translateY(0); 
          }
        }
        @keyframes chatbot-out {
          from { 
            opacity: 1; 
            transform: scale(1) translateY(0); 
          }
          to { 
            opacity: 0; 
            transform: scale(0.8) translateY(20px); 
          }
        }
        .message-fade-in {
          animation: message-slide 0.3s ease-out forwards;
        }
        @keyframes message-slide {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Chat window */}
      {visible && (
        <div
          className="w-96 rounded-2xl shadow-2xl border overflow-hidden flex flex-col"
          style={{
            backgroundColor: "var(--site-bg, #ffffff)",
            borderColor: "var(--site-border, #e5e7eb)",
            height: "520px",
            transformOrigin: "bottom right",
            animation: open
              ? "chatbot-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards"
              : "chatbot-out 0.25s ease-in forwards",
          }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-5 py-4 bg-[#034E34]">
            <img src={logo} alt="Lifewood" className="h-7 w-auto" />
            <span className="text-white text-sm font-semibold flex-1">
              Lifewood Assistant
            </span>
            <button
              onClick={() => setOpen(false)}
              className="text-white/70 hover:text-white text-xl leading-none transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div
            className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3"
            style={{ minHeight: 0 }}
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex message-fade-in ${m.from === "user" ? "justify-end" : "justify-start"}`}
              >
                <span
                  className={`text-sm px-4 py-2.5 rounded-2xl max-w-[85%] leading-relaxed ${
                    m.from === "user"
                      ? "bg-[#034E34] text-white rounded-br-sm shadow-sm"
                      : "bg-[#034E34]/10 text-[#034E34] dark:text-white dark:bg-white/10 rounded-bl-sm"
                  }`}
                >
                  {m.text}
                </span>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input Area */}
          <div
            className="flex gap-2 px-4 py-4 border-t"
            style={{ borderColor: "var(--site-border, #e5e7eb)" }}
          >
            <input
              className="flex-1 text-sm rounded-full px-4 py-2.5 border outline-none focus:ring-2 focus:ring-[#034E34] bg-transparent"
              style={{ borderColor: "var(--site-border, #e5e7eb)" }}
              placeholder="Type a message…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
            />
            <button
              onClick={send}
              className="bg-[#034E34] hover:bg-[#417256] text-white text-sm px-5 py-2.5 rounded-full transition-colors font-medium shadow-md active:scale-95"
            >
              Send
            </button>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <div className="relative">
        {!open && (
          <>
            {/* Soft pulse effect */}
            <span className="absolute inset-0 rounded-full bg-[#034E34] animate-ping opacity-20" />
          </>
        )}

        <button
          onClick={toggle}
          className={`
            relative w-14 h-14 rounded-full flex items-center justify-center 
            transition-all duration-300 ease-out shadow-lg
            ${
              open
                ? "bg-white text-[#034E34] rotate-90 scale-90"
                : "bg-gradient-to-br from-[#034E34] to-[#056d49] text-white hover:scale-110 hover:shadow-[0_0_20px_rgba(3,78,52,0.4)]"
            }
          `}
          aria-label="Toggle chatbot"
        >
          {open ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <div className="relative">
              {/* Main Chat Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 h-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              {/* Tiny notification dot to draw the eye */}
              <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-[#034E34]" />
            </div>
          )}
        </button>
      </div>
    </div>
  );
}