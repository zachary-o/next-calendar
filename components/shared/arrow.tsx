"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface Props {
  direction: string;
  disabled?: boolean;
  onClick: () => void;
  className?: string;
}

export const Arrow: React.FC<Props> = ({
  direction,
  disabled,
  onClick,
  className,
}) => {
  switch (direction) {
    case "left":
      return (
        <Button
          className={
            (cn("hover:bg-transparent", {
              "opacity-50 pointer-events-none": disabled,
            }),
            className)
          }
          variant="ghost"
          onClick={onClick}
        >
          <ChevronLeft />
        </Button>
      );
    case "right":
      return (
        <Button
          className={cn(
            "hover:bg-transparent",
            {
              "opacity-50 pointer-events-none": disabled,
            },
            className
          )}
          variant="ghost"
          onClick={onClick}
        >
          <ChevronRight />
        </Button>
      );
  }
};
