import type { GlobalConfig } from 'payload'

import { linkGroup } from '@/fields/linkGroup'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'linkCategories',
      type: 'array',
      label: 'Link Kategorien',
      admin: {
        initCollapsed: false,
        components: {
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
      },
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: true,
          label: 'Überschrift',
          admin: {
            description: 'Überschrift für diese Link-Kategorie',
          },
        },
        linkGroup({
          appearances: false,
        }),
      ],
    },
    {
      type: 'group',
      name: 'contact',
      label: 'Kontaktinformationen',
      fields: [
        {
          name: 'email',
          type: 'email',
          label: 'E-Mail',
          admin: {
            description: 'Kontakt-E-Mail-Adresse',
          },
        },
        {
          name: 'linkedIn',
          type: 'text',
          label: 'LinkedIn URL',
          admin: {
            description: 'LinkedIn Profil URL (z.B. https://linkedin.com/company/veridu)',
          },
        },
        {
          name: 'instagram',
          type: 'text',
          label: 'Instagram URL',
          admin: {
            description: 'Instagram Profil URL (z.B. https://instagram.com/veridu)',
          },
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
