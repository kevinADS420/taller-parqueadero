import CustRepository from "../repositories/custRepository";
import Cust from '../Dto/customers/custDto'

class CustService {
    
    static async register(user: Cust) {
        return await CustRepository.add(user);
    }

    

}

export default CustService;