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
import {
  saveDate,
  getDates,
} from '../controllers/calendarController';
import onlyAdmin from './onlyAdmin';

const router = Express.Router();

// Authorice endpoint

router.get('/authorice', authorice);

// Api endpoints

router.get('/apis', onlyAdmin, apiList);
router.post('/api', onlyAdmin, createApi);
router.patch('/api/:nameapi', onlyAdmin, updateAPI);
router.delete('/api/:nameapi', onlyAdmin, deleteApi);

// Lab endpoints
router.get('/labs/admin', onlyAdmin, getLabs);
router.get('/labs', getLabs);
router.post('/lab', onlyAdmin, createLab);
router.patch('/lab/:nameLab', onlyAdmin, patchLab);
router.delete('/lab/:nameLab', onlyAdmin, deleteLab);

// User endpoints
router.get('/user/me', getMyUser);
router.get('/users', onlyAdmin, userList);
router.post('/user', onlyAdmin, createUser);
router.patch('/user/:code', onlyAdmin, patchUser);
router.delete('/user/:code', onlyAdmin, deleteUser);
router.get('/user/:code', getUser);

// role permissions
router.get('/rolepermissions/list', getRolePermissions);

// Calendar endpoints
router.post('/calendar', saveDate);
router.get('/calendar/:app/user/', getDates);
router.get('/calendar/:app', getDates);

export default router;
