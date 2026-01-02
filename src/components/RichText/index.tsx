import { MediaBlock } from '@/blocks/MediaBlock/Component'
import {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedLinkNode,
  type DefaultTypedEditorState,
  type SerializedListItemNode,
} from '@payloadcms/richtext-lexical'
import {
  JSXConvertersFunction,
  LinkJSXConverter,
  RichText as ConvertRichText,
} from '@payloadcms/richtext-lexical/react'
import { TypographyJSXConverters } from 'payload-lexical-typography/converters'

import { CodeBlock, CodeBlockProps } from '@/blocks/Code/Component'

import type {
  BannerBlock as BannerBlockProps,
  CallToActionBlock as CTABlockProps,
  MediaBlock as MediaBlockProps,
} from '@/payload-types'
import { BannerBlock } from '@/blocks/Banner/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { cn } from '@/utilities/ui'

type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<CTABlockProps | MediaBlockProps | BannerBlockProps | CodeBlockProps>

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object')
  }
  const slug = value.slug
  return relationTo === 'posts' ? `/posts/${slug}` : `/${slug}`
}

// Helper function to extract text color from nested children
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractTextColor(children: any[]): string | undefined {
  if (!children?.length) return undefined

  for (const child of children) {
    // Check if the child has a style with color
    if (child.style && typeof child.style === 'string') {
      const colorMatch = child.style.match(/color:\s*([^;]+)/)
      if (colorMatch) return colorMatch[1].trim()
    }
    // Recursively check nested children
    if (child.children?.length) {
      const nestedColor = extractTextColor(child.children)
      if (nestedColor) return nestedColor
    }
  }
  return undefined
}

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  ...TypographyJSXConverters,
  // Custom listitem converter that propagates text color to the li element
  listitem: ({ node, nodesToJSX }) => {
    const listItemNode = node as SerializedListItemNode
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const textColor = extractTextColor(listItemNode.children as any[])
    const children = nodesToJSX({ nodes: listItemNode.children })
    const isChecklist = listItemNode.checked !== undefined

    if (isChecklist) {
      return (
        <li
          aria-checked={listItemNode.checked ? 'true' : 'false'}
          className={`list-none relative flex items-start gap-2 ${listItemNode.checked ? 'line-through opacity-70' : ''}`}
          role="checkbox"
          tabIndex={-1}
          value={listItemNode.value}
          style={textColor ? { color: textColor } : undefined}
        >
          <span
            role="checkbox"
            aria-checked={listItemNode.checked ? 'true' : 'false'}
            className="inline-flex items-center justify-center w-[1.125rem] h-[1.125rem] min-w-[1.125rem] border-2 border-current rounded-sm mt-1 flex-shrink-0"
            style={{
              backgroundColor: listItemNode.checked ? 'currentColor' : 'transparent',
            }}
          >
            {listItemNode.checked && (
              <svg
                className="w-3 h-3"
                viewBox="0 0 12 12"
                fill="none"
                stroke="hsl(var(--background))"
                strokeWidth="2"
              >
                <path d="M2 6l3 3 5-5" />
              </svg>
            )}
          </span>
          <span>{children}</span>
        </li>
      )
    }

    return (
      <li value={listItemNode.value} style={textColor ? { color: textColor } : undefined}>
        {children}
      </li>
    )
  },
  blocks: {
    banner: ({ node }) => <BannerBlock className="col-start-2 mb-4" {...node.fields} />,
    mediaBlock: ({ node }) => (
      <MediaBlock
        className="col-start-1 col-span-3"
        imgClassName="m-0"
        {...node.fields}
        captionClassName="mx-auto max-w-[48rem]"
        enableGutter={false}
        disableInnerContainer={true}
      />
    ),
    code: ({ node }) => <CodeBlock className="col-start-2" {...node.fields} />,
    cta: ({ node }) => <CallToActionBlock {...node.fields} />,
  },
})

type Props = {
  data: DefaultTypedEditorState
  enableGutter?: boolean
  enableProse?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export default function RichText(props: Props) {
  const { className, enableProse = true, enableGutter = true, ...rest } = props
  return (
    <ConvertRichText
      converters={jsxConverters}
      className={cn(
        'payload-richtext',
        {
          container: enableGutter,
          'max-w-none': !enableGutter,
          'mx-auto prose md:prose-md': enableProse,
        },
        className,
      )}
      {...rest}
    />
  )
}
