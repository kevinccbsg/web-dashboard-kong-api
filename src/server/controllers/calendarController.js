import 'babel-polyfill';
import config from 'app-config';
import _ from 'lodash';
import CalendarDate from '../models/CalendarDate';
import logger from '../utils/logger';
import response from '../utils/responseHelper';

const debug = require('debug')('GSITAE:calendarController');

const saveDate = async (req, res) => {
  debug('saveDate');
  const { username } = req.user;
  const payload = {
    ...req.body,
    user: username,
  };
  const query = {
    user: username,
    application: req.body.application,
  };
  try {
    const responseMongo = await CalendarDate.find(query, { _id: 0 });
    if (responseMongo.length === 2) {
      logger.error('[saveDate] Cannot save the user already selected two dates');
      return response(res, false, 'Cannot save the user already selected two dates', 409);
    }
    const calendarDate = new CalendarDate(payload);
    await calendarDate.save();
    logger.info('[saveDate] Save date');
    return response(res, true, 'Saved date', 201);
  } catch (err) {
    logger.error('[saveDate] Error saving date');
    debug(err);
    return response(res, false, err, 500);
  }
};

const getDates = async (req, res) => {
  debug('getDates');
  const { app } = req.params;
  const { username } = req.user;
  const userRoute = req.originalUrl.includes('user');
  let query = {
    application: app,
  };
  if (userRoute) {
    query = {
      user: username,
      application: app,
    };
  }
  try {
    const responseMongo = await CalendarDate.find(query, { _id: 0 });
    return response(res, true, {
      dates: responseMongo,
    }, 200);
  } catch (err) {
    logger.error('[saveDate] Error saving date');
    debug(err);
    return response(res, false, err, 500);
  }
};

const deleteDate = async (req, res) => {
  debug('deleteDate');
  const { application, selectedDate } = req.body;
  const { username } = req.user;
  const query = {
    user: username,
    application,
    selectedDate,
  };
  debug('payload');
  debug(query);
  try {
    const responseMongo = await CalendarDate.remove(query);
    return response(res, true, 'Removed date', 202);
  } catch (err) {
    logger.error('[saveDate] Error saving date');
    debug(err);
    return response(res, false, err, 500);
  }
};

export {
  saveDate,
  getDates,
  deleteDate,
};
