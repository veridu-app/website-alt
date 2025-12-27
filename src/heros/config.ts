import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import {
  TextFontFamilyFeature,
  TextColorFeature,
  TextLineHeightFeature,
} from 'payload-lexical-typography'

import { linkGroup } from '@/fields/linkGroup'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'lowImpact',
      label: 'Type',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'High Impact',
          value: 'highImpact',
        },
        {
          label: 'Medium Impact',
          value: 'mediumImpact',
        },
        {
          label: 'Low Impact',
          value: 'lowImpact',
        },
      ],
      required: true,
    },
    {
      name: 'richText',
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
            TextLineHeightFeature({
              lineHeights: [
                { value: '1', label: 'Eng (1)' },
                { value: '1.2', label: 'Kompakt (1.2)' },
                { value: '1.5', label: 'Normal (1.5)' },
                { value: '2', label: 'Weit (2)' },
              ],
              customLineHeight: true,
            }),
          ]
        },
      }),
      label: false,
      admin: {
        description: 'Tipp: Shift+Enter für Zeilenumbruch ohne Absatz',
      },
    },
    linkGroup({
      overrides: {
        maxRows: 2,
      },
    }),
    {
      name: 'media',
      type: 'upload',
      admin: {
        condition: (_, { type } = {}) => ['highImpact', 'mediumImpact'].includes(type),
      },
      relationTo: 'media',
      required: true,
    },
  ],
  label: false,
}
