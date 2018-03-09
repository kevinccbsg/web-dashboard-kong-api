import Express from 'express';
import { apiList, createApi, deleteApi, updateAPI } from './../controllers/apiController';
import {
  userList,
  createUser,
  getUser,
  deleteUser,
  patchUser,
  getRolePermissions,
  getMyUser,
} from './../controllers/userController';
import {
  getLabs,
  createLab,
  deleteLab,
  patchLab,
} from './../controllers/labController';
import {
  authorice,
} from './../controllers/oauthController';

const router = Express.Router();

// Authorice endpoint

router.get('/authorice', authorice);

// Api endpoints

router.get('/apis', apiList);
router.post('/api', createApi);
router.patch('/api/:nameapi', updateAPI);
router.delete('/api/:nameapi', deleteApi);

// Lab endpoints
router.get('/labs/admin', getLabs);
router.get('/labs', getLabs);
router.post('/lab', createLab);
router.patch('/lab/:nameLab', patchLab);
router.delete('/lab/:nameLab', deleteLab);

// User endpoints
router.get('/user/me', getMyUser);
router.get('/users', userList);
router.post('/user', createUser);
router.patch('/user/:code', patchUser);
router.delete('/user/:code', deleteUser);
router.get('/user/:code', getUser);

// role permissions

router.get('/rolepermissions/list', getRolePermissions);

export default router;
