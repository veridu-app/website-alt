import type { Field } from 'payload'

export type BackgroundColorValue =
  | 'off-white'
  | 'frozen-green'
  | 'lavender'
  | 'dark-teal'
  | 'cerulean'
  | 'orange'

export const backgroundColorOptions: Array<{ label: string; value: BackgroundColorValue }> = [
  {
    label: 'Off White',
    value: 'off-white',
  },
  {
    label: 'Frozen Green',
    value: 'frozen-green',
  },
  {
    label: 'Lavender',
    value: 'lavender',
  },
  {
    label: 'Dark Teal',
    value: 'dark-teal',
  },
  {
    label: 'Cerulean',
    value: 'cerulean',
  },
  {
    label: 'Orange',
    value: 'orange',
  },
]

type BackgroundColorFieldOptions = {
  name?: string
  required?: boolean
  admin?: {
    position?: 'sidebar' | 'main'
    description?: string
  }
}

/**
 * Creates a reusable backgroundColor field configuration
 * @param options - Optional configuration for the field
 * @returns A Payload select field configuration for background colors
 */
export const backgroundColorField = (
  options: BackgroundColorFieldOptions = {},
): Field => {
  const {
    name = 'backgroundColor',
    required = false,
    admin = {},
  } = options

  return {
    name,
    type: 'select',
    options: backgroundColorOptions,
    required,
    admin: {
      ...admin,
    },
  }
}

