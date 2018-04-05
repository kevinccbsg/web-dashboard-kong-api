import config from 'app-config';
import path from 'path';
import Express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';
import passport from 'passport';
import connectEnsureLogin from 'connect-ensure-login';
import response from './utils/responseHelper';
import api from './router';
import logger from './utils/logger';
import connect from './utils/ddbb';
import {
  getTokenWithCode,
} from './controllers/oauthController';
import {
  getUserInfo,
} from './controllers/userController';
import initScheduler from './scheduler';
import AuthLDAP from './utils/authLDAP';

const Strategy = require('passport-local').Strategy;

const RedisStore = require('connect-redis')(expressSession);

const authLDAP = new AuthLDAP({});

const debug = require('debug')('GSITAE:server');

connect(config.mongodb.uri)
.then(() => logger.info('Successfull connection'))
.catch(err => logger.error(err));

initScheduler(config.config.ruleTokens);

const app = new Express();

app.use(compression());
app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressSession({
    store: new RedisStore({
      host: config.config.redis.host,
      port: config.config.redis.port,
      ttl: config.config.redis.ttl,
    }),
    secret: config.config.session.secret,
    resave: config.config.session.resave,
    saveUninitialized: config.config.session.saveUninitialized,
}));
// app.use(expressSession({
//   secret: config.config.session.secret,
//   cookie: config.config.session.cookie,
//   resave: config.config.session.resave,
//   saveUninitialized: config.config.session.saveUninitialized,
// }));
app.use(passport.initialize());
app.use(passport.session());
app.use(Express.static(path.join(__dirname, 'public')));

passport.use(new Strategy(
  async (username, password, done) => {
    debug(username);
    try {
      await authLDAP.authorice(username, password);
      const userDDBB = await getUserInfo(username);
      const tokens = await getTokenWithCode(username);
      debug(userDDBB);
      const user = {
        username,
        code: username,
        roles: userDDBB.roles,
        permissions: userDDBB.permissions,
        ...tokens,
      };
      return done(null, user);
    } catch (err) {
      logger.error('[app] - Error en el login');
      debug(err);
      return done(null, false);    
    }
  },
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});


app.post('/GSITAE/login', passport.authenticate('local', { failureRedirect: '/login?error' }), (req, res) => {
  debug('Login GSITAE');
  res.redirect('/');
});

app.use('/GSITAE', connectEnsureLogin.ensureLoggedIn('/login'), api);

app.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

app.get('/hasAccess', (req, res) => {
  if (!req.user) {
    return response(res, true, { roles: [], user: {} }, 403);
  }
  const { roles } = req.user;
  return response(res, true, { roles, user: req.user }, 200);
});

app.get('*.js', (req, res, next) => {
  req.url = `${req.url}.gz`;
  res.set('Content-Encoding', 'gzip');
  next();
});

app.get('/login', (req, res) => {
  debug('Render home');
  debug(req.session);
  logger.info('[app] - renderizado de la home');
  res.sendFile(path.join(__dirname, 'public', 'dist', 'index.html'));
});

app.get('*', connectEnsureLogin.ensureLoggedIn('/login'), (req, res) => {
  debug('Render home');
  debug(req.session);
  logger.info('[app] - renderizado de la home');
  res.sendFile(path.join(__dirname, 'public', 'dist', 'index.html'));
});

module.exports = app;
