import type { FeaturePreviewBlock as FeaturePreviewBlockProps } from '@/payload-types'

import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import { backgroundColorClassMap } from '@/fields/appColor'

type Props = {
  className?: string
} & FeaturePreviewBlockProps

export const FeaturePreviewBlock: React.FC<Props> = ({ className, title, featurePreviews }) => {
  if (!featurePreviews || featurePreviews.length === 0) {
    return null
  }

  return (
    <div className={cn('container', className)}>
      {/* Title Section */}
      {title && (
        <div className="mb-16 pt-16 text-center px-8 lg:px-16 max-w-[60rem] justify-center mx-auto">
          <RichText data={title} enableGutter={false} enableProse={true} className="max-w-none" />
        </div>
      )}

      {/* Feature Previews List */}
      <div className="flex flex-col gap-24">
        {featurePreviews.map((featurePreview, index) => {
          const { media, description, position = 'left', backgroundColor } = featurePreview
          const bgClass = backgroundColor ? backgroundColorClassMap[backgroundColor] : 'bg-card'

          return (
            <div
              key={featurePreview.id || index}
              className={cn('flex flex-col gap-8 lg:gap-16 lg:items-center', {
                'lg:flex-row': position === 'left',
                'lg:flex-row-reverse': position === 'right',
              })}
            >
              {/* Media Section - Outside Card */}
              <div className="relative lg:w-1/2 flex-shrink-0 cut-all-corners">
                {media && typeof media === 'object' && (
                  <Media resource={media} className="w-full h-full object-cover" />
                )}
              </div>

              {/* Description Section - Inside Card */}
              <div
                className={cn(
                  'w-full border border-border rounded-lg overflow-hidden p-8 cut-all-corners',
                  bgClass,
                )}
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
