import { conf } from "@/conf/conf"

// src/utils/logger.ts
const isDev = conf.mode === 'development'

/**
 * Centralized logger utility for both dev and prod.
 * Automatically disables sensitive logs in production.
 */
export const logger = {
  info: (...args: any[]) => {
    if (isDev) console.info('[INFO]', ...args)
  },
  warn: (...args: any[]) => {
    console.warn('[WARN]', ...args)
  },
  error: (...args: any[]) => {
    console.error('[ERROR]', ...args)
    // Optionally send to remote logging service
    // sendErrorToServer(args)
  },
  debug: (...args: any[]) => {
    if (isDev) console.debug('[DEBUG]', ...args)
  },
}
