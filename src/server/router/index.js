import Express from 'express';
import { apiList, createApi, deleteApi } from './../controllers/apiController';
import {
  userList,
  createUser,
  getUser,
  removeRolePermission,
  addRolePermission,
  deleteUser,
} from './../controllers/userController';
import {
  getLabs,
  createLab,
  deleteLabs,
} from './../controllers/labController';

const router = Express.Router();

// Api endpoints

router.get('/apis', apiList);
router.post('/api', createApi);
router.delete('/api/:nameapi', deleteApi);

// Lab endpoints

router.get('/labs', getLabs);
router.post('/lab', createLab);
router.delete('/lab', deleteLabs);

// User endpoints

router.get('/users', userList);
router.post('/user', createUser);
router.post('/user/:code/role', addRolePermission);
router.post('/user/:code/permission', addRolePermission);
router.delete('/user/:code/role', removeRolePermission);
router.delete('/user/:code/permission', removeRolePermission);
router.delete('/user/:code', deleteUser);
router.get('/user/:code', getUser);


export default router;
