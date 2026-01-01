import type { Block } from 'payload'

import { defaultLexical } from '@/fields/defaultLexical'
import { link } from '@/fields/link'

export const AccordionInfo: Block = {
  slug: 'accordionInfo',
  interfaceName: 'AccordionInfoBlock',
  fields: [
    {
      name: 'title',
      type: 'richText',
      editor: defaultLexical,
      label: 'Title',
    },
    {
      name: 'accordionItems',
      type: 'array',
      required: true,
      label: 'Accordion Items',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Title',
        },
        {
          name: 'expandedContent',
          type: 'richText',
          editor: defaultLexical,
          label: 'Expanded Content',
          required: true,
        },
        {
          name: 'showButton',
          type: 'checkbox',
          label: 'Show Button',
          defaultValue: false,
        },
        link({
          dbName: 'item_link',
          appearanceDbName: 'item_link_app',
          overrides: {
            admin: {
              condition: (_data, siblingData) => {
                return Boolean(siblingData?.showButton)
              },
            },
          },
        }),
      ],
    },
    {
      name: 'showViewAllLink',
      type: 'checkbox',
      label: 'Show "View All" Link',
      defaultValue: false,
    },
    link({
      overrides: {
        admin: {
          condition: (_data, siblingData) => {
            return Boolean(siblingData?.showViewAllLink)
          },
        },
      },
    }),
  ],
  labels: {
    plural: 'Accordion Info',
    singular: 'Accordion Info',
  },
}
