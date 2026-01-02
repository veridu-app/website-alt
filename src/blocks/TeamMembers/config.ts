import type { Block } from 'payload'

import { defaultLexical } from '@/fields/defaultLexical'
import { appColorField } from '@/fields/appColor'

export const TeamMembers: Block = {
  slug: 'teamMembers',
  interfaceName: 'TeamMembersBlock',
  fields: [
    appColorField({
      admin: {
        position: 'sidebar',
        description: 'Hintergrundfarbe für den gesamten Block-Bereich',
      },
    }),
    {
      name: 'people',
      type: 'array',
      required: true,
      label: 'Team Members',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Bild',
          admin: {
            description: 'Bild der Person',
          },
        },
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Name',
        },
        {
          name: 'jobDescription',
          type: 'text',
          required: true,
          label: 'Jobbeschreibung',
          admin: {
            description: 'Berufsbezeichnung oder Rolle',
          },
        },
        {
          name: 'qualification',
          type: 'text',
          required: false,
          label: 'Qualifikation',
          admin: {
            description: 'Abschluss oder Qualifikation (z.B. B. Sc. Psychologie)',
          },
        },
        {
          name: 'description',
          type: 'richText',
          editor: defaultLexical,
          required: false,
          label: 'Beschreibung',
          admin: {
            description: 'Optionale Beschreibung der Person',
          },
        },
        {
          name: 'linkedInUrl',
          type: 'text',
          required: false,
          label: 'LinkedIn URL',
          admin: {
            description: 'LinkedIn Profil URL (z.B. https://linkedin.com/in/username)',
          },
        },
        {
          name: 'email',
          type: 'email',
          required: false,
          label: 'E-Mail',
          admin: {
            description: 'E-Mail-Adresse der Person',
          },
        },
        appColorField({
          name: 'elementColor',
        }),
      ],
    },
    {
      name: 'cardsPerRow',
      type: 'select',
      label: 'Cards per Row',
      defaultValue: '3',
      options: [
        {
          label: '3 Cards',
          value: '3',
        },
        {
          label: '4 Cards',
          value: '4',
        },
      ],
      admin: {
        description: 'Number of cards displayed per row on large screens',
      },
    },
  ],
  labels: {
    plural: 'Team Members',
    singular: 'Team Member',
  },
}
