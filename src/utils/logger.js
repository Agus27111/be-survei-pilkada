const winston = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");
const path = require("path");

// Pastikan folder logs ada
const logDir = path.join(__dirname, 'logs');
const fs = require('fs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// Custom format untuk CSV
const csvFormat = winston.format.printf(({ timestamp, level, message, label }) => {
  return `${timestamp},${label},${level},${message}`;
});

const transport = new DailyRotateFile({
  filename: path.join(logDir, "app-%DATE%.csv"), 
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "1m",
  maxFiles: "14d",
  level: "silly",
  handleExceptions: true,
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss.SSS",
    }),
    winston.format.label({ label: "[LOGGER]" }),
    csvFormat
  ),
});

const logger = winston.createLogger({
  level: "silly",
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss.SSS",
    }),
    winston.format.label({ label: "[LOGGER]" }),
    csvFormat
  ),
  transports: [
    new winston.transports.Console({
      level: "silly",
      handleExceptions: true,
      format: winston.format.combine(winston.format.colorize({ all: true })),
    }),
    transport,
  ],
  exceptionHandlers: [transport],
});

module.exports = logger;
