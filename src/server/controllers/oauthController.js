import 'babel-polyfill';
import config from 'app-config';
import moment from 'moment';
import CalendarDate from './../models/CalendarDate';
import clientHTTP from '../clientHTTP';
import logger from '../utils/logger';

const client = clientHTTP(config.config.kongOauth2PluginOptions);

const clientApplication = clientHTTP(config.config.kongOptions);

const debug = require('debug')('GSITAE:apiController');

const getTokenWithCode = async (user) => {
  debug('getTokenWithCode');
  const payloadCode = {
    provision_key: config.config.userapi.provision_key,
    client_id: config.config.application.client_id,
    response_type: 'code',
    authenticated_userid: user,
  };
  try {
    const kongResponse = await client.postRequest('/userapi/oauth2/authorize', payloadCode);
    debug('get Code');
    const code = kongResponse.body.redirect_uri.split('code=')[1];
    debug('code');
    const payloadToken = {
      client_id: config.config.application.client_id,
      client_secret: config.config.application.client_secret,
      grant_type: 'authorization_code',
      code,
    };
    const kongResponseToken = await client.postRequest('/userapi/oauth2/token', payloadToken);
    debug('token');
    const bodyToken = kongResponseToken.body;
    return bodyToken;
  } catch (err) {
    debug(err);
    return {
      token: 'Error',
    };
  }
};

const authorice = async (req, res) => {
  debug('authorice');
  const { client_id } = req.query;
  const { code } = req.user;
  try {
    const minutes = moment().minutes();
    let dataClean;
    let prevFilter;
    let postFilter;
    if (minutes < 30) {
      dataClean = moment().minutes(0).milliseconds(0).seconds(0);
      prevFilter = dataClean.subtract(1, 'minutes');
      postFilter = dataClean.add(1, 'minutes');
    } else {
      dataClean = moment().minutes(0).milliseconds(30).seconds(0);
      prevFilter = dataClean.subtract(1, 'minutes');
      postFilter = dataClean.add(1, 'minutes');
    }
    const appResponse = await clientApplication.getRequest(`/oauth2?client_id=${client_id}`);
    const applicationData = appResponse.body.data[0];
    const queryDates = {
      application: applicationData.name,
      selectedDate: { $gte: prevFilter, $lt: postFilter },
    };
    const canIAccess = await CalendarDate.findOne(queryDates);
    if (!canIAccess) {
      debug('You don\'t have enought dates to authorice application');
      const error = {
        status: 404,
      };
      throw error;
    }
    if (applicationData.length === 0) {
      const error = {
        status: 404,
        message: 'Not found register to delete',
      };
      throw error;
    }
    const clientIDApp = applicationData.client_id;
    const payloadCode = {
      provision_key: config.config.userapi.provision_key,
      client_id: clientIDApp,
      response_type: 'code',
      authenticated_userid: code,
    };
    const kongResponse = await client.postRequest('/userapi/oauth2/authorize', payloadCode);
    return res.redirect(kongResponse.body.redirect_uri);
  } catch (err) {
    debug('[apiController] Error');
    if (err.status === 404) {
      logger.error('[authorice] Error authorice application. Not Found');
      return res.redirect('/404');
    }
    debug(err);
    logger.error('[authorice] Error authorice application');
    return res.redirect('/404');
  }
};

const getClientToken = async (clientId, clientSecret) => {
  const payloadCode = {
    client_id: clientId,
    grant_type: 'client_credentials',
    client_secret: clientSecret,
  };
  try {
    const kongResponseToken = await client.postRequest('/userapi/oauth2/token', payloadCode);
    const bodyToken = kongResponseToken.body;
    return bodyToken;
  } catch (err) {
    debug(err);
    return {
      token: 'Error',
    };
  }
};

export {
  getTokenWithCode,
  authorice,
  getClientToken,
};
