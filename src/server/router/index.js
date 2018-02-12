import Express from 'express';
import { apiList, createApi, deleteApi } from './../controllers/apiController';
import {
  userList,
  createUser,
  getUser,
  deleteUser,
  patchUser,
  getRolePermissions,
} from './../controllers/userController';
import {
  getLabs,
  createLab,
  deleteLab,
  patchLab,
} from './../controllers/labController';

const router = Express.Router();

// Api endpoints

router.get('/apis', apiList);
router.post('/api', createApi);
router.delete('/api/:nameapi', deleteApi);

// Lab endpoints

router.get('/labs', getLabs);
router.post('/lab', createLab);
router.patch('/lab/:nameLab', patchLab);
router.delete('/lab/:nameLab', deleteLab);

// User endpoints

router.get('/users', userList);
router.post('/user', createUser);
router.patch('/user/:code', patchUser);
router.delete('/user/:code', deleteUser);
router.get('/user/:code', getUser);

// role permissions

router.get('/rolepermissions/list', getRolePermissions);

export default router;
