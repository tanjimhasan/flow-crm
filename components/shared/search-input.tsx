"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface SearchInputProps {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  placeholder?: string
  debounceMs?: number
  className?: string
}

function SearchInput({
  value: controlledValue,
  defaultValue = "",
  onChange,
  placeholder = "Search...",
  debounceMs = 300,
  className,
}: SearchInputProps) {
  const isControlled = controlledValue !== undefined
  const [internalValue, setInternalValue] = useState(defaultValue)
  const value = isControlled ? controlledValue : internalValue
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined)

  const debouncedOnChange = useCallback(
    (val: string) => {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => {
        onChange?.(val)
      }, debounceMs)
    },
    [onChange, debounceMs]
  )

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current)
  }, [])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value
    if (!isControlled) {
      setInternalValue(newValue)
    }
    debouncedOnChange(newValue)
  }

  function handleClear() {
    if (!isControlled) {
      setInternalValue("")
    }
    onChange?.("")
  }

  return (
    <div className={cn("relative", className)}>
      <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="pl-8 pr-8"
      />
      {value && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          aria-label="Clear search"
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  )
}

export { SearchInput }
