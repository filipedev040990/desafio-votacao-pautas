import { randomUUID } from 'crypto'
import pino, { Logger as PinoLogger, LogFn } from 'pino'

type LogLevel = 'info' | 'error' | 'warn' | 'debug' | 'trace'

interface Logger {
  info: (message: string, obj?: object) => void
  error: (message: string, obj?: object) => void
  warn: (message: string, obj?: object) => void
  debug: (message: string, obj?: object) => void
  trace: (message: string, obj?: object) => void
}

const baseLogger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true
    }
  }
})

const createLogger = (): Logger => {
  const requestId = randomUUID()

  const logWithTracking = (level: LogLevel, message: string, obj?: object) => {
    const additionalInfo = { requestId, ...obj }
    ;(baseLogger[level] as LogFn)(additionalInfo, message)
  }

  return {
    info: (message, obj) => logWithTracking('info', message, obj),
    error: (message, obj) => logWithTracking('error', message, obj),
    warn: (message, obj) => logWithTracking('warn', message, obj),
    debug: (message, obj) => logWithTracking('debug', message, obj),
    trace: (message, obj) => logWithTracking('trace', message, obj)
  }
}

export { createLogger }
