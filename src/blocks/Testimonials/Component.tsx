'use client'

import type { TestimonialsBlock as TestimonialsBlockProps } from '@/payload-types'

import { cn } from '@/utilities/ui'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

type Props = {
  className?: string
} & TestimonialsBlockProps

export const TestimonialsBlock: React.FC<Props> = ({ className, title, testimonials }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [maxScroll, setMaxScroll] = useState(0)

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const updateScrollState = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container
      const maxScrollValue = scrollWidth - clientWidth + 16

      setScrollPosition(scrollLeft)
      setMaxScroll(maxScrollValue)
    }

    // Initial calculation
    updateScrollState()

    // Update on scroll
    container.addEventListener('scroll', updateScrollState)

    // Update on resize (in case window size changes)
    const resizeObserver = new ResizeObserver(updateScrollState)
    resizeObserver.observe(container)

    return () => {
      container.removeEventListener('scroll', updateScrollState)
      resizeObserver.disconnect()
    }
  }, [testimonials])

  if (!testimonials || testimonials.length === 0) {
    return null
  }

  const scrollLeft = () => {
    const container = scrollContainerRef.current
    if (!container) return

    const cardWidth = window.innerWidth >= 1024 ? 500 : 400
    const gap = window.innerWidth >= 1024 ? 32 : 24
    const scrollAmount = cardWidth + gap

    container.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
  }

  const scrollRight = () => {
    const container = scrollContainerRef.current
    if (!container) return

    const cardWidth = window.innerWidth >= 1024 ? 500 : 400
    const gap = window.innerWidth >= 1024 ? 32 : 24
    const scrollAmount = cardWidth + gap

    container.scrollBy({ left: scrollAmount, behavior: 'smooth' })
  }

  // Only show buttons if content actually overflows
  const hasOverflow = maxScroll > 1
  const canScrollLeft = hasOverflow && scrollPosition > 1
  const canScrollRight = hasOverflow && scrollPosition < maxScroll - 1

  return (
    <div className={cn(className)}>
      {/* Title Section */}
      {title && (
        <div className="mb-4 pt-16 text-center px-8 lg:px-16 max-w-[60rem] justify-center mx-auto">
          <RichText data={title} enableGutter={false} enableProse={true} className="max-w-none" />
        </div>
      )}

      {/* Carousel Container with Gradients */}
      <div className="relative">
        {/* Left Arrow Button */}
        {testimonials.length > 1 && canScrollLeft && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 z-20 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-background"
            onClick={scrollLeft}
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
        )}

        {/* Right Arrow Button */}
        {testimonials.length > 1 && canScrollRight && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 z-20 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-background"
            onClick={scrollRight}
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        )}

        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          className="overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          role="region"
          aria-label="Testimonials carousel"
          tabIndex={0}
          onKeyDown={(e) => {
            const container = scrollContainerRef.current
            if (!container) return

            const cardWidth = window.innerWidth >= 1024 ? 508 : 408
            const gap = window.innerWidth >= 1024 ? 32 : 24
            const scrollAmount = cardWidth + gap

            if (e.key === 'ArrowLeft') {
              e.preventDefault()
              container.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
            } else if (e.key === 'ArrowRight') {
              e.preventDefault()
              container.scrollBy({ left: scrollAmount, behavior: 'smooth' })
            }
          }}
        >
          <div className="flex gap-6 lg:gap-8 [&>*]:flex-shrink-0 w-fit mx-auto p-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id || index}
                className="rounded-lg overflow-hidden p-8 cut-all-corners bg-card flex flex-col gap-6 w-[400px] lg:w-[500px] flex-shrink-0 snap-start"
              >
                {/* Quote Section */}
                {testimonial.quote && (
                  <blockquote className="text-lg lg:text-xl font-medium italic flex-1">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                )}

                {/* Name, School and Image Section */}
                <div className="flex items-center gap-4">
                  {testimonial.image && typeof testimonial.image === 'object' && (
                    <div className="relative w-24 h-24 flex-shrink-0 rounded-full overflow-hidden">
                      <Media
                        resource={testimonial.image}
                        fill
                        imgClassName="object-cover"
                        size="96px"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    {testimonial.name && (
                      <p className="font-semibold text-base lg:text-lg">{testimonial.name}</p>
                    )}
                    {testimonial.school && (
                      <p className="text-sm lg:text-base text-muted-foreground mt-1">
                        {testimonial.school}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
