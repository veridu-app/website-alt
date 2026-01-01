import { cn } from '@/utilities/ui'
import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap text-sm font-semiexpanded font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    defaultVariants: {
      size: 'default',
      variant: 'default',
      cutCorner: false,
    },
    variants: {
      size: {
        clear: '',
        default: 'h-10 px-6 py-2',
        icon: 'h-10 w-10',
        lg: 'h-12 px-10 text-base',
        sm: 'h-9 px-4',
      },
      cutCorner: {
        true: 'cut-corner',
        false: '',
      },
      variant: {
        default: 'bg-cerulean text-off-white hover:bg-cerulean/90 button-cut-corners',
        accent: 'bg-orange text-off-white hover:bg-orange/90 button-cut-corners',
        'accent-dark': 'bg-orange text-dark-teal hover:bg-orange/90 button-cut-corners',
        secondary: 'bg-frozen-green text-dark-teal hover:bg-frozen-green/80 button-cut-corners',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90 button-cut-corners',
        ghost: 'hover:bg-lavender hover:text-dark-teal',
        link: 'text-cerulean items-start justify-start underline-offset-4 hover:underline',
        lavender: 'bg-lavender text-dark-teal hover:bg-lavender/80 button-cut-corners',
        light: 'bg-off-white text-dark-teal hover:bg-off-white/90 button-cut-corners',
        textbutton: 'text-dark-teal hover:text-cerulean underline-offset-4 hover:underline',
      },
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
  showArrow?: boolean
  ref?: React.Ref<HTMLButtonElement>
}

const Button: React.FC<ButtonProps> = ({
  asChild = false,
  className,
  size,
  variant,
  cutCorner,
  showArrow = false,
  ref,
  children,
  ...props
}) => {
  const Comp = asChild ? Slot : 'button'

  // When asChild is true, Slot expects a single React element
  // If we need to add an arrow, wrap everything in a span
  const buttonContent =
    showArrow && asChild ? (
      <span className="inline-flex items-center">
        <span className="mr-2 text-lg leading-none">→</span>
        {children}
      </span>
    ) : showArrow ? (
      <>
        <span className="mr-2 text-lg leading-none">→</span>
        {children}
      </>
    ) : (
      children
    )

  return (
    <Comp
      className={cn(buttonVariants({ className, size, variant, cutCorner }))}
      ref={ref}
      {...props}
    >
      {buttonContent}
    </Comp>
  )
}

export { Button, buttonVariants }
