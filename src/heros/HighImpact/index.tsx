'use client'
import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  return (
    <div className="relative -mt-16 w-full">
      {/* Background Image - determines height based on aspect ratio */}
      <div className="relative w-full">
        {media && typeof media === 'object' && (
          <Media imgClassName="w-full h-auto object-cover" priority resource={media} />
        )}

        {/* Content Overlay - left half only, centered vertically based on min(screen, image) height */}
        <div className="absolute top-0 left-0 right-0 h-full max-h-screen flex">
          <div className="w-1/2 flex items-center justify-center pl-8 md:pl-16 lg:pl-24">
            <div className="max-w-[36.5rem] flex flex-col items-center text-center">
              {richText && <RichText className="mb-6" data={richText} enableGutter={false} />}
              {Array.isArray(links) && links.length > 0 && (
                <ul className="flex justify-center gap-4">
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
        </div>
      </div>
    </div>
  )
}
