import type { Block } from 'payload'

import { defaultLexical } from '@/fields/defaultLexical'
import { appColorField } from '@/fields/appColor'

export const Steps: Block = {
  slug: 'steps',
  interfaceName: 'StepsBlock',
  fields: [
    {
      name: 'title',
      type: 'richText',
      editor: defaultLexical,
      label: 'Title',
    },
    {
      name: 'steps',
      type: 'array',
      required: true,
      label: 'Steps',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'content',
          type: 'richText',
          editor: defaultLexical,
          required: true,
          label: 'Content',
        },
        appColorField(),
      ],
    },
  ],
  labels: {
    plural: 'Steps',
    singular: 'Step',
  },
}
