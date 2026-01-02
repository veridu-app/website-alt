import type { StepsBlock as StepsBlockProps } from '@/payload-types'

import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'
import { backgroundColorClassMap } from '@/fields/appColor'
import { getTextColorForBackground } from '@/fields/appColor'

type Props = {
  className?: string
} & StepsBlockProps

export const StepsBlock: React.FC<Props> = ({ className, title, steps }) => {
  if (!steps || steps.length === 0) {
    return null
  }

  return (
    <div className={cn('container overflow-visible', className)}>
      {/* Title Section */}
      {title && (
        <div className="mb-12 pt-16 text-center px-8 lg:px-16 max-w-[60rem] justify-center mx-auto">
          <RichText data={title} enableGutter={false} enableProse={true} className="max-w-none" />
        </div>
      )}

      {/* Steps List */}
      <div className="flex flex-col gap-10 pb-12">
        {steps.map((step, index) => {
          const stepNumber = index + 1
          const bgClass = step.backgroundColor
            ? backgroundColorClassMap[step.backgroundColor]
            : 'bg-card'

          return (
            <div key={step.id || index} className="flex items-start gap-4 sm:gap-6">
              {/* Step Number Circle - Left */}
              <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-accent text-accent-foreground font-bold text-lg sm:text-xl">
                {stepNumber}
              </div>

              {/* Content Card - Right */}
              <div
                className={cn(
                  'flex-1 rounded-lg overflow-hidden flex flex-col gap-4',
                )}
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
