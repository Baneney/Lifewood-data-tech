import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ChevronRight, Info } from "lucide-react";
import { type ReactNode } from "react";

interface DetailsDrawerProps {
  title: string;
  description?: string;
  triggerLabel?: string | ReactNode;
  children: ReactNode;
}

export function DetailsDrawer({
  title,
  description,
  triggerLabel = "View",
  children,
}: DetailsDrawerProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-[#417256] font-medium text-xs group rounded-sm px-2"
        >
          {triggerLabel}
          <ChevronRight
            size={18}
            className="group-hover:translate-x-1 bg-emerald-600/20 rounded-full ml-1"
          />
        </Button>
      </SheetTrigger>

      <SheetContent className="sm:max-w-md w-full flex flex-col border-l-0 shadow-2xl p-6 rounded-l-2xl">
        {/* Sticky Header Section */}
        <SheetHeader className="text-left p-0 pb-6">
          <SheetTitle className="text-xl font-bold tracking-tight text-[#046241]">
            {title}
          </SheetTitle>
          {description && (
            <SheetDescription className="text-xs text-slate-500">
              {description}
            </SheetDescription>
          )}
        </SheetHeader>

        {/* 
          Scrollable Content with Subtle Emerald Scrollbar 
          - scrollbar-thin: sets width
          - scrollbar-thumb: sets the color
          - scrollbar-track: keeps the background transparent
        */}
        <div
          className="flex-1 overflow-y-auto pr-2 pb-8
          [&::-webkit-scrollbar]:w-1.5
          [&::-webkit-scrollbar-track]:bg-transparent
          [&::-webkit-scrollbar-thumb]:bg-emerald-800/20
          hover:[&::-webkit-scrollbar-thumb]:bg-emerald-800/60
          [&::-webkit-scrollbar-thumb]:rounded-full"
        >
          <div className="space-y-8">{children}</div>
        </div>
      </SheetContent>
    </Sheet>
  );
}