import unirest from 'unirest';

const response = (status, body) => {
  if (status === 500) return { message: 'Internal server Error', body, status };
  else if (status === 401) return { message: 'Unauthorized', body, status };
  else if (status === 400) return { message: 'Bad Request', body, status };
  else if (status === 404) return { message: 'Not Found', body, status };
  else if (status === 403) return { message: 'Forbidden', body, status };
  else if (status === 201) return { message: null, body, status };
  else if (status === 200) return { message: null, body, status };
  else if (status === 204) return { message: null, body, status };
  else if (status === 409) return { message: 'Already exists', body, status };
  else if (status === 451) return { message: 'Unavailable for legal reasons', body, status };
  else if (status === 502) return { message: 'Bad Gateway', body: null, status };
  return { message: 'Client Error', body, status: 500 };
};

class Client {
  constructor(options) {
    this.uri = `${options.protocol}://${options.ip}:${options.port}`;
    if (!options.protocol || !options.ip || !options.port) {
      throw new Error('Required variables (protocol, ip, port) not defined');
    }
    this.port = options.port;
    this.ip = options.ip;
    this.headers = options.headers || {};
    this.timeout = options.timeout || 5000;
    this.proxy = options.proxy || undefined;
    this.strictSSL = (options.strictSSL === undefined) ? true : options.strictSSL;
  }

  setHeaders(headers) {
    this.headers = headers;
  }

  getRequest(path, query) {
    return new Promise((resolve, reject) => {
      unirest.get(`${this.uri}${path}`)
      .headers(this.headers)
      .timeout(this.timeout)
      .proxy(this.proxy)
      .query(query || {})
      .strictSSL(this.strictSSL)
      .end((res) => {
        const returnResponse = response(res.status, res.body);
        if (res.status >= 200 && res.status < 300) {
          return resolve(returnResponse);
        }
        return reject(returnResponse);
      });
    });
  }

  postRequest(path, payload) {
    return new Promise((resolve, reject) => {
      unirest.post(`${this.uri}${path}`)
      .headers(this.headers)
      .timeout(this.timeout)
      .proxy(this.proxy)
      .type('json')
      .send(payload)
      .strictSSL(this.strictSSL)
      .end((res) => {
        const returnResponse = response(res.status, res.body);
        if (res.status >= 200 && res.status < 300) {
          return resolve(returnResponse);
        }
        return reject(returnResponse);
      });
    });
  }

  patchRequest(path, payload) {
    return new Promise((resolve, reject) => {
      unirest.patch(`${this.uri}${path}`)
      .headers(this.headers)
      .timeout(this.timeout)
      .proxy(this.proxy)
      .type('json')
      .send(payload)
      .strictSSL(this.strictSSL)
      .end((res) => {
        const returnResponse = response(res.status, res.body);
        if (res.status >= 200 && res.status < 300) {
          return resolve(returnResponse);
        }
        return reject(returnResponse);
      });
    });
  }

  deleteRequest(path) {
    return new Promise((resolve, reject) => {
      unirest.delete(`${this.uri}${path}`)
      .headers(this.headers)
      .timeout(this.timeout)
      .proxy(this.proxy)
      .strictSSL(this.strictSSL)
      .end((res) => {
        const returnResponse = response(res.status, res.body);
        if (res.status >= 200 && res.status < 300) {
          return resolve(returnResponse);
        }
        return reject(returnResponse);
      });
    });
  }
}

export default Client;
