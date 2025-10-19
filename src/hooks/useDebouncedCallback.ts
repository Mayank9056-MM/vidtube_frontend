// src/hooks/useDebouncedCallback.ts
import { useCallback, useRef } from 'react'

/**
 * Debounce any function (e.g., API call, event handler)
 */
export const useDebouncedCallback = <T extends (...args: any[]) => void>(
  callback: T,
  delay: number
) => {
  const timeoutRef = useRef<NODEJS.Timeout>()

  const debouncedFn = useCallback(
    (...args: Parameters<T>) => {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => {
        callback(...args)
      }, delay)
    },
    [callback, delay]
  )

  return debouncedFn
}
