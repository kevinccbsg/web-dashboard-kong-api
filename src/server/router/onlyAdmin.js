import response from '../utils/responseHelper';


const onlyAdmin = (req, res, next) => {
  const { username } = req.user;
  const roles = username.roles;
  if (!roles.includes('Admin')) {
    return response(res, false, 'Invalid Roles', 403);
  }
  return next();
};

export default onlyAdmin;
