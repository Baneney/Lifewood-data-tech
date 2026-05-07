import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className={cn(
        "relative flex items-center w-14 h-7 rounded-full p-0.5 transition-all duration-300 focus:outline-none",
        isDark ? "bg-[#046241]" : "bg-slate-200",
      )}
    >
      {/* Track icons */}
      <Sun
        size={12}
        className={cn(
          "absolute left-1.5 transition-opacity duration-200",
          isDark ? "opacity-0" : "opacity-60 text-amber-500",
        )}
      />
      <Moon
        size={12}
        className={cn(
          "absolute right-1.5 transition-opacity duration-200",
          isDark ? "opacity-80 text-[#FFB347]" : "opacity-0",
        )}
      />
      {/* Thumb */}
      <span
        className={cn(
          "relative z-10 w-6 h-6 rounded-full shadow-sm transition-all duration-300 flex items-center justify-center",
          isDark
            ? "translate-x-7 bg-[#FFB347]"
            : "translate-x-0 bg-white",
        )}
      >
        {isDark ? (
          <Moon size={11} className="text-[#046241]" />
        ) : (
          <Sun size={11} className="text-amber-500" />
        )}
      </span>
    </button>
  );
}
