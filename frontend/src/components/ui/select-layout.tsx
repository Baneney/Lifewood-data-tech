import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { RotateCcw } from "lucide-react"

interface Option{
  id: string,
  name: string
}

interface SelectProps{
  placeholder: string
  label?: string,
  className?: string,
  options: Option[],
  value: string,
  onChange: (value: string) => void
  withReset?: boolean;
  valueLabel?: string
}
 
export function SelectLayout({ placeholder, label, className, options, value, withReset=true, valueLabel, onChange }: SelectProps) {

  return (
      <Select value={value} onValueChange={onChange}>
          <SelectTrigger             className={cn(
              "w-full py-5 px-3 bg-white ...",
              // Target the placeholder state directly on the trigger
              "data-placeholder:text-[#133020]/20 bg-white border border-[#133020]/10 rounded-md focus:border-[#FFB347] focus:ring-4 focus:ring-[#FFB347]/10 text-[#133020] text-xs font-bold", 
              className
            )}>
            {valueLabel && <p className="text-sm text-gray-600">{valueLabel + ": "} </p>}<SelectValue placeholder={placeholder} />
          </SelectTrigger> 
          <SelectContent>
              <SelectGroup>
                  {withReset && (
                    <SelectLabel className="flex justify-between">
                      <p>{label}</p>
                      <div className="flex items-center gap-1 text-gray-600 cursor-pointer hover:text-black/90 "
                        onClick={() => onChange("")}
                      >
                        <RotateCcw size={14}/>
                        Reset
                      </div>
                    </SelectLabel>
                  )}
                  {options.map((option) => {
                      return <SelectItem key={option?.id} value={option?.id} className="cursor-pointer">{option?.name}</SelectItem>
                  })}
              </SelectGroup>
          </SelectContent>
      </Select>
  )
}