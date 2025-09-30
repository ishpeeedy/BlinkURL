import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    }),
    // Add file transport for production
    ...(process.env.NODE_ENV === 'production' 
      ? [
          new winston.transports.File({ filename: 'error.log', level: 'error' }),
          new winston.transports.File({ filename: 'combined.log' })
        ] 
      : []
    )
  ]
});

// If we're not in production, also log to the console with more details
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    )
  }));
}

export default logger;