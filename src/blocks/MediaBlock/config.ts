import type { Block } from 'payload'

import { appColorField } from '@/fields/appColor'

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  interfaceName: 'MediaBlock',
  fields: [
    appColorField({
      admin: {
        position: 'sidebar',
        description: 'Hintergrundfarbe für den gesamten Block-Bereich',
      },
    }),
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}
