import { cn } from "@/lib/utils"
import React from "react"

interface Props {
  className?: string
}

export const Container: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  children,
}) => {
  return (
    <main className={cn("min-h-screen mx-auto max-w-[1280px] px-3", className)}>
      {children}
    </main>
  )
}
