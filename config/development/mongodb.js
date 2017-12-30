const {
  DB,
  DDBBUSER,
  DDBBPWD,
} = require('../secrets');

const IP = 'localhost';
const PORT = 27017;

module.exports = {
  uri: `mongodb://${DDBBUSER}:${DDBBPWD}@${IP}:${PORT}/${DB}`,
};
