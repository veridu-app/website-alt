import type { Block } from 'payload'

import { defaultLexical } from '@/fields/defaultLexical'
import { backgroundColorField, backgroundColorOptions } from '@/fields/backgroundColor'

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
        backgroundColorField({
          dbName: 'bg_color',
        }),
        {
          name: 'catchInfo',
          type: 'group',
          required: false,
          label: 'Catch Info',
          admin: {
            description:
              'Auffällige Statistik für den Badge (z.B. "30%" links, "aller Lehrkräfte leiden unter psychischen Belastungen" rechts)',
          },
          fields: [
            {
              name: 'enabled',
              type: 'checkbox',
              required: false,
              defaultValue: false,
              label: 'Catch Info aktivieren',
              admin: {
                description: 'Aktivieren, um die Catch Info anzuzeigen',
              },
            },
            {
              name: 'value',
              type: 'text',
              required: false,
              label: 'Wert/Statistik (links)',
              admin: {
                description: 'Große Zahl oder Statistik (z.B. "30%", "1 von 3")',
                width: '50%',
                condition: (_data, siblingData) => siblingData?.enabled === true,
              },
            },
            {
              name: 'text',
              type: 'text',
              required: true,
              label: 'Beschreibung (rechts)',
              admin: {
                description: 'Beschreibender Text, der umbrechen kann',
                width: '50%',
                condition: (_data, siblingData) => siblingData?.enabled === true,
              },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'position',
                  type: 'select',
                  required: false,
                  defaultValue: 'between',
                  label: 'Banner Position',
                  options: [
                    {
                      label: 'Zwischen den Texten',
                      value: 'between',
                    },
                    {
                      label: 'Floating am Ende der Karte',
                      value: 'floating',
                    },
                  ],
                  admin: {
                    description: 'Position des Banners in der Karte',
                    width: '50%',
                    condition: (_data, siblingData) => siblingData?.enabled === true,
                  },
                },
                {
                  name: 'bannerColor',
                  type: 'select',
                  required: false,
                  label: 'Banner Farbe',
                  options: backgroundColorOptions,
                  dbName: 'banner_color',
                  admin: {
                    description: 'Farbe des Banners',
                    width: '50%',
                    condition: (_data, siblingData) => siblingData?.enabled === true,
                  },
                },
              ],
            },
          ],
        },
        {
          name: 'footnotes',
          type: 'array',
          required: false,
          label: 'Fußnoten',
          fields: [
            {
              name: 'text',
              type: 'text',
              required: true,
              label: 'Fußnote Text',
            },
            {
              name: 'url',
              type: 'text',
              required: false,
              label: 'Link (optional)',
              admin: {
                description: 'Optional: URL für klickbare Fußnote',
              },
            },
          ],
          admin: {
            description: 'Optional: Fußnoten am Ende der Card (können mit Link versehen werden)',
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
