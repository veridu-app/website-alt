import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

/**
 * Checks if a RichText field has actual content (not empty)
 * Acts as a type guard to narrow the type
 * @param richText - The RichText field to check
 * @returns true if the RichText field has content, false otherwise
 */
export function hasRichTextContent(
  richText: DefaultTypedEditorState | null | undefined,
): richText is DefaultTypedEditorState {
  if (!richText) return false

  if (!richText.root || !richText.root.children) return false

  if (!Array.isArray(richText.root.children) || richText.root.children.length === 0) {
    return false
  }

  // Helper function to recursively check if a node has content
  const hasNodeContent = (node: any): boolean => {
    if (!node) return false

    // Check if node has text content
    if (node.text && typeof node.text === 'string' && node.text.trim().length > 0) {
      return true
    }

    // Check if node has nested children with content
    if (node.children && Array.isArray(node.children) && node.children.length > 0) {
      return node.children.some(hasNodeContent)
    }

    return false
  }

  // Check if at least one child has actual content
  return richText.root.children.some(hasNodeContent)
}
