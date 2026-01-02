import type { TeamMembersBlock as TeamMembersBlockProps } from '@/payload-types'

import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import { Mail, Linkedin } from 'lucide-react'
import { backgroundColorClassMap, getTextColorForBackground } from '@/fields/appColor'

type Props = {
  className?: string
} & TeamMembersBlockProps

export const TeamMembersBlock: React.FC<Props> = ({ className, people, cardsPerRow }) => {
  if (!people || people.length === 0) {
    return null
  }

  const cardsPerRowValue = cardsPerRow || '3'
  const cardsPerRowNumber = parseInt(cardsPerRowValue, 10)
  const totalCards = people.length
  const shouldCenter = totalCards < cardsPerRowNumber

  const gridColsClass =
    cardsPerRowValue === '4'
      ? 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
      : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'

  const cardPaddingClass = cardsPerRowValue === '4' ? 'p-3 sm:p-4' : 'p-5 sm:p-8'
  const gridGapClass = cardsPerRowValue === '4' ? 'gap-3 sm:gap-4' : 'gap-5 sm:gap-8'
  const nameTextClass = cardsPerRowValue === '4' ? 'text-lg lg:text-xl' : 'text-xl lg:text-2xl'
  const jobTextClass = cardsPerRowValue === '4' ? 'text-xs lg:text-sm' : 'text-sm lg:text-base'
  const descriptionTextClass = cardsPerRowValue === '4' ? 'text-sm' : ''

  return (
    <div className={cn('container overflow-visible', className)}>
      {/* Team Members Grid */}
      {shouldCenter && (
        <style
          dangerouslySetInnerHTML={{
            __html: `
              ${
                cardsPerRowValue === '4'
                  ? `
                    @media (min-width: 768px) {
                      .team-members-grid-centered-${totalCards} {
                        grid-template-columns: repeat(${Math.min(totalCards, 3)}, minmax(0, 1fr)) !important;
                        max-width: calc(100% * ${Math.min(totalCards, 3)} / 3);
                      }
                    }
                  `
                  : `
                    @media (min-width: 768px) {
                      .team-members-grid-centered-${totalCards} {
                        grid-template-columns: repeat(${Math.min(totalCards, 2)}, minmax(0, 1fr)) !important;
                        max-width: calc(100% * ${Math.min(totalCards, 2)} / 2);
                      }
                    }
                  `
              }
              @media (min-width: 1024px) {
                .team-members-grid-centered-${totalCards} {
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
          shouldCenter && `mx-auto team-members-grid-centered-${totalCards}`,
        )}
      >
        {people.map((person, index) => {
          const bgClass = person.elementColor
            ? backgroundColorClassMap[person.elementColor]
            : 'bg-card'
          const textClass = person.elementColor
            ? getTextColorForBackground(person.elementColor)
            : 'text-foreground'

          return (
            <div
              key={person.id || index}
              className="overflow-visible relative h-full flex flex-col"
            >
              <div
                className={cn(
                  'rounded-lg overflow-hidden button-cut-corners flex flex-col gap-6 relative flex-1',
                  cardPaddingClass,
                  bgClass,
                  textClass,
                )}
              >
                {/* Image Section */}
                {person.image && typeof person.image === 'object' && (
                  <div className="relative w-full h-auto flex-shrink-0">
                    <Media
                      resource={person.image}
                      className="w-full h-auto object-cover button-cut-corners"
                    />
                  </div>
                )}

                {/* Name and Job Description */}
                <div className="flex-1">
                  {person.name && (
                    <h3 className={cn(nameTextClass, 'font-semibold mb-2')}>{person.name}</h3>
                  )}
                  {person.jobDescription && (
                    <p className={cn(jobTextClass, 'font-bold')}>{person.jobDescription}</p>
                  )}
                  {person.qualification && (
                    <p className={cn(jobTextClass, 'mb-4')}>{person.qualification}</p>
                  )}

                  {/* Description Section */}
                  {person.description && (
                    <div className="my-4">
                      <RichText
                        data={person.description}
                        enableGutter={false}
                        enableProse={true}
                        className={cn('max-w-none', descriptionTextClass)}
                      />
                    </div>
                  )}
                </div>

                {/* Social Links Section */}
                {(person.linkedInUrl || person.email) && (
                  <div className="mt-auto flex gap-4 items-center">
                    {person.linkedInUrl && (
                      <a
                        href={person.linkedInUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors"
                        aria-label={`LinkedIn Profil von ${person.name || 'Person'}`}
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                    )}
                    {person.email && (
                      <a
                        href={`mailto:${person.email}`}
                        className="transition-colors"
                        aria-label={`E-Mail an ${person.name || 'Person'}`}
                      >
                        <Mail className="w-5 h-5" />
                      </a>
                    )}
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
