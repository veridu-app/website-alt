'use client'
import { Footer } from '@/payload-types'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const RowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<NonNullable<Footer['linkCategories']>[number]>()

  const heading = data?.data?.heading
  const linksCount = data?.data?.links?.length || 0

  const label = heading
    ? `${heading}${linksCount > 0 ? ` (${linksCount} ${linksCount === 1 ? 'Link' : 'Links'})` : ''}`
    : 'Kategorie'

  return <div>{label}</div>
}
