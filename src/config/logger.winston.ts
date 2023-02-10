import { createLogger, format, transports } from 'winston';
const { combine, splat, timestamp, printf } = format;

// eslint-disable-next-line @typescript-eslint/no-shadow
const myFormat = printf(({ level, message, timestamp, ...metadata }) => {
    let msg = `${timestamp} [${level}] : ${message} `;
    if (metadata) {
        msg += JSON.stringify(metadata);
    }
    return msg;
});

export const logger = createLogger({
    format: combine(format.colorize(), splat(), timestamp(), myFormat),
    transports: [new transports.Console({ level: 'info' })],
});
