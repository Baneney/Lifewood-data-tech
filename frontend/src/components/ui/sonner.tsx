import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon, Loader2Icon } from "lucide-react"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      // 1. Remove background/border from here so they don't override type-specific colors
      style={
        {
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast:
            "group cn-toast flex items-center gap-3 border shadow-lg px-4 py-3 rounded-lg",
          // Use more vibrant colors and ensure they override everything
          success: "!bg-green-600/50 !text-white !border-green-700",
          error: "!bg-red-600/50 !text-white !border-red-700",
          description:
            "group-[.error]:!text-red-50 group-[.success]:!text-green-50",
          icon: "group-[.error]:!text-white group-[.success]:!text-white",
        },
      }}
      {...props}
    />
  );
}

export { Toaster }
