import type { Field, GroupField } from 'payload'

import deepMerge from '@/utilities/deepMerge'

export type LinkAppearances =
  | 'default'
  | 'accent'
  | 'accent-dark'
  | 'secondary'
  | 'lavender'
  | 'light'
  | 'textbutton'

export const appearanceOptions: Record<LinkAppearances, { label: string; value: string }> = {
  default: {
    label: 'Default',
    value: 'default',
  },
  accent: {
    label: 'Accent (Orange)',
    value: 'accent',
  },
  'accent-dark': {
    label: 'Accent Dark (Orange, Dark Text)',
    value: 'accent-dark',
  },
  secondary: {
    label: 'Secondary (Frozen Green)',
    value: 'secondary',
  },
  lavender: {
    label: 'Lavender',
    value: 'lavender',
  },
  light: {
    label: 'Light (White)',
    value: 'light',
  },
  textbutton: {
    label: 'Text Button',
    value: 'textbutton',
  },
}

type LinkType = (options?: {
  appearances?: LinkAppearances[] | false
  disableLabel?: boolean
  dbName?: string
  appearanceDbName?: string
  overrides?: Partial<GroupField>
}) => Field

export const link: LinkType = ({
  appearances,
  disableLabel = false,
  dbName,
  appearanceDbName,
  overrides = {},
} = {}) => {
  const linkResult: GroupField = {
    name: 'link',
    type: 'group',
    ...(dbName && { dbName }),
    admin: {
      hideGutter: true,
    },
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'type',
            type: 'radio',
            admin: {
              layout: 'horizontal',
              width: '50%',
            },
            defaultValue: 'reference',
            options: [
              {
                label: 'Internal link',
                value: 'reference',
              },
              {
                label: 'Custom URL',
                value: 'custom',
              },
            ],
          },
          {
            name: 'newTab',
            type: 'checkbox',
            admin: {
              style: {
                alignSelf: 'flex-end',
              },
              width: '50%',
            },
            label: 'Open in new tab',
          },
        ],
      },
    ],
  }

  const linkTypes: Field[] = [
    {
      name: 'reference',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'reference',
      },
      label: 'Document to link to',
      relationTo: ['pages', 'posts'],
      required: true,
    },
    {
      name: 'url',
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'custom',
      },
      label: 'Custom URL',
      required: true,
    },
  ]

  if (!disableLabel) {
    linkTypes.map((linkType) => ({
      ...linkType,
      admin: {
        ...linkType.admin,
        width: '50%',
      },
    }))

    linkResult.fields.push({
      type: 'row',
      fields: [
        ...linkTypes,
        {
          name: 'label',
          type: 'text',
          admin: {
            width: '50%',
          },
          label: 'Label',
          required: true,
        },
      ],
    })
  } else {
    linkResult.fields = [...linkResult.fields, ...linkTypes]
  }

  if (appearances !== false) {
    let appearanceOptionsToUse = [
      appearanceOptions.default,
      appearanceOptions.accent,
      appearanceOptions['accent-dark'],
      appearanceOptions.secondary,
      appearanceOptions.lavender,
      appearanceOptions.light,
      appearanceOptions.textbutton,
    ]

    if (appearances) {
      appearanceOptionsToUse = appearances.map((appearance) => appearanceOptions[appearance])
    }

    linkResult.fields.push({
      name: 'appearance',
      type: 'select',
      ...(appearanceDbName && { dbName: appearanceDbName }),
      admin: {
        description: 'Choose how the link should be rendered.',
      },
      defaultValue: 'default',
      options: appearanceOptionsToUse,
    })
  }

  linkResult.fields.push({
    name: 'showArrow',
    type: 'checkbox',
    admin: {
      description: 'Display an arrow icon before the link text.',
    },
    defaultValue: false,
    label: 'Show arrow',
  })

  return deepMerge(linkResult, overrides)
}
