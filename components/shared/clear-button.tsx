import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import React from "react";

interface Props {
  onClick?: VoidFunction;
  className?: string;
}

export const ClearButton: React.FC<Props> = ({ onClick, className }) => {
  return (
    <button
      className={cn("opacity-30 hover:opacity-100 cursor-pointer", className)}
      onClick={onClick}
    >
      <X className="w-5 h-5" />
    </button>
  );
};
