import 'babel-polyfill';
import config from 'app-config';
import _ from 'lodash';
import Permission from './../models/Permission';
import logger from './../utils/logger';
import response from './../utils/responseHelper';
import clientHTTP from './../clientHTTP';

const responseProjection = [
  'client_id',
  'created_at',
  'description',
  'name',
];

const client = clientHTTP(config.config.kongOptions);

const debug = require('debug')('GSITAE:labController');

const getLabs = async (req, res) => {
  debug('[labController] getLabs');
  try {
    const mongoResponse = await Permission.find({});
    const kongResponse = await client.getRequest('/consumers');
    const consumerList = kongResponse.body.data;
    const requestApplication = [];
    consumerList.forEach((obj) => {
      requestApplication.push(client.getRequest(`/consumers/${obj.username}/oauth2`));
    });
    const appRequests = await Promise.all(requestApplication);
    debug('***');
    const formatedData = appRequests.map(obj => obj.body.data[0])
      .filter(objF => objF.consumer_id !== config.config.application.consumer_id);
    debug(mongoResponse);
    debug('---');
    debug(formatedData);
    const responsePayload = _.unionBy(formatedData, mongoResponse, 'name')
      .map((obj) => {
        const mongoSearch = mongoResponse.find(objF => objF.name === obj.name);
        const lab = _.pick({
          ...obj,
          description: (mongoSearch) ? mongoSearch.description : 'None',
        }, responseProjection);
        return lab;
      });
    logger.info('[labController] lab list information');
    return response(res, true, { labs: responsePayload }, 200);
  } catch (err) {
    debug('[labController] Error');
    debug(err);
    logger.error('[labController] Error lab list information');
    return response(res, false, err, 500);
  }
};

const createApplication = async (payload) => {
  debug('[labController] createApplication');
  debug('payload lab');
  debug(payload);
  try {
    await client.postRequest('/consumers', {
      username: payload.name,
    });
    debug('create api');
    await client.postRequest(`/consumers/${payload.name}/oauth2`, payload);
    return true;
  } catch (err) {
    throw err;
  }
};

const createLab = async (req, res) => {
  debug('[labController] createlab');
  let kongLabPayload = {};
  try {
    const payload = _.pick(req.body, ['name', 'description', 'redirect_uri']);
    const newLab = new Permission(payload);
    await newLab.save();
    kongLabPayload = _.omit(req.body, ['description']);
    logger.info('[labController] createlab');
    await createApplication(kongLabPayload);
    return response(res, true, req.body, 201);
  } catch (err) {
    debug('[labController] Error');
    debug(err);
    if (err.name === 'MongoError' && err.code === 11000) {
      return response(res, false, 'Resource Conflict', 409);
    }
    if (kongLabPayload.name) {
      debug('[labController] Error in lab save');
      await Permission.remove({ name: req.body.name })
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
  debug('[labController] deletelab');
  const { nameLab } = req.params;
  if (!_.isString(nameLab)) {
    debug('[apiController] Error');
    logger.error('[apiController] Error deleting lab. Bad request. identifier must be String');
    return response(res, false, 'Bad Request', 400);
  }
  try {
    const responseRemove = await Permission.remove({ name: nameLab });
    if (responseRemove.nRemoved === 0) {
      const error = {
        status: 404,
        message: 'Not found register to delete',
      };
      throw error;
    }
    await client.deleteRequest(`/consumers/${nameLab}`);
    return response(res, false, 'lab removed', 204);
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
  getLabs,
  createLab,
  deleteLab,
};
