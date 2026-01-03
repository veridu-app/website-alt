'use client'
import type { StepsBlock as StepsBlockProps } from '@/payload-types'

import { cn } from '@/utilities/ui'
import React, { useEffect, useRef, useState } from 'react'
import RichText from '@/components/RichText'
import { hasRichTextContent } from '@/utilities/hasRichTextContent'

type Props = {
  className?: string
} & StepsBlockProps

export const StepsBlock: React.FC<Props> = ({ className, title, steps }) => {
  const [visibleSteps, setVisibleSteps] = useState<Set<number>>(new Set())
  const [isTitleVisible, setIsTitleVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (titleRef.current) {
      const titleObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsTitleVisible(true)
          }
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' },
      )

      titleObserver.observe(titleRef.current)

      return () => {
        titleObserver.disconnect()
      }
    }
  }, [title])

  useEffect(() => {
    if (!containerRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-step-index') || '0', 10)
            setVisibleSteps((prev) => new Set([...prev, index]))
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      },
    )

    const stepElements = containerRef.current.querySelectorAll('[data-step-index]')
    stepElements.forEach((step) => observer.observe(step))

    return () => {
      stepElements.forEach((step) => observer.unobserve(step))
      observer.disconnect()
    }
  }, [steps])

  if (!steps || steps.length === 0) {
    return null
  }

  return (
    <div ref={containerRef} className={cn('container overflow-visible', className)}>
      {/* Title Section */}
      {hasRichTextContent(title) && (
        <div
          ref={titleRef}
          className={cn(
            'mb-12 text-center px-8 lg:px-16 max-w-[60rem] justify-center mx-auto',
            'transition-all duration-700 ease-out',
            isTitleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
          )}
        >
          <RichText data={title} enableGutter={false} enableProse={true} className="max-w-none" />
        </div>
      )}

      {/* Steps List */}
      <div className="flex flex-col gap-10 pb-12">
        {steps.map((step, index) => { 
          const stepNumber = index + 1
          const isVisible = visibleSteps.has(index)

          return (
            <div
              key={step.id || index}
              ref={(el) => {
                stepRefs.current[index] = el
              }}
              data-step-index={index}
              className="flex items-start gap-4 sm:gap-6"
            >
              {/* Step Number Circle - Left */}
              <div
                className={cn(
                  'flex-shrink-0 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-accent text-accent-foreground font-bold text-lg sm:text-xl',
                  'transition-all duration-500 ease-out',
                  isVisible ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-0 rotate-180',
                )}
                style={{
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                {stepNumber}
              </div>

              {/* Content Card - Right */}
              <div
                className={cn(
                  'flex-1 rounded-lg overflow-hidden flex flex-col gap-4',
                  'transition-all duration-700 ease-out',
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4',
                )}
                style={{
                  transitionDelay: `${index * 100 + 150}ms`,
                }}
              >
                {/* Content Section */}
                {step.content && (
                  <div className="flex-1">
                    <RichText
                      data={step.content}
                      enableGutter={false}
                      enableProse={true}
                      className="max-w-none"
                    />
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
