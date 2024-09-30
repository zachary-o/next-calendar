"use client"

import { ThemeProvider } from "@/components/theme-provider"
import { SessionProvider } from "next-auth/react"
import { Toaster } from "../ui/toaster"
import { AppProgressBar as ProgressBar } from "next-nprogress-bar"

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <ProgressBar
        height="104px"
        color="#fffd00"
        options={{ showSpinner: true }}
        shallowRouting
      />
      <SessionProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </SessionProvider>
      <Toaster />
    </>
  )
}
