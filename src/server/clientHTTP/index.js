import Client from './Client';

let instance = null;

const createClient = (options) => {
  if (!instance) {
    instance = new Client(options);
  }
  return instance;
};

export default createClient;
