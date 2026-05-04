"use client"

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
  className?: string;
  date?: Date | null;
  onDateChange?: (date: Date | undefined) => void;
}

export function DatePicker({ className, date, onDateChange }: DatePickerProps) {
  // We move the CSS string here to keep the JSX clean
  const calendarStyles = `
    .rdp {
      --rdp-cell-size: 42px; 
      --rdp-accent-color: #FFB347;
      --rdp-background-color: #133020;
      margin: 0;
    }
    
    .rdp-day_selected, 
    .rdp-day_active { 
      background-color: var(--rdp-accent-color) !important;
      color: white !important;
      border-radius: 14px !important;
      font-weight: bold;
    }

    .rdp-button:hover:not([disabled]):not(.rdp-day_selected) {
      background-color: rgba(255, 179, 71, 0.1) !important;
      color: #FFB347 !important;
      border-radius: 14px !important;
    }

    .rdp-caption_label {
      font-weight: 700 !important;
      color: #133020 !important;
      font-size: 0.9rem;
      text-transform: uppercase;
      letter-spacing: 0.025em;
    }

    .rdp-dropdown_month, .rdp-dropdown_year {
      font-weight: 600;
      color: #133020;
    }
  `;

  return (
    <>
      {/* Standard style tag with dangerouslySetInnerHTML to bypass TS errors */}
      <style dangerouslySetInnerHTML={{ __html: calendarStyles }} />

      <Popover>
        <PopoverTrigger asChild>
          <Button
            className={cn(
              "w-full justify-between text-left font-bold transition-all duration-300",
              className
            )}
          >
            <div className="flex items-center gap-3">
              <CalendarIcon className={cn(
                "h-5 w-5 transition-colors",
                date ? "text-[#FFB347]" : "opacity-30"
              )} />
              {date ? (
                <span className="font-bold">{format(date, "PPP")}</span>
              ) : (
                <span className="opacity-40 font-medium">Pick a date</span>
              )}
            </div>
            <ChevronDownIcon className="h-4 w-4 opacity-30" />
          </Button>
        </PopoverTrigger>
        
        <PopoverContent 
          className="w-auto p-4 border border-[#133020]/5 shadow-2xl rounded-3xl bg-white" 
          align="start"
          sideOffset={8}
        >
          <Calendar
            mode="single"
            captionLayout="dropdown"
            selected={date || undefined}
            onSelect={onDateChange}
            initialFocus
            className="rounded-2xl"
          />
        </PopoverContent>
      </Popover>
    </>
  )
}