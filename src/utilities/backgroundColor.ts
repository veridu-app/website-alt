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
 * Reverse mapping: from Tailwind CSS class to color name
 * Used when reading background classes from DOM elements
 */
export const backgroundClassToColorMap: Record<string, string> = {
  'bg-off-white': 'bg-off-white',
  'bg-frozen-green': 'bg-frozen-green',
  'bg-lavender': 'bg-lavender',
  'bg-dark-teal': 'bg-dark-teal',
  'bg-cerulean': 'bg-cerulean',
  'bg-orange': 'bg-orange',
}
