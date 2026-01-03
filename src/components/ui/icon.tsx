import React from 'react'
import { cn } from '@/lib/utils'

const sizeMap: Record<string, string> = {
  'size-3': 'text-xs',
  'size-4': 'text-sm',
  'size-5': 'text-base',
  'size-6': 'text-lg',
  'size-7': 'text-xl',
  'size-8': 'text-2xl',
  'size-9': 'text-3xl',
  'size-10': 'text-4xl',
}

export interface IconProps extends React.HTMLAttributes<HTMLElement> {
  name: string
  size?: keyof typeof sizeMap | string
  label?: string
  type?: 'regular' | 'solid' | 'brands'
  className?: string
}

export function Icon({
  name,
  size = 'size-5',
  className,
  label,
  type = 'regular',
  ...props
}: IconProps) {
  const sizeClass = sizeMap[size as string] || size

  let prefix = 'fi-rr'
  if (type === 'solid') prefix = 'fi-sr'
  if (type === 'brands') prefix = 'fi-brands'

  return (
    <>
      <i
        className={cn(`fi ${prefix}-${name}`, sizeClass, className)}
        aria-hidden={label ? undefined : 'true'}
        aria-label={label}
        role={label ? 'img' : undefined}
        {...props}
      />
      {label && <span className="sr-only">{label}</span>}
    </>
  )
}
