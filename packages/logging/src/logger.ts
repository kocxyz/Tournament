import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.printf((options) => {
    // you can pass any custom variable in options by calling
    // logger.log({level: 'debug', message: 'hi', moduleName: 'my_module' })
    return `[${options.moduleName}] ${options.level}: ${options.message}`;
  }),
  defaultMeta: {},
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console());
}

export function createLogger(name: string) {
  // set the default moduleName of the child
  return logger.child({ moduleName: name });
}
