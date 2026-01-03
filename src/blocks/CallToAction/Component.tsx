'use client'
import React, { useEffect, useRef, useState } from 'react'

import type { CallToActionBlock as CTABlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { backgroundColorClassMap } from '@/fields/appColor'
import { cn } from '@/utilities/ui'

export const CallToActionBlock: React.FC<CTABlockProps> = ({ links, richText, cardColor }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [visibleLinks, setVisibleLinks] = useState<Set<number>>(new Set())
  const containerRef = useRef<HTMLDivElement>(null)

  const bgClass = cardColor ? backgroundColorClassMap[cardColor] : 'bg-frozen-green'

  useEffect(() => {
    if (!containerRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Trigger link animations with staggered delay
          const linkCount = links?.length || 0
          for (let i = 0; i < linkCount; i++) {
            setTimeout(
              () => {
                setVisibleLinks((prev) => new Set([...prev, i]))
              },
              i * 100 + 200,
            ) // Start after text animation, 100ms between each link
          }
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      },
    )

    observer.observe(containerRef.current)

    return () => {
      observer.disconnect()
    }
  }, [links])

  return (
    <div className="container">
      <div
        ref={containerRef}
        className={cn(
          bgClass,
          'rounded p-4 flex flex-col gap-8 md:flex-row md:justify-between md:items-center',
          'transition-all duration-700 ease-out',
          'hover:scale-[1.01]',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
        )}
      >
        <div
          className={cn(
            'max-w-[48rem] flex items-center',
            'transition-all duration-700 ease-out',
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4',
          )}
          style={{
            transitionDelay: '100ms',
          }}
        >
          {richText && <RichText className="mb-0" data={richText} enableGutter={false} />}
        </div>
        <div className="flex flex-col gap-8">
          {(links || []).map(({ link }, i) => {
            const isLinkVisible = visibleLinks.has(i)
            return (
              <div
                key={i}
                className={cn(
                  'transition-all duration-500 ease-out',
                  isLinkVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4',
                )}
              >
                <CMSLink size="lg" {...link} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
