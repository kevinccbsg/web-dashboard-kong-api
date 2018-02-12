import 'babel-polyfill';
import config from 'app-config';
import _ from 'lodash';
import logger from './../utils/logger';
import response from './../utils/responseHelper';
import clientHTTP from './../clientHTTP';
import setToken from './../utils/setToken';

const userFields = [
  'name',
  'surname',
  'code',
  'email',
  'grade',
  'faculty',
];

const client = clientHTTP(config.config.userapiOptions);

const debug = require('debug')('GSITAE:userController');

const userList = async (req, res) => {
  debug('[userController] userList');
  try {
    const headers = setToken(req);
    client.setHeaders(headers);
    const apiResponse = await client.getRequest('/userapi/users');
    logger.info('[userController] User list information');
    return response(res, true, { users: apiResponse.body.users }, 200);
  } catch (err) {
    debug('[userController] Error');
    debug(err);
    logger.error('[userController] Error User list information');
    return response(res, false, err, 500);
  }
};

const createUser = async (req, res) => {
  debug('[userController] createUser');
  try {
    const payload = _.pick(req.body, userFields);
    const userPayload = { ...payload, roles: config.config.basicInitRole };
    const headers = setToken(req);
    client.setHeaders(headers);
    await client.postRequest('/userapi/user', userPayload);
    return response(res, true, payload, 201);
  } catch (err) {
    debug('[userController] Error');
    debug(err);
    logger.error('[userController] Error User list information');
    return response(res, false, err, 500);
  }
};

const patchUser = async (req, res) => {
  debug('[userController] patchUser');
  const { code } = req.params;
  try {
    await client.patchRequest(`/userapi/user/${code}`, req.body);
    return response(res, false, req.body, 200);
  } catch (err) {
    debug('[userController] Error');
    if (err.status === 404) {
      logger.error('[userController] Error deleting User. Not Found');
      return response(res, false, err.message, 404);
    }
    debug(err);
    logger.error('[userController] Error deleting User');
    return response(res, false, err, 500);
  }
};

const deleteUser = async (req, res) => {
  debug('[userController] deleteUser');
  const { code } = req.params;
  if (!_.isString(code)) {
    debug('[userController] Error');
    logger.error('[userController] Error deleting User. Bad request. identifier must be String');
    return response(res, false, 'Bad Request', 400);
  }
  try {
    await client.deleteRequest(`/userapi/user/${code}`);
    return response(res, false, 'User removed', 204);
  } catch (err) {
    debug('[userController] Error');
    if (err.status === 404) {
      logger.error('[userController] Error deleting User. Not Found');
      return response(res, false, err.message, 404);
    }
    debug(err);
    logger.error('[userController] Error deleting User');
    return response(res, false, err, 500);
  }
};

const getUser = async (req, res) => {
  debug('[userController] getUser');
  const { code } = req.params;
  if (_.isString(code)) {
    debug('[userController] Error');
    logger.error('[userController] Error getting User. Bad request. identifier must be Number');
    return response(res, false, 'Bad Request', 400);
  }
  try {
    const apiResponse = await client.deleteRequest(`/userapi/user/${code}`);
    return response(res, false, apiResponse.body, 200);
  } catch (err) {
    debug('[userController] Error');
    if (err.status === 404) {
      logger.error('[userController] Error deleting User. Not Found');
      return response(res, false, err.message, 404);
    }
    debug(err);
    logger.error('[userController] Error deleting User');
    return response(res, false, err, 500);
  }
};


const getRolePermissions = async (req, res) => {
  debug('[userController] getRolePermissions');
  try {
    const apiResponse = await client.getRequest('/userapi/rolepermission');
    logger.info('[userController] User list information');
    return response(res, true, apiResponse.body, 200);
  } catch (err) {
    debug('[userController] Error');
    debug(err);
    logger.error('[userController] Error User list information');
    return response(res, false, err, 500);
  }
};

export {
  getUser,
  deleteUser,
  createUser,
  userList,
  getRolePermissions,
  patchUser,
};
