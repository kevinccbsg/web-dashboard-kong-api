import 'babel-polyfill';
import logger from '../utils/logger';

const getLabs = (req, res) => {
  logger.info('getLabs');
  res.send('getLabs');
};
const createLab = (req, res) => {
  logger.info('createLab');
  res.send('createLab');
};
const deleteLabs = (req, res) => {
  logger.info('deleteLabs');
  res.send('deleteLabs');
};

export {
  getLabs,
  createLab,
  deleteLabs,
};
