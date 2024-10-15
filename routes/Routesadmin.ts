import express from "express";
import registerController from '../controllers/register-controller';
import DeleteUsers from '../controllers/Delete-admin'
import registerValidator from '../middleware/RegisterValidator';
import getUsers from '../controllers/get-controller'
import UpdateUsers from '../controllers/update-controller'
import verifyToken from '../middleware/VerifyToken';

const router = express.Router();


router.get('/', verifyToken, registerValidator.validatorParams, getUsers)
router.post('/register', registerValidator.validatorParams, registerValidator.validator, registerController);
router.delete('/delete',verifyToken, DeleteUsers)
router.put('/update', verifyToken, UpdateUsers.updateUsers)



export default router;