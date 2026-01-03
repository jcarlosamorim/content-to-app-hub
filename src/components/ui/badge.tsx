import React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        success:
          "border-transparent bg-success text-success-foreground hover:bg-success/80",
        warning:
          "border-transparent bg-warning text-warning-foreground hover:bg-warning/80",
        info:
          "border-transparent bg-info text-info-foreground hover:bg-info/80",
        outline: "text-foreground border-border",
        done: "border-transparent bg-success/20 text-success",
        "in-progress": "border-transparent bg-info/20 text-info",
        todo: "border-transparent bg-muted text-muted-foreground",
        locked: "border-transparent bg-muted/50 text-muted-foreground opacity-60",
      },
      size: {
        default: "px-2.5 py-0.5 text-xs",
        sm: "px-1.5 py-0.5 text-[10px]",
        lg: "px-3 py-1 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export type BadgeProps = React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof badgeVariants>

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
