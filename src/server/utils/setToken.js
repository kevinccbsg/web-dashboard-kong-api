
const setAccesToken = (req) => {
  const contentType = 'application/json';
  const authorization = `Bearer  ${req.user.access_token}`;
  return {
    'Content-Type': contentType,
    Authorization: authorization,
  };
};

export default setAccesToken;
