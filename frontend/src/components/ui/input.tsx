import * as React from "react"
import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // Base functional styles
        "flex w-full min-w-0 transition-all duration-300 outline-none disabled:cursor-not-allowed disabled:opacity-50",
        // Default appearance (which you will override in the tag)
        "h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm",
        className // Tag styles go last to win the override
      )}
      {...props}
    />
  )
}

export { Input }