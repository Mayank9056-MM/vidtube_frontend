// src/hooks/useDebounce.ts
import { useEffect, useState } from 'react'

/**
 * Custom hook to debounce any fast-changing value.
 *
 * @param value - The value to debounce
 * @param delay - Delay in milliseconds (default: 500ms)
 * @returns Debounced value
 */
export function useDebounce<T>(value: T, delay = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // Cleanup: cancel timeout if value changes before delay completes
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}
