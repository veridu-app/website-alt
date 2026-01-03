'use client'

import type { AccordionInfoBlock as AccordionInfoBlockProps } from '@/payload-types'

import { cn } from '@/utilities/ui'
import React, { useEffect, useRef, useState } from 'react'
import RichText from '@/components/RichText'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { CMSLink } from '@/components/Link'
import { textColorClassMap } from '@/fields/appColor'
import { hasRichTextContent } from '@/utilities/hasRichTextContent'

type Props = {
  className?: string
} & AccordionInfoBlockProps

export const AccordionInfoBlock: React.FC<Props> = ({
  className,
  title,
  accordionItems,
  showViewAllLink,
  link: viewAllLink,
  foregroundColor,
}) => {
  const [isTitleVisible, setIsTitleVisible] = useState(false)
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set())
  const titleRef = useRef<HTMLDivElement>(null)
  const accordionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Title observer
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
    // Accordion items observer
    if (accordionRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const index = parseInt(entry.target.getAttribute('data-item-index') || '0', 10)
              setVisibleItems((prev) => new Set([...prev, index]))
            }
          })
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px 300px 0px',
        },
      )

      const items = accordionRef.current.querySelectorAll('[data-item-index]')
      items.forEach((item) => observer.observe(item))

      return () => {
        items.forEach((item) => observer.unobserve(item))
        observer.disconnect()
      }
    }
  }, [accordionItems])

  if (!accordionItems || accordionItems.length === 0) {
    return null
  }

  const textColorClass = foregroundColor ? textColorClassMap[foregroundColor] : 'text-foreground'

  return (
    <div className={cn('container', textColorClass, className)}>
      {/* Title Section */}
      {hasRichTextContent(title) && (
        <div
          ref={titleRef}
          className={cn(
            'mb-8 text-center px-8 lg:px-16 max-w-[60rem] justify-center mx-auto',
            'transition-all duration-700 ease-out',
            isTitleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
          )}
        >
          <RichText data={title} enableGutter={false} enableProse={true} className="max-w-none" />
        </div>
      )}

      {/* Accordion List */}
      <div ref={accordionRef} className="max-w-4xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          {accordionItems.map((item, index) => {
            const { title: itemTitle, expandedContent, id, showButton, link: itemLink } = item
            const isVisible = visibleItems.has(index)

            return (
              <AccordionItem
                key={id || index}
                value={`item-${index}`}
                data-item-index={index}
                className={cn(
                  'transition-all duration-700 ease-out',
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
                )}
                style={{
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                <AccordionTrigger className="text-left">{itemTitle}</AccordionTrigger>
                <AccordionContent>
                  {expandedContent && (
                    <RichText
                      data={expandedContent}
                      enableGutter={false}
                      enableProse={true}
                      className="max-w-none"
                    />
                  )}
                  {showButton && itemLink && (
                    <div className="mt-4">
                      <CMSLink {...itemLink} />
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>
      </div>

      {/* View All Link */}
      {showViewAllLink && viewAllLink && (
        <div className="max-w-4xl mx-auto mt-8 text-center">
          <CMSLink {...viewAllLink} />
        </div>
      )}
    </div>
  )
}
