'use client'
import { cn } from '@/utilities/ui'
import React, { useEffect, useRef, useState } from 'react'
import RichText from '@/components/RichText'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'
import { backgroundColorClassMap } from '@/fields/appColor'

import { CMSLink } from '../../components/Link'

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { columns } = props
  const [visibleColumns, setVisibleColumns] = useState<Set<number>>(new Set())
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-column-index') || '0', 10)
            setVisibleColumns((prev) => new Set([...prev, index]))
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      },
    )

    const columnElements = containerRef.current.querySelectorAll('[data-column-index]')
    columnElements.forEach((element) => observer.observe(element))

    return () => {
      columnElements.forEach((element) => observer.unobserve(element))
      observer.disconnect()
    }
  }, [columns])

  const colsSpanClasses = {
    full: '12',
    half: '6',
    oneThird: '4',
    twoThirds: '8',
  }

  return (
    <div className="container" ref={containerRef}>
      <div className="grid grid-cols-4 lg:grid-cols-12 gap-y-8 gap-x-16">
        {columns &&
          columns.length > 0 &&
          columns.map((col, index) => {
            const {
              enableLink,
              link,
              richText,
              size,
              alignment = 'left',
              enableBox,
              boxColor,
            } = col

            const colSpan = colsSpanClasses[size!]
            const boxBgClass = enableBox && boxColor ? backgroundColorClassMap[boxColor] : undefined
            const isVisible = visibleColumns.has(index)

            const content = (
              <>
                {richText && <RichText data={richText} enableGutter={false} />}
                {enableLink && <CMSLink {...link} />}
              </>
            )

            // Calculate column start position based on alignment and size
            const getColStart = () => {
              if (!size || size === 'full' || !alignment || alignment === 'left') return undefined

              // Map of size and alignment to col-start classes
              const colStartMap: Record<string, Record<string, string | undefined>> = {
                oneThird: {
                  left: undefined,
                  center: 'lg:col-start-5', // (12-4)/2 + 1 = 5
                  right: 'lg:col-start-9', // 12-4+1 = 9
                },
                half: {
                  left: undefined,
                  center: 'lg:col-start-4', // (12-6)/2 + 1 = 4
                  right: 'lg:col-start-7', // 12-6+1 = 7
                },
                twoThirds: {
                  left: undefined,
                  center: 'lg:col-start-3', // (12-8)/2 + 1 = 3
                  right: 'lg:col-start-5', // 12-8+1 = 5
                },
              }

              return colStartMap[size]?.[alignment] || undefined
            }

            const colStart = getColStart()

            return (
              <div
                data-column-index={index}
                className={cn(
                  `col-span-4 lg:col-span-${colSpan}`,
                  {
                    'md:col-span-2': size !== 'full',
                  },
                  colStart,
                  {
                    'h-full': enableBox,
                  },
                  // Animation classes
                  'transition-all duration-700 ease-out',
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
                )}
                key={index}
                style={{
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                {enableBox && boxBgClass ? (
                  <div
                    className={cn(
                      boxBgClass,
                      'p-4 rounded-xl h-full',
                      'transition-all duration-300 ease-out',
                      'hover:scale-[1.02]',
                    )}
                  >
                    {content}
                  </div>
                ) : (
                  content
                )}
              </div>
            )
          })}
      </div>
    </div>
  )
}
