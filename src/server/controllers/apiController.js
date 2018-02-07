import 'babel-polyfill';
import config from 'app-config';
import _ from 'lodash';
import Api from '../models/Api';
import logger from '../utils/logger';
import response from '../utils/responseHelper';
import clientHTTP from '../clientHTTP';

const client = clientHTTP(config.config.kongOptions);

const debug = require('debug')('GSITAE:apiController');

const apiList = async (req, res) => {
  debug('[apiController] apiList');
  try {
    const mongoResponse = await Api.find({});
    const kongResponse = await client.getRequest('/apis');
    const responsePayload = _.unionBy(mongoResponse, kongResponse.body.data, 'name');
    logger.info('[apiController] api list information');
    return response(res, true, { apis: responsePayload }, 200);
  } catch (err) {
    debug('[apiController] Error');
    debug(err);
    logger.error('[apiController] Error api list information');
    return response(res, false, err, 500);
  }
};

const createAPIOauth2 = async (payload, globalCredentials) => {
  debug('[apiController] createAPIOauth2');
  const payloadKong = {
    ...config.config.kongOauth2Plugin,
    'config.enable_client_credentials': globalCredentials,
  };
  debug('payload api');
  debug(payload);
  debug('payload api');
  debug(payloadKong);
  try {
    await client.postRequest('/apis', payload);
    debug('create api');
    await client.postRequest(`/apis/${payload.name}/plugins`, payloadKong);
    return true;
  } catch (err) {
    throw err;
  }
};

const createApi = async (req, res) => {
  debug('[apiController] createapi');
  let kongApiPayload = {};
  try {
    const newapi = new Api(req.body);
    await newapi.save();
    kongApiPayload = _.omit(req.body, ['description', 'manualReference', 'global_credentials']);
    logger.info('[apiController] createapi');
    await createAPIOauth2(kongApiPayload, req.body.global_credentials);
    return response(res, true, req.body, 201);
  } catch (err) {
    debug('[apiController] Error');
    debug(err);
    if (err.name === 'MongoError' && err.code === 11000) {
      return response(res, false, 'Resource Conflict', 409);
    }
    if (kongApiPayload.name) {
      debug('[apiController] Error in api save');
      await Api.remove({ name: req.body.name })
      .then(() => {
        debug('Deleted mongo api created');
        logger.info('[apiController] Deleted mongo api in save');
      })
      .catch(() => {
        debug('Error deleting mongo api created');
        logger.error('[apiController] Error delete mongo api created');
      });
    }
    return response(res, false, err, 500);
  }
};

const deleteApi = async (req, res) => {
  debug('[apiController] deleteapi');
  const { nameapi } = req.params;
  if (!_.isString(nameapi)) {
    debug('[apiController] Error');
    logger.error('[apiController] Error deleting api. Bad request. identifier must be String');
    return response(res, false, 'Bad Request', 400);
  }
  try {
    const responseRemove = await Api.remove({ name: nameapi });
    if (responseRemove.nRemoved === 0) {
      const error = {
        status: 404,
        message: 'Not found register to delete',
      };
      throw error;
    }
    await client.deleteRequest(`/apis/${nameapi}`);
    return response(res, false, 'api removed', 204);
  } catch (err) {
    debug('[apiController] Error');
    if (err.status === 404) {
      logger.error('[apiController] Error deleting api. Not Found');
      return response(res, false, err.message, 404);
    }
    debug(err);
    logger.error('[apiController] Error deleting api');
    return response(res, false, err, 500);
  }
};

export {
  apiList,
  createApi,
  deleteApi,
};
