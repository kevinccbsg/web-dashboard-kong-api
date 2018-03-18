import response from '../utils/responseHelper';


const onlyAdmin = (req, res, next) => {
  const { username, roles } = req.user;
  if (!roles) {
    return response(res, false, 'Invalid Roles', 403);
  }
  if (!roles.includes('Admin')) {
    return response(res, false, 'Invalid Roles', 403);
  }
  return next();
};

export default onlyAdmin;
