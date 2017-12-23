module.exports = {
  port: 3000,
  session: {
    secret: 'stta azrisk tcv',
    cookie: { maxAge: 7200000 },
    resave: false,
    saveUninitialized: false,
  },
};
