const {
  DB,
  DDBBUSER,
  DDBBPWD,
} = require('../secrets');

const IP = 'localhost';
const PORT = 27017;
const AUTHMONGO = false;

let authStr = '';

if (AUTHMONGO) {
  authStr = `${DDBBUSER}:${DDBBPWD}@`;
}

module.exports = {
  uri: `mongodb://${authStr}${IP}:${PORT}/${DB}`,
};
