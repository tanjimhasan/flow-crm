"use client"

import { Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

interface FilterOption {
  label: string
  value: string
}

interface FilterDropdownProps {
  label: string
  options: FilterOption[]
  selected: string[]
  onChange: (selected: string[]) => void
  className?: string
}

function FilterDropdown({
  label,
  options,
  selected,
  onChange,
  className,
}: FilterDropdownProps) {
  const isActive = selected.length > 0

  function handleToggle(value: string) {
    if (selected.includes(value)) {
      onChange(selected.filter((s) => s !== value))
    } else {
      onChange([...selected, value])
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "gap-1.5",
              isActive && "border-primary/50 bg-primary/5",
              className
            )}
          >
            <Filter className="size-4" />
            {label}
            {isActive && ` (${selected.length})`}
          </Button>
        }
      >
        {label}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48">
        <DropdownMenuLabel>{label}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {options.map((option) => (
          <DropdownMenuCheckboxItem
            key={option.value}
            checked={selected.includes(option.value)}
            onCheckedChange={() => handleToggle(option.value)}
          >
            {option.label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { FilterDropdown }
