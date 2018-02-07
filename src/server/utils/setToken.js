
const setAccesToken = (req) => {
  const contentType = 'application/json';
  const authorization = `Bearer  ${req.session.access_token}`;
  return {
    'Content-Type': contentType,
    Authorization: authorization,
  };
};

export default setAccesToken;
