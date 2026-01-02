import type { TextFieldSingleValidation } from 'payload'
import {
  BoldFeature,
  ItalicFeature,
  LinkFeature,
  ParagraphFeature,
  lexicalEditor,
  UnderlineFeature,
  type LinkFields,
  FixedToolbarFeature,
  HeadingFeature,
  ChecklistFeature,
  UnorderedListFeature,
  OrderedListFeature,
} from '@payloadcms/richtext-lexical'
import { TextColorFeature, TextFontFamilyFeature } from 'payload-lexical-typography'

export const defaultLexical = lexicalEditor({
  features: [
    FixedToolbarFeature(),
    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
    ParagraphFeature(),
    UnderlineFeature(),
    BoldFeature(),
    ItalicFeature(),
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
    ChecklistFeature(),
    OrderedListFeature(),
    UnorderedListFeature(),
    LinkFeature({
      enabledCollections: ['pages', 'posts'],
      fields: ({ defaultFields }) => {
        const defaultFieldsWithoutUrl = defaultFields.filter((field) => {
          if ('name' in field && field.name === 'url') return false
          return true
        })

        return [
          ...defaultFieldsWithoutUrl,
          {
            name: 'url',
            type: 'text',
            admin: {
              condition: (_data, siblingData) => siblingData?.linkType !== 'internal',
            },
            label: ({ t }) => t('fields:enterURL'),
            required: true,
            validate: ((value, options) => {
              if ((options?.siblingData as LinkFields)?.linkType === 'internal') {
                return true // no validation needed, as no url should exist for internal links
              }
              return value ? true : 'URL is required'
            }) as TextFieldSingleValidation,
          },
        ]
      },
    }),
  ],
})
