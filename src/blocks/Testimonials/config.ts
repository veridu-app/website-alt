import type { Block } from 'payload'

import { defaultLexical } from '@/fields/defaultLexical'

export const Testimonials: Block = {
  slug: 'testimonials',
  interfaceName: 'TestimonialsBlock',
  fields: [
    {
      name: 'title',
      type: 'richText',
      editor: defaultLexical,
      label: 'Title',
    },
    {
      name: 'testimonials',
      type: 'array',
      required: true,
      label: 'Testimonials',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Name der Person',
        },
        {
          name: 'quote',
          type: 'textarea',
          required: true,
          label: 'Zitat',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: false,
          label: 'Bild der Person',
          admin: {
            description: 'Optional: Bild der Person hochladen',
          },
        },
        {
          name: 'school',
          type: 'text',
          required: false,
          label: 'Schule',
          admin: {
            description: 'Optional: Name der Schule',
          },
        },
      ],
    },
  ],
  labels: {
    plural: 'Testimonials',
    singular: 'Testimonial',
  },
}
