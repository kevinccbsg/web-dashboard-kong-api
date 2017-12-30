import Express from 'express';
import { labList, createLab, deleteLab } from './../controllers/labController';
import {
  userList,
  createUser,
  getUser,
  removeRolePermission,
  addRolePermission,
  deleteUser,
} from './../controllers/userController';

const router = Express.Router();

// Lab endpoints

router.get('/labs', labList);
router.post('/lab', createLab);
router.delete('/lab/:nameLab', deleteLab);

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
