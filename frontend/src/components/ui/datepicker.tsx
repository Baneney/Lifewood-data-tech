"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon, ChevronDownIcon } from "lucide-react"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerProps {
  className?: string; // This allows the className prop on the tag
}

export function DatePicker({ className }: DatePickerProps) {
  const [date, setDate] = React.useState<Date>()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          // CRITICAL: The 'className' comes LAST in the cn() function 
          // so it successfully overrides the defaults.
          className={cn(
            "w-full justify-between text-left font-bold transition-all duration-300",
            "bg-white border-[#133020]/10 text-[#133020]", // Theme defaults
            "rounded-2xl py-7 px-6", // Spacing defaults
            className // Your custom classes from the tag go here
          )}
        >
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4 opacity-40" />
            {date ? format(date, "PPP") : <span className="opacity-50">Pick a date</span>}
          </div>
          <ChevronDownIcon className="h-4 w-4 opacity-30" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 border-none shadow-xl" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}