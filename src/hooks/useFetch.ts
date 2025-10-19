import { useEffect, useState, useCallback, useRef } from 'react'
import axiosInstance from '@/api/axiosInstance'
import { logger } from '@/utils/logger'

/**
 * Universal data fetching hook for API calls with built-in error handling.
 *
 * @param url API endpoint to fetch
 * @param deps Dependency array to re-run fetch
 */
export const useFetch = <T = any>(url: string, deps: any[] = []) => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const abortController = useRef<AbortController | null>(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    abortController.current = new AbortController()

    try {
      const res = await axiosInstance.get<T>(url, {
        signal: abortController.current.signal,
      })
      setData(res.data)
    } catch (err: any) {
      if (err.name !== 'CanceledError') {
        const message = err.response?.data?.message || err.message || 'Unknown Error'
        setError(message)
        logger.error('Fetch error:', message)
      }
    } finally {
      setLoading(false)
    }
  }, [url])

  useEffect(() => {
    fetchData()
    return () => abortController.current?.abort()
  }, deps) // eslint-disable-line react-hooks/exhaustive-deps

  return { data, loading, error, refetch: fetchData }
}
