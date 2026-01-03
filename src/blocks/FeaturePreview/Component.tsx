'use client'

import type { FeaturePreviewBlock as FeaturePreviewBlockProps } from '@/payload-types'

import { cn } from '@/utilities/ui'
import React, { useEffect, useRef, useState } from 'react'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import { backgroundColorClassMap } from '@/fields/appColor'
import { hasRichTextContent } from '@/utilities/hasRichTextContent'

type Props = {
  className?: string
} & FeaturePreviewBlockProps

export const FeaturePreviewBlock: React.FC<Props> = ({ className, title, featurePreviews }) => {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set())
  const [isTitleVisible, setIsTitleVisible] = useState(false)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const titleRef = useRef<HTMLDivElement>(null)

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
    const observers: IntersectionObserver[] = []

    itemRefs.current.forEach((ref, index) => {
      if (!ref) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleItems((prev) => new Set(prev).add(index))
          }
        },
        { threshold: 0.2, rootMargin: '0px 0px -50px 0px' },
      )

      observer.observe(ref)
      observers.push(observer)
    })

    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [featurePreviews])

  if (!featurePreviews || featurePreviews.length === 0) {
    return null
  }

  return (
    <div className={cn('container', className)}>
      {/* Title Section */}
      {hasRichTextContent(title) && (
        <div
          ref={titleRef}
          className={cn(
            'mb-16 text-center px-8 lg:px-16 max-w-[60rem] justify-center mx-auto',
            'transition-all duration-700 ease-out',
            isTitleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
          )}
        >
          <RichText data={title} enableGutter={false} enableProse={true} className="max-w-none" />
        </div>
      )}

      {/* Feature Previews List */}
      <div className="flex flex-col gap-24">
        {featurePreviews.map((featurePreview, index) => {
          const { media, description, position = 'left', elementColor } = featurePreview
          const bgClass = elementColor ? backgroundColorClassMap[elementColor] : 'bg-card'
          const isVisible = visibleItems.has(index)

          return (
            <div
              key={featurePreview.id || index}
              ref={(el) => {
                itemRefs.current[index] = el
              }}
              className={cn('flex flex-col gap-8 lg:gap-16 lg:items-center', {
                'lg:flex-row': position === 'left',
                'lg:flex-row-reverse': position === 'right',
              })}
            >
              {/* Media Section - Outside Card */}
              <div
                className={cn(
                  'relative lg:w-1/2 flex-shrink-0 cut-all-corners',
                  'transition-all duration-700 ease-out',
                  isVisible
                    ? 'opacity-100 translate-x-0 scale-100'
                    : position === 'left'
                      ? 'opacity-0 -translate-x-8 scale-95'
                      : 'opacity-0 translate-x-8 scale-95',
                )}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {media && typeof media === 'object' && (
                  <Media resource={media} className="w-full h-full object-cover" />
                )}
              </div>

              {/* Description Section - Inside Card */}
              <div
                className={cn(
                  'w-full border border-border rounded-lg overflow-hidden p-8 cut-all-corners',
                  bgClass,
                  'transition-all duration-700 ease-out',
                  'hover:shadow-lg hover:scale-[1.02]',
                  isVisible
                    ? 'opacity-100 translate-x-0 scale-100'
                    : position === 'left'
                      ? 'opacity-0 translate-x-8 scale-95'
                      : 'opacity-0 -translate-x-8 scale-95',
                )}
                style={{ transitionDelay: `${index * 150 + 100}ms` }}
              >
                {description && (
                  <RichText
                    data={description}
                    enableGutter={false}
                    enableProse={true}
                    className="max-w-none"
                  />
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
