'use client'

import { useEffect } from 'react'

import { backgroundColorClassMap } from '@/fields/appColor'

type BackgroundColorProps = {
  color?: string | null
}

export default function BackgroundColor({ color }: BackgroundColorProps) {
  useEffect(() => {
    const body = document.body

    // Remove all background color classes
    Object.values(backgroundColorClassMap).forEach((className) => {
      body.classList.remove(className)
    })

    // Add the new background color class or default
    if (color && backgroundColorClassMap[color]) {
      body.classList.add(backgroundColorClassMap[color])
    } else {
      // Default to lavender if no color is specified
      body.classList.add('bg-lavender')
    }

    // Cleanup function to restore default on unmount
    return () => {
      Object.values(backgroundColorClassMap).forEach((className) => {
        body.classList.remove(className)
      })
      body.classList.add('bg-lavender')
    }
  }, [color])

  return null
}
