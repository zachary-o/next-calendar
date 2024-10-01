"use client"

import { ThemeProvider } from "@/components/theme-provider"
import { SessionProvider } from "next-auth/react"
import { AppProgressBar as ProgressBar } from "next-nprogress-bar"
import React from 'react'
import { Toaster } from "../ui/toaster"

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <ProgressBar
        height="4px"
        color="#006eff"
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
