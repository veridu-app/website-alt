import type { InfoCardsBlock as InfoCardsBlockProps } from '@/payload-types'

import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import { backgroundColorClassMap } from '@/utilities/backgroundColor'
import { getTextColorForBackground } from '@/fields/backgroundColor'
import Link from 'next/link'

type Props = {
  className?: string
} & InfoCardsBlockProps

export const InfoCardsBlock: React.FC<Props> = ({ className, title, infoCards }) => {
  if (!infoCards || infoCards.length === 0) {
    return null
  }

  return (
    <div className={cn('container overflow-visible', className)}>
      {/* Title Section */}
      {title && (
        <div className="mb-8 pt-16 text-center px-8 lg:px-16 max-w-[60rem] justify-center mx-auto">
          <RichText data={title} enableGutter={false} enableProse={true} className="max-w-none" />
        </div>
      )}

      {/* Info Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 overflow-visible pb-12">
        {infoCards.map((infoCard, index) => {
          const bgClass = infoCard.backgroundColor
            ? backgroundColorClassMap[infoCard.backgroundColor]
            : 'bg-card'

          return (
            <div
              key={infoCard.id || index}
              className="overflow-visible relative h-full flex flex-col"
            >
              <div
                className={cn(
                  'rounded-lg overflow-hidden p-8 button-cut-corners flex flex-col gap-6 relative flex-1',
                  bgClass,
                  infoCard.catchInfo &&
                    infoCard.catchInfo.enabled &&
                    infoCard.catchInfo.text &&
                    infoCard.catchInfo.position === 'floating'
                    ? 'pb-12'
                    : '',
                )}
              >
                {/* Image Section */}
                {infoCard.image && typeof infoCard.image === 'object' && (
                  <div className="relative w-full h-auto flex-shrink-0">
                    <Media
                      resource={infoCard.image}
                      className="w-full h-auto object-cover button-cut-corners"
                    />
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

                {/* Catch Info Section (between texts) */}
                {infoCard.catchInfo &&
                  infoCard.catchInfo.enabled &&
                  infoCard.catchInfo.text &&
                  infoCard.catchInfo.position !== 'floating' && (
                    <div
                      className={cn(
                        'rounded-xl p-4 flex flex-row items-center gap-3',
                        infoCard.catchInfo.bannerColor
                          ? backgroundColorClassMap[infoCard.catchInfo.bannerColor]
                          : 'bg-accent',
                        getTextColorForBackground(infoCard.catchInfo.bannerColor),
                      )}
                    >
                      {infoCard.catchInfo.value && (
                        <span className="text-2xl lg:text-3xl font-bold flex-shrink-0 leading-none">
                          {infoCard.catchInfo.value}
                        </span>
                      )}
                      <span className="text-sm lg:text-base flex-1 leading-tight">
                        {infoCard.catchInfo.text}
                      </span>
                    </div>
                  )}

                {/* Footnotes Section */}
                {infoCard.footnotes && infoCard.footnotes.length > 0 && (
                  <div className="mt-auto pt-4 border-t border-border/50 relative z-20">
                    <div className="text-xs text-muted-foreground space-y-1">
                      {infoCard.footnotes.map((footnote, idx) => {
                        if (!footnote.text) return null

                        const footnoteContent = (
                          <span className="flex gap-2">
                            <span className="font-mono font-semibold">[{idx + 1}]</span>
                            <span>{footnote.text}</span>
                          </span>
                        )

                        if (footnote.url) {
                          return (
                            <Link key={idx} href={footnote.url} className="hover:underline block">
                              {footnoteContent}
                            </Link>
                          )
                        }

                        return <p key={idx}>{footnoteContent}</p>
                      })}
                    </div>
                  </div>
                )}
              </div>
              {/* Catch Info Banner (floating from bottom) */}
              {infoCard.catchInfo &&
                infoCard.catchInfo.enabled &&
                infoCard.catchInfo.text &&
                infoCard.catchInfo.position === 'floating' && (
                  <div
                    className={cn(
                      'absolute -bottom-10 left-1/2 -translate-x-1/2 z-10 w-[calc(100%-4rem)] max-w-sm rounded-xl p-4 flex flex-row items-center gap-3 shadow-lg',
                      infoCard.catchInfo.bannerColor
                        ? backgroundColorClassMap[infoCard.catchInfo.bannerColor]
                        : 'bg-accent',
                      getTextColorForBackground(infoCard.catchInfo.bannerColor),
                    )}
                  >
                    {infoCard.catchInfo.value && (
                      <span className="text-2xl lg:text-3xl font-bold flex-shrink-0 leading-none">
                        {infoCard.catchInfo.value}
                      </span>
                    )}
                    <span className="text-sm lg:text-base flex-1 leading-tight">
                      {infoCard.catchInfo.text}
                    </span>
                  </div>
                )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
