import config from 'app-config';
import path from 'path';
import Express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';
import logger from './utils/logger';
import connect from './utils/ddbb';

const debug = require('debug')('GSITAE:server');

connect(config.mongodb.uri)
.then(() => logger.info('Successfull connection'))
.catch(err => logger.error(err));

const app = new Express();

app.use(compression());
app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressSession({
  secret: config.config.session.secret,
  cookie: config.config.session.cookie,
  resave: config.config.session.resave,
  saveUninitialized: config.config.session.saveUninitialized,
}));

app.use(Express.static(path.join(__dirname, 'public')));


app.get('*.js', (req, res, next) => {
  req.url = `${req.url}.gz`;
  res.set('Content-Encoding', 'gzip');
  next();
});

app.get('*', (req, res) => {
  debug('Render home');
  logger.info('[app] - renderizado de la home');
  res.sendFile(path.join(__dirname, 'public', 'dist', 'index.html'));
});

module.exports = app;
