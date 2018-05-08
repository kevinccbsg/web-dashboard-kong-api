# web-dashboard-kong-api

# Usage
Install dependencies

```
npm install
```

**Important**: Before you start your App you must provide a file called secret.js inside config folder with your mongodb configuration and kong configuration. Example:

```
module.exports = {
  DB: 'db_name',
  DDBBUSER: 'db_user',
  DDBBPWD: 'db_password',
  provision_key_userapi: 'provision_key_userapi',
  client_id_application: 'client_id_application',
  id_application: 'id_application',
  client_secret_application: 'client_secret_application',
  consumer_id_application: 'consumer_id_application',
};
```

# Run Project on dev mode

Frontend

```
npm run webpack:dev
```

Backend

```
npm run build-server:dev
```

Application

```
npm start
```

# Run project on prod mode

```
npm run prepare-server && npm run production
```

**Note** KONG, REDIS, [UserAPI](https://github.com/kevinccbsg/gsitae-userapi) and MongoDB are required to run the app

