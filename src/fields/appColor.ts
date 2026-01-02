import type { Field } from 'payload'

export type AppColorValue =
  | 'off-white'
  | 'frozen-green'
  | 'lavender'
  | 'dark-teal'
  | 'cerulean'
  | 'orange'

export const appColorOptions: Array<{ label: string; value: AppColorValue }> = [
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

type AppColorFieldOptions = {
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
export const appColorField = (options: AppColorFieldOptions = {}): Field => {
  const { name = 'backgroundColor', required = false, dbName, admin = {} } = options

  return {
    name,
    type: 'select',
    options: appColorOptions,
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
  backgroundColor?: AppColorValue | string | null,
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

/**
 * Color class mapping for background colors
 * Maps color names (as used in CMS) to Tailwind CSS background classes
 */
export const backgroundColorClassMap: Record<string, string> = {
  'off-white': 'bg-off-white',
  'frozen-green': 'bg-frozen-green',
  lavender: 'bg-lavender',
  'dark-teal': 'bg-dark-teal',
  cerulean: 'bg-cerulean',
  orange: 'bg-orange',
}

/**
 * Color class mapping for text colors
 * Maps color names (as used in CMS) to Tailwind CSS text classes
 */
export const textColorClassMap: Record<string, string> = {
  'off-white': 'text-off-white',
  'frozen-green': 'text-frozen-green',
  lavender: 'text-lavender',
  'dark-teal': 'text-dark-teal',
  cerulean: 'text-cerulean',
  orange: 'text-orange',
}