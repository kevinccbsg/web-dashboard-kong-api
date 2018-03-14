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
  try {
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

const getDatesByApplication = async (req, res) => {
  debug('getDatesByApplication');
  const { app } = req.params;
  const { username } = req.user;
  const userRoute = req.originalUrl.includes('user');
  let query = {
    application: app,
  };
  if (userRoute) {
    query = {
      user: username,
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

export {
  saveDate,
  getDatesByApplication,
};
