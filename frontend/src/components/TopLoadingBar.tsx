export function TopLoadingBar({ loading }: { loading: boolean }) {
  if (!loading) return null;
  return (
    <div className="absolute bottom-0 left-0 w-full h-1 overflow-hidden">
      <div
        className="h-full bg-[#FFB347]"
        style={{ animation: "loading-bar 1.4s ease-in-out infinite" }}
      />
      <style>{`
        @keyframes loading-bar {
          0%   { transform: translateX(-100%); width: 60%; }
          50%  { transform: translateX(60%);   width: 60%; }
          100% { transform: translateX(200%);  width: 60%; }
        }
      `}</style>
    </div>
  );
}
