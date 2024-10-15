import express from "express"; 
import verifyToken from '../../middleware/VerifyToken';
import RegisterCustomers from "../../middleware/RegisterCustomers/RegisterCustomers";
import RegisterCust from "../../controllers/controllerCust/Register-controller"
import Deletecust from "../../controllers/controllerCust/Delete-controller"
import Updatecust from "../../controllers/controllerCust/update-controller"
import getCust from "../../controllers/controllerCust/get-controller"

const router = express.Router();


router.get('/Cust/:placa', RegisterCustomers.validatorParams, getCust)
router.post('/register/cust',  RegisterCustomers.validatorParams, RegisterCustomers.validator, RegisterCust)
router.delete('/delete/cust', Deletecust)
router.put('/update/cust', Updatecust.updateUsers)


export default router;