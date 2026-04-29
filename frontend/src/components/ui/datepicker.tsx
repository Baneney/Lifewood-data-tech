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

// 1. Updated Interface to accept external state
interface DatePickerProps {
  className?: string;
  date?: Date | null; // The current date from your useForm hook
  onDateChange?: (date: Date | undefined) => void; // The function to update the hook
}

export function DatePicker({ className, date, onDateChange }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-between text-left font-bold transition-all duration-300",
            "bg-white border-[#133020]/10 text-[#133020]",
            "rounded-2xl py-7 px-6",
            className
          )}
        >
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4 opacity-40" />
            {/* 2. We display the date passed in from props */}
            {date ? (
              format(date, "PPP")
            ) : (
              <span className="opacity-50">Pick a date</span>
            )}
          </div>
          <ChevronDownIcon className="h-4 w-4 opacity-30" />
        </Button>
      </PopoverTrigger>
      
      <PopoverContent className="w-auto p-0 border-none shadow-xl" align="start">
        <Calendar
          mode="single"
          selected={date || undefined} // 3. Binds the calendar UI to the external state
          onSelect={onDateChange}      // 4. Calls the external handleInputChange function
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}