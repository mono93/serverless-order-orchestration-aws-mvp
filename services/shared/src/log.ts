import { LogLevel } from "./types";

const levelOrder: Record<LogLevel, number> = {
  'DEBUG': 0,
  'INFO': 1,
  'WARN': 2,
  'ERROR': 3
};

const currentLogLevel: LogLevel = process.env.LOG_LEVEL as LogLevel || 'INFO';

function log(level: LogLevel, message: string, meta: Record<string, any> = {}) {
    if (levelOrder[level] < levelOrder[currentLogLevel]) return;
    const timestamp = new Date().toISOString();

    if (Object.keys(meta).length > 0) {
        message += ` | ${JSON.stringify(meta)}`;
    }

    console.log(`[${timestamp}] [${level}] ${message}`);
}

export const Logger = {
    debug: (message: string, meta: Record<string, any> = {}) => log('DEBUG', message, meta),
    info: (message: string, meta: Record<string, any> = {}) => log('INFO', message, meta),
    warn: (message: string, meta: Record<string, any> = {}) => log('WARN', message, meta),
    error: (message: string, meta: Record<string, any> = {}) => log('ERROR', message, meta),
};