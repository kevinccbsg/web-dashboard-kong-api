
const createAPIKONG = ['description', 'manualReference', 'global_credentials'];

const updateAPIMongo = ['name'];

const updateAPIKONG = ['upstream_url', 'uris', 'strip_uri', 'preserve_host'];

const getIDPlugin = (data) => {
  const pluginOauht2 = data.find(obj => obj.name === 'oauth2');
  const idPlugin = (pluginOauht2) ? pluginOauht2.id : false;
  return idPlugin;
};

export {
  createAPIKONG,
  updateAPIMongo,
  updateAPIKONG,
  getIDPlugin,
};
