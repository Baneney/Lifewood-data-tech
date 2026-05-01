import React from "react";
import { SelectLayout } from "./select-layout";
import { Input } from "@/components/ui/input";

// We removed 'control' and 'name' and added 'value' and 'onValueChange'
export const FormSelect = React.memo(({ 
    value, 
    onValueChange, 
    label, 
    options, 
    readOnly,
    isLoading = false,
    placeholder,
    emptyMessage = "No options available",
    required = false,
    className
}: { 
    value: string; 
    onValueChange: (value: string) => void; 
    label?: string; 
    options: { id: string; name: string }[]; 
    placeholder?: string;
    readOnly?: boolean;
    isLoading?: boolean;
    emptyMessage?: string;
    required?: boolean;
    className?: string;
}) => {
    // Combine loading and empty states into the options
    const selectOptions = React.useMemo(() => {
        if (isLoading) {
            return [{ id: "__loading__", name: "Loading..." }];
        }
        if (options.length === 0) {
            return [{ id: "__empty__", name: emptyMessage }];
        }
        return options;
    }, [options, isLoading, emptyMessage]);

    // Find display text for ReadOnly mode
    const currentOption = options.find(opt => String(opt.id) === String(value));
    const displayText = currentOption ? currentOption.name : "";

    return (
        <div className="flex flex-col gap-3 group">
            {label && (
                <label className="text-[10px] uppercase tracking-widest font-bold text-[#133020]/50 italic group-focus-within:text-[#133020] transition-colors">
                    {label}
                    {required && <span className="ml-1 text-red-500">*</span>}
                </label>
            )}

            {!readOnly ? (
                <SelectLayout
                    placeholder={placeholder || "Select"}
                    className={className || "w-full"}
                    options={selectOptions}
                    value={String(value ?? '')}
                    onChange={(val) => {
                        // Prevent selection of loading/empty messages
                        if (val !== "__loading__" && val !== "__empty__") {
                            onValueChange(val);
                        }
                    }}
                />
            ) : (
                <Input 
                    value={displayText} 
                    readOnly 
                    className="h-auto py-3 px-6 bg-white border border-[#133020]/10 rounded-md focus:border-[#FFB347] focus:ring-4 focus:ring-[#FFB347]/10 text-[#133020] text-xs font-bold placeholder:text-[#133020]/20 hover:border-[#133020]/30"
                />
            )}
        </div>
    );
});

FormSelect.displayName = "FormSelect";