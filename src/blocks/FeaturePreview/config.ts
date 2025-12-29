import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { backgroundColorField } from '@/fields/backgroundColor'
import { defaultLexical } from '@/fields/defaultLexical'
import { TextColorFeature, TextFontFamilyFeature } from 'payload-lexical-typography'

export const FeaturePreview: Block = {
  slug: 'featurePreview',
  interfaceName: 'FeaturePreviewBlock',
  fields: [
    {
      name: 'title',
      type: 'richText',
      editor: defaultLexical,
      label: 'Title',
    },
    {
      name: 'featurePreviews',
      type: 'array',
      required: true,
      label: 'Feature Previews',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'description',
          type: 'richText',
          editor: lexicalEditor({
            features: ({ rootFeatures }) => {
              return [
                ...rootFeatures,
                HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                FixedToolbarFeature(),
                InlineToolbarFeature(),
                TextFontFamilyFeature({
                  fontFamilies: [
                    { value: "'Mona Sans', Verdana, sans-serif", label: 'Mona Sans' },
                    { value: "'Royal Couture', serif", label: 'Royal Couture' },
                  ],
                  customFontFamily: false,
                }),
                TextColorFeature({
                  colors: [
                    { value: '#003A43', label: 'Dark Teal' },
                    { value: '#086C87', label: 'Cerulean' },
                    { value: '#E9710E', label: 'Orange' },
                    { value: '#D2FAF3', label: 'Frozen Green' },
                    { value: '#FDF9FF', label: 'Off White' },
                    { value: '#E0E4FF', label: 'Lavender' },
                  ],
                  colorPicker: true,
                }),
              ]
            },
          }),
          label: false,
          required: true,
        },
        {
          name: 'position',
          type: 'select',
          defaultValue: 'left',
          options: [
            {
              label: 'Left',
              value: 'left',
            },
            {
              label: 'Right',
              value: 'right',
            },
          ],
          required: true,
        },
        backgroundColorField({
          dbName: 'bg_color',
        }),
      ],
    },
  ],
  labels: {
    plural: 'Feature Previews',
    singular: 'Feature Preview',
  },
}
