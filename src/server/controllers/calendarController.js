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
    await CalendarDate.save();
    logger('[saveDate] Save date');
    return response(res, true, 'Saved date', 201);
  } catch (err) {
    logger('[saveDate] Error saving date');
    debug(err);
    return response(res, false, err, 500);
  }
};

export {
  saveDate,
};
