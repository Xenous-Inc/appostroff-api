import { createLogger, format, transports } from 'winston';
import * as colors from 'colors';

// eslint-disable-next-line @typescript-eslint/no-shadow
const logger_format = format.printf(data => {
    const timestamp = colors.magenta(`${data.timestamp}`);
    return `[${timestamp}]  ${colors.bold(data.level)}: ${colors.cyan(data.message)}`;
});
const { combine, splat, timestamp } = format;
export const logger = createLogger({
    format: combine(
        format(info => {
            info.level = info.level.toUpperCase();
            return info;
        })(),
        format.colorize(),
        splat(),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        logger_format,
    ),
    transports: [new transports.Console({ level: 'info' })],
});
