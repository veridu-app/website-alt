import type { InfoCardsBlock as InfoCardsBlockProps } from '@/payload-types'

import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import { backgroundColorClassMap } from '@/fields/appColor'
import { getTextColorForBackground } from '@/fields/appColor'
import Link from 'next/link'
import { CMSLink } from '@/components/Link'

type Props = {
  className?: string
} & InfoCardsBlockProps

export const InfoCardsBlock: React.FC<Props> = ({ className, title, infoCards, cardsPerRow }) => {
  if (!infoCards || infoCards.length === 0) {
    return null
  }

  const cardsPerRowValue = cardsPerRow || '3'
  const cardsPerRowNumber = parseInt(cardsPerRowValue, 10)
  const totalCards = infoCards.length
  const shouldCenter = totalCards < cardsPerRowNumber

  const gridColsClass =
    cardsPerRowValue === '4'
      ? 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
      : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'

  const cardPaddingClass = cardsPerRowValue === '4' ? 'p-3 sm:p-4' : 'p-5 sm:p-8'
  const gridGapClass = cardsPerRowValue === '4' ? 'gap-3 sm:gap-4' : 'gap-5 sm:gap-8'

  return (
    <div className={cn('container overflow-visible', className)}>
      {/* Title Section */}
      {title && (
        <div className="mb-8 pt-16 text-center px-8 lg:px-16 max-w-[60rem] justify-center mx-auto">
          <RichText data={title} enableGutter={false} enableProse={true} className="max-w-none" />
        </div>
      )}

      {/* Info Cards Grid */}
      {shouldCenter && (
        <style
          dangerouslySetInnerHTML={{
            __html: `
              ${
                cardsPerRowValue === '4'
                  ? `
                    @media (min-width: 768px) {
                      .info-cards-grid-centered-${totalCards} {
                        grid-template-columns: repeat(${Math.min(totalCards, 3)}, minmax(0, 1fr)) !important;
                        max-width: calc(100% * ${Math.min(totalCards, 3)} / 3);
                      }
                    }
                  `
                  : `
                    @media (min-width: 768px) {
                      .info-cards-grid-centered-${totalCards} {
                        grid-template-columns: repeat(${Math.min(totalCards, 2)}, minmax(0, 1fr)) !important;
                        max-width: calc(100% * ${Math.min(totalCards, 2)} / 2);
                      }
                    }
                  `
              }
              @media (min-width: 1024px) {
                .info-cards-grid-centered-${totalCards} {
                  grid-template-columns: repeat(${totalCards}, minmax(0, 1fr)) !important;
                  max-width: calc(100% * ${totalCards} / ${cardsPerRowNumber});
                }
              }
            `,
          }}
        />
      )}
      <div
        className={cn(
          'grid',
          gridColsClass,
          gridGapClass,
          'overflow-visible pb-12',
          shouldCenter && `mx-auto info-cards-grid-centered-${totalCards}`,
        )}
      >
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
                  'rounded-lg overflow-hidden button-cut-corners flex flex-col gap-6 relative flex-1',
                  cardPaddingClass,
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

                {/* Button Section */}
                {infoCard.showButton && infoCard.link && (
                  <div className="mt-auto pt-4">
                    <CMSLink {...infoCard.link} />
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
