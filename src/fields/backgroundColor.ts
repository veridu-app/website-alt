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
  dbName?: string
  admin?: {
    position?: 'sidebar'
    description?: string
  }
}

/**
 * Creates a reusable backgroundColor field configuration
 * @param options - Optional configuration for the field
 * @returns A Payload select field configuration for background colors
 */
export const backgroundColorField = (options: BackgroundColorFieldOptions = {}): Field => {
  const { name = 'backgroundColor', required = false, dbName, admin = {} } = options

  return {
    name,
    type: 'select',
    options: backgroundColorOptions,
    required,
    ...(dbName && { dbName }),
    admin: {
      ...admin,
    },
  }
}

/**
 * Helper function to get text color based on background color
 * @param backgroundColor - The background color value
 * @returns Tailwind CSS text color class
 */
export const getTextColorForBackground = (
  backgroundColor?: BackgroundColorValue | string | null,
): string => {
  if (!backgroundColor) return 'text-accent-foreground'

  // Dark backgrounds need light text
  if (backgroundColor === 'dark-teal' || backgroundColor === 'cerulean') {
    return 'text-lavender'
  }

  // Light backgrounds need dark text
  if (
    backgroundColor === 'off-white' ||
    backgroundColor === 'frozen-green' ||
    backgroundColor === 'lavender'
  ) {
    return 'text-dark-teal'
  }

  // Orange uses accent-foreground
  if (backgroundColor === 'orange') {
    return 'text-accent-foreground'
  }

  return 'text-foreground'
}
