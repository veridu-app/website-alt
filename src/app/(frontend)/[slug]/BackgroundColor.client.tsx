'use client'

import { useEffect } from 'react'

type BackgroundColorProps = {
  color?: string | null
}

const colorClassMap: Record<string, string> = {
  'off-white': 'bg-off-white',
  'frozen-green': 'bg-frozen-green',
  lavender: 'bg-lavender',
  'dark-teal': 'bg-dark-teal',
  cerulean: 'bg-cerulean',
  orange: 'bg-orange',
}

export default function BackgroundColor({ color }: BackgroundColorProps) {
  useEffect(() => {
    const body = document.body

    // Remove all background color classes
    Object.values(colorClassMap).forEach((className) => {
      body.classList.remove(className)
    })

    // Add the new background color class or default
    if (color && colorClassMap[color]) {
      body.classList.add(colorClassMap[color])
    } else {
      // Default to off-white if no color is specified
      body.classList.add('bg-off-white')
    }

    // Cleanup function to restore default on unmount
    return () => {
      Object.values(colorClassMap).forEach((className) => {
        body.classList.remove(className)
      })
      body.classList.add('bg-off-white')
    }
  }, [color])

  return null
}
