import logger from './logger';

// seteo general de la respuesta para unicamente configurar errores y http_code
const respond = (res, status, data, httpCode) => {
  const responseHTTPCode = httpCode || 500;
  if (status === true) {
    logger.info(`Responding to user with http_code = ${responseHTTPCode}`);
  } else {
    logger.error(`Responding to user with http_code = ${responseHTTPCode}`);
  }

  if (data !== null && data !== undefined) {
    return res.status(responseHTTPCode).json(data);
  }
  return res.status(responseHTTPCode).json({});
};

module.exports = respond;
