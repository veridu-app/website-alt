import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'
import { backgroundColorClassMap } from '@/fields/appColor'

import { CMSLink } from '../../components/Link'

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { columns } = props

  const colsSpanClasses = {
    full: '12',
    half: '6',
    oneThird: '4',
    twoThirds: '8',
  }

  return (
    <div className="container my-16">
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
                className={cn(
                  `col-span-4 lg:col-span-${colSpan}`,
                  {
                    'md:col-span-2': size !== 'full',
                  },
                  colStart,
                  {
                    'h-full': enableBox,
                  },
                )}
                key={index}
              >
                {enableBox && boxBgClass ? (
                  <div className={cn(boxBgClass, 'p-4 rounded-xl h-full')}>{content}</div>
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
