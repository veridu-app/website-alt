'use client'
import React, { useEffect, useRef, useState } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { VeriduSymbol } from '@/components/Logo/VeriduSymbol'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const MediumImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  const [isVisible, setIsVisible] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Intersection Observer für Fade-in beim Erscheinen im Viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (heroRef.current) {
      observer.observe(heroRef.current)
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current)
      }
    }
  }, [])

  return (
    <div className="container" ref={heroRef}>
      <div className="flex flex-col lg:flex-row md:gap-12 lg:gap-14 xl:gap-16 px-4 pb-16">
        <div className="lg:w-2/3 mb-8 lg:mb-0 relative lg:flex lg:items-center">
          <div
            className={`absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center transition-opacity duration-1000 ${
              isVisible ? 'opacity-10' : 'opacity-0'
            }`}
            style={{ zIndex: -1 }}
          >
            <VeriduSymbol strokeWidth="1px" />
          </div>

          <div className="relative z-10 text-center">
            {richText && (
              <div
                className={`mb-6 transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: '100ms' }}
              >
                <RichText data={richText} enableGutter={false} />
              </div>
            )}

            {Array.isArray(links) && links.length > 0 && (
              <ul className="flex flex-wrap gap-4 justify-center">
                {links.map(({ link }, i) => {
                  return (
                    <li
                      key={i}
                      className={`transition-all duration-700 ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                      }`}
                      style={{ transitionDelay: `${200 + i * 100}ms` }}
                    >
                      <CMSLink {...link} />
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        </div>

        {media && typeof media === 'object' && (
          <div className="lg:w-1/3 lg:flex-shrink-0">
            <div
              className={`lg:aspect-[1/1.3] transition-all duration-1000 ${
                isVisible
                  ? 'opacity-100 translate-y-0 scale-100'
                  : 'opacity-0 translate-y-8 scale-95'
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              <Media
                className="-mx-4 button-cut-corners h-full"
                imgClassName="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                priority
                resource={media}
              />
            </div>
            {media?.caption && (
              <div
                className={`mt-3 transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: '500ms' }}
              >
                <RichText data={media.caption} enableGutter={false} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
