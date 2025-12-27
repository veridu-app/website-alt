'use client'

import React from 'react'

// Simplified ThemeProvider - no theme switching, just a wrapper for compatibility
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}
