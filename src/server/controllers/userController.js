import 'babel-polyfill';
import config from 'app-config';
import _ from 'lodash';
import CalendarDate from '../models/CalendarDate';
import logger from './../utils/logger';
import response from './../utils/responseHelper';
import clientHTTP from './../clientHTTP';
import setToken from './../utils/setToken';
import {
  getClientToken,
} from './oauthController';

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
    const headers = setToken(req);
    client.setHeaders(headers);
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
    const headers = setToken(req);
    client.setHeaders(headers);
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

const getMyUser = async (req, res) => {
  debug('[userController] getMyUser');
  const code = req.user.code || '50006';
  try {
    const headers = setToken(req);
    client.setHeaders(headers);
    let responseObject = {};
    const apiResponse = await client.getRequest(`/userapi/user/${code}`);
    const selectedDates = await CalendarDate.find({
      application: {
        $in: apiResponse.body.permissions,
      },
    });
    responseObject = {
      ...apiResponse.body,
      selectedDates,
    };
    return response(res, false, responseObject, 200);
  } catch (err) {
    debug('[userController] Error');
    if (err.status === 404) {
      logger.error('[userController] Error getting my User. Not Found');
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
  try {
    const headers = setToken(req);
    client.setHeaders(headers);
    const apiResponse = await client.getRequest(`/userapi/user/${code}`);
    return response(res, false, apiResponse.body, 200);
  } catch (err) {
    debug('[userController] Error');
    if (err.status === 404) {
      logger.error('[userController] Error getting User. Not Found');
      return response(res, false, err.message, 404);
    }
    debug(err);
    logger.error('[userController] Error getting User');
    return response(res, false, err, 500);
  }
};


const getRolePermissions = async (req, res) => {
  debug('[userController] getRolePermissions');
  try {
    const headers = setToken(req);
    client.setHeaders(headers);
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

const getUserInfo = async (code) => {
  debug('[userController] getUser');
  try {
    const clientToken = await getClientToken(config.config.application.client_id,
      config.config.application.client_secret);
    debug('Get Client Token');
    const headers = {
      Authorization: `Bearer ${clientToken.access_token}`,
    };
    client.setHeaders(headers);
    const apiResponse = await client.getRequest(`/userapi/user/${code}`);
    return apiResponse.body;
  } catch (err) {
    debug('Error getUserInfo');
    debug(err);
    throw err;
  }
};

export {
  getUser,
  deleteUser,
  createUser,
  userList,
  getRolePermissions,
  patchUser,
  getMyUser,
  getUserInfo,
};
