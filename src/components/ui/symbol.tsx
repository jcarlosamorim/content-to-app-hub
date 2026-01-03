import React from 'react'
import { cn } from '@/lib/utils'

export const SYMBOLS = {
  infinity: '∞',
  star: '✦',
  bullet: '·',
  diamond: '◆',
} as const

export type SymbolName = keyof typeof SYMBOLS

export interface SymbolProps extends React.HTMLAttributes<HTMLSpanElement> {
  name: SymbolName
  className?: string
}

export function Symbol({ name, className, ...props }: SymbolProps) {
  return (
    <span
      className={cn('inline-block', className)}
      aria-hidden="true"
      {...props}
    >
      {SYMBOLS[name]}
    </span>
  )
}
