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
          className="text-[#417256] hover:bg-[#417256]/10 font-medium text-xs group rounded-3xl px-4 py-2"
        >
          {triggerLabel}
          <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </SheetTrigger>

      <SheetContent className="sm:max-w-md w-full flex flex-col border-l-0 shadow-2xl p-6">
        {/* Sticky Header Section */}

        <SheetHeader className="text-left p-0 pb-15">
          <SheetTitle className="text-xl font-bold tracking-tight text-slate-700">
            {title}
          </SheetTitle>
          {description && (
            <SheetDescription className="text-xs text-slate-500">
              {description}
            </SheetDescription>
          )}
        </SheetHeader>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar pb-8">
          <div className="space-y-8">{children}</div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
