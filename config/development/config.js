const {
  provision_key_userapi,
  client_id_application,
  id_application,
  client_secret_application,
  consumer_id_application,
} = require('./../secrets');

module.exports = {
  port: 3000,
  userapi: {
    provision_key: provision_key_userapi,
  },
  application: {
    client_id: client_id_application,
    created_at: 1516053687932,
    id: id_application,
    name: 'Test-Application',
    client_secret: client_secret_application,
    consumer_id: consumer_id_application,
  },
  kongOptions: {
    protocol: 'http',
    ip: 'localhost',
    port: 8001,
    strictSSL: false,
  },
  userapiOptions: {
    protocol: 'https',
    ip: 'localhost',
    port: 8443,
    strictSSL: false,
  },
  kongOauth2PluginOptions: {
    protocol: 'https',
    ip: 'localhost',
    port: 8443,
    strictSSL: false,
  },
  kongOauth2Plugin: {
    name: 'oauth2',
    'config.enable_authorization_code': true,
    'config.mandatory_scope': false,
    'config.enable_client_credentials': true,
  },
  basicInitRole: [
    {
      name: 'User',
      description: 'user.role',
    },
  ],
  session: {
    secret: 'stta azrisk tcv',
    cookie: { maxAge: 7200000 },
    resave: false,
    saveUninitialized: false,
  },
};
