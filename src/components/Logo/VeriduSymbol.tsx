import React from 'react'

interface VeriduSymbolProps {
  className?: string
  strokeColor?: string
  strokeWidth?: string
}

/**
 * Veridu Symbol SVG Component
 * Paths from /logos/veridu-Symbol-without-circle-light.svg
 */
export const VeriduSymbol: React.FC<VeriduSymbolProps> = ({
  className = 'w-full h-auto',
  strokeColor = 'hsl(var(--accent))',
  strokeWidth = '2.5px',
}) => {
  return (
    <svg
      className={className}
      viewBox="0 0 223.07 215.9"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <style>
          {`.veridu-symbol-path {
            fill: none;
            stroke: ${strokeColor};
            stroke-linecap: round;
            stroke-linejoin: round;
            stroke-width: ${strokeWidth};
          }`}
        </style>
      </defs>
      <path
        className="veridu-symbol-path"
        d="M56.21,214.65c5.21-1.7,74.39-18.91,84.77-76.98,1.21-6.78,6.62-36.28-9.94-53.93-13.95-14.87-33.11-10.23-70.19-18.73-26.3-6.03-46.53-15.25-59.6-22.05,5.03,4.53,13.06,11.45,20.89,21.8,21.49,28.41,21.03,42.04,40.26,52.7,14.41,7.99,33.49,11.13,49.08,5,19.86-7.81,31.64-28.92,34.05-33.47,3.34-6.3,14.78-29.76,23.69-33.47,8.5-3.53,10.85.03,27.43-3.55,12.88-2.78,25.18-9.01,25.18-9.01-6.23,2.83-18.56,15.54-30.26,34.88-19.4,32.07-10.07,55.85-28.41,70.22-18.52,14.52-37.82-2.07-63.99,9.01-24.9,10.54-35.75,31.31-42.96,57.57Z"
      />
      <path
        className="veridu-symbol-path"
        d="M151.17,77.35s-3.52-17.33-26.13-24.32C102.44,46.04,50.24,29.3,36.88,1.25"
      />
    </svg>
  )
}
