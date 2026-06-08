"use client"

import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const statusBadgeVariants = cva(
  "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
  {
    variants: {
      variant: {
        default: "bg-secondary text-secondary-foreground",
        active: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
        inactive: "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400",
        pending: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
        won: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
        lost: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
        lead: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface StatusBadgeProps
  extends VariantProps<typeof statusBadgeVariants> {
  children: React.ReactNode
  className?: string
}

function StatusBadge({ variant, children, className }: StatusBadgeProps) {
  return (
    <span className={cn(statusBadgeVariants({ variant }), className)}>
      {children}
    </span>
  )
}

export { StatusBadge, statusBadgeVariants }
