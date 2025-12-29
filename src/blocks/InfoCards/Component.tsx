import type { InfoCardsBlock as InfoCardsBlockProps } from '@/payload-types'

import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'

type Props = {
  className?: string
} & InfoCardsBlockProps

export const InfoCardsBlock: React.FC<Props> = ({ className, title, infoCards }) => {
  if (!infoCards || infoCards.length === 0) {
    return null
  }

  return (
    <div className={cn('container', className)}>
      {/* Title Section */}
      {title && (
        <div className="mb-8 pt-16 text-center px-8 lg:px-16 max-w-[60rem] justify-center mx-auto">
          <RichText data={title} enableGutter={false} enableProse={true} className="max-w-none" />
        </div>
      )}

      {/* Info Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {infoCards.map((infoCard, index) => (
          <div
            key={infoCard.id || index}
            className="bg-card rounded-lg overflow-hidden p-8 button-cut-corners flex flex-col gap-6"
          >
            {/* Image Section */}
            {infoCard.image && typeof infoCard.image === 'object' && (
              <div className="relative w-full h-auto flex-shrink-0">
                <Media resource={infoCard.image} className="w-full h-auto object-cover button-cut-corners" />
              </div>
            )}

            {/* Text Section */}
            {infoCard.text && (
              <div className="flex-1">
                <RichText
                  data={infoCard.text}
                  enableGutter={false}
                  enableProse={true}
                  className="max-w-none"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
