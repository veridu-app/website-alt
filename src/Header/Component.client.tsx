'use client'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { backgroundClassToColorMap } from '@/utilities/backgroundColor'
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
      if (bgClass && backgroundClassToColorMap[bgClass]) {
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

  // Calculate opacity based on scroll progress
  const offWhiteOpacity = scrollProgress

  return (
    <header className={`sticky top-0 z-50 ${pageBackground} transition-all duration-150`}>
      {/* Off-white overlay that fades in on scroll */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-150"
        style={{
          backgroundColor: `hsl(var(--background) / ${offWhiteOpacity * 0.9})`,
          backdropFilter: 'blur(8px)',
        }}
      />
      <div className="container pt-4 pb-4 relative z-10">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center w-[8rem]">
            <Logo variant="horizontal" color="dark-teal" />
          </Link>
          <HeaderNav data={data} />
        </div>
      </div>
    </header>
  )
}
