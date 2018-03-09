import 'babel-polyfill';
import config from 'app-config';
import _ from 'lodash';
import logger from './../utils/logger';
import response from './../utils/responseHelper';
import clientHTTP from './../clientHTTP';
import setToken from './../utils/setToken';

const respProjection = [
  'client_id',
  'redirect_uri',
  'created_at',
  'description',
  'name',
  'url',
];

const client = clientHTTP(config.config.kongOptions);
const clientUserAPI = clientHTTP(config.config.userapiOptions);

const debug = require('debug')('GSITAE:labController');

const getLabs = async (req, res) => {
  debug('[labController] getLabs');
  const { username } = req.user;
  const { permissions, roles } = username;
  const adminRoute = req.originalUrl.includes('admin');
  debug(adminRoute);
  try {
    const headers = setToken(req);
    clientUserAPI.setHeaders(headers);
    const { body } = await clientUserAPI.getRequest('/userapi/permissions');
    const kongResponse = await client.getRequest('/consumers');
    const consumerList = kongResponse.body.data;
    const requestApplication = [];
    consumerList.forEach((obj) => {
      requestApplication.push(client.getRequest(`/consumers/${obj.username}/oauth2`));
    });
    const appRequests = await Promise.all(requestApplication);
    debug('***');
    const formatedData = appRequests.map(obj => obj.body.data[0])
    .filter((objF) => {
      if (!objF) return false;
      if (objF.consumer_id === config.config.application.consumer_id) return false;
      return true;
    });
    debug(body.permissions);
    debug('---');
    debug(formatedData);
    const formatProjection = (adminRoute) ? respProjection.concat('client_secret') : respProjection;
    const responsePayload = _.unionBy(formatedData, body.permissions, 'name')
      .map((obj) => {
        const mongoSearch = body.permissions.find(objF => objF.name === obj.name);
        const lab = _.pick({
          ...obj,
          description: (mongoSearch) ? mongoSearch.description : 'None',
          url: `/GSITAE/authorice?client_id=${obj.client_id}`,
        }, formatProjection);
        return lab;
      });
    let roleResponse = responsePayload;
    if (!roles.includes('ADMIN')) {
      roleResponse = responsePayload.filter(objF => permissions.includes(objF.name));
    }
    logger.info('[labController] lab list information');
    return response(res, true, { labs: roleResponse }, 200);
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
    const headers = setToken(req);
    clientUserAPI.setHeaders(headers);
    await clientUserAPI.postRequest('/userapi/permission', payload);
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
      const headers = setToken(req);
      clientUserAPI.setHeaders(headers);
      await clientUserAPI.deleteRequest(`/userapi/permission/${req.body.name}`)
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

const patchLab = async (req, res) => {
  debug('[labController] deletelab');
  const { nameLab } = req.params;
  const payload = req.body;
  if (!_.isString(nameLab)) {
    debug('[apiController] Error');
    logger.error('[apiController] Error deleting lab. Bad request. identifier must be String');
    return response(res, false, 'Bad Request', 400);
  }
  try {
    const headers = setToken(req);
    clientUserAPI.setHeaders(headers);
    await clientUserAPI.patchRequest(`/userapi/permission/${nameLab}`, payload);
    const responseConsumer = await client.getRequest(`/consumers/${nameLab}/oauth2`);
    const data = responseConsumer.body.data[0];
    const redirectUri = data.redirect_uri;
    if (redirectUri === payload.redirect_uri) {
      return response(res, false, payload, 200);
    }
    await client.patchRequest(`/consumers/${nameLab}/oauth2/${data.id}`, {
      redirect_uri: payload.redirect_uri,
    });
    return response(res, false, payload, 200);
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

const deleteLab = async (req, res) => {
  debug('[labController] deletelab');
  const { nameLab } = req.params;
  if (!_.isString(nameLab)) {
    debug('[apiController] Error');
    logger.error('[apiController] Error deleting lab. Bad request. identifier must be String');
    return response(res, false, 'Bad Request', 400);
  }
  try {
    const headers = setToken(req);
    clientUserAPI.setHeaders(headers);
    await clientUserAPI.deleteRequest(`/userapi/permission/${nameLab}`);
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
  patchLab,
};
