import type { AccordionInfoBlock as AccordionInfoBlockProps } from '@/payload-types'

import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { CMSLink } from '@/components/Link'

type Props = {
  className?: string
} & AccordionInfoBlockProps

export const AccordionInfoBlock: React.FC<Props> = ({
  className,
  title,
  accordionItems,
  showViewAllLink,
  link: viewAllLink,
}) => {
  if (!accordionItems || accordionItems.length === 0) {
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

      {/* Accordion List */}
      <div className="max-w-4xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          {accordionItems.map((item, index) => {
            const { title: itemTitle, expandedContent, id, showButton, link: itemLink } = item

            return (
              <AccordionItem key={id || index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{itemTitle}</AccordionTrigger>
                <AccordionContent>
                  {expandedContent && (
                    <RichText
                      data={expandedContent}
                      enableGutter={false}
                      enableProse={true}
                      className="max-w-none"
                    />
                  )}
                  {showButton && itemLink && (
                    <div className="mt-4">
                      <CMSLink {...itemLink} />
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>
      </div>

      {/* View All Link */}
      {showViewAllLink && viewAllLink && (
        <div className="max-w-4xl mx-auto mt-8 text-center">
          <CMSLink {...viewAllLink} />
        </div>
      )}
    </div>
  )
}
