import path from 'path';
import winston from 'winston';

const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)(),
    new (winston.transports.File)({ filename: path.join(__dirname, './../../logs', '/GSITAE.log') }),
  ],
});

export default logger;
