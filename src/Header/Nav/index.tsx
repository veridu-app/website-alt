'use client'

import React, { useState, useEffect } from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Menu, X } from 'lucide-react'
import { cn } from '@/utilities/ui'

interface HeaderNavProps {
  data: HeaderType
  textColor?: string
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ data, textColor = 'text-dark-teal' }) => {
  const navItems = data?.navItems || []
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (isMenuOpen && !target.closest('nav')) {
        setIsMenuOpen(false)
      }
    }

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  // Close menu when clicking on a link
  const handleLinkClick = () => {
    setIsMenuOpen(false)
  }

  return (
    <nav className="relative">
      {/* Desktop Navigation */}
      <div className="hidden md:flex gap-3 items-center">
        {navItems.map(({ link }, i) => {
          return <CMSLink key={i} {...link} appearance="link" className={cn(textColor)} />
        })}
        {/* TODO: Add a link to the starten page */}
        <CMSLink label="starten" url="https://veridu.app" appearance="accent" className="ml-4" />
      </div>

      {/* Mobile Hamburger Button */}
      <button
        type="button"
        className={cn('md:hidden p-2 -mr-2 transition-colors', textColor, 'hover:text-cerulean')}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label={isMenuOpen ? 'Menü schließen' : 'Menü öffnen'}
        aria-expanded={isMenuOpen}
      >
        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed right-0 top-[72px] bottom-0 z-40 w-full max-w-sm shadow-lg bg-off-white transform transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ height: 'calc(100vh - 72px)' }}
      >
        <div className="px-4 pt-6 pb-8 h-full overflow-y-auto">
          <nav className="flex flex-col gap-4">
            {navItems.map(({ link }, i) => {
              return (
                <div key={i} onClick={handleLinkClick}>
                  <CMSLink {...link} appearance="link" className={cn('text-lg', textColor)} />
                </div>
              )
            })}
          </nav>
        </div>
      </div>
    </nav>
  )
}
