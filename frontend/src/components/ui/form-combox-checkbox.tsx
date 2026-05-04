// import React, { useRef, useState, useEffect } from "react"
// import { Input } from "@/components/ui/input"
// import { Checkbox } from "@/components/ui/checkbox"
// import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { Button } from "@/components/ui/button"
// import { Check, ChevronsUpDown, X } from "lucide-react"
// import { cn } from "@/lib/utils"
// import { Badge } from "@/components/ui/badge"

// // We removed 'control' and 'name' and added 'value' and 'onValueChange'
// export const FormComboCheckbox = React.memo(
//   ({
//     value = [], // The array of selected IDs from your state
//     onValueChange, // Your handleInputChange function
//     options,
//     readOnly,
//     placeholder = "Select options",
//     showBadges = false,
//     maxDisplayValues = 2,
//     exclusiveOptionId,
//     className,
//   }: {
//     value: string[]
//     onValueChange: (values: string[]) => void
//     options: any[]
//     readOnly?: boolean
//     placeholder?: string
//     showBadges?: boolean
//     maxDisplayValues?: number
//     exclusiveOptionId?: string
//     className?: string
//   }) => {
//     const triggerRef = useRef<HTMLButtonElement>(null)
//     const [triggerWidth, setTriggerWidth] = useState<number>(0)

//     useEffect(() => {
//       const updateWidth = () => {
//         if (triggerRef.current) {
//           setTriggerWidth(triggerRef.current.offsetWidth)
//         }
//       }
//       updateWidth()
//       window.addEventListener("resize", updateWidth)
//       return () => window.removeEventListener("resize", updateWidth)
//     }, [])

//     const selectedValues = Array.isArray(value) ? value : []
//     const enabledOptions = options.filter((option) => !option.disabled)
//     const enabledOptionIds = enabledOptions.map((opt) => opt.id.toLowerCase())
    
//     const selectableOptionIds = exclusiveOptionId
//       ? enabledOptionIds.filter((id) => id !== exclusiveOptionId.toLowerCase())
//       : enabledOptionIds
    
//     const allSelected = selectableOptionIds.length > 0 && selectableOptionIds.every((id) => selectedValues.includes(id))

//     const toggleOption = (optionId: string) => {
//       const option = options.find((o) => o.id === optionId)
//       if (option?.disabled) return

//       const isExclusiveOption = exclusiveOptionId && optionId.toLowerCase() === exclusiveOptionId.toLowerCase()
//       const hasExclusiveOption = exclusiveOptionId && selectedValues.includes(exclusiveOptionId.toLowerCase())

//       if (isExclusiveOption) {
//         onValueChange(selectedValues.includes(optionId.toLowerCase()) ? [] : [optionId.toLowerCase()])
//         return
//       }

//       if (hasExclusiveOption) {
//         onValueChange([optionId.toLowerCase()])
//         return
//       }

//       const newValues = selectedValues.includes(optionId.toLowerCase())
//         ? selectedValues.filter((val) => val !== optionId.toLowerCase())
//         : [...selectedValues, optionId.toLowerCase()]

//       onValueChange(newValues)
//     }

//     const toggleAll = () => {
//       if (allSelected) {
//         onValueChange([])
//       } else {
//         const optionsToSelect = exclusiveOptionId
//           ? enabledOptionIds.filter((id) => id !== exclusiveOptionId.toLowerCase())
//           : enabledOptionIds
//         onValueChange(optionsToSelect)
//       }
//     }

//     const selectedOptions = options.filter((option) => selectedValues.includes(option.id.toLowerCase()))

//     const getDisplayText = () => {
//       if (selectedOptions.length === 0) return ""
//       if (allSelected) return "All"
//       if (selectedOptions.length <= maxDisplayValues) {
//         return selectedOptions.map((opt) => opt.name).join(", ")
//       }
//       return `${selectedOptions.slice(0, maxDisplayValues).map((opt) => opt.name).join(", ")} +${selectedOptions.length - maxDisplayValues} more`
//     }

//     if (readOnly) return <Input value={getDisplayText()} readOnly className={className} />

//     return (
//       <Popover>
//         <PopoverTrigger asChild>
//           <Button
//             ref={triggerRef}
//             variant="outline"
//             role="combobox"
//             className={cn("w-full justify-between h-auto min-h-10", !selectedValues.length && "text-muted-foreground", className)}
//           >
//             <div className="flex flex-wrap items-center gap-1 overflow-hidden py-1">
//               {showBadges && selectedOptions.length > 0 ? (
//                 <div className="flex flex-wrap gap-1 max-w-[90%]">
//                   {allSelected ? (
//                     <Badge variant="secondary" className="text-xs">All</Badge>
//                   ) : (
//                     <>
//                       {selectedOptions.slice(0, maxDisplayValues).map((option) => (
//                         <Badge key={option.id} variant="secondary" className="text-xs">{option.name}</Badge>
//                       ))}
//                       {selectedOptions.length > maxDisplayValues && (
//                         <Badge variant="secondary" className="text-xs">+{selectedOptions.length - maxDisplayValues} more</Badge>
//                       )}
//                     </>
//                   )}
//                 </div>
//               ) : (
//                 <span className="truncate">{getDisplayText() || placeholder}</span>
//               )}
//             </div>
//             <div className="flex items-center">
//               {selectedValues.length > 0 && (
//                 <X
//                   className="mr-2 h-4 w-4 shrink-0 opacity-50 hover:opacity-100"
//                   onClick={(e) => { e.stopPropagation(); onValueChange([]); }}
//                 />
//               )}
//               <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
//             </div>
//           </Button>
//         </PopoverTrigger>
//         <PopoverContent
//           className="p-0"
//           style={{ width: `${Math.max(triggerWidth, 200)}px` }}
//           align="start"
//           sideOffset={5}
//         >
//           <Command>
//             <CommandInput placeholder="Search options..." />
//             <CommandList className="max-h-64 overflow-auto">
//               <CommandEmpty>No options found.</CommandEmpty>
//               <CommandGroup>
//                 <CommandItem onSelect={toggleAll} className="flex items-center gap-2 font-semibold border-b">
//                   <Checkbox checked={allSelected} onCheckedChange={toggleAll} />
//                   <span className="flex-1">All</span>
//                   {allSelected && <Check className="ml-auto h-4 w-4" />}
//                 </CommandItem>
//                 {options.map((option) => {
//                   const isExclusive = exclusiveOptionId && option.id.toLowerCase() === exclusiveOptionId.toLowerCase()
//                   const hasExclusive = exclusiveOptionId && selectedValues.includes(exclusiveOptionId.toLowerCase())
//                   const isDisabled = option.disabled || (hasExclusive && !isExclusive)
//                   const isChecked = selectedValues.includes(option.id.toLowerCase())

//                   return (
//                     <CommandItem
//                       key={option.id}
//                       onSelect={() => toggleOption(option.id)}
//                       className={cn("flex items-center gap-2", isDisabled && "opacity-50 pointer-events-none")}
//                     >
//                       <Checkbox checked={isChecked} disabled={isDisabled} />
//                       <span className="flex-1">{option.name}</span>
//                       {isChecked && !isDisabled && <Check className="ml-auto h-4 w-4" />}
//                     </CommandItem>
//                   )
//                 })}
//               </CommandGroup>
//             </CommandList>
//           </Command>
//         </PopoverContent>
//       </Popover>
//     )
//   }
// )

// FormComboCheckbox.displayName = "FormComboCheckbox"





import React, { useRef, useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Check, ChevronsUpDown, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

interface Option {
  id: string
  name: string
  disabled?: boolean
}

interface FormComboCheckboxProps {
  value: string[]
  onValueChange: (values: string[]) => void
  options: Option[]
  readOnly?: boolean
  placeholder?: string
  showBadges?: boolean
  maxDisplayValues?: number
  exclusiveOptionId?: string
  className?: string
}

export const FormComboCheckbox = React.memo(
  ({
    value = [],
    onValueChange,
    options,
    readOnly,
    placeholder = "Select options",
    showBadges = false,
    maxDisplayValues = 2,
    exclusiveOptionId,
    className,
  }: FormComboCheckboxProps) => {
    const triggerRef = useRef<HTMLButtonElement>(null)
    const [triggerWidth, setTriggerWidth] = useState<number>(0)

    useEffect(() => {
      const updateWidth = () => {
        if (triggerRef.current) {
          setTriggerWidth(triggerRef.current.offsetWidth)
        }
      }
      updateWidth()
      window.addEventListener("resize", updateWidth)
      return () => window.removeEventListener("resize", updateWidth)
    }, [])

    const selectedValues = Array.isArray(value) ? value : []
    
    // IDs are kept in their original case to match database records (e.g., POS001)
    const enabledOptionIds = options
      .filter((option) => !option.disabled)
      .map((opt) => opt.id)
    
    const selectableOptionIds = exclusiveOptionId
      ? enabledOptionIds.filter((id) => id !== exclusiveOptionId)
      : enabledOptionIds
    
    const allSelected = selectableOptionIds.length > 0 && 
                        selectableOptionIds.every((id) => selectedValues.includes(id))

    const toggleOption = (optionId: string) => {
      const option = options.find((o) => o.id === optionId)
      if (option?.disabled) return

      // Handle exclusive logic (e.g., "None of the above" or "N/A")
      const isExclusiveOption = exclusiveOptionId && optionId === exclusiveOptionId
      const hasExclusiveOption = exclusiveOptionId && selectedValues.includes(exclusiveOptionId)

      if (isExclusiveOption) {
        onValueChange(selectedValues.includes(optionId) ? [] : [optionId])
        return
      }

      if (hasExclusiveOption) {
        onValueChange([optionId])
        return
      }

      const isChecked = selectedValues.includes(optionId)
      const newValues = isChecked
          ? selectedValues.filter((val) => val !== optionId)
          : [...selectedValues, optionId]

      onValueChange(newValues)
    }

    const toggleAll = () => {
      if (allSelected) {
        onValueChange([])
      } else {
        onValueChange(selectableOptionIds)
      }
    }

    const selectedOptions = options.filter((option) => selectedValues.includes(option.id))

    const getDisplayText = () => {
      if (selectedOptions.length === 0) return ""
      if (allSelected) return "All"
      if (selectedOptions.length <= maxDisplayValues) {
        return selectedOptions.map((opt) => opt.name).join(", ")
      }
      return `${selectedOptions.slice(0, maxDisplayValues).map((opt) => opt.name).join(", ")} +${selectedOptions.length - maxDisplayValues} more`
    }

    if (readOnly) return <Input value={getDisplayText()} readOnly className={className} />

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            ref={triggerRef}
            role="combobox"
            className={cn("w-full justify-between h-auto min-h-10", !selectedValues.length && "text-muted-foreground", className)}
          >
            <div className="flex flex-wrap items-center gap-1 overflow-hidden py-1">
              {showBadges && selectedOptions.length > 0 ? (
                <div className="flex flex-wrap gap-1 max-w-[90%]">
                  {allSelected ? (
                    <Badge variant="secondary" className="text-xs">All</Badge>
                  ) : (
                    <>
                      {selectedOptions.slice(0, maxDisplayValues).map((option) => (
                        <Badge key={option.id} variant="secondary" className="text-xs">{option.name}</Badge>
                      ))}
                      {selectedOptions.length > maxDisplayValues && (
                        <Badge variant="secondary" className="text-xs">+{selectedOptions.length - maxDisplayValues} more</Badge>
                      )}
                    </>
                  )}
                </div>
              ) : (
                <span className="truncate">{getDisplayText() || placeholder}</span>
              )}
            </div>
            <div className="flex items-center">
              {selectedValues.length > 0 && (
                <X
                  className="mr-2 h-4 w-4 shrink-0 opacity-50 hover:opacity-100"
                  onClick={(e) => { e.stopPropagation(); onValueChange([]); }}
                />
              )}
              <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="p-0"
          style={{ width: `${Math.max(triggerWidth, 200)}px` }}
          align="start"
          sideOffset={5}
        >
          <Command>
            <CommandInput placeholder="Search options..." />
            <CommandList className="max-h-64 overflow-auto">
              <CommandEmpty>No options found.</CommandEmpty>
              <CommandGroup>
                <CommandItem onSelect={toggleAll} className="flex items-center gap-2 font-semibold border-b">
                  <Checkbox checked={allSelected} onCheckedChange={toggleAll} />
                  <span className="flex-1">All</span>
                  {allSelected && <Check className="ml-auto h-4 w-4" />}
                </CommandItem>
               {options.map((option) => {
                  const isExclusive = exclusiveOptionId && option.id === exclusiveOptionId;
                  const hasExclusive = exclusiveOptionId && selectedValues.includes(exclusiveOptionId);
                  
                  // Force these to be strict booleans using !!
                  const isDisabled = !!(option.disabled || (hasExclusive && !isExclusive));
                  const isChecked = !!selectedValues.includes(option.id);

                  return (
                    <CommandItem
                      key={option.id}
                      onSelect={() => toggleOption(option.id)}
                      className={cn("flex items-center gap-2", isDisabled && "opacity-50 pointer-events-none")}
                    >
                      {/* Now isDisabled is guaranteed to be a boolean */}
                      <Checkbox checked={isChecked} disabled={isDisabled} />
                      <span className="flex-1">{option.name}</span>
                      {isChecked && !isDisabled && <Check className="ml-auto h-4 w-4" />}
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    )
  }
)

FormComboCheckbox.displayName = "FormComboCheckbox"