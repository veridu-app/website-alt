import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { VeriduSymbol } from '@/components/Logo/VeriduSymbol'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const MediumImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  return (
    <div className="container">
      <div className="flex flex-col lg:flex-row md:gap-12 lg:gap-14 xl:gap-16 px-4">
        <div className="lg:w-2/3 mb-8 lg:mb-0 relative lg:flex lg:items-center">
          <div
            className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center"
            style={{ zIndex: -1 }}
          >
            <VeriduSymbol strokeWidth="1px" />
          </div>

          <div className="relative z-10 text-center text-center">
            {richText && <RichText className="mb-6" data={richText} enableGutter={false} />}

            {Array.isArray(links) && links.length > 0 && (
              <ul className="flex flex-wrap gap-4 justify-center">
                {links.map(({ link }, i) => {
                  return (
                    <li key={i}>
                      <CMSLink {...link} />
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        </div>

        {media && typeof media === 'object' && (
          <div className="lg:w-1/3 lg:flex-shrink-0">
            <div className="lg:aspect-[1/1.3]">
              <Media
                className="-mx-4 button-cut-corners h-full"
                imgClassName="h-full w-full object-cover"
                priority
                resource={media}
              />
            </div>
            {media?.caption && (
              <div className="mt-3">
                <RichText data={media.caption} enableGutter={false} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
