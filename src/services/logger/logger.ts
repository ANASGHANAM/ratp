import * as pino from 'pino';
import { config } from '../../config';

export interface DsLogger {
  child(bindings: Record<string, unknown>): DsLogger;
  debug(message: string, otherData?: Record<string, unknown> | Error, error?: Error): void;
  info(message: string, otherData?: Record<string, unknown> | Error, error?: Error): void;
  warn(message: string, otherData?: Record<string, unknown> | Error, error?: Error): void;
  error(message: string, otherData?: Record<string, unknown> | Error, error?: Error): void;
}

// TODO: shall not be exported (for test purpose)
export const formatLevel = { level: (label: string) => ({ level: label }) };

const options: pino.LoggerOptions = {
  name: config.logs.name,
  level: config.logs.level,
  ...(process.env.NODE_ENV !== 'production' && {
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        minimumLevel: config.logs.level,
        levelFirst: true,
        translateTime: true,
        singleLine: false,
      },
    },
  }),
  formatters: formatLevel,
};

export class DsLoggerImpl implements DsLogger {
  private logger: pino.Logger;

  public constructor(logger: pino.Logger) {
    this.logger = logger;
  }

  public child(bindings: Record<string, unknown>) {
    return new DsLoggerImpl(this.logger.child(bindings));
  }

  public debug(message: string, otherData?: Record<string, unknown> | Error, error?: Error): void {
    this.log('debug', message, otherData, error);
  }

  public info(message: string, otherData?: Record<string, unknown> | Error, error?: Error): void {
    this.log('info', message, otherData, error);
  }

  public warn(message: string, otherData?: Record<string, unknown> | Error, error?: Error): void {
    this.log('warn', message, otherData, error);
  }

  public error(message: string, otherData?: Record<string, unknown> | Error, error?: Error): void {
    this.log('error', message, otherData, error);
  }

  private log(
    level: 'info' | 'warn' | 'error' | 'debug',
    message: string,
    otherData?: Record<string, unknown> | Error,
    error?: Error
  ): void {
    if (!otherData && !error) {
      this.logger[level](message);
    } else if (otherData) {
      if (otherData instanceof Error) {
        this.logger[level](
          {
            err: error ? error : otherData,
          },
          message
        );
      } else {
        this.logger[level](
          {
            ...otherData,
            ...(error && { err: error }),
          },
          message
        );
      }
    } else {
      this.logger[level](
        {
          err: error,
        },
        message
      );
    }
  }
}

export default new DsLoggerImpl(pino.default(options)) as DsLogger;
