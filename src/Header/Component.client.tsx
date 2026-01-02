'use client'
import Link from 'next/link'
import React, { useState, useEffect, useMemo } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { getTextColorForBackground } from '@/fields/appColor'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [pageBackground, setPageBackground] = useState<string>('bg-off-white')

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const fadeDistance = 400
      const progress = Math.min(scrollPosition / fadeDistance, 1)
      setScrollProgress(progress)
    }

    // Get the current background color from body
    const getBodyBackground = () => {
      const body = document.body
      const bodyClasses = Array.from(body.classList)
      const bgClass = bodyClasses.find((cls) => cls.startsWith('bg-'))
      if (bgClass) {
        setPageBackground(bgClass)
      }
    }

    // Check initial state
    handleScroll()
    getBodyBackground()

    // Watch for body class changes
    const observer = new MutationObserver(() => {
      getBodyBackground()
    })

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class'],
    })

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
    }
  }, [])

  const offWhiteOpacity = scrollProgress

  const backgroundColorValue = useMemo(() => {
    return pageBackground.replace('bg-', '') as
      | 'off-white'
      | 'frozen-green'
      | 'lavender'
      | 'dark-teal'
      | 'cerulean'
      | 'orange'
  }, [pageBackground])

  const originalTextColorClass = useMemo(() => {
    return getTextColorForBackground(backgroundColorValue)
  }, [backgroundColorValue])

  const offWhiteTextColorClass = 'text-dark-teal'

  const textColorClass = useMemo(() => {
    if (offWhiteOpacity === 0) {
      return originalTextColorClass
    }
    const threshold = 0.3
    return offWhiteOpacity > threshold ? offWhiteTextColorClass : originalTextColorClass
  }, [originalTextColorClass, offWhiteOpacity])

  const logoColor = useMemo(() => {
    const colorName = textColorClass.replace('text-', '')
    if (colorName === 'dark-teal') return 'dark-teal'
    if (colorName === 'lavender') return 'lavender'
    if (colorName === 'accent-foreground') return 'currentColor' // Fallback for accent-foreground
    if (colorName === 'foreground') return 'currentColor' // Fallback for foreground

    return 'dark-teal'
  }, [textColorClass])

  const isTransitionComplete = useMemo(() => {
    return scrollProgress >= 1
  }, [scrollProgress])

  return (
    <header
      className={`sticky top-0 z-50 ${pageBackground} transition-all duration-150 ${
        isTransitionComplete ? 'shadow-md' : ''
      }`}
    >
      {/* Off-white overlay that fades in on scroll */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-150"
        style={{
          backgroundColor: `hsl(var(--popover) / ${offWhiteOpacity * 0.9})`,
          backdropFilter: 'blur(8px)',
        }}
      />
      <div className="container pt-4 pb-4 relative z-10">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center w-[8rem]">
            <Logo variant="horizontal" color={logoColor} />
          </Link>
          <HeaderNav data={data} textColor={textColorClass} />
        </div>
      </div>
    </header>
  )
}
