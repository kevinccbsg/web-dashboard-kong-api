module.exports = {
  port: 3000,
  kongOptions: {
    protocol: 'http',
    ip: 'localhost',
    port: 8001,
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
