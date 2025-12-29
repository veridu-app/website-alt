import type { Block } from 'payload'

import { defaultLexical } from '@/fields/defaultLexical'

export const InfoCards: Block = {
  slug: 'infoCards',
  interfaceName: 'InfoCardsBlock',
  fields: [
    {
      name: 'title',
      type: 'richText',
      editor: defaultLexical,
      label: 'Title',
    },
    {
      name: 'infoCards',
      type: 'array',
      required: true,
      label: 'Info Cards',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'text',
          type: 'richText',
          editor: defaultLexical,
          required: true,
          label: 'Text',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: false,
          label: 'Bild',
          admin: {
            description: 'Optional: Bild hochladen',
          },
        },
      ],
    },
  ],
  labels: {
    plural: 'Info Cards',
    singular: 'Info Card',
  },
}
