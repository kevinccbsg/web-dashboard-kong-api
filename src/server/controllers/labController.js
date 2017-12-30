import 'babel-polyfill';
import config from 'app-config';
import _ from 'lodash';
import Lab from '../models/Lab';
import logger from '../utils/logger';
import response from '../utils/responseHelper';
import clientHTTP from '../clientHTTP';

const client = clientHTTP(config.config.kongOptions);

const debug = require('debug')('GSITAE:labController');

const labList = async (req, res) => {
  debug('[labController] labList');
  try {
    const mongoResponse = await Lab.find({});
    const kongResponse = await client.getRequest('/apis');
    const responsePayload = _.unionBy(mongoResponse, kongResponse.body.data, 'name');
    logger.info('[labController] Lab list information');
    return response(res, true, { labs: responsePayload }, 200);
  } catch (err) {
    debug('[labController] Error');
    debug(err);
    logger.error('[labController] Error Lab list information');
    return response(res, false, err, 500);
  }
};

const createAPIOauth2 = async (payload) => {
  debug('[labController] createAPIOauth2');
  try {
    await client.postRequest('/apis', payload);
    await client.postRequest(`/apis/${payload.name}/plugins`, config.config.kongOauth2Plugin);
    return true;
  } catch (err) {
    throw err;
  }
};

const createLab = async (req, res) => {
  debug('[labController] createLab');
  let kongApiPayload = {};
  try {
    const newLab = new Lab(req.body);
    await newLab.save();
    kongApiPayload = _.omit(req.body, ['description', 'manualReference']);
    logger.info('[labController] createLab');
    await createAPIOauth2(kongApiPayload);
    return response(res, true, req.body, 201);
  } catch (err) {
    debug('[labController] Error');
    debug(err);
    if (err.name === 'MongoError' && err.code === 11000) {
      return response(res, false, 'Resource Conflict', 409);
    }
    if (kongApiPayload.name) {
      debug('[labController] Error in mongo save');
      await Lab.remove({ name: req.body.name })
      .then(() => {
        debug('Deleted mongo lab created');
        logger.info('[labController] Deleted mongo lab in save');
      })
      .catch(() => {
        debug('Error deleting mongo lab created');
        logger.error('[labController] Error delete mongo lab created');
      });
    }
    return response(res, false, err, 500);
  }
};

const deleteLab = async (req, res) => {
  debug('[labController] deleteLab');
  const { nameLab } = req.params;
  if (!_.isString(nameLab)) {
    debug('[labController] Error');
    logger.error('[labController] Error deleting lab. Bad request. identifier must be String');
    return response(res, false, 'Bad Request', 400);
  }
  try {
    const responseRemove = await Lab.remove({ name: nameLab });
    if (responseRemove.nRemoved === 0) {
      const error = {
        status: 404,
        message: 'Not found register to delete',
      };
      throw error;
    }
    return response(res, false, 'Lab removed', 204);
  } catch (err) {
    debug('[labController] Error');
    if (err.status === 404) {
      logger.error('[labController] Error deleting lab. Not Found');
      return response(res, false, err.message, 404);
    }
    debug(err);
    logger.error('[labController] Error deleting lab');
    return response(res, false, err, 500);
  }
};

export {
  labList,
  createLab,
  deleteLab,
};
