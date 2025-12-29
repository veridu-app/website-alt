import type { FeaturePreviewBlock as FeaturePreviewBlockProps } from '@/payload-types'

import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import { backgroundColorClassMap } from '@/utilities/backgroundColor'

type Props = {
  className?: string
} & FeaturePreviewBlockProps

export const FeaturePreviewBlock: React.FC<Props> = ({
  className,
  media,
  description,
  position = 'left',
  backgroundColor,
}) => {
  const bgClass = backgroundColor ? backgroundColorClassMap[backgroundColor] : 'bg-card'

  return (
    <div className={cn('container', className)}>
      <div
        className={cn(
          'border border-border rounded-lg overflow-hidden p-8 cut-all-corners',
          bgClass,
          'flex flex-col gap-8 lg:gap-16',
          {
            'lg:flex-row': position === 'left',
            'lg:flex-row-reverse': position === 'right',
          },
        )}
      >
        {/* Media Section */}
        <div className="relative lg:w-3/5 flex-shrink-0 cut-all-corners">
          {media && typeof media === 'object' && (
            <Media resource={media} className="w-full h-full object-cover" />
          )}
        </div>

        {/* Description Section */}
        <div className="flex-1 flex">
          <div className="w-full">
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
      </div>
    </div>
  )
}
