import 'babel-polyfill';
import config from 'app-config';
import clientHTTP from '../clientHTTP';

const client = clientHTTP(config.config.kongOauth2PluginOptions);

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

export {
  getTokenWithCode,
};
