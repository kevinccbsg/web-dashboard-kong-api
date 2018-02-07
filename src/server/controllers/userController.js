import 'babel-polyfill';
import config from 'app-config';
import _ from 'lodash';
import logger from '../utils/logger';
import response from '../utils/responseHelper';

const userFields = [
  'name',
  'surname',
  'code',
  'email',
  'grade',
  'faculty',
];

const debug = require('debug')('GSITAE:userController');

const userList = async (req, res) => {
  debug('[userController] userList');
  return response(res, false, 'Not Implemented', 500);
  /* try {
    // const mongoResponse = await User.find({});
    logger.info('[userController] User list information');
    return response(res, true, { users: mongoResponse }, 200);
  } catch (err) {
    debug('[userController] Error');
    debug(err);
    logger.error('[userController] Error User list information');
    return response(res, false, err, 500);
  }*/
};

const createUser = async (req, res) => {
  debug('[userController] createUser');
  return response(res, false, 'Not Implemented', 500);
  /* try {
    const payload = _.pick(req.body, userFields);
    const userPayload = { ...payload, roles: config.config.basicInitRole };
    // const newUser = new User(userPayload);
    await newUser.save();
    return response(res, true, payload, 201);
  } catch (err) {
    debug('[userController] Error');
    debug(err);
    logger.error('[userController] Error User list information');
    return response(res, false, err, 500);
  }*/
};

const deleteUser = async (req, res) => {
  debug('[userController] deleteUser');
  const { code } = req.params;
  if (_.isString(code)) {
    debug('[userController] Error');
    logger.error('[userController] Error deleting User. Bad request. identifier must be String');
    return response(res, false, 'Bad Request', 400);
  }
  return response(res, false, 'Not Implemented', 500);
  /* try {
    // const responseRemove = await User.remove({ code });
    if (responseRemove.nRemoved === 0) {
      const error = {
        status: 404,
        message: 'Not found register to delete',
      };
      throw error;
    }
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
  }*/
};

const getUser = async (req, res) => {
  debug('[userController] getUser');
  const { code } = req.params;
  if (_.isString(code)) {
    debug('[userController] Error');
    logger.error('[userController] Error getting User. Bad request. identifier must be Number');
    return response(res, false, 'Bad Request', 400);
  }
  return response(res, false, 'Not Implemented', 500);
  /* try {
    const responseUser = await User.findOne({ code });
    if (!responseUser) {
      const error = {
        status: 404,
        message: 'Not found register to delete',
      };
      throw error;
    }
    return response(res, false, responseUser, 200);
  } catch (err) {
    debug('[userController] Error');
    if (err.status === 404) {
      logger.error('[userController] Error deleting User. Not Found');
      return response(res, false, err.message, 404);
    }
    debug(err);
    logger.error('[userController] Error deleting User');
    return response(res, false, err, 500);
  }*/
};

const addRolePermission = async (req, res) => {
  debug('[userController] addRolePermission');
  const { code } = req.params;
  const property = (req.originalUrl.indexOf('role') !== -1) ? 'roles' : 'permissions';
  if (_.isString(code)) {
    debug('[userController] Error');
    logger.error('[userController] Error adding Role User. Bad request. identifier must be Number');
    return response(res, false, 'Bad Request', 400);
  }
  return response(res, false, 'Not Implemented', 500);
  /* try {
    const responseUser = await User.update({ code }, {
      $push: {
        [property]: req.body,
      },
    });
    if (responseUser.nModified === 0) {
      const error = {
        status: 404,
        message: 'Not found register to update',
      };
      throw error;
    }
    return response(res, false, `Updating ${property}`, 200);
  } catch (err) {
    debug('[userController] Error');
    if (err.status === 404) {
      logger.error('[userController] Error updating User. Not Found');
      return response(res, false, err.message, 404);
    }
    debug(err);
    logger.error('[userController] Error updating User');
    return response(res, false, err, 500);
  }*/
};

const removeRolePermission = async (req, res) => {
  debug('[userController] removeRolePermission');
  const { code } = req.params;
  const property = (req.originalUrl.indexOf('role') !== -1) ? 'roles' : 'permissions';
  if (_.isString(code)) {
    debug('[userController] Error');
    logger.error(`[userController] Error adding ${property} User. Bad request. identifier must be Number`);
    return response(res, false, 'Bad Request', 400);
  }
  return response(res, false, 'Not Implemented', 500);
  /* try {
    const responseUser = await User.update({ code }, {
      $pull: {
        [property]: req.body,
      },
    });
    if (responseUser.nModified === 0) {
      const error = {
        status: 404,
        message: 'Not found register to update',
      };
      throw error;
    }
    return response(res, false, `Removed ${property}`, 204);
  } catch (err) {
    debug('[userController] Error');
    if (err.status === 404) {
      logger.error('[userController] Error updating User. Not Found');
      return response(res, false, err.message, 404);
    }
    debug(err);
    logger.error('[userController] Error updating User');
    return response(res, false, err, 500);
  }*/
};

const getRolePermissions = async (req, res) => {
  debug('[userController] getRolePermissions');
  return response(res, false, 'Not Implemented', 500);
  /* try {
    const mongoResponse = await Promise.all([
      Permission.find({}),
      Roles.find({}),
    ]);
    logger.info('[userController] User list information');
    return response(res, true, {
      roles: mongoResponse[1],
      permissions: mongoResponse[0],
    }, 200);
  } catch (err) {
    debug('[userController] Error');
    debug(err);
    logger.error('[userController] Error User list information');
    return response(res, false, err, 500);
  }*/
};

export {
  removeRolePermission,
  addRolePermission,
  getUser,
  deleteUser,
  createUser,
  userList,
  getRolePermissions,
};
